import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { triggerOnce = true } = options;
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const check = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      // Trigger when element top is within 115% of screen height (pre-reveal before entering viewport)
      if (rect.top <= winH * 1.15 && rect.bottom >= -100) {
        setIsVisible(true);
        if (triggerOnce) {
          window.removeEventListener('scroll', check);
          window.removeEventListener('resize', check);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    // Check on mount
    check();

    // Listen to scroll and resize
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    // IntersectionObserver with early margin as primary/secondary driver
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (triggerOnce && observer) {
                observer.unobserve(el);
              }
            }
          }
        },
        { rootMargin: '150px 0px 150px 0px', threshold: 0 }
      );
      observer.observe(el);
    } catch {
      // Fallback already handled by scroll listener
    }

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      if (observer) observer.disconnect();
    };
  }, [triggerOnce]);

  return { ref: elementRef, isVisible };
}
