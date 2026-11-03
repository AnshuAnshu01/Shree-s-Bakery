import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const LOGO_IMAGE_PATH = '/assets/bakery-logo-square.png';

interface BakeryLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  showText?: boolean;
  className?: string;
  textColor?: string;
}

export const BakeryLogo: React.FC<BakeryLogoProps> = ({
  size = 'md',
  showBadge = false,
  showText = false,
  className = '',
  textColor,
}) => {
  const { isLight } = useTheme();

  const sizeMap = {
    sm: {
      imgSize: 'w-10 h-10',
      titleSize: 'text-lg',
      subSize: 'text-[9px] tracking-[0.2em]'
    },
    md: {
      imgSize: 'w-14 h-14 sm:w-16 sm:h-16',
      titleSize: 'text-2xl',
      subSize: 'text-[10px] tracking-[0.25em]'
    },
    lg: {
      imgSize: 'w-24 h-24 sm:w-28 sm:h-28',
      titleSize: 'text-3xl',
      subSize: 'text-xs tracking-[0.3em]'
    },
    xl: {
      imgSize: 'w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44',
      titleSize: 'text-4xl',
      subSize: 'text-sm tracking-[0.35em]'
    }
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Emblem Logo Image with Gold Glow Effect */}
      <div className="relative group shrink-0">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#d4af37]/50 via-[#fce293]/30 to-[#d4af37]/50 blur-sm opacity-80 group-hover:opacity-100 transition-opacity" />
        <img
          src={LOGO_IMAGE_PATH}
          alt="Shree's Bakery Official Logo"
          className={`${current.imgSize} object-cover rounded-full relative z-10 border border-[#d4af37]/70 shadow-lg drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter contrast-105 bg-[#140703]`}
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-serif-luxury font-bold ${textColor === 'text-white' ? 'logo-text-primary text-white' : (textColor || (isLight ? 'text-[#241107]' : 'text-white'))} ${current.titleSize} leading-none tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
            Shree’s <span className={textColor === 'text-white' ? 'logo-text-accent text-[#fce293]' : (textColor ? 'text-[#fce293]' : (isLight ? 'text-[#8a4e0c] font-black' : 'text-gold-gradient'))}>Bakery</span>
          </span>
          <span className={`font-cinzel ${textColor === 'text-white' ? 'logo-text-accent text-[#d4af37]' : (textColor ? 'text-[#d4af37]' : (isLight ? 'text-[#8a4e0c] font-bold' : 'text-[#d4af37]'))} ${current.subSize} uppercase font-semibold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]`}>
            Handcrafted With Love
          </span>
        </div>
      )}
    </div>
  );
};
