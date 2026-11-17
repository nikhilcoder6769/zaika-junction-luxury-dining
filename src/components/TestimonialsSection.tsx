import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';
import { ScrollReveal } from './ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-stone-950 relative border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Guest Praise</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight">
              Loved by Connoisseurs
            </h2>
            <p className="mt-3 text-stone-400 text-sm sm:text-base font-sans">
              Hear from our honored patrons about their royal dining experiences at Zaika Junction.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {restaurantConfig.reviews.map((rev, index) => {
            const dir = index === 0 ? 'left' : index === 2 ? 'right' : 'up';
            return (
              <ScrollReveal
                key={rev.id}
                direction={dir}
                delay={index * 120}
                duration={800}
                className="h-full"
              >
              <div className="h-full p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">
                <div>
                  <Quote className="w-8 h-8 text-amber-500/40 mb-4" />
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80">
                  <p className="font-serif text-lg font-bold text-stone-100">
                    {rev.author}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {rev.role}
                  </p>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded bg-stone-950 text-[11px] text-amber-400/90 border border-stone-800">
                    Favorite: {rev.favoriteDish}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>
      </div>
    </section>
  );
};
