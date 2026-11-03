import React, { useRef, useEffect, useState } from 'react';
import { ShoppingBag, Rotate3d, Heart, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { BakeryLogo } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';
import { getStoredSectionCakes, SectionCakeItem } from '../utils/storage';

interface HeroProps {
  onOpenOrderModal: () => void;
  onNavigatePage: (pageId: '3d-studio' | 'gallery') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenOrderModal,
  onNavigatePage
}) => {
  const { isLight } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [menuItems, setMenuItems] = useState<SectionCakeItem[]>(() =>
    getStoredSectionCakes().filter(c => c.section === 'menu')
  );

  useEffect(() => {
    const handleUpdate = () => {
      setMenuItems(getStoredSectionCakes().filter(c => c.section === 'menu'));
    };
    window.addEventListener('shrees_cakes_updated', handleUpdate);
    return () => window.removeEventListener('shrees_cakes_updated', handleUpdate);
  }, []);

  const price1kg = menuItems.find(m => m.id === 'menu-1kg' || m.title.includes('1 KG'))?.price || '₹500';
  const priceHalfKg = menuItems.find(m => m.id === 'menu-half-kg' || m.title.includes('1/2 KG'))?.price || '₹300';
  const pricePastry = menuItems.find(m => m.id === 'menu-pastries' || m.title.includes('Pastr'))?.price || '₹40';
  const priceCupcake = menuItems.find(m => m.id === 'menu-cupcake' || m.title.includes('Cup'))?.price || '₹25';

  useEffect(() => {
    // Ensure video autoplays on mobile devices even with aggressive power savers
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('featured-creations');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Background Video (Fullscreen Hero only) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 scale-105 transition-all duration-700 ${
          isLight ? 'brightness-[1.02] contrast-[1.05]' : 'brightness-[0.95]'
        }`}
      >
        <source src="/bg%20(2).mp4" type="video/mp4" />
        <source src="/bg-hero.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Theme-Aware Overlay: Transparent Over Background Video */}
      <div
        className={`absolute inset-0 z-0 transition-all duration-500 pointer-events-none ${
          isLight
            ? 'bg-black/20'
            : 'bg-gradient-to-b from-[#140703]/85 via-[#140703]/60 to-[#140703]/95 backdrop-blur-[1px]'
        }`}
      />

      {/* Warm Ambient Glow Highlights */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] bg-[#d4af37]/15 rounded-full blur-[110px] pointer-events-none z-[1] ${isLight ? 'opacity-20' : 'opacity-100'}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#5c1321]/15 rounded-full blur-[120px] pointer-events-none z-[1] ${isLight ? 'opacity-20' : 'opacity-100'}`} />

      {/* Spacer to push content below fixed mobile header */}
      <div className="h-16 sm:h-20 shrink-0" />

      {/* Main Content Centered for Smartphone & Desktop - 100% Transparent Over Background Video */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center my-auto px-2">
        {/* Brand Logo with Glow */}
        <div className="mb-2 sm:mb-4 transform hover:scale-105 transition-transform duration-300 drop-shadow-md">
          <BakeryLogo size="md" className="sm:hidden" textColor="text-white" />
          <BakeryLogo size="xl" className="hidden sm:inline-flex" textColor="text-white" />
        </div>

        {/* Emotional Hook Badge */}
        <div className="hero-badge-text inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#d4af37]/70 bg-black/50 backdrop-blur-sm text-[11px] sm:text-xs font-semibold mb-2 sm:mb-3 shadow-md">
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e11d48] fill-[#e11d48]" />
          <span>Every celebration begins with a slice of happiness</span>
        </div>

        {/* Main Headline - Razor-sharp text with high-contrast cinematic drop shadows */}
        <h1 className="hero-title-text text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif-luxury font-extrabold leading-[1.15] mb-2 sm:mb-3 max-w-3xl">
          Where Beautiful Moments Turn into{' '}
          <span className="hero-gold-text italic">
            Delicious Memories
          </span>
        </h1>

        {/* Emotional Subtitle */}
        <p className="hero-sub-text font-script text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 tracking-wide font-bold">
          “Baked with a mother’s warmth, crafted with an artist’s soul.”
        </p>

        {/* Short Description (Optimized for Mobile Viewing) */}
        <p className="hero-desc-text text-[11px] sm:text-sm max-w-xl mx-auto mb-3 sm:mb-5 leading-relaxed font-medium">
          First birthdays, romantic vows, and midnight celebrations—freshly baked on order with 100% pure vegetarian recipes.
        </p>

        {/* Mobile-Optimized Transparent Pricing Pills */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 w-full max-w-md sm:max-w-lg mb-4 sm:mb-6">
          <div className="px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-[#d4af37]/45 bg-black/45 backdrop-blur-sm text-center shadow-lg">
            <span className="hero-pill-label block text-[9px] sm:text-[10px] uppercase font-bold truncate">1 KG</span>
            <span className="hero-pill-price text-sm sm:text-lg font-serif-luxury font-bold">{price1kg}</span>
          </div>

          <div className="px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-[#d4af37]/45 bg-black/45 backdrop-blur-sm text-center shadow-lg">
            <span className="hero-pill-label block text-[9px] sm:text-[10px] uppercase font-bold truncate">1/2 KG</span>
            <span className="hero-pill-price text-sm sm:text-lg font-serif-luxury font-bold">{priceHalfKg}</span>
          </div>

          <div className="px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-[#d4af37]/45 bg-black/45 backdrop-blur-sm text-center shadow-lg">
            <span className="hero-pill-label block text-[9px] sm:text-[10px] uppercase font-bold truncate">Pastry</span>
            <span className="hero-pill-price text-sm sm:text-lg font-serif-luxury font-bold">{pricePastry}</span>
          </div>

          <div className="px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-[#d4af37]/45 bg-black/45 backdrop-blur-sm text-center shadow-lg">
            <span className="hero-pill-label block text-[9px] sm:text-[10px] uppercase font-bold truncate">Cupcake</span>
            <span className="hero-pill-price text-sm sm:text-lg font-serif-luxury font-bold">{priceCupcake}</span>
          </div>
        </div>

        {/* Primary Action Buttons (Thumb-friendly on Smartphone) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md sm:max-w-none">
          {/* Order Cake button opens floating modal */}
          <button
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7d668] to-[#b88616] text-[#140703] font-cinzel font-extrabold text-xs sm:text-xs uppercase tracking-widest shadow-[0_6px_25px_rgba(212,175,55,0.5)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Order Your Cake (Open Form)</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            {/* Dedicated 3D Studio Page */}
            <button
              onClick={() => onNavigatePage('3d-studio')}
              className="hero-btn-secondary flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-[#d4af37]/60 bg-black/45 hover:bg-black/65 text-[#fce293] font-semibold text-[11px] sm:text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-sm active:scale-95 shadow-md"
            >
              <Rotate3d className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>3D Studio</span>
            </button>

            {/* Dedicated Cakes Gallery Page */}
            <button
              onClick={() => onNavigatePage('gallery')}
              className="hero-btn-secondary flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-[#d4af37]/60 bg-black/45 hover:bg-black/65 text-[#fce293] font-semibold text-[11px] sm:text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-sm active:scale-95 shadow-md"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Cakes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Smartphone-friendly Animated Scroll Prompt at Bottom of Fullscreen */}
      <div className="relative z-10 pb-3 sm:pb-5 flex flex-col items-center">
        <button
          onClick={handleScrollDown}
          className="hero-scroll-btn flex flex-col items-center gap-1 transition-transform duration-300 hover:translate-y-1 active:scale-95 cursor-pointer group drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          aria-label="Scroll down to explore creations"
        >
          <span className="text-[10px] uppercase font-cinzel tracking-widest opacity-90 group-hover:opacity-100 font-bold">
            Explore Creations
          </span>
          <div className="w-6 h-6 rounded-full border border-[#d4af37]/70 flex items-center justify-center animate-bounce shadow-md">
            <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
          </div>
        </button>
      </div>
    </section>
  );
};
