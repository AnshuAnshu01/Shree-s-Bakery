import React, { useEffect, useState } from 'react';
import { BakeryLogo, LOGO_IMAGE_PATH } from './BakeryLogo';

interface PreloaderProps {
  onLoaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onLoaded, 500);
          }, 300);
          return 100;
        }
        const jump = Math.floor(Math.random() * 15) + 12;
        return Math.min(100, prev + jump);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#140703] transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Official Brand Logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-full bg-[#d4af37]/20 blur-md animate-pulse" />
          <img
            src={LOGO_IMAGE_PATH}
            alt="Shree's Bakery"
            className="w-28 h-28 object-cover rounded-full border border-[#d4af37]/60 relative z-10 drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)] bg-[#140703]"
          />
        </div>

        <p className="font-serif-luxury text-xl text-[#fbf6ee] mb-1 italic">
          Shree’s Bakery
        </p>
        <p className="font-script text-lg text-[#fce293] mb-4">
          “Baking Sweet Memories for You”
        </p>

        <p className="text-[11px] tracking-widest text-[#d4af37] uppercase font-cinzel font-semibold mb-3">
          Loading Fresh Flavors... {progress}%
        </p>

        {/* Progress Bar */}
        <div className="w-52 h-1.5 bg-[#2a1309] rounded-full overflow-hidden border border-[#d4af37]/30">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] via-[#fce293] to-[#c59129] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
