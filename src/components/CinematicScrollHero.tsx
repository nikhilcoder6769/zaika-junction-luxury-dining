import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Sparkles, Utensils, ArrowRight } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';

interface CinematicScrollHeroProps {
  onOpenReservation: () => void;
}

export const CinematicScrollHero: React.FC<CinematicScrollHeroProps> = ({ onOpenReservation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);

  const totalFrames = restaurantConfig.totalFrames;

  // Preload frames in fast concurrent batches of 10
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = restaurantConfig.framePattern(index);
        img.onload = () => {
          if (!isMounted) return;
          images[index] = img;
          loaded++;
          setLoadedCount(loaded);
          if (loaded >= 8 && !isReady) {
            setIsReady(true);
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    async function preloadAll() {
      // 1. First priority batch: milestone frames for all 6 scenes + first 8 frames
      const priorityIndices = [0, 1, 2, 3, 4, 5, 6, 7, 14, 27, 41, 54, 72];
      const initialPromises = priorityIndices.map((idx) => loadFrame(idx));
      await Promise.all(initialPromises);
      if (isMounted) setIsReady(true);

      // 2. Load all remaining frames concurrently in batches of 10
      const remaining: number[] = [];
      for (let i = 0; i < totalFrames; i++) {
        if (!priorityIndices.includes(i)) remaining.push(i);
      }
      const batchSize = 10;
      for (let i = 0; i < remaining.length; i += batchSize) {
        if (!isMounted) break;
        const batch = remaining.slice(i, i + batchSize);
        await Promise.all(batch.map((idx) => loadFrame(idx)));
      }
    }

    imagesRef.current = images;
    preloadAll();

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  // Robust canvas drawing routine: continuous sub-frame liquid blending
  const drawFrameInterpolated = useCallback(
    (exactFrame: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const clampedExact = Math.max(0, Math.min(exactFrame, totalFrames - 1));
      const idxA = Math.floor(clampedExact);
      const idxB = Math.min(idxA + 1, totalFrames - 1);
      const blendFrac = clampedExact - idxA;

      // Helper to find closest available loaded image
      const getClosestLoaded = (targetIdx: number): HTMLImageElement | null => {
        const candidate = imagesRef.current[targetIdx];
        if (candidate?.complete && candidate.naturalWidth > 0) return candidate;
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = imagesRef.current[targetIdx - offset];
          if (prev?.complete && prev.naturalWidth > 0) return prev;
          const next = imagesRef.current[targetIdx + offset];
          if (next?.complete && next.naturalWidth > 0) return next;
        }
        return lastDrawnImgRef.current || imagesRef.current[0] || null;
      };

      const imgA = getClosestLoaded(idxA);
      const imgB = idxA === idxB ? null : getClosestLoaded(idxB);

      if (!imgA) return;
      lastDrawnImgRef.current = imgA;

      const { width: cWidth, height: cHeight } = canvas;
      const iWidth = imgA.naturalWidth || 1280;
      const iHeight = imgA.naturalHeight || 720;

      const scale = Math.max(cWidth / iWidth, cHeight / iHeight);
      const drawWidth = iWidth * scale;
      const drawHeight = iHeight * scale;
      const offsetX = (cWidth - drawWidth) / 2;
      const offsetY = (cHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, cWidth, cHeight);

      // Base frame at full opacity
      ctx.globalAlpha = 1.0;
      ctx.drawImage(imgA, offsetX, offsetY, drawWidth, drawHeight);

      // Sub-frame cross-fading: blends adjacent frames seamlessly like continuous 120fps video
      if (imgB && imgB !== imgA && blendFrac > 0.005) {
        ctx.globalAlpha = blendFrac;
        ctx.drawImage(imgB, offsetX, offsetY, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;
      }

      // Elegant cinematic vignette gradient overlay for high contrast luxury typography
      const gradient = ctx.createLinearGradient(0, 0, 0, cHeight);
      gradient.addColorStop(0, 'rgba(12, 10, 9, 0.50)');
      gradient.addColorStop(0.25, 'rgba(12, 10, 9, 0.20)');
      gradient.addColorStop(0.55, 'rgba(12, 10, 9, 0.25)');
      gradient.addColorStop(0.82, 'rgba(12, 10, 9, 0.45)');
      gradient.addColorStop(1, 'rgba(12, 10, 9, 0.85)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cWidth, cHeight);
    },
    [totalFrames]
  );

  // Handle window resizing and retina pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      drawFrameInterpolated(scrollProgress * (totalFrames - 1));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrameInterpolated, scrollProgress, totalFrames]);

  // Smooth scroll listener with responsive progress interpolation
  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      targetProgress = progress;
    };

    const updateFrame = () => {
      // Luxury damped spring-like physics
      const diff = targetProgress - currentProgress;
      // Adaptive lerp factor: 0.075 for silky deceleration, slightly higher if delta is huge
      const lerpFactor = Math.min(0.12, 0.075 + Math.abs(diff) * 0.08);
      currentProgress += diff * lerpFactor;

      const exactFrame = currentProgress * (totalFrames - 1);
      drawFrameInterpolated(exactFrame);
      setScrollProgress(currentProgress);

      // Determine active story scene beat continuously without dead zones
      const scene = restaurantConfig.storyBeats.findIndex(
        (b) => currentProgress >= b.startPct && currentProgress <= b.endPct
      );
      if (scene !== -1) {
        setCurrentSceneIdx(scene);
      } else if (currentProgress >= 0.83) {
        setCurrentSceneIdx(restaurantConfig.storyBeats.length - 1);
      }

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawFrameInterpolated, totalFrames]);

  // Jump to specific scene when clicking scene pills
  const jumpToScene = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const beat = restaurantConfig.storyBeats[index];
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScrollY = container.offsetTop + beat.startPct * totalScrollable + 10;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      id="story"
      className="relative w-full max-w-full h-[360vh] sm:h-[420vh] bg-stone-950"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full max-w-full overflow-hidden flex flex-col justify-between">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover max-w-full pointer-events-none"
        />

        {/* Top Spacer for Header */}
        <div className="relative z-10 pt-20 sm:pt-24 px-4 sm:px-12 flex justify-between items-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/70 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive 3D Journey</span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-stone-950/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-800 text-xs text-stone-300">
            <span>Scroll to Experience</span>
            <span className="font-mono text-amber-400 font-semibold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Center / Adaptive Story Beat Content Overlays with Continuous Liquid Cross-Dissolve */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full my-auto pointer-events-none h-72 sm:h-80 flex items-center justify-center">
          {restaurantConfig.storyBeats.map((beat, idx) => {
            // Compute smooth continuous bell curve for each beat
            const mid = (beat.startPct + beat.endPct) / 2;
            const half = (beat.endPct - beat.startPct) / 2;
            const normDist = (scrollProgress - mid) / half; // -1 at start of beat, 0 at center, +1 at end

            // If completely outside the visible transition window, don't render to keep 60/120fps GPU performance
            if (Math.abs(normDist) > 1.25) return null;

            // Hermite bell curve: full opacity in the core of the beat, dissolves smoothly on edges
            const rawWeight = Math.max(0, 1 - Math.pow(Math.abs(normDist), 2.2));
            const opacity = Math.min(1, Math.max(0, rawWeight * 1.4));
            // Subtle silky vertical drift: -18px when entering, 0px at center, +18px when exiting
            const translateY = -normDist * 18;

            return (
              <div
                key={beat.id}
                className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${
                  beat.align === 'center'
                    ? 'items-center text-center'
                    : beat.align === 'right'
                    ? 'items-end text-right'
                    : 'items-start text-left'
                }`}
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
                  willChange: 'opacity, transform',
                }}
              >
                <div
                  className={`w-full ${
                    beat.align === 'center'
                      ? 'max-w-2xl mx-auto'
                      : beat.align === 'right'
                      ? 'max-w-xl ml-auto'
                      : 'max-w-xl mr-auto'
                  }`}
                >
                  {/* Story Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-lg backdrop-blur-md ${
                      beat.align === 'center'
                        ? 'mx-auto'
                        : beat.align === 'right'
                        ? 'ml-auto'
                        : ''
                    }`}
                  >
                    <span>{beat.badge}</span>
                  </div>

                  {/* Dynamic Title */}
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-100 tracking-tight leading-[1.1] mb-4 drop-shadow-2xl">
                    {beat.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans drop-shadow-lg mb-6">
                    {beat.description}
                  </p>

                  {/* Final Scene Special Call-to-Actions (Active on Scene 6) */}
                  {idx === restaurantConfig.storyBeats.length - 1 && opacity > 0.35 && (
                    <div
                      className={`pointer-events-auto flex flex-col items-center gap-3 transition-opacity duration-300 ${
                        beat.align === 'center'
                          ? 'items-center'
                          : beat.align === 'right'
                          ? 'items-end'
                          : 'items-start'
                      }`}
                      style={{ opacity: Math.min(1, (opacity - 0.35) / 0.65) }}
                    >
                      <div className="flex flex-wrap items-center gap-4 justify-center">
                        <button
                          onClick={onOpenReservation}
                          className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Book Your Experience</span>
                          <ArrowRight className="w-4 h-4 text-stone-950" />
                        </button>

                        <a
                          href="#menu"
                          className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-stone-200 hover:text-white bg-stone-900/80 hover:bg-stone-800/90 border border-stone-700/80 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Utensils className="w-4 h-4 text-amber-400" />
                          <span>Explore Menu</span>
                        </a>
                      </div>

                      <a
                        href="#experience"
                        className="inline-flex items-center gap-1.5 text-[11px] text-amber-300/80 hover:text-amber-300 tracking-widest uppercase transition-colors pt-2"
                      >
                        <span>Explore Heritage & Craftsmanship</span>
                        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Navigation & Progress Bar */}
        <div className="relative z-10 pb-20 md:pb-8 px-4 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Scene Jumping Pills */}
          <div className="flex items-center gap-2 bg-stone-950/70 backdrop-blur-lg px-3 py-2 rounded-full border border-stone-800/80 shadow-xl">
            {restaurantConfig.storyBeats.map((beat, idx) => (
              <button
                key={beat.id}
                onClick={() => jumpToScene(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                  currentSceneIdx === idx
                    ? 'w-8 h-2.5 bg-amber-400 shadow-md shadow-amber-500/50'
                    : 'w-2.5 h-2.5 bg-stone-600 hover:bg-stone-400'
                }`}
                title={`Scene ${idx + 1}: ${beat.title}`}
                aria-label={`Jump to scene ${idx + 1}`}
              />
            ))}
          </div>

          {/* Current Frame Indicator / Scrub Info */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-[10px] uppercase tracking-widest text-stone-400">
                Current Scene
              </span>
              <span className="text-xs font-serif font-bold text-amber-300">
                0{currentSceneIdx + 1} / 0{restaurantConfig.storyBeats.length}
              </span>
            </div>

            {/* Scroll Down Cue */}
            <div className="flex items-center gap-1.5 text-xs text-stone-400 bg-stone-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-800">
              <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span className="hidden sm:inline">Scroll Down</span>
            </div>
          </div>
        </div>

        {/* Smooth Seamless Bottom Fade Blend to eliminate any harsh edge */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent pointer-events-none" />

        {/* Initial Loading Overlay (Fades out when initial frames ready) */}
        {!isReady && (
          <div className="absolute inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
            <div className="text-center">
              <p className="font-serif text-xl font-bold text-stone-200">Zaika Junction</p>
              <p className="text-xs text-stone-400 tracking-widest uppercase mt-1">
                Loading 3D Visual Experience ({Math.min(100, Math.round((loadedCount / 8) * 100))}%)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
