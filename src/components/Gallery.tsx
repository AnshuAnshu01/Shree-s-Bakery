import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Eye, X, Sparkles } from 'lucide-react';
import { LOGO_IMAGE_PATH } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';
import { getStoredSectionCakes, SectionCakeItem } from '../utils/storage';

interface GalleryProps {
  onSelectForOrder?: (cakeName: string) => void;
  onOpenOrderModal?: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  onSelectForOrder,
  onOpenOrderModal
}) => {
  const { isLight } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryCakes, setGalleryCakes] = useState<SectionCakeItem[]>(() =>
    getStoredSectionCakes().filter(c => c.section === 'gallery')
  );

  useEffect(() => {
    const handleUpdate = () => {
      setGalleryCakes(getStoredSectionCakes().filter(c => c.section === 'gallery'));
    };
    window.addEventListener('shrees_cakes_updated', handleUpdate);
    return () => window.removeEventListener('shrees_cakes_updated', handleUpdate);
  }, []);

  const [selectedCake, setSelectedCake] = useState<SectionCakeItem | null>(null);

  const filtered = activeFilter === 'all'
    ? galleryCakes
    : galleryCakes.filter(f => f.category === activeFilter);

  const handleOrder = (cakeTitle: string) => {
    if (onSelectForOrder) {
      onSelectForOrder(cakeTitle);
    }
    // Directly opens floating modal without redirecting
    if (onOpenOrderModal) {
      onOpenOrderModal();
    }
  };

  return (
    <section id="gallery" className={`relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 lg:px-8 border-b transition-colors flex flex-col justify-between ${
      isLight ? 'bg-[#f6eee3] border-[#d4af37]/30 text-[#241107]' : 'bg-[#140703] border-[#d4af37]/20 text-[#fbf6ee]'
    }`}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Hero Header with Brand Logo */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-3">
            <img
              src={LOGO_IMAGE_PATH}
              alt="Shree's Bakery"
              className="w-16 h-16 object-cover rounded-full border border-[#d4af37]/50 shadow-lg bg-[#140703]"
            />
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-3 ${
            isLight
              ? 'bg-[#eedbc4] border-[#d4af37]/50 text-[#855325]'
              : 'bg-[#2a1309] border-[#d4af37]/35 text-[#fce293]'
          }`}>
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>Handcrafted Homemade Cakes</span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-serif-luxury font-bold mb-3 ${
            isLight ? 'text-[#241107]' : 'text-[#fbf6ee]'
          }`}>
            Our Signature <span className="text-gold-gradient italic">Cake Collection</span>
          </h2>

          <p className={`font-script text-xl md:text-2xl mb-3 ${
            isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
          }`}>
            “A celebration without cake is just a gathering; with cake, it’s a lifelong memory.”
          </p>

          <p className={`text-xs sm:text-sm max-w-xl mx-auto font-light ${
            isLight ? 'text-[#6b4226]' : 'text-[#ded0be]'
          }`}>
            Explore our real custom cakes freshly baked in our home kitchen. Tap any cake to view its details or book it instantly for your celebration.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: `All Cakes (${galleryCakes.length})` },
            { id: 'celebrations', label: 'Birthday & Milestones' },
            { id: 'romance', label: 'Love & Anniversaries' },
            { id: 'kids', label: 'Kids & Themes' },
            { id: 'classics', label: 'Chocolate Classics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#d4af37] text-[#140703] shadow-md font-bold'
                  : isLight
                  ? 'bg-white text-[#542d17] hover:text-[#8a4e0c] border border-[#d4af37]/40 shadow-sm'
                  : 'bg-[#200e07] text-[#cbb8a5] hover:text-white border border-[#d4af37]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cakes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`group relative p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                isLight
                  ? 'bg-[#fffdfa] border-[#e7d5be] shadow-[0_12px_30px_rgba(180,140,80,0.15)] hover:border-[#d4af37]'
                  : 'bg-[#1c0c05] border-[#33160a] shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:border-[#d4af37]/80'
              }`}
            >
              {/* Cake Photo Frame - Perfectly framed without cutting */}
              <div
                className={`relative h-64 sm:h-80 rounded-2xl overflow-hidden cursor-pointer border-2 shadow-inner mb-4 flex items-center justify-center p-2.5 transition-colors ${
                  isLight
                    ? 'border-[#e7d5be] bg-[#fbf7f0] shadow-[inset_0_2px_10px_rgba(180,140,80,0.1)] group-hover:border-[#d4af37]'
                    : 'border-[#381a0e] bg-[#120502] shadow-[inset_0_2px_15px_rgba(0,0,0,0.85)] group-hover:border-[#d4af37]/70'
                }`}
                onClick={() => setSelectedCake(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div className={`absolute bottom-2.5 right-2.5 text-xs font-bold px-2.5 py-1 rounded-md border shadow z-10 ${
                  isLight
                    ? 'bg-white/95 text-[#8a4e0c] border-[#d4af37]/50'
                    : 'bg-[#140703]/90 text-[#fce293] border-[#d4af37]/40'
                }`}>
                  {item.price}
                </div>

                <div className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10 ${
                  isLight ? 'bg-white/90 text-[#8a4e0c]' : 'bg-[#140703]/80 text-[#fce293]'
                }`}>
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Plaque Text */}
              <div className="flex-1 flex flex-col justify-between text-center px-1">
                <div>
                  <h3 className={`text-base font-serif-luxury font-bold mb-1.5 transition-colors ${
                    isLight
                      ? 'text-[#241107] group-hover:text-[#8a4e0c]'
                      : 'text-[#fbf6ee] group-hover:text-[#fce293]'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`font-script text-sm mb-2 leading-snug ${
                    isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                  }`}>
                    {item.tagline}
                  </p>
                  <p className={`text-[11px] line-clamp-2 leading-relaxed mb-4 ${
                    isLight ? 'text-[#604938]' : 'text-[#bda995]'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => handleOrder(item.title)}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer ${
                    isLight
                      ? 'bg-[#eedcc8] hover:bg-[#d4af37] text-[#3c1d0c] hover:text-[#140703] border-[#d4af37]/50'
                      : 'bg-[#261006] hover:bg-[#d4af37] text-[#fce293] hover:text-[#140703] border-[#d4af37]/40 hover:border-transparent'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Book This Cake (Open Form)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cake Detail Modal */}
      {selectedCake && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCake(null)}
        >
          <div
            className={`relative max-w-lg w-full border-4 border-[#d4af37] rounded-3xl p-6 shadow-2xl text-center ${
              isLight ? 'bg-[#fffdfa] text-[#241107]' : 'bg-[#1e0e07] text-[#fbf6ee]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCake(null)}
              className={`absolute top-4 right-4 p-2 rounded-full border cursor-pointer ${
                isLight
                  ? 'bg-[#eedcc8] text-[#3d1c0b] hover:bg-[#d4af37] border-[#d4af37]/50'
                  : 'bg-[#120602] text-[#fce293] hover:text-white border-[#d4af37]/40'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`min-h-[280px] max-h-[60vh] rounded-2xl overflow-hidden border mb-4 shadow flex items-center justify-center p-3 ${
              isLight ? 'border-[#d4af37]/50 bg-[#fbf7f0]' : 'border-[#d4af37]/40 bg-[#120502]'
            }`}>
              <img
                src={selectedCake.image}
                alt={selectedCake.title}
                className="max-h-[55vh] max-w-full w-auto h-auto object-contain drop-shadow-lg"
              />
            </div>

            <span className="text-xs font-bold text-[#b88616] dark:text-[#d4af37] uppercase tracking-wider block mb-1">
              {selectedCake.price}
            </span>
            <h3 className={`text-2xl font-serif-luxury font-bold mb-1 ${
              isLight ? 'text-[#241107]' : 'text-[#fbf6ee]'
            }`}>
              {selectedCake.title}
            </h3>
            <p className={`font-script text-xl mb-3 ${
              isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
            }`}>
              {selectedCake.tagline}
            </p>
            <p className={`text-xs leading-relaxed mb-6 font-light ${
              isLight ? 'text-[#5a341e]' : 'text-[#ded0be]'
            }`}>
              {selectedCake.description}
            </p>

            <button
              onClick={() => {
                const title = selectedCake.title;
                setSelectedCake(null);
                handleOrder(title);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b88616] text-[#140703] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Book This Cake (Open Form)</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
