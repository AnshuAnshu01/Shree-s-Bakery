import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Shield, ShoppingBag, Sun, Moon, Share2, Check } from 'lucide-react';
import { BakeryLogo } from './BakeryLogo';
import { BAKERY_DISPLAY_PHONE } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

export type NavPageId = 'home' | '3d-studio' | 'gallery' | 'menu' | 'specialities' | 'about';

interface NavbarProps {
  currentPage: NavPageId;
  onNavigate: (page: NavPageId) => void;
  onOpenOrderModal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenOrderModal,
  onOpenAdmin
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme, isLight, toggleTheme } = useTheme();

  const handleShare = async () => {
    const shareData = {
      title: "Shree's Bakery - Luxury 3D Custom Cake Studio",
      text: "Order fresh customized birthday, wedding & celebration cakes in 1/2 KG & 1 KG! Call/WhatsApp: 87086 61381",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User dismissed share dialog
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        // Fallback
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: NavPageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: '3d-studio', label: '3D Studio' },
    { id: 'gallery', label: 'Cakes' },
    { id: 'menu', label: 'Menu & Prices' },
    { id: 'specialities', label: 'Celebrations' },
    { id: 'about', label: 'Our Story' },
  ];

  const handleLinkClick = (pageId: NavPageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'header-scrolled bg-[#faf5ee]/95 backdrop-blur-md border-b border-[#d4af37]/35 shadow-xl py-2'
            : 'header-scrolled bg-[#140703]/95 backdrop-blur-md border-b border-[#d4af37]/30 shadow-2xl py-2'
          : 'header-transparent bg-gradient-to-b from-black/60 via-black/20 to-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Official Emblem Image */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <BakeryLogo 
            size={scrolled ? 'sm' : 'md'} 
            showText 
            textColor={scrolled && isLight ? 'text-[#241107]' : 'text-white'}
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs font-bold tracking-wider uppercase transition-all relative py-1.5 cursor-pointer ${
                  isActive
                    ? scrolled && isLight
                      ? 'text-[#8a4f0d]'
                      : 'text-[#fce293]'
                    : scrolled && isLight
                    ? 'text-[#542d17] hover:text-[#8a4f0d]'
                    : 'text-white/95 hover:text-[#fce293] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                }`}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4af37] via-[#fce293] to-[#c59129] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37]/60 transition-all duration-200 group-hover:w-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Light / Brown Theme Change Toggle Icon */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm ${
              scrolled
                ? isLight
                  ? 'bg-white hover:bg-[#f6ede2] text-[#8a4f0d] border-[#d4af37]/50 shadow-md ring-1 ring-[#d4af37]/30'
                  : 'bg-[#241006] hover:bg-[#38180c] text-[#fce293] border-[#d4af37]/40'
                : 'bg-black/35 hover:bg-black/55 text-[#fce293] border-white/25 backdrop-blur-sm shadow-md'
            }`}
            title={isLight ? 'Switch to Chocolate Brown Theme' : 'Switch to Vanilla Cream Light Theme'}
            aria-label="Toggle Theme"
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-[#fce293] sm:text-inherit transition-transform duration-200 transform rotate-12" />
            ) : (
              <Sun className="w-4 h-4 text-[#fce293] transition-transform duration-200 transform hover:rotate-45" />
            )}
          </button>

          {/* Direct Call Button */}
          <a
            href={`tel:${BAKERY_DISPLAY_PHONE.replace(/\s+/g, '')}`}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all shadow-sm ${
              scrolled
                ? isLight
                  ? 'bg-white hover:bg-[#f8ede0] text-[#542d17] border border-[#d4af37]/40'
                  : 'bg-[#261006] hover:bg-[#3a180b] text-[#fce293] border border-[#d4af37]/35'
                : 'bg-black/35 hover:bg-black/55 text-white border border-white/25 backdrop-blur-sm shadow-md'
            }`}
            title="Call Bakery Directly"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{BAKERY_DISPLAY_PHONE}</span>
          </a>

          {/* Order Cake Floating Form Trigger (Never redirects away, opens modal) */}
          <button
            onClick={onOpenOrderModal}
            className="flex items-center gap-1.5 text-xs font-bold text-[#140703] bg-gradient-to-r from-[#d4af37] via-[#f7d668] to-[#b88616] hover:brightness-110 px-4 py-2 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Order Cake</span>
          </button>

          {/* Share Website Button */}
          <button
            onClick={handleShare}
            className={`p-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500'
                : scrolled
                ? isLight
                  ? 'bg-white hover:bg-[#f6ede2] text-[#8a4f0d] border-[#d4af37]/50 shadow-md ring-1 ring-[#d4af37]/30'
                  : 'bg-[#241006] hover:bg-[#38180c] text-[#fce293] border-[#d4af37]/40'
                : 'bg-black/35 hover:bg-black/55 text-[#fce293] border-white/25 backdrop-blur-sm shadow-md'
            }`}
            title={copied ? 'Link Copied!' : 'Share Shree’s Bakery Website'}
            aria-label="Share Website"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              scrolled
                ? isLight
                  ? 'bg-white text-[#633a20] border-[#d4af37]/40 hover:text-[#8a4f0d]'
                  : 'bg-[#261006] text-[#cbb8a5] border-[#d4af37]/30 hover:text-[#fce293]'
                : 'bg-black/35 text-white/80 hover:text-white border-white/25 backdrop-blur-sm'
            }`}
            title="Bakery Owner Admin"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border ${
              scrolled
                ? isLight
                  ? 'bg-white text-[#8a4f0d] border-[#d4af37]/40'
                  : 'bg-[#241006] text-[#fce293] border-[#d4af37]/40'
                : 'bg-black/35 text-[#fce293] border-white/25 backdrop-blur-sm'
            }`}
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon className="w-4 h-4 text-[#fce293]" /> : <Sun className="w-4 h-4 text-[#fce293]" />}
          </button>

          <button
            onClick={onOpenOrderModal}
            className="px-3 py-1.5 bg-[#d4af37] text-[#140703] rounded-full text-xs font-bold flex items-center gap-1 shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${scrolled ? (isLight ? 'text-[#3c1d0c]' : 'text-[#fce293]') : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'}`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200 ${
            isLight
              ? 'bg-[#faf5ee] border-[#d4af37]/40 text-[#241107]'
              : 'bg-[#160703] border-[#d4af37]/30 text-[#fbf6ee]'
          }`}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-sm font-bold tracking-wider uppercase py-2 border-b border-black/5 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? isLight ? 'text-[#8a4f0d]' : 'text-[#fce293]'
                      : isLight ? 'text-[#542d17]' : 'text-[#ded0be]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                  )}
                </button>
              );
            })}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88616] text-[#140703] font-bold text-xs uppercase tracking-wider shadow cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Cake (Open Form)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border text-xs font-bold ${
                    isLight
                      ? 'bg-white text-[#542d17] border-[#d4af37]/40'
                      : 'bg-[#261006] text-[#fce293] border-[#d4af37]/40'
                  }`}
                >
                  {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#fce293]" />}
                  <span>{isLight ? 'Switch to Brown Theme' : 'Switch to Light Theme'}</span>
                </button>
              </div>

              <button
                onClick={handleShare}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full border text-xs font-bold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : isLight
                    ? 'bg-white text-[#542d17] border-[#d4af37]/40 shadow-sm'
                    : 'bg-[#261006] text-[#fce293] border-[#d4af37]/40 shadow-sm'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4 text-[#d4af37]" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Share Website Link'}</span>
              </button>

              <a
                href={`tel:${BAKERY_DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full border text-xs font-bold ${
                  isLight
                    ? 'bg-white text-[#542d17] border-[#d4af37]/40'
                    : 'bg-[#261006] text-[#fce293] border-[#d4af37]/40'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Call: {BAKERY_DISPLAY_PHONE}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-full border text-[11px] cursor-pointer ${
                  isLight
                    ? 'bg-white text-[#6b4226] border-[#d4af37]/40 shadow-sm'
                    : 'bg-[#1b0a04] text-[#a89582] border-white/10'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Owner Dashboard Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
