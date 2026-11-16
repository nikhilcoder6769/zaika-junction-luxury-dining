import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, MessageCircle, UtensilsCrossed, X } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';
import { MenuItem, DietaryType } from '../types';
import { ScrollReveal } from './ScrollReveal';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDietary, setSelectedDietary] = useState<DietaryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return restaurantConfig.menuItems.filter((item: MenuItem) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Dietary match
      const dietaryMatch =
        selectedDietary === 'all' || item.dietary === selectedDietary;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && dietaryMatch && searchMatch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  const handleOrderWhatsApp = (item: MenuItem) => {
    const text = encodeURIComponent(
      `Hello Zaika Junction, I would like to order: "${item.name}" (₹${item.price}).`
    );
    window.open(`https://wa.me/${restaurantConfig.whatsapp.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section id="menu" className="py-24 bg-stone-900/30 relative border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Digital Dining Menu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 tracking-tight">
              Curated Culinary Offerings
            </h2>
            <p className="mt-3 text-stone-400 text-sm sm:text-base font-sans">
              Prepared fresh to order with hand-ground spices, aged basmati, and traditional charcoal tandoors.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Controls Bar */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-stone-950/80 border border-stone-800 rounded-3xl p-4 sm:p-6 mb-12 shadow-xl backdrop-blur-md">
            {/* Row 1: Search & Dietary Toggles */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-800/80">
              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search biryani, kebabs, noodles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-full bg-stone-900 border border-stone-700/80 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dietary Toggle Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto bg-stone-900/90 p-1 rounded-full border border-stone-800">
                <button
                  onClick={() => setSelectedDietary('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedDietary === 'all'
                      ? 'bg-amber-400 text-stone-950 shadow-md'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedDietary('veg')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedDietary === 'veg'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-emerald-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span>Pure Veg</span>
                </button>
                <button
                  onClick={() => setSelectedDietary('non-veg')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedDietary === 'non-veg'
                      ? 'bg-red-700 text-white shadow-md'
                      : 'text-stone-400 hover:text-red-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                  <span>Non-Veg</span>
                </button>
              </div>
            </div>

            {/* Row 2: Category Filter Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {restaurantConfig.menuCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-inner'
                      : 'bg-stone-900/70 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-950/40 rounded-3xl border border-stone-800/60">
            <p className="font-serif text-xl text-stone-300">No dishes match your selection</p>
            <p className="text-xs text-stone-500 mt-2">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredItems.map((item, index) => (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={(index % 4) * 80}
                className="h-full"
              >
                <div className="h-full group p-6 rounded-2xl bg-stone-950/70 border border-stone-800/70 hover:border-amber-500/40 transition-all duration-400 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2.5">
                        {/* Dietary Indian Badge Indicator */}
                        <span
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center p-0.5 ${
                            item.dietary === 'veg'
                              ? 'border-emerald-500'
                              : 'border-red-600'
                          }`}
                          title={item.dietary === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.dietary === 'veg' ? 'bg-emerald-500' : 'bg-red-600'
                            }`}
                          />
                        </span>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      {/* Price in INR */}
                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer with badges and WhatsApp CTA */}
                  <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.isChefSpecial && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <Sparkles className="w-3 h-3" />
                          <span>Chef's Choice</span>
                        </span>
                      )}
                      {item.spiceLevel && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-stone-400 px-2 py-0.5 rounded bg-stone-900 border border-stone-800">
                          <Flame className="w-3 h-3 text-red-400" />
                          <span>Spice {item.spiceLevel}/3</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleOrderWhatsApp(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
