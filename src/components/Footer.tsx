import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Heart, Shield } from 'lucide-react';
import { BakeryLogo } from './BakeryLogo';
import { BAKERY_DISPLAY_PHONE, BAKERY_WHATSAPP_LINK } from '../utils/storage';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#120602] border-t border-[#d4af37]/35 text-[#fbf6ee] pt-12 sm:pt-14 pb-24 sm:pb-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-center">
          {/* Logo & Heart-touching Line */}
          <div className="md:col-span-5 text-center md:text-left">
            <BakeryLogo size="md" showBadge className="mb-3" />
            <p className="font-script text-xl text-[#fce293] mb-2">
              “Every slice baked with love, every flavor a cherished memory.”
            </p>
            <p className="text-xs text-[#a89582] font-light">
              100% fresh custom cakes, eggless recipes, and timely celebration deliveries.
            </p>
          </div>

          {/* Quick Contact & Direct WhatsApp */}
          <div className="md:col-span-4 text-center md:text-left space-y-2 text-xs">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>Direct Call: </span>
              <a href={`tel:${BAKERY_DISPLAY_PHONE.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-[#fce293]">
                {BAKERY_DISPLAY_PHONE}
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <MessageCircle className="w-4 h-4 text-[#25d366]" />
              <span>WhatsApp: </span>
              <a href={BAKERY_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-bold text-[#25d366] hover:underline">
                +91 {BAKERY_DISPLAY_PHONE}
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-[#a89582]">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span>Open Daily: 9:00 AM – 10:30 PM</span>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end gap-2.5">
            <a
              href={BAKERY_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#25d366] to-[#1ebe5d] text-[#120703] font-bold text-xs uppercase tracking-wider shadow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </a>

            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-[#8e7a68] hover:text-[#fce293] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Bakery Owner Portal</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-[#8e7a68] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Shree’s Bakery. Fresh Custom Cakes.</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-[#e11d48] fill-[#e11d48]" />
            <span>for your sweet celebrations</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
