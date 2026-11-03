import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Gift, 
  Crown, 
  Users, 
  Sparkles, 
  ShoppingBag,
  Smile,
  GraduationCap,
  PartyPopper
} from 'lucide-react';
import { LOGO_IMAGE_PATH } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';
import { getStoredSectionCakes, SectionCakeItem } from '../utils/storage';

interface SpecialitiesProps {
  onSelectOccasion?: (occasion: string) => void;
  onOpenOrderModal?: () => void;
}

const getOccasionIcon = (badge?: string, idx = 0) => {
  const b = (badge || '').toLowerCase();
  if (b.includes('birth')) return Gift;
  if (b.includes('wedding')) return Crown;
  if (b.includes('anniversary')) return Heart;
  if (b.includes('romance') || b.includes('valen')) return Sparkles;
  if (b.includes('baby') || b.includes('shower')) return Smile;
  if (b.includes('kid') || b.includes('cartoon') || b.includes('superhero')) return PartyPopper;
  if (b.includes('success') || b.includes('grad') || b.includes('milestone')) return GraduationCap;
  if (b.includes('fest') || b.includes('family')) return Users;
  const ICONS = [Gift, Crown, Heart, Sparkles, Smile, PartyPopper, GraduationCap, Users];
  return ICONS[idx % ICONS.length];
};

export const Specialities: React.FC<SpecialitiesProps> = ({
  onSelectOccasion,
  onOpenOrderModal
}) => {
  const { isLight } = useTheme();
  const [occasions, setOccasions] = useState<SectionCakeItem[]>(() =>
    getStoredSectionCakes().filter(c => c.section === 'specialities')
  );

  useEffect(() => {
    const handleUpdate = () => {
      setOccasions(getStoredSectionCakes().filter(c => c.section === 'specialities'));
    };
    window.addEventListener('shrees_cakes_updated', handleUpdate);
    return () => window.removeEventListener('shrees_cakes_updated', handleUpdate);
  }, []);

  const handleSelect = (title: string) => {
    if (onSelectOccasion) onSelectOccasion(title);
    if (onOpenOrderModal) onOpenOrderModal();
  };

  return (
    <section id="specialities" className={`relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 lg:px-8 border-b transition-colors flex flex-col justify-between ${
      isLight ? 'bg-[#f6eee3] border-[#d4af37]/30 text-[#241107]' : 'bg-[#140703] border-[#d4af37]/20 text-[#fbf6ee]'
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

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-3 ${
            isLight
              ? 'bg-[#eedbc4] border-[#d4af37]/50 text-[#855325]'
              : 'bg-[#2a1309] border-[#d4af37]/35 text-[#fce293]'
          }`}>
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>Celebrations We Cherish (8 Special Milestones)</span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-serif-luxury font-bold mb-3 ${
            isLight ? 'text-[#241107]' : 'text-[#fbf6ee]'
          }`}>
            Baking for Life’s <span className="text-gold-gradient italic">Unforgettable Milestones</span>
          </h2>

          <p className={`font-script text-xl md:text-2xl mb-3 ${
            isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
          }`}>
            “Because every heartbeat of happiness deserves its own sweet anthem.”
          </p>

          <p className={`text-xs sm:text-sm max-w-xl mx-auto font-light ${
            isLight ? 'text-[#6b4226]' : 'text-[#ded0be]'
          }`}>
            Whether welcoming a newborn, celebrating birthdays, romance, golden milestones, or joyful family gatherings, each cake is baked with mother’s love.
          </p>
        </div>

        {/* 8 Celebrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {occasions.map((occ, idx) => {
            const Icon = getOccasionIcon(occ.badge, idx);
            return (
              <div
                key={occ.id}
                className={`group border rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  isLight
                    ? 'bg-[#fffdfa] border-[#e7d5be] shadow-[0_12px_30px_rgba(180,140,80,0.15)] hover:border-[#d4af37]'
                    : 'bg-[#200e07] border-[#d4af37]/30 hover:border-[#d4af37] shadow-xl'
                }`}
              >
                {/* Official Bakery Emblem Logo Frame instead of cake photo */}
                <div className={`relative h-56 sm:h-60 overflow-hidden flex flex-col items-center justify-center p-6 transition-colors border-b select-none ${
                  isLight ? 'bg-gradient-to-b from-[#fbf8f2] via-[#f7eee1] to-[#f0e3d2] border-[#e7d5be]' : 'bg-gradient-to-b from-[#1c0c05] via-[#140602] to-[#0e0401] border-[#381a0e]'
                }`}>
                  {/* Warm ambient gold glow behind logo */}
                  <div className="absolute w-28 h-28 rounded-full bg-[#d4af37]/20 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                  {/* Official Emblem Logo */}
                  <div className="relative z-10 p-1 rounded-full border-2 border-[#d4af37]/80 shadow-[0_8px_25px_rgba(212,175,55,0.35)] group-hover:border-[#fce293] group-hover:scale-105 transition-all duration-300 bg-[#140703]">
                    <img
                      src={LOGO_IMAGE_PATH}
                      alt="Shree's Bakery Official Logo"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full bg-[#140703]"
                      loading="lazy"
                    />
                  </div>

                  {/* Golden Badge Pill under Logo */}
                  <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d4af37]/60 bg-[#140703]/85 text-[#fce293] text-[11px] font-bold tracking-wider uppercase shadow-md backdrop-blur-sm">
                    <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{occ.badge || 'Celebration'}</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between text-center space-y-4">
                  <div>
                    <h3 className={`text-lg font-serif-luxury font-bold mb-1.5 transition-colors ${
                      isLight ? 'text-[#241107] group-hover:text-[#8a4e0c]' : 'text-white group-hover:text-[#fce293]'
                    }`}>
                      {occ.title}
                    </h3>
                    
                    {occ.tagline && (
                      <p className={`font-script text-sm mb-2 leading-snug ${
                        isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                      }`}>
                        {occ.tagline}
                      </p>
                    )}

                    <p className={`text-xs mb-3 font-light leading-relaxed ${
                      isLight ? 'text-[#604938]' : 'text-[#a89582]'
                    }`}>
                      {occ.description}
                    </p>

                    <div className="inline-block px-2.5 py-1 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 text-xs font-bold text-[#d4af37]">
                      {occ.price || 'From ₹500 / KG'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelect(occ.title)}
                    className={`w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow ${
                      isLight
                        ? 'bg-[#eedcc8] hover:bg-[#d4af37] text-[#3c1d0c] hover:text-[#140703] border-[#d4af37]/50'
                        : 'bg-[#140703] hover:bg-[#d4af37] text-[#fce293] hover:text-[#140703] border-[#d4af37]/40 hover:border-transparent'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order for {occ.title.replace('Celebrations', '').replace('Cakes', '').trim()}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
