import React, { useState } from 'react';
import footerBg from '../assets/footerBackground.png';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { Logo } from './Logo';
import { useStore, ViewType } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, showToast, openWhatsAppOrder } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Welcome to the Taste of Home family ❤️');
    setNewsletterEmail('');
  };

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative text-[#1F130E] pt-10 pb-6 border-t-2 border-[#D4AF37]/60 overflow-hidden bg-[#FAF6EE]"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Compact Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#1F130E]/20 items-start">
          
          {/* Col 1: Brand & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div
              onClick={() => navigateTo('home')}
              className="inline-flex cursor-pointer py-1.5 px-4 rounded-[22px] bg-white border-2 border-[#D4AF37] shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Logo size="md" variant="full" />
            </div>
            <p className="text-[13px] sm:text-sm text-[#1F130E] leading-relaxed max-w-sm font-sans font-bold">
              <strong className="text-[#5A0012]">“Ghar ka swaad, premium packaging ke saath.”</strong> Authentic homemade snacks, sweets & pickles made with heirloom recipes & pure ingredients.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-sans">
              <span className="px-2.5 py-1 rounded bg-[#5A0012]/10 border border-[#5A0012]/30 font-mono font-extrabold text-[#5A0012] text-xs">
                FSSAI Lic. 21424010001892
              </span>
              <span className="text-xs font-bold text-[#1F130E]">• 100% Desi Ghee & Pure</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-2.5 font-sans">
            <h4 className="font-serif font-extrabold text-xs sm:text-[13px] text-[#5A0012] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#1F130E] font-bold">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#5A0012] hover:underline transition-all cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#5A0012] hover:underline transition-all cursor-pointer">
                  All Snacks & Sweets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('hampers')} className="hover:text-[#5A0012] hover:underline transition-all cursor-pointer flex items-center gap-1.5">
                  <span>Gift Hampers</span>
                  <span className="px-1.5 py-0.5 bg-[#5A0012] text-white text-[9px] font-extrabold rounded-full">Special</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#5A0012] hover:underline transition-all cursor-pointer">
                  About Our Kitchen
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('track-order')} className="hover:text-[#5A0012] hover:underline transition-all cursor-pointer">
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policies (2 cols) */}
          <div className="md:col-span-2 space-y-2.5 font-sans">
            <h4 className="font-serif font-extrabold text-xs sm:text-[13px] text-[#5A0012] uppercase tracking-wider">
              Assurance
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#1F130E] font-bold">
              <li>
                <span className="hover:text-[#5A0012] transition-colors cursor-pointer">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#5A0012] transition-colors cursor-pointer">
                  Refund Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-[#5A0012] transition-colors cursor-pointer">
                  Hygiene Standards
                </span>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-[#5A0012] hover:underline font-extrabold">
                  Admin Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter (3 cols) */}
          <div className="md:col-span-3 space-y-2.5 font-sans">
            <h4 className="font-serif font-extrabold text-xs sm:text-[13px] text-[#5A0012] uppercase tracking-wider">
              Get in Touch
            </h4>
            
            {subscribed ? (
              <div className="p-2 bg-[#1B5E20]/15 border border-[#1B5E20]/40 rounded-lg text-xs text-[#1B5E20] flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#1B5E20]" />
                <span>Subscribed to updates!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-1.5 pr-8 rounded-lg bg-white/90 border border-[#1F130E]/30 text-xs text-[#1F130E] font-medium placeholder-[#5D4037] focus:outline-none focus:border-[#5A0012] shadow-2xs"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 p-1.5 rounded bg-[#5A0012] hover:bg-[#3D000C] text-white transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}

            <div className="text-xs text-[#1F130E] space-y-1.5 font-bold">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#5A0012] flex-shrink-0" />
                <span>+91 98260 18920 (9 AM - 8 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#5A0012] flex-shrink-0" />
                <span>care@tasteofhome.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#5A0012] flex-shrink-0" />
                <span>City Centre, Gwalior, M.P.</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/90 border border-[#1F130E]/30 flex items-center justify-center text-[#1F130E] hover:text-[#5A0012] hover:border-[#5A0012] transition-all shadow-2xs"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-white/90 border border-[#1F130E]/30 flex items-center justify-center text-[#1F130E] hover:text-[#5A0012] hover:border-[#5A0012] transition-all shadow-2xs"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => openWhatsAppOrder()}
                className="px-2.5 py-1 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#1ebd59] transition-all cursor-pointer shadow-2xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Compact Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#1F130E] font-bold font-sans [text-shadow:_0_1px_2px_rgba(255,255,255,0.9)]">
          <p>© {new Date().getFullYear()} Taste of Home – Homemade Food. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-center">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#5A0012] fill-[#5A0012] inline mx-0.5" />
            <span>for traditional Indian food lovers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

