import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BAKERY_WHATSAPP_LINK } from '../utils/storage';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Direct instant redirect to WhatsApp with greeting message (no popovers or extra UI)
    window.open(BAKERY_WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
      <a
        href={BAKERY_WHATSAPP_LINK}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#25d366] to-[#1ebe5d] hover:brightness-110 text-[#120703] px-4 py-3.5 rounded-full shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_35px_rgba(37,211,102,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer font-bold text-xs"
        aria-label="Direct WhatsApp Contact"
      >
        <MessageCircle className="w-6 h-6 fill-[#120703]" />
        <span className="hidden sm:inline font-sans text-sm tracking-wide">
          Chat on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-300 border-2 border-[#1a0c06] rounded-full" />
      </a>
    </div>
  );
};
