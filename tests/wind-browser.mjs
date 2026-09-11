// Run after `npm run build` and `npm run start -- --port 3187`.
// BASE_URL may point to a preview; CHROME_PATH selects a local Chromium binary.
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const base = process.env.BASE_URL || 'http://localhost:3187';
const fixture = (speed) => ({
  source: 'Open-Meteo', dataUpdatedAt: '2026-09-11T17:30',
  grid: { longitudes: [-280, -140, 0], latitudes: [-60, 0, 80] },
  points: [-60, 0, 80].flatMap(lat => [-280, -140, 0].map(lon => ({ lat, lon, speedMph: speed, directionDegrees: 260 }))),
});
try {
  await test('wind continuity and interaction regressions', async (t) => {
    const page = await browser.newPage({ viewport: { width: 1000, height: 700 }, hasTouch: true });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    let speed = 10;
    let requests = 0;
    await page.route('**/api/wind*', route => { requests++; return route.fulfill({ json: fixture(speed) }); });
    // Real Mapbox camera, deterministic tile-free style, no provider credentials.
    await page.route('**/api/mapbox-token', route => route.fulfill({ json: { token: 'pk.test', styleUrl: `${base}/test-map-style` } }));
    await page.route('**/test-map-style', route => route.fulfill({ json: { version: 8, sources: {}, layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#07101a' } }] } }));
    await page.addInitScript(() => {
      window.windProbe = { sizes: 0, reprojections: 0, lightning: 0 };
      const width = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, 'width');
      Object.defineProperty(HTMLCanvasElement.prototype, 'width', { ...width, set(value) {
        if (this.classList.contains('absolute')) window.windProbe.sizes++;
        width.set.call(this, value);
      } });
      const draw = CanvasRenderingContext2D.prototype.drawImage;
      CanvasRenderingContext2D.prototype.drawImage = function (...args) {
        if (this.canvas.classList.contains('absolute')) window.windProbe.reprojections++;
        return draw.apply(this, args);
      };
      const stroke = CanvasRenderingContext2D.prototype.stroke;
      CanvasRenderingContext2D.prototype.stroke = function (...args) {
        if (this.shadowBlur === 9) window.windProbe.lightning++;
        return stroke.apply(this, args);
      };
    });
    await page.goto(`${base}/?wind=1`);
    await page.waitForFunction(() => document.querySelector('.wind-mapbox')?.dataset.center);
    await page.waitForTimeout(2300);
    const camera = () => page.locator('.wind-mapbox').evaluate(e => e.dataset.center);
    await t.test('panning reprojects existing trails and data refresh does not reset canvas', async () => {
      const initial = await camera();
      const before = await page.evaluate(() => ({ ...window.windProbe }));
      speed = 25;
      const oldRequests = requests;
      await page.keyboard.down('Control');
      await page.mouse.move(600, 400); await page.mouse.down();
      await page.mouse.move(800, 480, { steps: 12 }); await page.mouse.up();
      await page.keyboard.up('Control');
      assert.notEqual(await camera(), initial);
      await page.waitForTimeout(2300);
      assert.ok(requests > oldRequests, 'new viewport must fetch wind');
      const after = await page.evaluate(() => ({ ...window.windProbe }));
      assert.ok(after.reprojections > before.reprojections, 'trail bitmap must follow the map');
      assert.equal(after.sizes, before.sizes, 'data update must not clear/reset the canvas');
    });
    await t.test('resizing preserves the camera', async () => {
      const before = await camera();
      await page.setViewportSize({ width: 1000, height: 650 });
      await page.waitForTimeout(150);
      assert.equal(await camera(), before);
    });
    await t.test('two-finger double taps accept staggered finger release', async () => {
      await page.evaluate(() => {
        const target = document.querySelector('main');
        const tap = () => {
          const a = new Touch({ identifier: 1, target, clientX: 650, clientY: 350 });
          const b = new Touch({ identifier: 2, target, clientX: 700, clientY: 350 });
          const emit = (type, touches, changedTouches) => target.dispatchEvent(new TouchEvent(type, { bubbles: true, cancelable: true, touches, changedTouches }));
          emit('touchstart', [a], [a]); emit('touchstart', [a, b], [b]);
          emit('touchend', [b], [a]); emit('touchend', [], [b]);
        };
        // First double-tap makes a hurricane; second makes observable lightning.
        tap(); tap(); tap(); tap();
      });
      await page.waitForFunction(() => window.windProbe.lightning > 0, null, { timeout: 3000 });
    });
    await t.test('page remains scrollable and the effect can be disabled', async () => {
      await page.mouse.move(700, 300);
      await page.mouse.wheel(0, 450);
      await page.waitForFunction(() => scrollY > 0, null, { timeout: 3000 });
      await page.getByRole('button', { name: 'Disable wind background' }).click();
      assert.equal(await page.locator('.wind-mapbox').count(), 0);
      assert.deepEqual(errors, []);
    });
    await page.close();
  });
} finally { await browser.close(); }

await test('wind API bounds, fresh-cache expiry, and provider recovery', async () => {
  const { readFileSync } = await import('node:fs');
  const { default: ts } = await import('typescript');
  const { default: vm } = await import('node:vm');
  const source = readFileSync(new URL('../src/app/api/wind/route.ts', import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  let now = Date.now();
  let calls = 0;
  let fail = false;
  const exports = {};
  vm.runInNewContext(code, {
    exports, URL, AbortSignal, setTimeout,
    Date: class extends Date { static now() { return now; } },
    console: { error() {} },
    require: () => ({ NextResponse: { json: (body, options) => ({ body, headers: options.headers }) } }),
    fetch: async url => {
      calls++;
      if (fail) return { ok: false, status: 429 };
      return { ok: true, json: async () => url.searchParams.get('latitude').split(',').map(() => ({ current: { time: '2026-09-11T17:30', wind_speed_10m: 12, wind_direction_10m: 270 } })) };
    },
  });
  const get = path => exports.GET({ url: `http://localhost${path}` });
  const initial = await get('/api/wind');
  assert.equal(initial.body.source, 'Open-Meteo');
  assert.equal(initial.body.points.length, 220);
  await get('/api/wind?west=-206&south=-7.5&east=-41&north=69');
  assert.equal(calls, 1, 'equivalent broad bounds share one fresh provider result');
  now += 6 * 60 * 1000;
  await get('/api/wind');
  assert.equal(calls, 2, 'expired values are not served as fresh');
  const region = await get('/api/wind?west=-126&south=30&east=-115&north=43');
  assert.ok(region.body.points.length > 220 && region.body.points.length <= 600);
  now += 6 * 60 * 1000;
  fail = true;
  assert.equal((await get('/api/wind')).body.source, 'fallback');
  fail = false;
  assert.equal((await get('/api/wind')).body.source, 'Open-Meteo', 'failed fetch is evicted so recovery can retry');
});
