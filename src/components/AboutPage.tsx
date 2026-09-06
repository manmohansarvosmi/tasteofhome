import React from 'react';
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
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 font-sans">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#F5F1E9] py-16 sm:py-24 border-b border-[#E5E0D5] text-center">
        <div className="absolute inset-0 opacity-15 indian-pattern pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37] text-xs font-bold text-[#3E2723] shadow-soft">
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span>Our Roots & Values</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#3E2723] leading-tight">
            Har Recipe Mein Ghar Ki Kahani
          </h1>

          <p className="text-base sm:text-xl text-[#5D4037] max-w-2xl mx-auto font-medium leading-relaxed">
            Bringing authentic homemade Indian traditional food to your doorstep, prepared with the unhurried patience of grandmother’s kitchen and packaged with modern hygiene.
          </p>
        </div>
      </section>

      {/* The Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              How We Started
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723]">
              From Family Festivities to Households Across India
            </h2>
            
            <p className="text-sm sm:text-base text-[#5D4037] leading-relaxed">
              Every festival season in our Gwalior home, the aroma of stone-ground spices, roasting ajwain mathris, and fresh mawa gujiyas in pure cow desi ghee would fill the neighborhood. Neighbors, relatives, and traveling friends would request extra dabbas to carry back to Delhi, Mumbai, and Bengaluru.
            </p>

            <p className="text-sm sm:text-base text-[#5D4037] leading-relaxed">
              When we saw how market shelves were overflowing with palm-oil loaded namkeens, artificial chemical enhancers, and stale factory-packaged sweets, we asked a simple question:
            </p>

            <div className="p-4 rounded-2xl bg-[#F5F1E9] border-l-4 border-[#D4AF37] italic text-sm text-[#3E2723] font-serif">
              “Why should families living far away from home have to compromise on pure, nostalgic taste?”
            </div>

            <p className="text-sm sm:text-base text-[#5D4037] leading-relaxed">
              That was the birth of <strong>Taste of Home – Homemade Food</strong>. A promise that no matter where you live, you can experience the exact same pure, crunchy, and heartwarming flavors your family lovingly made for you.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[28px] overflow-hidden border border-[#D4AF37]/60 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80"
                alt="Traditional Indian kitchen and sweets crafting"
                referrerPolicy="no-referrer"
                className="w-full h-96 sm:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white p-5 rounded-2xl bg-[#3E2723]/85 backdrop-blur-xs border border-[#D4AF37]/40 shadow-soft">
                <div className="font-serif font-bold text-base text-[#D4AF37]">
                  “Ghar ka swaad, premium packaging ke saath.”
                </div>
                <p className="text-xs text-[#F5F1E9] mt-1">
                  Handcrafted with pure love in Gwalior, Madhya Pradesh.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-[#F5F1E9] py-16 border-y border-[#E5E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20]">
              Our Craft & Commitment
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">
              What Sets Our Food Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-[28px] border border-[#E5E0D5] shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] flex items-center justify-center text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Traditional Recipes
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                No shortcuts. We follow exact generations-old spice ratios, sun-curing intervals, and slow-frying techniques to keep flavors 100% authentic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#E5E0D5] shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E5EBDD] border border-[#1B5E20]/30 flex items-center justify-center text-[#1B5E20]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Quality Ingredients
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                Zero cheap industrial palm oil. We use Pure Cow Desi Ghee, cold-pressed Kachi Ghani mustard oil, mineral-rich sendha namak, and natural spices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#E5E0D5] shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Hygienic Packaging
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                All snacks are heat-sealed in multi-layer food-grade foil and jars immediately after cooling, sealing in maximum crispness and zero moisture.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[28px] border border-[#E5E0D5] shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E5EBDD] border border-[#1B5E20]/30 flex items-center justify-center text-[#1B5E20]">
                <Heart className="w-6 h-6 fill-[#1B5E20]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Homemade Preparation
              </h3>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                Small, dedicated kitchen batches where each batch is tasted and inspected. We only send out delicacies that we are proud to serve our own children.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Customers Should Trust Us */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-[#D4AF37]/50 shadow-soft space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Our Promise to You
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723]">
              Why Customers Trust Taste of Home
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#5D4037]">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block">FSSAI Certified Food Safety:</strong>
                Fully registered and compliant with national food safety standards (Lic. No. 21424010001892).
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block">Transparent Ingredients:</strong>
                No vague "permitted chemical preservatives" or artificial flavors. Everything listed is what you would find in your home pantry.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block">Small-Batch Freshness:</strong>
                We do not store inventory in warehouses for months. Most orders are dispatched within 24 to 48 hours of preparation.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
              <CheckCircle2 className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#3E2723] block">Guaranteed Transit Safety:</strong>
                If any jar arrives broken or compromised during courier transit, we replace it instantly with zero questions asked.
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white font-bold text-sm shadow-soft transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Our Homemade Goodness</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
