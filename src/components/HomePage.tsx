import React, { useState, useEffect, useCallback, useRef } from 'react';
import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';
import slide4 from '../assets/slide4.png';
import slide5 from '../assets/slide5.png';
import section1Img from '../assets/section1.png';
import gujiaImg from '../assets/gujia.png';
import bhakarwadiImg from '../assets/bhakarwadi.png';
import mathriImg from '../assets/KhastaMathri.png';
import pohachudaImg from '../assets/pohachuda.png';
import aaluPapadImg from '../assets/aalupapad.png';
import gathiyaImg from '../assets/gathiya.png';
import chakliImg from '../assets/chakli.png';
import peanutImg from '../assets/peanut.png';
import makhanaImg from '../assets/makhana.png';
import mithiMatriImg from '../assets/mithi matri.png';
import hamper2Img from '../assets/hammper2.png';
import homemadeImg from '../assets/homemade.png';
import namkeenImg from '../assets/namkeen.png';
import aamkaacharImg from '../assets/aamkaachar.png';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Gift,
  Heart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  CheckCircle2,
  Package,
  Instagram,
  PhoneCall,
  Send,
  Flame,
  MapPin,
  Compass,
  Sun,
  Award,
  Utensils,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryType } from '../types';


const SLIDES = [slide1, slide2, slide3, slide4, slide5];


interface FestivalState {
  id: string;
  state: string;
  hindiState: string;
  region: string;
  festival: string;
  festivalIcon: string;
  delicacy: string;
  image: string;
  secondaryImage?: string;
  description: string;
  badge: string;
  color: string;
  mapCoords: { x: string; y: string };
  category: CategoryType;
}

const FESTIVAL_STATES: FestivalState[] = [
  {
    id: 'mp',
    state: 'Madhya Pradesh (Gwalior)',
    hindiState: 'मध्य प्रदेश • ग्वालियर & मालवा',
    region: 'Central India',
    festival: 'Holi & Diwali Mahotsav',
    festivalIcon: '🪔',
    delicacy: 'Shahi Mawa Gujiya & Khas Aam Achar',
    image: gujiaImg,
    description: 'Slow-roasted artisanal khoya in pure cow desi ghee, hand-stuffed with crunchy almonds, pista, and fragrant elaichi. Alongside sun-matured Ramkela mango pickle cured in ceramic martabaans.',
    badge: 'Royal Heritage of Gwalior',
    color: '#D4AF37',
    mapCoords: { x: '47%', y: '50%' },
    category: 'Traditional Sweets',
  },
  {
    id: 'raj',
    state: 'Rajasthan & Bundelkhand',
    hindiState: 'राजस्थान & बुंदेलखंड',
    region: 'North-West Heritage',
    festival: 'Teej, Karwa Chauth & Diwali',
    festivalIcon: '👑',
    delicacy: 'Shahi Mithi Mathri & Khasta Ajwain Mathri',
    image: mithiMatriImg,
    secondaryImage: mathriImg,
    description: 'Crisp, layered wheat discs delicately coated with cardamom sugar glaze and melon seeds. Plus savory ajwain mathris slow-fried on low heat until melt-in-mouth flaky.',
    badge: 'Festive & Karwa Chauth Special',
    color: '#E65100',
    mapCoords: { x: '35%', y: '42%' },
    category: 'Traditional Sweets',
  },
  {
    id: 'mah',
    state: 'Maharashtra',
    hindiState: 'महाराष्ट्र • पुणे & विदर्भ',
    region: 'Western Deccan',
    festival: 'Ganesh Utsav & Diwali Faral',
    festivalIcon: '🚩',
    delicacy: 'Spiced Bakarwadi & Butter Chakli',
    image: bhakarwadiImg,
    secondaryImage: chakliImg,
    description: 'Hand-rolled crispy pinwheels packed with dry roasted desiccated coconut, white sesame, poppy seeds, and amchur. Alongside crunchy butter chakli spirals crafted with stone-ground rice.',
    badge: 'Diwali Faral Star',
    color: '#C62828',
    mapCoords: { x: '42%', y: '63%' },
    category: 'Namkeen & Snacks',
  },
  {
    id: 'guj',
    state: 'Gujarat & Saurashtra',
    hindiState: 'गुजरात • काठियावाड़ & भावनगर',
    region: 'Western Heartland',
    festival: 'Navratri, Uttarayan & Diwali',
    festivalIcon: '✨',
    delicacy: 'Bhavnagri Gathiya & Spiced Singdana',
    image: gathiyaImg,
    secondaryImage: peanutImg,
    description: 'Feather-light golden chickpea sev seasoned with aromatic hing and ajwain that melts instantly on your tongue. Accompanied by large Saurashtra peanuts roasted in sendha namak and chaat masala.',
    badge: 'Authentic Kathiyawadi Taste',
    color: '#F57C00',
    mapCoords: { x: '27%', y: '50%' },
    category: 'Namkeen & Snacks',
  },
  {
    id: 'pahad',
    state: 'Uttarakhand & Himalayas',
    hindiState: 'उत्तराखंड • देवभूमि हिमालय',
    region: 'Northern Hills',
    festival: 'Navratri Vrat & Mahashivratri',
    festivalIcon: '🏔️',
    delicacy: 'Handmade Sun-Dried Aalu Papad',
    image: aaluPapadImg,
    description: 'Paper-thin mountain potato papads hand-spread and dried under radiant morning sunshine. Seasoned with sendha namak and crushed jeera — 100% pure and pious for fasting (vrat).',
    badge: '100% Sun-Dried Fasting Special',
    color: '#1B5E20',
    mapCoords: { x: '48%', y: '28%' },
    category: 'Papad',
  },
  {
    id: 'bihar_up',
    state: 'UP & Bihar Heartland',
    hindiState: 'उत्तर प्रदेश & मिथिला बिहार',
    region: 'Eastern Gangetic Plains',
    festival: 'Makar Sankranti & Chhath Puja',
    festivalIcon: '☀️',
    delicacy: 'Roasted Chiwda Poha & Desi Ghee Makhana',
    image: pohachudaImg,
    secondaryImage: makhanaImg,
    description: 'Golden roasted flattened rice dry-roasted with peanuts, curry leaves, and dried coconut flakes. Accompanied by premium lotus seeds (makhana) popped in pure cow desi ghee.',
    badge: 'Sacred Healthy Superfood',
    color: '#4E342E',
    mapCoords: { x: '63%', y: '43%' },
    category: 'Namkeen & Snacks',
  },
];

export const HomePage: React.FC = () => {
  const {
    products,
    hampers,
    reviews,
    setCurrentView,
    setSelectedCategory,
    openWhatsAppOrder,
    showToast,
  } = useStore();

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  // Map state
  const [activeStateIndex, setActiveStateIndex] = useState(0);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  // Auto-sliding every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextSlide() : prevSlide();
    touchStartXRef.current = null;
  };



  const categories: {
    name: CategoryType;
    hindiName: string;
    image: string;
    desc: string;
    count: number;
    badge: string;
  }[] = [
    {
      name: 'Namkeen & Snacks',
      hindiName: 'कुरकुरी नमकीन व स्नैक्स',
      image: namkeenImg,
      desc: 'Poha Chivda, Mathri, Bhakarwadi, Chakli & Makhana',
      count: 8,
      badge: 'Artisanal Batch',
    },
    {
      name: 'Traditional Sweets',
      hindiName: 'देसी घी पारंपरिक मिठाइयां',
      image: gujiaImg,
      desc: 'Shahi Mawa Gujiya, Besan Ladoo, Mithi Mathri & Puran Poli',
      count: 5,
      badge: 'Pure Desi Ghee',
    },
    {
      name: 'Pickles',
      hindiName: 'दादी माँ के पारंपरिक अचार',
      image: aamkaacharImg,
      desc: 'Sun-cured Martabaan Aam, Nimbu, Gajar & Kathal Achar',
      count: 6,
      badge: 'Martabaan Cured',
    },
    {
      name: 'Papad',
      hindiName: 'हाथ से बने कुरकुरे पापड़',
      image: aaluPapadImg,
      desc: 'Sun-dried Moong-Chana & Aalu Handmade Papads',
      count: 2,
      badge: 'Handcrafted',
    },
    {
      name: 'Gift Hampers',
      hindiName: 'रॉयल उत्सव गिफ्ट हैम्पर्स',
      image: hamper2Img,
      desc: 'Royal Diwali & Festive Keepsake Boxes with Brass Diyas',
      count: 3,
      badge: 'Diwali Special',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* ===================================================================== */}
      {/* HERO — Professional Image Slider with Ken Burns + Crossfade            */}
      {/* ===================================================================== */}
      <section
        className="relative overflow-hidden border-b border-[#E5E0D5] group/slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full" style={{ aspectRatio: '16/6' }}>

          {/* Slides — crossfade with Ken Burns zoom */}
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0"
            >
              <motion.img
                src={SLIDES[currentSlide]}
                alt={`Taste of Home – Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
                initial={{ scale: 1 }}
                animate={{ scale: 1.06 }}
                transition={{ duration: 6, ease: 'linear' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Prev Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-12 sm:h-12 rounded-full
              bg-white/20 hover:bg-white/90
              text-white hover:text-[#3E2723]
              shadow-lg border border-white/30
              flex items-center justify-center
              transition-all duration-300 hover:scale-110 active:scale-95
              cursor-pointer backdrop-blur-md
              opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-12 sm:h-12 rounded-full
              bg-white/20 hover:bg-white/90
              text-white hover:text-[#3E2723]
              shadow-lg border border-white/30
              flex items-center justify-center
              transition-all duration-300 hover:scale-110 active:scale-95
              cursor-pointer backdrop-blur-md
              opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 pb-4 pt-8
            bg-gradient-to-t from-black/40 to-transparent
            flex items-end justify-between gap-4">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="relative flex items-center cursor-pointer"
                >
                  <div className={`rounded-full transition-all duration-500 ${
                    idx === currentSlide
                      ? 'w-8 h-2 bg-white shadow-md'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`} />
                </button>
              ))}
            </div>
            <div className="text-white/80 text-xs font-bold tracking-widest select-none">
              <span className="text-white text-sm font-extrabold">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <span className="text-white/50 mx-1">/</span>
              <span>{String(SLIDES.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Auto-slide Progress Bar */}
          {!isPaused && (
            <motion.div
              key={`progress-${currentSlide}`}
              className="absolute bottom-0 left-0 h-[3px] bg-[#D4AF37] z-30 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: 'linear' }}
              style={{ width: '100%' }}
            />
          )}
        </div>
      </section>


      {/* ===================================================================== */}
      {/* BEST SELLERS                                                           */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723]">Our Best Sellers</h2>
            <p className="text-xs sm:text-sm text-[#5D4037] mt-1">
              Handpicked traditional favorites ordered on repeat by families.
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs sm:text-sm font-bold text-[#1B5E20] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SHOP BY CATEGORY — Premium Artisanal Cards                              */}
      {/* ===================================================================== */}
      <section className="bg-gradient-to-b from-[#FAF6EE] via-[#F5F1E9] to-[#FAF6EE] py-16 sm:py-20 border-y border-[#E5E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/50 text-xs font-bold text-[#800020] uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ghar Ka Swaad • Authentic Homemade</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E2723] mt-2">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#5D4037] mt-2 font-medium">
              Explore our handcrafted collection of traditional snacks, desi-ghee sweets, sun-cured pickles and festive hampers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => {
                  if (cat.name === 'Gift Hampers') {
                    setCurrentView('hampers');
                  } else {
                    setSelectedCategory(cat.name);
                    setCurrentView('shop');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative bg-white rounded-3xl p-4 border border-[#E5E0D5] hover:border-[#D4AF37] shadow-soft hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3.5 bg-[#FAF6EE] border border-[#E5E0D5]/50 flex items-center justify-center p-2">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md"
                    />
                    {/* Badge */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#800020] text-white text-[10px] font-bold shadow-xs">
                      {cat.badge}
                    </span>
                    {/* Item count */}
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#3E2723]/80 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
                      {cat.count} Items
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="px-1">
                    <div className="text-[11px] font-serif font-bold text-[#800020]">
                      {cat.hindiName}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#3E2723] group-hover:text-[#800020] transition-colors mt-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#6D4C41] line-clamp-2 mt-1.5 leading-relaxed font-medium">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="mt-4 pt-3 border-t border-[#E5E0D5]/70 flex items-center justify-between text-xs font-bold text-[#1B5E20] group-hover:text-[#800020] transition-colors">
                  <span>Explore items</span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF6EE] group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* INDIA IN EVERY JAR BANNER                                              */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#E5E0D5]">
          <motion.img
            src={section1Img}
            alt="India in Every Jar – Taste of Home"
            className="w-full h-auto object-cover"
            draggable={false}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* WHY CHOOSE TASTE OF HOME                                               */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20]">Trust & Quality</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#3E2723] mt-1">
            Why Families Love Taste of Home
          </h2>
          <p className="text-xs sm:text-sm text-[#5D4037] mt-2">
            We don't believe in mass factory production. Every snack is crafted with the same patience and integrity as homemade food made for loved ones.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, bg: 'bg-[#F5F1E9]', border: 'border-[#E5E0D5]', iconColor: 'text-[#D4AF37]', fill: true, title: 'Authentic Traditional Recipes', desc: 'Preserving authentic Bundelkhandi and Central Indian heirloom recipes handed down across four generations.' },
            { icon: ShieldCheck, bg: 'bg-[#E5EBDD]', border: 'border-[#C8E6C9]', iconColor: 'text-[#1B5E20]', fill: false, title: 'Hygienic Preparation', desc: 'Prepared in clean artisanal kitchen spaces with hairnets, stainless-steel vessels and strict sanitary protocols.' },
            { icon: Sparkles, bg: 'bg-[#F5F1E9]', border: 'border-[#E5E0D5]', iconColor: 'text-[#D4AF37]', fill: false, title: '100% Pure Ingredients', desc: 'Pure Cow Desi Ghee, cold-pressed Kachi Ghani mustard oil, rock salt (sendha namak) and zero artificial food colors.' },
            { icon: Package, bg: 'bg-[#E5EBDD]', border: 'border-[#C8E6C9]', iconColor: 'text-[#1B5E20]', fill: false, title: 'Premium Packaging', desc: 'Delivered in multi-layered airtight moisture-proof packs and royal gift boxes ensuring crispness for months.' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-[#E5E0D5] shadow-soft hover:shadow-md transition-all text-center">
              <div className={`w-14 h-14 mx-auto rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center ${item.iconColor} mb-4`}>
                <item.icon className={`w-7 h-7 ${item.fill ? 'fill-[#D4AF37]' : ''}`} />
              </div>
              <h4 className="font-serif font-bold text-base text-[#3E2723] mb-2">{item.title}</h4>
              <p className="text-xs text-[#5D4037] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ===================================================================== */}
      {/* DIWALI GIFT HAMPERS                                                    */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#D4AF37] text-xs font-bold text-[#3E2723] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Festive Celebrations 2026</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723]">
            Is Diwali, Gift the Taste of Home <span className="text-red-500">❤️</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5D4037] mt-2">
            Elevate your festive gifting with artisanal gold-embossed keepsake boxes filled with handcrafted sweets, crunchy namkeens, and festive brass diyas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hampers.map((hamper) => (
            <div
              key={hamper.id}
              className="group bg-white rounded-[28px] border-2 border-[#E5E0D5] hover:border-[#D4AF37] shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#F5F1E9]">
                  <img
                    src={hamper.images[0]}
                    alt={hamper.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {hamper.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold uppercase rounded-full bg-[#D4AF37] text-white shadow-md">
                      {hamper.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg text-[#3E2723] group-hover:text-[#1B5E20] transition-colors">
                    {hamper.name}
                  </h3>
                  <p className="text-xs text-[#8C6D60] mt-1 line-clamp-2 font-medium">{hamper.tagline}</p>
                  <div className="mt-4 pt-4 border-t border-[#E5E0D5] space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D60] block mb-2">Hamper Contents:</span>
                    {hamper.contents.slice(0, 4).map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#5D4037]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span className="truncate">{c}</span>
                      </div>
                    ))}
                    {hamper.contents.length > 4 && (
                      <span className="text-[11px] text-[#D4AF37] font-bold block pt-1">
                        + {hamper.contents.length - 4} more festive treats
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-[#E5E0D5]">
                <div className="flex items-baseline gap-2 mb-4 pt-3">
                  <span className="text-2xl font-extrabold text-[#1B5E20]">₹{hamper.price}</span>
                  <span className="text-xs text-[#8C6D60] line-through">MRP ₹{hamper.mrp}</span>
                  <span className="text-xs font-bold text-[#D4AF37]">
                    ({Math.round(((hamper.mrp - hamper.price) / hamper.mrp) * 100)}% OFF)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setCurrentView('hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full py-2.5 px-3 rounded-xl border border-[#3E2723] text-[#3E2723] hover:bg-[#3E2723] hover:text-white transition-colors text-xs font-bold cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCurrentView('hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#A87B22] text-white transition-colors text-xs font-bold shadow-soft cursor-pointer"
                  >
                    Gift Hamper
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => { setCurrentView('hampers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-8 py-3.5 rounded-2xl bg-[#1B5E20] hover:bg-[#144317] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <Gift className="w-4 h-4" />
            <span>Explore All Festive Gift Boxes</span>
          </button>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CUSTOMER REVIEWS                                                        */}
      {/* ===================================================================== */}
      <section className="bg-[#F5F1E9] py-16 border-y border-[#E5E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Real Verified Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] mt-1">
              Loved by Families <span className="text-red-500">❤️</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5D4037] mt-2">
              Discover what households across India say about our traditional homemade recipes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border border-[#E5E0D5] shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#8C6D60]">{review.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#3E2723] mb-2">"{review.title}"</h4>
                  <p className="text-xs text-[#5D4037] leading-relaxed italic">"{review.comment}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E5E0D5] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full text-white font-bold flex items-center justify-center text-xs shadow-soft"
                      style={{ backgroundColor: review.avatarColor || '#1B5E20' }}
                    >
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-[#3E2723] leading-tight">{review.customerName}</h5>
                      <p className="text-[10px] text-[#8C6D60]">{review.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#1B5E20] bg-[#E5EBDD] px-2 py-0.5 rounded-md">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* OUR JOURNEY — FROM OUR HOME TO YOUR TABLE                              */}
      {/* ===================================================================== */}
      <section className="w-full overflow-hidden border-t border-[#E5E0D5]">
        <motion.img
          src={homemadeImg}
          alt="Our Journey – From Our Home to Your Table"
          className="w-full h-auto object-cover block"
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        
        {/* Royal Decorative Motif Divider Line */}
        <div className="relative w-full flex items-center justify-center py-5 bg-[#FAF6EE] border-t border-[#D4AF37]/30">
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="relative z-10 px-6 py-1 bg-[#FAF6EE] border border-[#D4AF37] rounded-full flex items-center gap-2 text-xs font-serif font-bold text-[#800020] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>शुद्धता • परंपरा • स्वाद</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
        </div>
      </section>

    </div>
  );
};