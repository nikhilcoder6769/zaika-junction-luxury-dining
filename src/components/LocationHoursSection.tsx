import React from 'react';
import { MapPin, Clock, Phone, Navigation, MessageCircle } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';
import { ScrollReveal } from './ScrollReveal';

interface LocationHoursSectionProps {
  onOpenReservation: () => void;
}

export const LocationHoursSection: React.FC<LocationHoursSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="contact" className="py-24 bg-stone-900/40 relative border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info Side */}
          <ScrollReveal direction="left" duration={800} delay={0}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Location & Hours</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight mb-6">
                Visit Zaika Junction
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 font-sans">
                Located in the heart of Civil Lines, Lucknow. Valet parking, private dining suites, and disabled-friendly access available.
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                      Address
                    </p>
                    <p className="text-stone-200 text-sm">
                      {restaurantConfig.address}
                    </p>
                    <p className="text-stone-400 text-xs mt-0.5">
                      {restaurantConfig.city}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                      Operating Hours
                    </p>
                    <p className="text-stone-200 text-sm">
                      {restaurantConfig.timings.days}
                    </p>
                    <p className="text-stone-400 text-xs mt-0.5">
                      Lunch: {restaurantConfig.timings.lunch} | Dinner: {restaurantConfig.timings.dinner}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                      Reservations & Takeaway
                    </p>
                    <a
                      href={`tel:${restaurantConfig.phone}`}
                      className="text-stone-200 text-sm hover:text-amber-300 transition-colors font-medium"
                    >
                      {restaurantConfig.phoneDisplay}
                    </a>
                    <p className="text-stone-400 text-xs mt-0.5">
                      {restaurantConfig.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenReservation}
                  className="px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all shadow-lg hover:shadow-amber-400/25 active:scale-95 cursor-pointer"
                >
                  Reserve a Table
                </button>

                <a
                  href={restaurantConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-stone-950 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-500/40 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Visual Showcase Card */}
          <ScrollReveal direction="right" duration={800} delay={150}>
            <div className="relative rounded-3xl bg-stone-950 border border-stone-800/80 p-8 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-amber-500/40 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-700" />

              <div className="relative z-10 mb-8">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  Private Dining & Events
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-2">
                  Celebrate Your Milestones
                </h3>
                <p className="text-stone-400 text-sm mt-3 leading-relaxed">
                  Whether an intimate family dinner, corporate banquet, or festive celebration, our dedicated culinary team tailors bespoke tasting menus.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4 py-4 border-t border-b border-stone-800/80 mb-8 text-center">
                <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 group-hover:border-amber-500/30 transition-colors">
                  <span className="block font-serif text-3xl font-bold text-amber-400">120+</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Seating Capacity</span>
                </div>
                <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 group-hover:border-amber-500/30 transition-colors">
                  <span className="block font-serif text-3xl font-bold text-amber-400">4.9★</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Google Rating</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${restaurantConfig.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                  "Hello Zaika Junction, I would like to inquire about booking a private event or family gathering."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Inquire for Events on WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
