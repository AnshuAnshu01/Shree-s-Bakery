import React from 'react';
import { Home, Cake, ShoppingBag, Rotate3d, MessageCircle } from 'lucide-react';
import { NavPageId } from './Navbar';
import { useTheme } from '../context/ThemeContext';
import { BAKERY_WHATSAPP_LINK } from '../utils/storage';

interface MobileBottomNavProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId) => void;
  onOpenOrderModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenOrderModal
}) => {
  const { isLight } = useTheme();

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(BAKERY_WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t backdrop-blur-xl transition-all duration-300 pb-[env(safe-area-inset-bottom,0px)] ${
        isLight
          ? 'bg-[#faf5ee]/96 border-[#d4af37]/40 shadow-[0_-4px_25px_rgba(80,40,15,0.12)]'
          : 'bg-[#140703]/96 border-[#d4af37]/35 shadow-[0_-8px_30px_rgba(0,0,0,0.85)]'
      }`}
      aria-label="Quick smartphone navigation"
    >
      <div className="flex items-center justify-around px-2 py-1 h-15">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 cursor-pointer ${
            currentPage === 'home'
              ? isLight
                ? 'text-[#8a4f0d]'
                : 'text-[#fce293]'
              : isLight
              ? 'text-[#7d563d] opacity-75'
              : 'text-[#a89582] opacity-80'
          }`}
          aria-label="Navigate to Home"
        >
          <div className="relative">
            <Home className="w-5 h-5 stroke-[2.2]" />
            {currentPage === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1">Home</span>
        </button>

        {/* Cakes / Gallery */}
        <button
          onClick={() => onNavigate('gallery')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 cursor-pointer ${
            currentPage === 'gallery'
              ? isLight
                ? 'text-[#8a4f0d]'
                : 'text-[#fce293]'
              : isLight
              ? 'text-[#7d563d] opacity-75'
              : 'text-[#a89582] opacity-80'
          }`}
          aria-label="View Cake Collection"
        >
          <div className="relative">
            <Cake className="w-5 h-5 stroke-[2.2]" />
            {currentPage === 'gallery' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1">Cakes</span>
        </button>

        {/* Prominent Center "Order" Floating Button */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-5">
          <button
            onClick={onOpenOrderModal}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#fce293] to-[#b88616] text-[#140703] shadow-[0_6px_20px_rgba(212,175,55,0.65)] flex items-center justify-center active:scale-90 transition-all border-2 border-[#140703] cursor-pointer"
            aria-label="Open Order Form"
          >
            <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
          </button>
          <span
            className={`text-[10px] font-extrabold tracking-tight mt-0.5 ${
              isLight ? 'text-[#8a4f0d]' : 'text-[#fce293]'
            }`}
          >
            Order
          </span>
        </div>

        {/* 3D Studio */}
        <button
          onClick={() => onNavigate('3d-studio')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 cursor-pointer ${
            currentPage === '3d-studio'
              ? isLight
                ? 'text-[#8a4f0d]'
                : 'text-[#fce293]'
              : isLight
              ? 'text-[#7d563d] opacity-75'
              : 'text-[#a89582] opacity-80'
          }`}
          aria-label="Open 3D Cake Studio"
        >
          <div className="relative">
            <Rotate3d className="w-5 h-5 stroke-[2.2]" />
            {currentPage === '3d-studio' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1">3D Studio</span>
        </button>

        {/* WhatsApp Quick Link */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 cursor-pointer text-[#25d366]"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-[#25d366]/20 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-1">WhatsApp</span>
        </button>
      </div>
    </nav>
  );
};

