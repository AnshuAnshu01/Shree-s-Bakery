import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-30 flex items-center gap-3">
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#241108]/90 hover:bg-[#d4af37] text-[#fce293] hover:text-[#190a04] border-2 border-[#d4af37] shadow-[0_6px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.6)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Heart-touching floating label on hover (desktop only) */}
      <div
        className={`hidden sm:flex bg-[#1c0c05]/95 border border-[#d4af37]/50 text-[#fbf6ee] text-xs px-3.5 py-1.5 rounded-full shadow-xl items-center gap-1.5 pointer-events-none transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
      >
        <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
        <span className="font-serif-luxury italic text-[#fce293]">
          Back to Top • Baked with Love
        </span>
      </div>
    </div>
  );
};
