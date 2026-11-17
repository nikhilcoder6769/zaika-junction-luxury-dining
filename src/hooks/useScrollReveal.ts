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

    let ticking = false;
    const check = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      // Trigger when element top enters the viewport so user clearly sees the animation happen
      if (rect.top <= winH * 0.92 && rect.bottom >= -100) {
        setIsVisible(true);
        if (triggerOnce) {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleScroll);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          check();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check on mount
    check();

    // Listen to scroll and resize with passive RAF throttling
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // IntersectionObserver with viewport margin so animation triggers as element scrolls in
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
        { rootMargin: '0px 0px -40px 0px', threshold: options.threshold ?? 0.08 }
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
