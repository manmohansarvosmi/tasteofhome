import React from 'react';
import aboutHeroSlide from '../assets/aboutheroslide.png';
import homeImg from '../assets/home.png';
import {
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Users,
  Package,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 sm:pb-16 font-sans">
      
      {/* Hero Image Banner */}
      <section className="w-full overflow-hidden border-b border-[#D4AF37]/40 shadow-xs">
        <img
          src={aboutHeroSlide}
          alt="About Taste of Home – Our Roots & Values"
          className="w-full h-auto object-cover block"
          draggable={false}
        />
      </section>

      {/* The Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#D4AF37] text-xs font-bold text-[#800020] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>हमारी कहानी • How We Started</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E2723] leading-tight">
              From Family Festivities to Households Across India
            </h2>
            
            <p className="text-sm sm:text-base text-[#5D4037] leading-relaxed font-medium">
              Every festival season in our Gwalior home, the aroma of stone-ground spices, roasting ajwain mathris, and fresh mawa gujiyas in pure cow desi ghee would fill the neighborhood. Neighbors, relatives, and traveling friends would request extra dabbas to carry back to Delhi, Mumbai, and Bengaluru.
            </p>

            <p className="text-sm sm:text-base text-[#5D4037] leading-relaxed font-medium">
              When we saw how market shelves were overflowing with palm-oil loaded namkeens, artificial chemical enhancers, and stale factory-packaged sweets, we asked a simple question:
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE] border-l-4 border-[#D4AF37] border-y border-r border-[#E5E0D5] italic text-sm text-[#3E2723] font-serif shadow-2xs leading-relaxed">
              “Why should families living far away from home have to compromise on pure, nostalgic taste?”
            </div>

            <p className="text-sm sm:text-base text-[#5D4037] leading-relaxed font-medium">
              That was the birth of <strong className="text-[#800020]">Taste of Home – Homemade Food</strong>. A promise that no matter where you live, you can experience the exact same pure, crunchy, and heartwarming flavors your family lovingly made for you.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[28px] overflow-hidden border-2 border-[#D4AF37]/60 shadow-soft bg-[#FAF6EE]">
              <img
                src={homeImg}
                alt="Taste of Home – Traditional Indian Kitchen & Sweets Crafting"
                className="w-full h-96 sm:h-[450px] object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/85 via-[#3E2723]/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white p-5 rounded-2xl bg-[#3E2723]/90 backdrop-blur-xs border border-[#D4AF37]/50 shadow-md">
                <div className="font-serif font-bold text-base sm:text-lg text-[#D4AF37]">
                  “Ghar ka swaad, premium packaging ke saath.”
                </div>
                <p className="text-xs text-[#FAF6EE] mt-1 font-medium">
                  Handcrafted with pure love in Gwalior, Madhya Pradesh.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Marketing Thought Divider Ribbon */}
      <div className="w-full bg-gradient-to-r from-[#3E2723] via-[#800020] to-[#3E2723] text-white text-center py-3 px-6 shadow-sm border-y border-[#D4AF37]/40 flex items-center justify-center gap-3">
        <span className="text-[#D4AF37] text-sm">🪔</span>
        <p className="font-serif text-xs sm:text-sm font-semibold tracking-wide text-[#FAF6EE]">
          “हर बाइट में माँ के हाथों का प्यार • शुद्धता और परंपरा का संगम”
        </p>
        <span className="text-[#D4AF37] text-sm">🪔</span>
      </div>

      {/* 4 Pillars of Excellence */}
      <section className="bg-[#FAF6EE] py-16 border-y border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/20 text-xs font-bold uppercase tracking-wider text-[#1B5E20]">
              <Sparkles className="w-3.5 h-3.5 text-[#1B5E20]" />
              <span>Our Craft & Commitment</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723]">
              What Sets Our Food Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-[28px] border border-[#D4AF37]/40 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Traditional Recipes
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed font-medium">
                No shortcuts. We follow exact generations-old spice ratios, sun-curing intervals, and slow-frying techniques to keep flavors 100% authentic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#D4AF37]/40 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1B5E20]/10 border border-[#1B5E20]/30 flex items-center justify-center text-[#1B5E20]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Quality Ingredients
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed font-medium">
                Zero cheap industrial palm oil. We use Pure Cow Desi Ghee, cold-pressed Kachi Ghani mustard oil, mineral-rich sendha namak, and natural spices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#D4AF37]/40 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#800020]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Hygienic Packaging
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed font-medium">
                All snacks are heat-sealed in multi-layer food-grade foil and jars immediately after cooling, sealing in maximum crispness and zero moisture.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#D4AF37]/40 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1B5E20]/10 border border-[#1B5E20]/30 flex items-center justify-center text-[#1B5E20]">
                <Heart className="w-6 h-6 fill-[#1B5E20]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Homemade Preparation
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed font-medium">
                Small, dedicated kitchen batches where each batch is tasted and inspected. We only send out delicacies that we are proud to serve our own children.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Customers Should Trust Us */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] rounded-[28px] p-8 sm:p-12 border border-[#D4AF37]/60 shadow-soft space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#800020]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Our Promise to You</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723]">
              Why Customers Trust Taste of Home
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#5D4037]">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E0D5] shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block text-xs sm:text-sm">FSSAI Certified Food Safety:</strong>
                <p className="text-xs font-medium text-[#5D4037] mt-0.5">Fully registered and compliant with national food safety standards (Lic. No. 21424010001892).</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E0D5] shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block text-xs sm:text-sm">Transparent Ingredients:</strong>
                <p className="text-xs font-medium text-[#5D4037] mt-0.5">No vague "permitted chemical preservatives" or artificial flavors. Everything listed is what you would find in your home pantry.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E0D5] shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block text-xs sm:text-sm">Small-Batch Freshness:</strong>
                <p className="text-xs font-medium text-[#5D4037] mt-0.5">We do not store inventory in warehouses for months. Most orders are dispatched within 24 to 48 hours of preparation.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E5E0D5] shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block text-xs sm:text-sm">Guaranteed Transit Safety:</strong>
                <p className="text-xs font-medium text-[#5D4037] mt-0.5">If any jar arrives broken or compromised during courier transit, we replace it instantly with zero questions asked.</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-[#800020] hover:bg-[#600018] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2 border border-[#D4AF37]/50"
            >
              <span>Explore Our Homemade Goodness</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
