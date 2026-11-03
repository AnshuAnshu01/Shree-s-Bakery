import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { LOGO_IMAGE_PATH } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';
import { getStoredSectionCakes, SectionCakeItem } from '../utils/storage';

interface MenuPricingProps {
  onSelectProductForOrder?: (item: { cakeType: string; size: string; estimatedPrice: number }) => void;
  onOpenOrderModal?: () => void;
}

export const MenuPricing: React.FC<MenuPricingProps> = ({
  onSelectProductForOrder,
  onOpenOrderModal
}) => {
  const { isLight } = useTheme();
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

  const handleBook = (item: SectionCakeItem) => {
    // Extract numeric price from text like ₹500 or 500
    const match = item.price.match(/\d+/);
    const numericPrice = match ? parseInt(match[0], 10) : 500;

    if (onSelectProductForOrder) {
      onSelectProductForOrder({
        cakeType: item.title,
        size: item.title,
        estimatedPrice: numericPrice
      });
    }

    // Opens floating modal without redirecting
    if (onOpenOrderModal) {
      onOpenOrderModal();
    }
  };

  return (
    <section id="menu" className={`relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 lg:px-8 border-b transition-colors flex flex-col justify-between ${isLight ? 'bg-[#f6eee3] border-[#d4af37]/30 text-[#241107]' : 'bg-[#180903] border-[#d4af37]/20 text-[#fbf6ee]'
      }`}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Hero Header with Brand Logo */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex justify-center mb-3">
            <img
              src={LOGO_IMAGE_PATH}
              alt="Shree's Bakery"
              className="w-16 h-16 object-cover rounded-full border border-[#d4af37]/50 shadow-lg bg-[#140703]"
            />
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-3 ${isLight
              ? 'bg-[#eedbc4] border-[#d4af37]/50 text-[#855325]'
              : 'bg-[#2a1309] border-[#d4af37]/35 text-[#fce293]'
            }`}>
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>Honest & Transparent Pricing</span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-serif-luxury font-bold mb-3 ${isLight ? 'text-[#241107]' : 'text-[#fbf6ee]'
            }`}>
            Sweet Prices for Life’s <span className="text-gold-gradient italic">Sweetest Celebrations</span>
          </h2>

          <p className={`font-script text-xl md:text-2xl mb-3 ${isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
            }`}>
            “No hidden fees, no compromises—just pure, honest ingredients baked to perfection.”
          </p>

          <p className={`text-xs sm:text-sm max-w-xl mx-auto font-light ${isLight ? 'text-[#6b4226]' : 'text-[#ded0be]'
            }`}>
            Every celebration deserves generous, heartwarming flavor. Pick your size below to open the booking form.
          </p>
        </div>

        {/* 4 Minimalist Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className={`border-2 rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between text-center relative group ${isLight
                  ? 'bg-[#fffdfa] border-[#e7d5be] shadow-[0_12px_30px_rgba(180,140,80,0.15)] hover:border-[#d4af37]'
                  : 'bg-[#241006] border-[#d4af37]/40 hover:border-[#d4af37] shadow-xl'
                }`}
            >
              <div className={`inline-block mx-auto border text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${isLight
                  ? 'bg-[#eedbc4] text-[#855325] border-[#d4af37]/50'
                  : 'bg-[#33160a] text-[#fce293] border-[#d4af37]/30'
                }`}>
                {item.badge}
              </div>

              {/* Cake Photo Frame created according to the cake image without cutting */}
              <div className={`h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 border flex items-center justify-center p-2.5 transition-colors ${
                isLight ? 'bg-[#fbf7f0] border-[#e7d5be]' : 'bg-[#120502] border-[#381a0e]'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div>
                <span className={`text-4xl font-serif-luxury font-bold block mb-1 ${isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                  }`}>
                  {item.price}
                </span>
                <h3 className={`text-lg font-bold mb-2 font-serif-luxury ${isLight ? 'text-[#241107]' : 'text-white'
                  }`}>
                  {item.title}
                </h3>
                <p className={`font-script text-sm mb-3 leading-snug ${isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                  }`}>
                  {item.tagline}
                </p>
                <p className={`text-xs mb-6 font-light ${isLight ? 'text-[#604938]' : 'text-[#a89582]'
                  }`}>
                  {item.description}
                </p>
              </div>

              <div className={`pt-4 border-t space-y-2 ${isLight ? 'border-[#e7d5be]' : 'border-white/5'
                }`}>
                <span className="text-[11px] text-[#16a34a] dark:text-[#25d366] font-semibold block">
                  ✓ 100% Freshly Baked on Order
                </span>
                <button
                  onClick={() => handleBook(item)}
                  className={`w-full py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer flex items-center justify-center gap-1.5 ${isLight
                      ? 'bg-[#eedcc8] hover:bg-[#d4af37] text-[#3c1d0c] hover:text-[#140703] border-[#d4af37]/50'
                      : 'bg-[#321509] hover:bg-[#d4af37] text-[#fce293] hover:text-[#140703] border-[#d4af37]/50 hover:border-transparent'
                    }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Book for {item.price}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
