import React from 'react';
import { UtensilsCrossed, ArrowUp, Heart } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-none py-16 pb-28 md:pb-16 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-stone-800/60">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-amber-500/40 bg-stone-900 flex items-center justify-center text-amber-400">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-wider text-stone-100 uppercase">
                    {restaurantConfig.name}
                  </span>
                  <span className="block text-[10px] tracking-[0.25em] text-amber-400/90 uppercase font-sans font-medium">
                    {restaurantConfig.tagline}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-400 max-w-md font-sans">
                {restaurantConfig.subtitle}. Authentic heritage flavours, artisanal craftsmanship, and luxury hospitality.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
              <a href="#story" className="hover:text-amber-300 transition-colors">Story</a>
              <a href="#specialties" className="hover:text-amber-300 transition-colors">Specialties</a>
              <a href="#menu" className="hover:text-amber-300 transition-colors">Digital Menu</a>
              <a href="#experience" className="hover:text-amber-300 transition-colors">Heritage</a>
              <a href="#reviews" className="hover:text-amber-300 transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-amber-300 transition-colors">Location</a>
            </div>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-400/60 text-stone-300 hover:text-amber-400 flex items-center justify-center transition-all hover:-translate-y-1 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* Copyright */}
        <ScrollReveal direction="up" delay={100}>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>
              © {new Date().getFullYear()} {restaurantConfig.name}. All Rights Reserved. Crafted with{' '}
              <Heart className="w-3.5 h-3.5 inline text-amber-500 fill-amber-500" /> for culinary excellence.
            </p>
            <p className="flex items-center gap-4">
              <span>Lucknow, Uttar Pradesh</span>
              <span>•</span>
              <span>Halal Certified</span>
              <span>•</span>
              <span>100% Pure Ghee & Farm Fresh</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
