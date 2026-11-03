import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ShoppingBag, Eye, X, ZoomIn, ArrowRight } from 'lucide-react';
import { LOGO_IMAGE_PATH } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';
import { getStoredSectionCakes, SectionCakeItem } from '../utils/storage';

interface FeaturedCreationProps {
  onOpenOrderModal: (specs?: {
    cakeType?: string;
    weightSize?: string;
    flavor?: string;
    budget?: string;
  }) => void;
}

export const FeaturedCreationSection: React.FC<FeaturedCreationProps> = ({
  onOpenOrderModal
}) => {
  const { isLight } = useTheme();
  const [selectedZoomImage, setSelectedZoomImage] = useState<{
    title: string;
    image: string;
    description: string;
    quote?: string;
    pricing: string;
  } | null>(null);

  const [featuredCakes, setFeaturedCakes] = useState<SectionCakeItem[]>(() =>
    getStoredSectionCakes().filter(c => c.section === 'featured')
  );

  useEffect(() => {
    const handleUpdate = () => {
      setFeaturedCakes(getStoredSectionCakes().filter(c => c.section === 'featured'));
    };
    window.addEventListener('shrees_cakes_updated', handleUpdate);
    return () => window.removeEventListener('shrees_cakes_updated', handleUpdate);
  }, []);

  const masterCake = featuredCakes.find(c => c.id === 'feat-master') || featuredCakes[0] || {
    id: 'feat-master',
    section: 'featured',
    title: "Fairytale Princess & Toy Train Tunnel Cake",
    tagline: "“Where fairytales meet childhood adventures—seeing a child's eyes light up is why we bake.”",
    description: "An extraordinary custom creation featuring a majestic fairytale princess doll with shimmering butterfly wings, hand-piped rosette floral gown, and a real tunnel arch allowing a miniature toy train to travel directly through the cake! Adorned with edible chocolate cobblestones, delicate azure butterflies, and lush woodland moss.",
    image: "/assets/aistudio/IMG-20260517-WA0016_d7ae7fea.jpg",
    price: "Custom Multi-Tier (From ₹500 / KG)",
    serves: "2 KG or 3 KG Multi-Tier",
    flavor: "Belgian Chocolate Truffle & Vanilla Berry Swirl"
  };

  const animalCakes = featuredCakes.filter(c => c.id !== masterCake.id);

  return (
    <section
      id="featured-creations"
      className={`py-14 sm:py-20 px-3 sm:px-6 lg:px-8 border-b transition-colors duration-300 relative overflow-hidden ${
        isLight
          ? 'bg-gradient-to-b from-[#faf5ee] via-[#f4ece0] to-[#faf5ee] border-[#d4af37]/30 text-[#261106]'
          : 'bg-gradient-to-b from-[#140703] via-[#1c0c05] to-[#140703] border-[#d4af37]/20 text-[#fbf6ee]'
      }`}
    >
      {/* Warm Ambient Lights */}
      <div
        className={`absolute top-1/3 left-1/4 w-[500px] h-[500px] blur-[130px] rounded-full pointer-events-none ${
          isLight ? 'bg-[#d4af37]/15' : 'bg-[#d4af37]/6'
        }`}
      />
      <div
        className={`absolute bottom-1/3 right-1/4 w-[450px] h-[450px] blur-[130px] rounded-full pointer-events-none ${
          isLight ? 'bg-[#800020]/8' : 'bg-[#5c1321]/10'
        }`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-3 shadow transition-colors ${
              isLight
                ? 'bg-[#eddcc8] border-[#d4af37]/50 text-[#855325]'
                : 'bg-[#2a1309] border-[#d4af37]/35 text-[#fce293]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>Master Baker’s Spotlight & Real Customer Creations</span>
          </div>

          <h2
            className={`text-3xl md:text-5xl font-serif-luxury font-bold mb-4 ${
              isLight ? 'text-[#261106]' : 'text-[#fbf6ee]'
            }`}
          >
            Turning Pure Imagination into <span className="text-gold-gradient italic">Edible Wonder</span>
          </h2>

          <p
            className={`font-script text-xl md:text-2xl mb-4 ${
              isLight ? 'text-[#a16207]' : 'text-[#fce293]'
            }`}
          >
            “Because a child’s milestone deserves a memory that stays in the heart forever.”
          </p>

          <p
            className={`text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed ${
              isLight ? 'text-[#604938]' : 'text-[#ded0be]'
            }`}
          >
            Every celebration has its own heartbeat. Discover our customer centerpiece featured with real moving toy tracks, fairy wings, and heartwarming animal kingdom designs.
          </p>
        </div>

        {/* Masterpiece Feature Frame: Fairytale Princess & Toy Train Tunnel Cake */}
        <div
          className={`border-2 sm:border-4 rounded-3xl p-4 sm:p-6 md:p-10 mb-10 sm:mb-16 relative group transition-all duration-300 ${
            isLight
              ? 'bg-[#fffdfa] border-[#d4af37] shadow-[0_20px_50px_rgba(180,140,80,0.2)]'
              : 'bg-[#1e0e07] border-[#d4af37]/70 shadow-[0_20px_55px_rgba(0,0,0,0.85)]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* The Picture Frame created according to the cake image without cutting */}
            <div className="lg:col-span-6 relative">
              <div
                className={`relative rounded-2xl overflow-hidden border-2 sm:border-4 shadow-2xl cursor-pointer group/img min-h-[260px] sm:min-h-[380px] max-h-[460px] sm:max-h-[520px] flex items-center justify-center p-2.5 sm:p-4 ${
                  isLight
                    ? 'border-[#e4ceb5] bg-[#fbf7f0] shadow-[inset_0_0_15px_rgba(0,0,0,0.1),0_15px_30px_rgba(180,140,80,0.25)]'
                    : 'border-[#3a190b] bg-[#120502] shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_15px_30px_rgba(0,0,0,0.7)]'
                }`}
                onClick={() => setSelectedZoomImage({
                  title: masterCake.title,
                  image: masterCake.image,
                  description: masterCake.description,
                  quote: masterCake.tagline,
                  pricing: masterCake.price
                })}
              >
                <img
                  src={masterCake.image}
                  alt={masterCake.title}
                  className="max-h-[480px] max-w-full w-auto h-auto object-contain drop-shadow-xl transition-transform duration-700 group-hover/img:scale-105"
                />

                {/* Floating Gold Badge */}
                <div className={`absolute top-4 left-4 border text-xs font-cinzel font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10 ${
                  isLight
                    ? 'bg-white/95 border-[#d4af37]/60 text-[#8a4e0c]'
                    : 'bg-[#140703]/90 border-[#d4af37] text-[#fce293]'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Real Customer Masterpiece</span>
                </div>

                {/* Click to Zoom indicator */}
                <div className={`absolute bottom-4 right-4 border text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1.5 transition-colors cursor-pointer z-10 ${
                  isLight
                    ? 'bg-white/95 hover:bg-[#d4af37] text-[#8a4e0c] hover:text-[#140703] border-[#d4af37]/50'
                    : 'bg-[#140703]/90 hover:bg-[#d4af37] text-[#fce293] hover:text-[#140703] border-[#d4af37]/40'
                }`}>
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Tap to Enlarge</span>
                </div>
              </div>
            </div>

            {/* Cake Details & Human Touch Notes */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 border ${
                    isLight
                      ? 'bg-[#eedbc4] text-[#855325] border-[#d4af37]/50'
                      : 'bg-[#321509] text-[#fce293] border-[#d4af37]/30'
                  }`}
                >
                  <span>Interactive Doll & Tunnel Architecture</span>
                </div>

                <h3
                  className={`text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold mb-2 leading-tight ${
                    isLight ? 'text-[#261106]' : 'text-white'
                  }`}
                >
                  {masterCake.title}
                </h3>

                <p
                  className={`font-script text-xl sm:text-2xl mb-4 ${
                    isLight ? 'text-[#a16207]' : 'text-[#fce293]'
                  }`}
                >
                  {masterCake.tagline}
                </p>

                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-6 font-light ${
                    isLight ? 'text-[#553b2b]' : 'text-[#ded0be]'
                  }`}
                >
                  {masterCake.description}
                </p>

                {/* Specifics Grid */}
                <div
                  className={`grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl border text-xs ${
                    isLight
                      ? 'bg-[#f8f1e7] border-[#e2cfbb]'
                      : 'bg-[#140602] border-white/5'
                  }`}
                >
                  <div>
                    <span
                      className={`block text-[10px] uppercase font-bold ${
                        isLight ? 'text-[#876a55]' : 'text-[#a89582]'
                      }`}
                    >
                      Recommended Size
                    </span>
                    <span
                      className={`font-bold ${
                        isLight ? 'text-[#9a5b18]' : 'text-[#fce293]'
                      }`}
                    >
                      {masterCake.serves || '2 KG or 3 KG Multi-Tier'}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`block text-[10px] uppercase font-bold ${
                        isLight ? 'text-[#876a55]' : 'text-[#a89582]'
                      }`}
                    >
                      Flavor Harmony
                    </span>
                    <span
                      className={`font-bold ${
                        isLight ? 'text-[#261106]' : 'text-white'
                      }`}
                    >
                      {masterCake.flavor || 'Chocolate Truffle & Vanilla Swirl'}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`block text-[10px] uppercase font-bold ${
                        isLight ? 'text-[#876a55]' : 'text-[#a89582]'
                      }`}
                    >
                      Special Highlights
                    </span>
                    <span
                      className={`font-bold ${
                        isLight ? 'text-[#261106]' : 'text-white'
                      }`}
                    >
                      Tunnel Archway, Train Track & Doll Wings
                    </span>
                  </div>
                  <div>
                    <span
                      className={`block text-[10px] uppercase font-bold ${
                        isLight ? 'text-[#876a55]' : 'text-[#a89582]'
                      }`}
                    >
                      Price Estimate
                    </span>
                    <span className="font-bold text-[#16a34a] dark:text-[#25d366]">
                      {masterCake.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Action Button: Opens Floating Modal Directly */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() =>
                    onOpenOrderModal({
                      cakeType: masterCake.title,
                      weightSize: '2 KG (₹1000 - Multi-Tier)',
                      flavor: masterCake.flavor,
                      budget: '₹1000'
                    })
                  }
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7d668] to-[#b88616] text-[#140703] font-cinzel font-extrabold text-xs uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Order This Wonderland Cake (Open Form)</span>
                </button>

                <button
                  onClick={() => setSelectedZoomImage({
                    title: masterCake.title,
                    image: masterCake.image,
                    description: masterCake.description,
                    quote: masterCake.tagline,
                    pricing: masterCake.price
                  })}
                  className={`px-5 py-3.5 rounded-full border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isLight
                      ? 'bg-[#edd9c2] hover:bg-[#e4cbaf] text-[#4d2a13] border-[#d4af37]/60'
                      : 'bg-[#261006] hover:bg-[#38180c] text-[#fce293] border-[#d4af37]/40'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Animal Kingdom Custom Cake Frames */}
        <div className="mt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3
              className={`text-2xl sm:text-3xl font-serif-luxury font-bold mb-2 ${
                isLight ? 'text-[#261106]' : 'text-white'
              }`}
            >
              Animal Kingdom & Safari <span className="text-gold-gradient italic">Birthday Cakes</span>
            </h3>
            <p
              className={`text-xs sm:text-sm font-light ${
                isLight ? 'text-[#604938]' : 'text-[#ded0be]'
              }`}
            >
              Adorable safari animals, friendly teddy bears, cuddly pandas, and sweet baby elephants created to bring endless giggles and smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {animalCakes.map((animal) => (
              <div
                key={animal.id}
                className={`group p-4 rounded-2xl border-4 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  isLight
                    ? 'bg-[#fffdf9] border-[#e7d5be] shadow-[0_12px_30px_rgba(180,140,80,0.15)] hover:border-[#d4af37]'
                    : 'bg-[#1c0c05] border-[#33160a] shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:border-[#d4af37]/80'
                }`}
              >
                {/* Cake Photo Frame created according to the cake image without cutting */}
                <div
                  className={`relative h-64 sm:h-72 rounded-xl overflow-hidden cursor-pointer border-2 shadow-inner mb-4 flex items-center justify-center p-2.5 transition-colors ${
                    isLight ? 'border-[#e0cfbb] bg-[#fbf7f0] group-hover:border-[#d4af37]' : 'border-[#100502] bg-[#120502] group-hover:border-[#d4af37]/70'
                  }`}
                  onClick={() =>
                    setSelectedZoomImage({
                      title: animal.title,
                      image: animal.image,
                      description: animal.description,
                      quote: animal.tagline,
                      pricing: animal.price
                    })
                  }
                >
                  <img
                    src={animal.image}
                    alt={animal.title}
                    className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Animal Tag */}
                  <div className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded border ${
                    isLight
                      ? 'bg-white/95 text-[#8a4e0c] border-[#d4af37]/50'
                      : 'bg-[#140703]/90 text-[#fce293] border-[#d4af37]/35'
                  }`}>
                    {animal.badge || 'Safari Animal'}
                  </div>

                  <div className={`absolute bottom-2.5 right-2.5 text-xs font-bold px-2.5 py-1 rounded-md border shadow ${
                    isLight
                      ? 'bg-white/95 text-[#8a4e0c] border-[#d4af37]/50'
                      : 'bg-[#140703]/90 text-[#fce293] border-[#d4af37]/40'
                  }`}>
                    {animal.price}
                  </div>

                  <div className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                    isLight ? 'bg-white/90 text-[#8a4e0c]' : 'bg-[#140703]/80 text-[#fce293]'
                  }`}>
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Plaque Text */}
                <div className="flex-1 flex flex-col justify-between text-center px-1">
                  <div>
                    <h4
                      className={`text-base font-serif-luxury font-bold mb-1 transition-colors ${
                        isLight
                          ? 'text-[#261106] group-hover:text-[#b45309]'
                          : 'text-[#fbf6ee] group-hover:text-[#fce293]'
                      }`}
                    >
                      {animal.title}
                    </h4>
                    <p
                      className={`font-script text-sm mb-2 leading-snug ${
                        isLight ? 'text-[#9a5b18]' : 'text-[#fce293]'
                      }`}
                    >
                      {animal.tagline}
                    </p>
                    <p
                      className={`text-[11px] line-clamp-2 leading-relaxed mb-4 ${
                        isLight ? 'text-[#6b5242]' : 'text-[#bda995]'
                      }`}
                    >
                      {animal.description}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      onOpenOrderModal({
                        cakeType: animal.title,
                        weightSize: '1 KG (₹500)',
                        flavor: animal.flavor,
                        budget: animal.price
                      })
                    }
                    className={`w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer ${
                      isLight
                        ? 'bg-[#eedcc8] hover:bg-[#d4af37] text-[#42220d] hover:text-[#140703] border-[#d4af37]/50'
                        : 'bg-[#261006] hover:bg-[#d4af37] text-[#fce293] hover:text-[#140703] border-[#d4af37]/40 hover:border-transparent'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Animal Cake</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Resolution Zoom Lightbox */}
      {selectedZoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedZoomImage(null)}
        >
          <div
            className={`relative max-w-xl w-full border-4 border-[#d4af37] rounded-3xl p-6 shadow-2xl text-center max-h-[92vh] overflow-y-auto ${
              isLight ? 'bg-[#fffdfa] text-[#241107]' : 'bg-[#1e0e07] text-[#fbf6ee]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedZoomImage(null)}
              className={`absolute top-4 right-4 p-2 rounded-full border cursor-pointer ${
                isLight
                  ? 'bg-[#eedcc8] text-[#3d1c0b] hover:bg-[#d4af37] border-[#d4af37]/50'
                  : 'bg-[#120602] text-[#fce293] hover:text-white border-[#d4af37]/40'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`min-h-[280px] max-h-[65vh] rounded-2xl overflow-hidden border mb-4 shadow flex items-center justify-center p-3 ${
              isLight ? 'border-[#d4af37]/50 bg-[#fbf7f0]' : 'border-[#d4af37]/40 bg-[#120502]'
            }`}>
              <img
                src={selectedZoomImage.image}
                alt={selectedZoomImage.title}
                className="max-h-[60vh] max-w-full w-auto h-auto object-contain drop-shadow-xl"
              />
            </div>

            <span className="text-xs font-bold text-[#b88616] dark:text-[#d4af37] uppercase tracking-wider block mb-1">
              {selectedZoomImage.pricing}
            </span>
            <h3 className={`text-2xl font-serif-luxury font-bold mb-2 ${
              isLight ? 'text-[#241107]' : 'text-white'
            }`}>
              {selectedZoomImage.title}
            </h3>
            <p className={`font-script text-xl mb-3 ${
              isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
            }`}>
              {selectedZoomImage.quote}
            </p>
            <p className={`text-xs leading-relaxed mb-6 font-light ${
              isLight ? 'text-[#5a341e]' : 'text-[#ded0be]'
            }`}>
              {selectedZoomImage.description}
            </p>

            <button
              onClick={() => {
                const item = selectedZoomImage;
                setSelectedZoomImage(null);
                onOpenOrderModal({
                  cakeType: item.title,
                  weightSize: '1 KG (₹500)',
                  budget: '₹500'
                });
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88616] text-[#140703] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Book This Cake Design (Open Form)</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
