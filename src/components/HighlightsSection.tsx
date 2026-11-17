import React from 'react';
import { Flame, Award, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const HighlightsSection: React.FC = () => {
  const highlights = [
    {
      icon: Flame,
      title: "Wood & Charcoal Dum Pukht",
      subtitle: "Slow Sealed Handi Cooking",
      description: "Our signature biryanis and gravies are sealed with wheat dough and slow-simmered over gentle embers for up to 12 hours.",
    },
    {
      icon: Sparkles,
      title: "Royal 160-Spice Alchemy",
      subtitle: "Secret Lucknowi Potli",
      description: "Hand-pounded mace, star anise, wild saffron, and dried rose petals blended fresh each sunrise by heritage culinary ustads.",
    },
    {
      icon: Award,
      title: "Contemporary Multi-Cuisine",
      subtitle: "Mughlai, Awadhi & Asian Wok",
      description: "From decadent galouti kebabs to high-heat Sichuan wok delicacies, crafted with culinary precision and farm-fresh ingredients.",
    },
    {
      icon: ShieldCheck,
      title: "Pristine Luxury Ambience",
      subtitle: "Uncompromising Quality",
      description: "Architectural jaali screens, polished marble floors, and attentive royal service designed to make every occasion extraordinary.",
    },
  ];

  return (
    <section id="experience" className="pt-10 sm:pt-14 pb-24 bg-stone-950 relative border-none">
      {/* Visual Bridge Divider directly connecting from 3D Scroll Hero */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500/20" />
        <div className="w-2 h-2 rounded-full bg-amber-400/90 shadow-sm shadow-amber-400/50" />
        <div className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Always immediately visible to ensure seamless zero-gap continuity */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>The Zaika Tradition</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight">
            Craftsmanship in Every Grain
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
            We honor centuries of Awadhi culinary wisdom while curating modern gastronomic delights for the discerning epicurean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={index}
                direction="up"
                delay={index * 80}
                className="h-full"
              >
                <div className="h-full group p-8 rounded-2xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-100 mb-1 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-amber-500 font-semibold mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
