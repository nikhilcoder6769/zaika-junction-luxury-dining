import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { restaurantConfig } from '../config/restaurant.config';

interface StickyMobileBarProps {
  onOpenReservation: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenReservation }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-stone-950/95 backdrop-blur-lg border-t border-stone-800/80 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
      {/* Call Button */}
      <a
        href={`tel:${restaurantConfig.phone}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-stone-900 border border-stone-700/80 text-stone-200 text-xs font-semibold"
      >
        <Phone className="w-3.5 h-3.5 text-amber-400" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${restaurantConfig.whatsapp.replace('+', '')}?text=${encodeURIComponent(
          restaurantConfig.whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold"
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
        <span>Order</span>
      </a>

      {/* Book Button */}
      <button
        onClick={onOpenReservation}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book</span>
      </button>
    </div>
  );
};
