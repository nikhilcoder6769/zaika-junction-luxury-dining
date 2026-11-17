import React from 'react';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';
import { ScrollReveal } from './ScrollReveal';

interface SpecialtiesSectionProps {
  onOpenReservation: () => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ onOpenReservation }) => {
  const handleWhatsAppOrder = (dishName: string, price: number) => {
    const text = encodeURIComponent(
      `Hello Zaika Junction! I would like to order the Chef's Signature dish: "${dishName}" (₹${price}).`
    );
    window.open(`https://wa.me/${restaurantConfig.whatsapp.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section id="specialties" className="py-24 bg-stone-950 relative border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Epicurean Selection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight">
                Chef's Signature Creations
              </h2>
              <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-xl font-sans">
                Rare recipes refined over generations, prepared with authentic clay pot techniques and seasonal spices.
              </p>
            </div>

            <button
              onClick={onOpenReservation}
              className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-400/25 active:scale-95 cursor-pointer"
            >
              <span>Reserve Table to Taste</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* 4 Specialty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {restaurantConfig.specialties.map((item, index) => {
            const dir = index % 2 === 0 ? 'left' : 'right';
            return (
              <ScrollReveal
                key={item.id}
                direction={dir}
                delay={(index % 2) * 120}
                duration={800}
                className="h-full"
              >
              <div className="h-full group rounded-3xl bg-stone-900/50 border border-stone-800/80 overflow-hidden hover:border-amber-500/50 transition-all duration-500 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">
                {/* Image Frame */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-bold tracking-wider uppercase shadow-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 bg-amber-400 text-stone-950 px-4 py-1.5 rounded-full font-bold text-sm shadow-xl flex items-center gap-1 group-hover:bg-amber-300 transition-colors">
                    <span>₹{item.price}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mt-1 mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-stone-300 text-sm leading-relaxed mb-6 font-sans">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-stone-800/80 text-stone-300 border border-stone-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleWhatsAppOrder(item.name, item.price)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group-hover:translate-x-1 duration-300"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Order via WhatsApp</span>
                    </button>

                    <button
                      onClick={onOpenReservation}
                      className="text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                    >
                      Dine-in Reservation →
                    </button>
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
