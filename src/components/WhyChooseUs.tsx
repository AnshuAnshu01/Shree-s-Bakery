import React from 'react';
import { Award, Clock, HeartHandshake, ShieldCheck, Sparkles, Truck, CheckCircle2 } from 'lucide-react';
import { BAKERY_DISPLAY_PHONE, BAKERY_WHATSAPP_LINK } from '../utils/storage';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: '100% Freshly Baked to Order',
      description: 'We never serve refrigerated days-old cakes. Every sponge is whipped and baked specifically for your celebration hours before delivery.'
    },
    {
      icon: ShieldCheck,
      title: 'Pure & Premium Ingredients',
      description: 'Imported Belgian cocoa, rich dairy cream, and pure vanilla extract with zero chemical preservatives or artificial sweeteners.'
    },
    {
      icon: Sparkles,
      title: 'Expert Custom 3D & Theme Designs',
      description: 'From intricate princess gowns to military camouflage, fondant models, and edible portraits, we bring your exact dream into reality.'
    },
    {
      icon: Truck,
      title: 'Punctual & Temperature-Safe Delivery',
      description: 'Carefully packed in sturdy protective cake boxes and transported safely to ensure your cake arrives in pristine, chilled condition.'
    },
    {
      icon: HeartHandshake,
      title: 'Transparent & Affordable Pricing',
      description: '1 KG at ₹500, 1/2 KG at ₹300, gourmet pastries at ₹40, and cupcakes at ₹25 with no hidden surge fees.'
    },
    {
      icon: Clock,
      title: 'Midnight & Same-Day Delivery',
      description: 'Planning a surprise? We support scheduled midnight surprise deliveries and urgent same-day bookings via WhatsApp.'
    }
  ];

  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1f0d06] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#34180d] border border-[#d4af37]/30 text-[#fce293] text-xs font-semibold tracking-wider uppercase mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            The Shree’s Difference
          </div>
          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-[#fbf6ee] mb-4">
            Why Celebrations Choose <span className="text-gold-gradient">Shree’s Bakery</span>
          </h2>
          <p className="text-sm md:text-base text-[#d8c3ad] leading-relaxed">
            Every bite is a celebration of flavor, artistry, and heartwarming tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#2a1309]/80 border border-[#d4af37]/25 hover:border-[#d4af37] p-7 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3c1b0d] border border-[#d4af37]/40 text-[#fce293] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-[#190a04] transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-[#fbf6ee] mb-2 group-hover:text-[#fce293] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#c7b5a2] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quality Banner */}
        <div className="bg-gradient-to-r from-[#2c1308] via-[#3a1a0c] to-[#2c1308] border-2 border-[#d4af37]/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="hidden sm:flex w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] items-center justify-center text-[#fce293] shrink-0">
              <CheckCircle2 className="w-8 h-8 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif-luxury font-bold text-[#fbf6ee] mb-1">
                Have a unique design in mind or need quick assistance?
              </h3>
              <p className="text-xs sm:text-sm text-[#ded0be]">
                Call our master baker directly or share your design on WhatsApp for instant confirmation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${BAKERY_DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="px-5 py-3 rounded-xl bg-[#1d0b04] hover:bg-[#2b1207] text-[#fce293] border border-[#d4af37]/40 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Call: {BAKERY_DISPLAY_PHONE}
            </a>

            <a
              href={BAKERY_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#25d366] to-[#1ebe5d] text-[#190a04] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
