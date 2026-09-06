import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  Gift,
  ShieldCheck,
  Truck,
  Heart,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const FAQS = [
  {
    q: 'How fresh are the snacks when dispatched?',
    a: 'We never store pre-packaged inventory for months. All savories, mathris, and sweets are prepared in small fresh batches and dispatched within 24 to 48 hours of your order.',
  },
  {
    q: 'Do you deliver all across India?',
    a: 'Yes! We ship across all Indian pin codes via premium express courier partners with door-to-door tracking. Typical transit time is 3 to 5 business days.',
  },
  {
    q: 'Can we customize gift hampers for weddings or corporate events?',
    a: 'Absolutely. We specialize in custom festive hampers with bespoke snack assortments, ethnic packaging, and personalized handwritten blessing cards. Reach out to us via WhatsApp or the contact form.',
  },
  {
    q: 'Are your products 100% vegetarian and chemical-free?',
    a: 'Yes! 100% pure vegetarian, zero palm oil, zero chemical preservatives or synthetic food coloring. We use only pure cow desi ghee, cold-pressed oils, sendha namak, and stone-ground spices.',
  },
];

export const ContactPage: React.FC = () => {
  const { openWhatsAppOrder, showToast, setCurrentView } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      showToast('Please fill in your name and message', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Message received! Our kitchen team will contact you shortly.');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans">
      
      {/* --- 1. ROYAL HERITAGE HEADER --- */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EE] border border-[#D4AF37] text-xs font-bold text-[#800020] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>संपर्क सूत्र • Taste of Home Kitchen Desk</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E2723] tracking-tight">
          Get in Touch with Our Kitchen
        </h1>
        
        <p className="text-xs sm:text-sm text-[#5D4037] font-medium max-w-2xl mx-auto leading-relaxed">
          Have questions regarding fresh batch preparation, festive hampers, spice customizations, or courier tracking? Our family kitchen is always delighted to assist you.
        </p>

        {/* Decorative Golden Line Divider */}
        <div className="relative w-full flex items-center justify-center pt-2">
          <div className="w-48 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent flex items-center justify-center">
            <div className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37] border-2 border-[#FAF7F2] shadow-2xs" />
          </div>
        </div>
      </div>

      {/* --- 2. ROYAL WHATSAPP DIRECT ORDER BANNER --- */}
      <div className="rounded-[28px] bg-gradient-to-r from-[#144317] via-[#1B5E20] to-[#144317] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border-2 border-[#D4AF37]/70 relative overflow-hidden">
        {/* Decorative subtle ambient lights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 text-center md:text-left relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 shadow-inner">
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#D4AF37]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] mb-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Instant Support & Order Assistance • 15 Min Reply</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Prefer Ordering Directly on WhatsApp?
            </h3>
            <p className="text-xs sm:text-sm text-white/85 mt-0.5 max-w-xl leading-relaxed">
              Send us your snack wishlist, festive hamper requirements, or pin-code for instant delivery estimate. Our kitchen manager will assist you directly.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openWhatsAppOrder()}
          className="relative z-10 px-7 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#B59020] text-[#200A0C] text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-[#200A0C]" />
          <span>Chat & Order on WhatsApp</span>
        </button>
      </div>

      {/* --- 3. MAIN CONTACT GRID (Left: Info / Right: Form) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Touchpoints & Brand Assurances (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Touchpoints Card */}
          <div className="p-6 rounded-[28px] bg-[#FAF6EE] border border-[#D4AF37]/40 shadow-soft space-y-5">
            <div className="border-b border-[#E5E0D5] pb-3 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#3E2723]">
                Customer Care & Kitchen Desk
              </h3>
              <span className="text-[10px] font-bold text-[#800020] bg-white px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-2xs">
                Gwalior Kitchen
              </span>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              
              {/* WhatsApp Item */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#D4AF37] transition-colors shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#1B5E20]/15 text-[#1B5E20] border border-[#1B5E20]/30 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-[#3E2723] block text-xs">WhatsApp Helpline:</span>
                  <p className="text-xs text-[#800020] font-bold mt-0.5">+91 98260 18920 (Direct Kitchen Chat)</p>
                  <button
                    onClick={() => openWhatsAppOrder()}
                    className="text-[11px] font-bold text-[#1B5E20] hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Message on WhatsApp</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Phone Item */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#D4AF37] transition-colors shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#800020]/10 text-[#800020] border border-[#800020]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-[#3E2723] block text-xs">Phone Assistance:</span>
                  <p className="text-xs text-[#5D4037] mt-0.5 font-semibold">+91 98260 18920 / +91 751 2490812</p>
                  <span className="text-[10px] text-[#8C6D60] block mt-0.5">Mon – Sat, 9:00 AM – 8:00 PM IST</span>
                </div>
              </div>

              {/* Email Item */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#D4AF37] transition-colors shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#8C6A12] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-[#3E2723] block text-xs">Direct Email Desk:</span>
                  <p className="text-xs text-[#5D4037] mt-0.5 font-semibold truncate">care@tasteofhome.in</p>
                  <span className="text-[10px] text-[#8C6D60] block mt-0.5">Replies within 2–4 hours</span>
                </div>
              </div>

              {/* Address Item */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#D4AF37] transition-colors shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#3E2723]/10 text-[#3E2723] border border-[#3E2723]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-[#3E2723] block text-xs">Artisanal Kitchen & Dispatch:</span>
                  <p className="text-xs text-[#5D4037] mt-0.5 leading-relaxed font-medium">
                    Taste of Home Foods, 42 Heritage Lane, City Centre, Gwalior, MP – 474011
                  </p>
                </div>
              </div>

              {/* Timings Item */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#D4AF37] transition-colors shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#1B5E20]/10 text-[#1B5E20] border border-[#1B5E20]/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-[#3E2723] block text-xs">Kitchen Operational Hours:</span>
                  <p className="text-xs text-[#5D4037] mt-0.5 font-medium">
                    Mon – Sat: 9:00 AM – 8:00 PM IST<br />
                    Sunday: 10:00 AM – 4:00 PM IST
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Festive Notice Pill */}
          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#D4AF37] text-xs text-[#5D4037] flex items-center gap-3 shadow-2xs">
            <span className="text-xl">🪔</span>
            <span className="leading-relaxed">
              <strong className="text-[#800020]">Festive Gifting Notice:</strong> During Diwali, Holi, and Raksha Bandhan rush, we recommend placing bulk hamper orders 4–5 days in advance for timely doorstep courier arrival.
            </span>
          </div>

          {/* 3 Brand Guarantees Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#D4AF37]/30 text-center space-y-1">
              <Heart className="w-4 h-4 text-[#800020] mx-auto" />
              <p className="text-[10px] font-bold text-[#3E2723]">100% Homemade</p>
              <p className="text-[9px] text-[#5D4037]">Pure Cow Ghee</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#D4AF37]/30 text-center space-y-1">
              <Truck className="w-4 h-4 text-[#1B5E20] mx-auto" />
              <p className="text-[10px] font-bold text-[#3E2723]">Pan-India Express</p>
              <p className="text-[9px] text-[#5D4037]">Safe Transit Pack</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#D4AF37]/30 text-center space-y-1">
              <Gift className="w-4 h-4 text-[#D4AF37] mx-auto" />
              <p className="text-[10px] font-bold text-[#3E2723]">Custom Gifting</p>
              <p className="text-[9px] text-[#5D4037]">Bespoke Hampers</p>
            </div>
          </div>

        </div>

        {/* Right Column: Send Us a Message Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#FAF6EE] border border-[#D4AF37]/50 shadow-soft transition-all">
            
            <div className="mb-6 border-b border-[#E5E0D5] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[11px] font-bold uppercase tracking-wider text-[#800020] mb-2">
                <Mail className="w-3.5 h-3.5 text-[#800020]" />
                <span>Direct Kitchen Mailbox</span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#3E2723]">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#5D4037] mt-1 font-medium leading-relaxed">
                Fill out the details below and our kitchen team will get back to you via WhatsApp or Email within 2–4 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-white border border-[#D4AF37] text-center space-y-4 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-[#1B5E20]/10 border border-[#1B5E20]/30 flex items-center justify-center mx-auto text-[#1B5E20]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#3E2723]">
                  Thank You, {formData.name}!
                </h4>
                <p className="text-xs sm:text-sm text-[#5D4037] max-w-md mx-auto leading-relaxed">
                  We have received your note regarding <strong>"{formData.subject}"</strong>. A member of our family kitchen team will reach out to you promptly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold shadow-md cursor-pointer transition-all border border-[#D4AF37]/50"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#3E2723] mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-2xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#3E2723] mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-2xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#3E2723] mb-1.5">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-2xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#3E2723] mb-1.5">Subject / Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-2xs font-medium"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Diwali Hampers Inquiry">Diwali & Festive Hampers Inquiry</option>
                      <option value="Bulk / Wedding Gifting">Bulk / Corporate / Wedding Gifting</option>
                      <option value="Custom Snack Weight">Custom Pack / Weight Request</option>
                      <option value="Order Tracking Help">Order Dispatch & Tracking Help</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#3E2723] mb-1.5">Your Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what you need help with (ingredients, delivery date, custom quantities, gift card notes)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none shadow-2xs font-medium leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 border border-[#D4AF37]/50"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Send Message to Kitchen</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* --- 4. MARKETING THOUGHT DIVIDER RIBBON --- */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#3E2723] via-[#800020] to-[#3E2723] text-white text-center py-3 px-6 shadow-sm border-y border-[#D4AF37]/40 flex items-center justify-center gap-3">
        <span className="text-[#D4AF37] text-sm">🪔</span>
        <p className="font-serif text-xs sm:text-sm font-semibold tracking-wide text-[#FAF6EE]">
          “हर स्वाद में अपनापन • शुद्धता, परंपरा और विश्वास का अटूट संगम”
        </p>
        <span className="text-[#D4AF37] text-sm">🪔</span>
      </div>

      {/* --- 5. FREQUENTLY ASKED QUESTIONS SECTION --- */}
      <div className="max-w-4xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723]">
            Frequently Asked Kitchen Queries
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF6EE] border border-[#D4AF37]/40 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-[#F5EFE0]/60 transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#3E2723]">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#800020]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#5D4037] leading-relaxed border-t border-[#E5E0D5]/60 pt-3 bg-white/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};


