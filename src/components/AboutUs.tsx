import React from 'react';
import { Heart, Award, Sparkles, Home, ShoppingBag, CheckCircle } from 'lucide-react';
import { BakeryLogo, LOGO_IMAGE_PATH } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';

interface AboutUsProps {
  onOpenOrderModal?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  onOpenOrderModal
}) => {
  const { isLight } = useTheme();
  return (
    <section id="about" className={`relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 lg:px-8 border-b transition-colors flex flex-col justify-between ${
      isLight ? 'bg-[#f6eee3] border-[#d4af37]/30 text-[#241107]' : 'bg-[#180903] border-[#d4af37]/20 text-[#fbf6ee]'
    }`}>
      <div className="max-w-6xl mx-auto w-full my-auto">
        {/* Section Hero Header with Brand Logo */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#d4af37] via-[#fce293] to-[#996515] shadow-lg">
              <img
                src={LOGO_IMAGE_PATH}
                alt="Shree's Bakery"
                className="w-full h-full object-cover rounded-full bg-[#160703]"
              />
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-3 ${
            isLight
              ? 'bg-[#eedbc4] border-[#d4af37]/50 text-[#855325]'
              : 'bg-[#2a1309] border-[#d4af37]/35 text-[#fce293]'
          }`}>
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>Baked From The Heart • 4 Years Of Love</span>
          </div>

          <h2 className={`text-3xl md:text-5xl font-serif-luxury font-bold mb-3 ${
            isLight ? 'text-[#241107]' : 'text-[#fbf6ee]'
          }`}>
            Our Homemade Story at <span className="text-gold-gradient italic">Shree’s Bakery</span>
          </h2>

          <p className={`font-script text-xl md:text-2xl mb-3 ${
            isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
          }`}>
            “We don’t run a factory. We bake homemade happiness from our heart to your family table.”
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className={`rounded-3xl overflow-hidden border-2 shadow-2xl ${
              isLight ? 'border-[#d4af37]/60 bg-[#fffdfa]' : 'border-[#d4af37]/60 bg-[#100502]'
            }`}>
              <div className={`h-80 sm:h-96 w-full flex items-center justify-center p-3 ${
                isLight ? 'bg-[#fbf7f0]' : 'bg-[#120502]'
              }`}>
                <img
                  src="/assets/aistudio/IMG-20260201-WA0003_e4fb06e9.jpg"
                  alt="Shree's Bakery Homemade Kitchen & Cake Craft"
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-md"
                />
              </div>
              <div className={`p-6 text-center ${
                isLight ? 'bg-[#f7efe4] text-[#241107]' : 'bg-[#160703] text-white'
              }`}>
                <div className="flex justify-center mb-2">
                  <BakeryLogo size="md" showText />
                </div>
                <p className={`font-script text-base ${
                  isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                }`}>
                  4+ Years of Fresh Homemade Magic & Bespoke Cake Artistry
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className={`text-2xl sm:text-3xl font-serif-luxury font-bold mb-4 ${
              isLight ? 'text-[#241107]' : 'text-[#fbf6ee]'
            }`}>
              Fresh From Our Home Oven With 4 Years Of Devoted Experience
            </h3>

            <p className={`text-sm leading-relaxed mb-4 font-light ${
              isLight ? 'text-[#553b2b]' : 'text-[#ded0be]'
            }`}>
              Hi, welcome! <strong>Shree’s Bakery</strong> started 4 years ago right inside our home kitchen. What began with an everyday family oven, a hand whisk, and an unconditional passion for baking wholesome treats has blossomed into a cherished home bakery trusted by families across town.
            </p>

            <p className={`text-sm leading-relaxed mb-4 font-light ${
              isLight ? 'text-[#553b2b]' : 'text-[#ded0be]'
            }`}>
              Our golden rule has remained unchanged: <strong>100% Homemade, pure vegetarian / eggless cakes baked completely from scratch</strong>. We never touch industrial factory pre-mixes, preservatives, or pre-baked frozen sponge bases. When you place an order, we measure the flour, whip the fresh dairy cream, and melt pure Belgian cocoa specifically for your special day.
            </p>

            <p className={`text-sm leading-relaxed mb-6 font-light ${
              isLight ? 'text-[#553b2b]' : 'text-[#ded0be]'
            }`}>
              Over these 4 rewarding years, we have mastered the art of <strong>personalized customized cakes</strong>. Whether you’re dreaming of your little one’s favorite superhero or cartoon theme, an elegant tiered anniversary centerpiece, a romantic Valentine cake, or a unique photo-cake surprise — bring us your idea, and we will turn it into delicious, picture-perfect reality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-2xl border text-center ${
                isLight
                  ? 'bg-[#fffdfa] border-[#e7d5be] shadow-[0_4px_15px_rgba(180,140,80,0.1)]'
                  : 'bg-[#200e07] border-[#d4af37]/25'
              }`}>
                <Home className="w-5 h-5 text-[#d4af37] mx-auto mb-1.5" />
                <h4 className={`text-xs font-bold mb-1 ${
                  isLight ? 'text-[#241107]' : 'text-white'
                }`}>100% Homemade</h4>
                <p className={`text-[11px] ${
                  isLight ? 'text-[#604938]' : 'text-[#a89582]'
                }`}>Zero premixes • Pure eggless</p>
              </div>
              <div className={`p-4 rounded-2xl border text-center ${
                isLight
                  ? 'bg-[#fffdfa] border-[#e7d5be] shadow-[0_4px_15px_rgba(180,140,80,0.1)]'
                  : 'bg-[#200e07] border-[#d4af37]/25'
              }`}>
                <Award className="w-5 h-5 text-[#d4af37] mx-auto mb-1.5" />
                <h4 className={`text-xs font-bold mb-1 ${
                  isLight ? 'text-[#241107]' : 'text-white'
                }`}>4+ Years Experience</h4>
                <p className={`text-[11px] ${
                  isLight ? 'text-[#604938]' : 'text-[#a89582]'
                }`}>Hundreds of celebrations baked</p>
              </div>
              <div className={`p-4 rounded-2xl border text-center ${
                isLight
                  ? 'bg-[#fffdfa] border-[#e7d5be] shadow-[0_4px_15px_rgba(180,140,80,0.1)]'
                  : 'bg-[#200e07] border-[#d4af37]/25'
              }`}>
                <Sparkles className="w-5 h-5 text-[#d4af37] mx-auto mb-1.5" />
                <h4 className={`text-xs font-bold mb-1 ${
                  isLight ? 'text-[#241107]' : 'text-white'
                }`}>Customized Cakes</h4>
                <p className={`text-[11px] ${
                  isLight ? 'text-[#604938]' : 'text-[#a89582]'
                }`}>Themes, photos, tiers & messages</p>
              </div>
            </div>

            {/* Direct Open Form Trigger */}
            {onOpenOrderModal && (
              <button
                onClick={onOpenOrderModal}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88616] text-[#140703] font-cinzel font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Book Your Custom Homemade Cake</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
