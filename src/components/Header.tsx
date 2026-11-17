import React, { useState } from 'react';
import { UtensilsCrossed, Phone, Calendar, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';

interface HeaderProps {
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Specialties", href: "#specialties" },
    { label: "Menu", href: "#menu" },
    { label: "Experience", href: "#experience" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 shadow-lg shadow-black/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <a href="#" className="group flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-500/40 bg-stone-900/90 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-colors shadow-inner shrink-0">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-wider text-stone-100 uppercase group-hover:text-amber-300 transition-colors truncate">
                {restaurantConfig.name}
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] text-amber-400/90 uppercase font-sans font-medium truncate">
                {restaurantConfig.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-stone-300 hover:text-amber-300 transition-colors tracking-wide relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${restaurantConfig.phone}`}
              className="flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-amber-300 transition-colors px-3 py-2 rounded-full border border-stone-800 bg-stone-900/60"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{restaurantConfig.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenReservation}
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-stone-950" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Actions: Book CTA + Menu Toggle */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              onClick={onOpenReservation}
              className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-amber-400 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Cleanly positioned under header) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 bg-stone-950/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase pb-2 border-b border-stone-800">
              <Sparkles className="w-4 h-4" />
              <span>Royal Dining Experience</span>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="font-serif text-2xl text-stone-200 hover:text-amber-400 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 pb-20 border-t border-stone-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 rounded-xl font-bold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg text-center cursor-pointer active:scale-95 transition-all"
            >
              Reserve a Table
            </button>
            <a
              href={`tel:${restaurantConfig.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-stone-300 bg-stone-900 border border-stone-800 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: {restaurantConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
