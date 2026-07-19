'use client';

import type { Map as MapboxMap } from 'mapbox-gl';
import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type WindPoint = {
  lat: number;
  lon: number;
  speedMph: number;
  directionDegrees: number;
};

type WindPayload = {
  source: string;
  attribution: string;
  fetchedAt: string;
  points: WindPoint[];
};

type MapboxConfig = {
  token: string;
  styleUrl: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
};

const EXTENT = {
  minLon: -146,
  maxLon: -106,
  minLat: 25,
  maxLat: 54,
};

const COAST = [
  [-132, 54],
  [-129, 52],
  [-126.8, 50.2],
  [-125.2, 49.1],
  [-124.5, 47.2],
  [-124.1, 45.4],
  [-124.4, 43.6],
  [-123.1, 41.9],
  [-124.0, 40.6],
  [-123.1, 39.2],
  [-122.4, 37.8],
  [-121.4, 36.6],
  [-120.1, 35.5],
  [-118.7, 34.4],
  [-117.2, 32.8],
  [-115.8, 31.6],
  [-113.7, 30.2],
  [-111.8, 28.7],
];

const LAND_POLYGON = [
  [-106, 54],
  [-132, 54],
  ...COAST,
  [-106, 25],
];

const SAMPLE_FALLBACK: WindPoint[] = [
  { lat: 52, lon: -136, speedMph: 17, directionDegrees: 260 },
  { lat: 48, lon: -122, speedMph: 12, directionDegrees: 285 },
  { lat: 43, lon: -130, speedMph: 24, directionDegrees: 250 },
  { lat: 39, lon: -124, speedMph: 19, directionDegrees: 275 },
  { lat: 34, lon: -128, speedMph: 14, directionDegrees: 240 },
  { lat: 30, lon: -121, speedMph: 10, directionDegrees: 300 },
];

const DEFAULT_MAPBOX_STYLE_URL = 'mapbox://styles/mapbox/dark-v11';
const EMBEDDED_MAPBOX_CONFIG: MapboxConfig | null = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  ? {
      token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      styleUrl: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ?? DEFAULT_MAPBOX_STYLE_URL,
    }
  : null;

function project(lon: number, lat: number, width: number, height: number) {
  const x = ((lon - EXTENT.minLon) / (EXTENT.maxLon - EXTENT.minLon)) * width;
  const y = ((EXTENT.maxLat - lat) / (EXTENT.maxLat - EXTENT.minLat)) * height;
  return { x, y };
}

function unproject(x: number, y: number, width: number, height: number) {
  const lon = EXTENT.minLon + (x / width) * (EXTENT.maxLon - EXTENT.minLon);
  const lat = EXTENT.maxLat - (y / height) * (EXTENT.maxLat - EXTENT.minLat);
  return { lon, lat };
}

function projectForView(
  map: MapboxMap | null,
  lon: number,
  lat: number,
  width: number,
  height: number,
) {
  if (map) {
    const point = map.project([lon, lat]);
    return { x: point.x, y: point.y };
  }

  return project(lon, lat, width, height);
}

function unprojectForView(
  map: MapboxMap | null,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  if (map) {
    const point = map.unproject([x, y]);
    return { lon: point.lng, lat: point.lat };
  }

  return unproject(x, y, width, height);
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  points: number[][],
  width: number,
  height: number,
) {
  points.forEach(([lon, lat], index) => {
    const point = project(lon, lat, width, height);
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
}

function drawBaseMap(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#020711');
  gradient.addColorStop(0.45, '#071625');
  gradient.addColorStop(1, '#05070c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = 'rgba(122, 161, 186, 0.18)';
  ctx.lineWidth = 1;

  for (let lon = -145; lon <= -110; lon += 5) {
    const a = project(lon, EXTENT.minLat, width, height);
    const b = project(lon, EXTENT.maxLat, width, height);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  for (let lat = 30; lat <= 50; lat += 5) {
    const a = project(EXTENT.minLon, lat, width, height);
    const b = project(EXTENT.maxLon, lat, width, height);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  drawPath(ctx, LAND_POLYGON, width, height);
  ctx.closePath();
  ctx.fillStyle = 'rgba(232, 238, 228, 0.07)';
  ctx.fill();

  ctx.beginPath();
  drawPath(ctx, COAST, width, height);
  ctx.strokeStyle = 'rgba(173, 214, 232, 0.38)';
  ctx.lineWidth = 1.3;
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'rgba(236, 248, 255, 0.22)';
  ctx.font = `${Math.max(11, width / 120)}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillText('Pacific wind field', width * 0.07, height * 0.17);
  ctx.fillText('Western North America', width * 0.62, height * 0.28);
  ctx.restore();
}

function nearestWind(points: WindPoint[], lon: number, lat: number) {
  let weightedX = 0;
  let weightedY = 0;
  let weightedSpeed = 0;
  let totalWeight = 0;

  points.forEach((point) => {
    const dx = lon - point.lon;
    const dy = lat - point.lat;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const weight = 1 / Math.max(0.8, distance * distance);
    const radians = (point.directionDegrees * Math.PI) / 180;
    const speed = Math.max(2, point.speedMph);

    weightedX += -Math.sin(radians) * speed * weight;
    weightedY += Math.cos(radians) * speed * weight;
    weightedSpeed += speed * weight;
    totalWeight += weight;
  });

  return {
    x: weightedX / totalWeight,
    y: weightedY / totalWeight,
    speedMph: weightedSpeed / totalWeight,
  };
}

function resetParticle(particle: Particle, width: number, height: number) {
  particle.x = Math.random() * width;
  particle.y = Math.random() * height;
  particle.vx = 0;
  particle.vy = 0;
  particle.age = 0;
  particle.maxAge = 180 + Math.floor(Math.random() * 180);
}

function drawStaticWind(
  ctx: CanvasRenderingContext2D,
  points: WindPoint[],
  width: number,
  height: number,
  map: MapboxMap | null,
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(205, 240, 255, 0.76)';
  ctx.fillStyle = 'rgba(205, 240, 255, 0.84)';
  ctx.lineWidth = 1.6;

  points.forEach((point) => {
    const start = projectForView(map, point.lon, point.lat, width, height);
    const radians = (point.directionDegrees * Math.PI) / 180;
    const length = 12 + Math.min(26, point.speedMph);
    const dx = -Math.sin(radians) * length;
    const dy = Math.cos(radians) * length;

    ctx.beginPath();
    ctx.moveTo(start.x - dx * 0.5, start.y - dy * 0.5);
    ctx.lineTo(start.x + dx * 0.5, start.y + dy * 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(start.x + dx * 0.5, start.y + dy * 0.5, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    const timer = window.setTimeout(update, 0);
    const listener = () => setReduced(query.matches);

    query.addEventListener('change', listener);
    return () => {
      window.clearTimeout(timer);
      query.removeEventListener('change', listener);
    };
  }, []);

  return reduced;
}

function MapboxBackdrop({
  config,
  onReady,
  mapRef,
}: {
  config: MapboxConfig | null;
  onReady: (ready: boolean) => void;
  mapRef: MutableRefObject<MapboxMap | null>;
}) {
  const mapNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config) {
      onReady(false);
      return;
    }

    const container = mapNodeRef.current;
    if (!container) return;

    let cancelled = false;
    let map: MapboxMap | null = null;
    let cleanupResize: (() => void) | null = null;
    let dragState: { pointerId: number; x: number; y: number } | null = null;
    let touchState: { distance: number; x: number; y: number; zoom: number } | null = null;

    function viewportCamera() {
      return {
        center: [-123.5, 40.5] as [number, number],
        zoom: window.innerWidth < 640 ? 2.0 : 2.62,
      };
    }

    function isInteractiveTarget(target: EventTarget | null) {
      return (
        target instanceof Element &&
        Boolean(target.closest('a, button, input, textarea, select, [role="button"]'))
      );
    }

    function touchGesture(touches: TouchList) {
      if (touches.length !== 2) return null;

      const first = touches[0];
      const second = touches[1];
      const x = (first.clientX + second.clientX) / 2;
      const y = (first.clientY + second.clientY) / 2;
      const distance = Math.max(
        1,
        Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
      );

      return { distance, x, y };
    }

    import('mapbox-gl')
      .then((module) => {
        if (cancelled) return;

        const mapboxgl = module.default;
        mapboxgl.accessToken = config.token;

        map = new mapboxgl.Map({
          container,
          style: config.styleUrl,
          ...viewportCamera(),
          projection: 'mercator',
          bearing: 0,
          pitch: 0,
          interactive: false,
          attributionControl: false,
          logoPosition: 'bottom-left',
          fadeDuration: 0,
        });
        mapRef.current = map;
        map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');

        const syncCameraMarker = () => {
          if (!map) {
            container.dataset.zoom = '';
            container.dataset.center = '';
            return;
          }

          try {
            const center = map.getCenter();
            const zoom = map.getZoom();
            container.dataset.zoom = Number.isFinite(zoom) ? zoom.toFixed(2) : '';
            container.dataset.center = `${center.lng.toFixed(3)},${center.lat.toFixed(3)}`;
          } catch {
            container.dataset.zoom = '';
            container.dataset.center = '';
          }
        };
        syncCameraMarker();
        map.on('move', syncCameraMarker);

        const markReady = () => {
          if (!cancelled) {
            map?.resize();
            onReady(true);
          }
        };

        map.once('style.load', markReady);
        map.once('load', markReady);

        const handleResize = () => {
          if (!map) return;
          const camera = viewportCamera();
          map.easeTo({ ...camera, duration: 0 });
        };

        window.addEventListener('resize', handleResize);
        cleanupResize = () => window.removeEventListener('resize', handleResize);

        const handleWheel = (event: WheelEvent) => {
          if (!map || (!event.ctrlKey && !event.metaKey)) return;

          event.preventDefault();

          try {
            const currentZoom = map.getZoom();
            const nextZoom = Math.min(5.8, Math.max(1.65, currentZoom - event.deltaY * 0.0032));
            map.easeTo({
              zoom: nextZoom,
              around: map.unproject([event.clientX, event.clientY]),
              duration: 90,
            });
            syncCameraMarker();
          } catch {
            // Leave page scrolling passive if Mapbox is not ready to receive camera updates.
          }
        };

        const stopDrag = () => {
          dragState = null;
          document.documentElement.classList.remove('wind-map-dragging');
        };

        const stopTouch = () => {
          touchState = null;
          document.documentElement.classList.remove('wind-map-touching');
        };

        const handlePointerDown = (event: PointerEvent) => {
          if (
            !map ||
            event.button !== 0 ||
            (!event.ctrlKey && !event.metaKey) ||
            isInteractiveTarget(event.target)
          ) {
            return;
          }

          event.preventDefault();
          dragState = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
          document.documentElement.classList.add('wind-map-dragging');
        };

        const handlePointerMove = (event: PointerEvent) => {
          if (!map || !dragState || event.pointerId !== dragState.pointerId) return;

          if (!event.ctrlKey && !event.metaKey) {
            stopDrag();
            return;
          }

          event.preventDefault();
          const deltaX = event.clientX - dragState.x;
          const deltaY = event.clientY - dragState.y;

          if (deltaX || deltaY) {
            try {
              map.panBy([-deltaX, -deltaY], { duration: 0 });
              dragState = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
              syncCameraMarker();
            } catch {
              stopDrag();
            }
          }
        };

        const handleTouchStart = (event: TouchEvent) => {
          if (!map || isInteractiveTarget(event.target)) return;

          const gesture = touchGesture(event.touches);
          if (!gesture) {
            stopTouch();
            return;
          }

          event.preventDefault();

          try {
            touchState = { ...gesture, zoom: map.getZoom() };
            document.documentElement.classList.add('wind-map-touching');
          } catch {
            stopTouch();
          }
        };

        const handleTouchMove = (event: TouchEvent) => {
          if (!map || !touchState) return;

          const gesture = touchGesture(event.touches);
          if (!gesture) {
            stopTouch();
            return;
          }

          event.preventDefault();

          try {
            const deltaX = gesture.x - touchState.x;
            const deltaY = gesture.y - touchState.y;
            const zoomDelta = Math.log2(gesture.distance / touchState.distance) * 1.15;
            const nextZoom = Math.min(5.8, Math.max(1.65, touchState.zoom + zoomDelta));

            map.easeTo({
              zoom: nextZoom,
              around: map.unproject([gesture.x, gesture.y]),
              duration: 0,
            });

            if (deltaX || deltaY) {
              map.panBy([-deltaX, -deltaY], { duration: 0 });
            }

            touchState = { ...gesture, zoom: nextZoom };
            syncCameraMarker();
          } catch {
            stopTouch();
          }
        };

        const handleTouchEnd = (event: TouchEvent) => {
          if (event.touches.length < 2) {
            stopTouch();
          }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('pointerdown', handlePointerDown, { passive: false });
        window.addEventListener('pointermove', handlePointerMove, { passive: false });
        window.addEventListener('pointerup', stopDrag);
        window.addEventListener('pointercancel', stopDrag);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', stopTouch);
        window.addEventListener('blur', stopDrag);
        const cleanupExisting = cleanupResize;
        cleanupResize = () => {
          cleanupExisting?.();
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('pointerdown', handlePointerDown);
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('pointerup', stopDrag);
          window.removeEventListener('pointercancel', stopDrag);
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('touchend', handleTouchEnd);
          window.removeEventListener('touchcancel', stopTouch);
          window.removeEventListener('blur', stopDrag);
          stopDrag();
          stopTouch();
        };
      })
      .catch(() => {
        if (!cancelled) {
          onReady(false);
        }
      });

    return () => {
      cancelled = true;
      cleanupResize?.();
      map?.remove();
      mapRef.current = null;
      onReady(false);
    };
  }, [config, mapRef, onReady]);

  if (!config) return null;

  return (
    <div
      ref={mapNodeRef}
      className="wind-mapbox absolute inset-0 h-full w-full opacity-95"
      aria-hidden="true"
    />
  );
}

function WindCanvas({
  points,
  useFallbackMap,
  mapRef,
}: {
  points: WindPoint[];
  useFallbackMap: boolean;
  mapRef: MutableRefObject<MapboxMap | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (useFallbackMap) {
        drawBaseMap(context, width, height);
      } else {
        context.clearRect(0, 0, width, height);
      }

      const count = Math.min(580, Math.max(160, Math.floor((width * height) / 3800)));
      particlesRef.current = Array.from({ length: count }, () => {
        const particle = { x: 0, y: 0, vx: 0, vy: 0, age: 0, maxAge: 220 };
        resetParticle(particle, width, height);
        particle.age = Math.floor(Math.random() * particle.maxAge);
        return particle;
      });
    };

    const animate = () => {
      if (reducedMotion) {
        if (useFallbackMap) {
          drawBaseMap(context, width, height);
        } else {
          context.clearRect(0, 0, width, height);
        }
        drawStaticWind(context, points, width, height, mapRef.current);
        return;
      }

      frame += 1;

      if (useFallbackMap) {
        if (frame % 150 === 1) {
          drawBaseMap(context, width, height);
        }
        context.fillStyle = 'rgba(2, 7, 17, 0.11)';
        context.fillRect(0, 0, width, height);
      } else {
        context.save();
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0, 0, 0, 0.13)';
        context.fillRect(0, 0, width, height);
        context.restore();
      }

      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.globalCompositeOperation = 'source-over';

      particlesRef.current.forEach((particle) => {
        let windSpeed = 0;

        for (let step = 0; step < 2; step += 1) {
          const location = unprojectForView(mapRef.current, particle.x, particle.y, width, height);
          const wind = nearestWind(points, location.lon, location.lat);
          const factor = 0.24;

          particle.vx = particle.vx * 0.64 + wind.x * factor * 0.36;
          particle.vy = particle.vy * 0.64 + wind.y * factor * 0.36;
          particle.x += particle.vx;
          particle.y += particle.vy;
          windSpeed = wind.speedMph;
        }

        particle.age += 1;
        if (
          particle.age > particle.maxAge ||
          particle.x < -40 ||
          particle.x > width + 40 ||
          particle.y < -40 ||
          particle.y > height + 40
        ) {
          resetParticle(particle, width, height);
          return;
        }

        const lifeFade = Math.min(1, (particle.maxAge - particle.age) / 34);
        const speedAlpha = Math.min(0.72, 0.24 + windSpeed / 70);
        const velocity = Math.max(0.1, Math.hypot(particle.vx, particle.vy));
        const tailLength = Math.min(30, 10 + windSpeed * 0.5);
        const tailX = particle.x - (particle.vx / velocity) * tailLength;
        const tailY = particle.y - (particle.vy / velocity) * tailLength;

        context.globalAlpha = Math.max(0.08, lifeFade * speedAlpha);
        context.lineWidth = useFallbackMap ? 1.05 : Math.min(1.35, 0.9 + windSpeed / 90);
        context.strokeStyle = useFallbackMap
          ? 'rgba(174, 226, 255, 0.62)'
          : 'rgba(211, 244, 255, 0.72)';
        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [points, reducedMotion, useFallbackMap, mapRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export default function WindMode() {
  const [enabled, setEnabled] = useState(false);
  const [loadedPreference, setLoadedPreference] = useState(false);
  const [payload, setPayload] = useState<WindPayload | null>(null);
  const [mapboxConfig, setMapboxConfig] = useState<MapboxConfig | null>(null);
  const [mapboxReady, setMapboxReady] = useState(false);
  const [showInteractionHint, setShowInteractionHint] = useState(false);
  const mapboxRequestedRef = useRef(false);
  const mapRef = useRef<MapboxMap | null>(null);
  const activeMapboxConfig = EMBEDDED_MAPBOX_CONFIG ?? mapboxConfig;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requested = new URLSearchParams(window.location.search).get('wind');
      const saved = window.localStorage.getItem('taborlin-wind-mode');
      setEnabled(requested === '1' || requested === 'true' || saved === 'true');
      setLoadedPreference(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loadedPreference) return;

    window.localStorage.setItem('taborlin-wind-mode', String(enabled));

    if (!enabled || payload) return;

    let cancelled = false;
    fetch('/api/wind')
      .then((response) => response.json() as Promise<WindPayload>)
      .then((data) => {
        if (!cancelled) {
          setPayload(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPayload({
            source: 'fallback',
            attribution: 'Wind field fallback while Open-Meteo is unavailable',
            fetchedAt: new Date().toISOString(),
            points: SAMPLE_FALLBACK,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, loadedPreference, payload]);

  useEffect(() => {
    if (!enabled || activeMapboxConfig || mapboxRequestedRef.current) return;

    mapboxRequestedRef.current = true;

    let cancelled = false;
    fetch('/api/mapbox-token')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Mapbox token endpoint returned ${response.status}`);
        }
        return response.json() as Promise<MapboxConfig>;
      })
      .then((config) => {
        if (!cancelled && config.token) {
          setMapboxConfig({
            token: config.token,
            styleUrl: config.styleUrl || DEFAULT_MAPBOX_STYLE_URL,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMapboxReady(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, activeMapboxConfig]);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowInteractionHint(enabled), 0);

    if (!enabled) {
      return () => window.clearTimeout(showTimer);
    }

    const hideTimer = window.setTimeout(() => setShowInteractionHint(false), 7800);
    const hideOnInteraction = (event: WheelEvent | PointerEvent | TouchEvent) => {
      if ('touches' in event ? event.touches.length > 1 : event.ctrlKey || event.metaKey) {
        setShowInteractionHint(false);
      }
    };

    window.addEventListener('wheel', hideOnInteraction, { passive: true });
    window.addEventListener('pointerdown', hideOnInteraction, { passive: true });
    window.addEventListener('touchstart', hideOnInteraction, { passive: true });

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener('wheel', hideOnInteraction);
      window.removeEventListener('pointerdown', hideOnInteraction);
      window.removeEventListener('touchstart', hideOnInteraction);
    };
  }, [enabled]);

  const points = payload?.points.length ? payload.points : SAMPLE_FALLBACK;
  const attribution =
    payload?.source === 'Open-Meteo' ? 'Wind data: Open-Meteo' : 'Wind mode preview';

  return (
    <>
      {enabled ? (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#020711]">
          <MapboxBackdrop config={activeMapboxConfig} onReady={setMapboxReady} mapRef={mapRef} />
          <div className="absolute inset-0 bg-[#05060b]/36" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(31,105,150,0.16),transparent_32%),radial-gradient(circle_at_68%_42%,rgba(5,18,29,0.24),transparent_38%)]"
            aria-hidden="true"
          />
          <WindCanvas points={points} useFallbackMap={!mapboxReady} mapRef={mapRef} />
          {showInteractionHint ? (
            <div className="wind-interaction-hint pointer-events-none absolute right-[4.75rem] top-[4.25rem] z-50 flex w-44 items-center justify-center gap-2 rounded-md border border-sky-200/16 bg-[#05060b]/74 px-3 py-2 text-[10px] font-medium text-sky-100/70 shadow-[0_0_28px_rgba(56,189,248,0.16)] backdrop-blur-md sm:right-4 sm:top-[7.25rem] sm:w-auto sm:justify-start sm:text-[11px]">
              <span className="hidden rounded border border-sky-100/18 bg-sky-100/8 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-sky-100/80 sm:inline">
                Ctrl/Cmd
              </span>
              <span className="wind-interaction-track hidden sm:block" aria-hidden="true">
                <span />
              </span>
              <span className="hidden sm:inline">drag / scroll</span>
              <span className="wind-touch-dots sm:hidden" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="sm:hidden">2 fingers: move / zoom</span>
            </div>
          ) : null}
          <p className="absolute bottom-9 left-3 text-[10px] uppercase tracking-[0.18em] text-[#d6edf8]/35">
            {payload?.source === 'Open-Meteo' ? (
              <>
                Wind data:{' '}
                <a href="https://open-meteo.com/" target="_blank" rel="noopener" className="underline-offset-2 hover:underline">
                  Open-Meteo
                </a>
              </>
            ) : (
              attribution
            )}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        aria-pressed={enabled}
        aria-label={enabled ? 'Disable wind background' : 'Enable wind background'}
        title={enabled ? 'Disable wind background' : 'Enable wind background'}
        onClick={() => setEnabled((value) => !value)}
        className={`fixed right-4 top-[4.25rem] z-[60] flex h-10 w-10 items-center justify-center rounded-md border text-lg backdrop-blur-md transition-colors sm:top-3 ${
          enabled
            ? 'border-sky-300/45 bg-sky-300/12 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.22)]'
            : 'border-[#2a2a35] bg-[#06060B]/72 text-[#a1a1aa] hover:border-[#3a3a45] hover:text-[#fafafa]'
        }`}
      >
        <span aria-hidden="true">🌪️</span>
      </button>
    </>
  );
}
