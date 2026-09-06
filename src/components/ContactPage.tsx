import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { openWhatsAppOrder, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      showToast('Please fill in your name and message', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Message received! We will get back to you shortly.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          We’re Here for You
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E2723]">
          Get in Touch with Our Kitchen
        </h1>
        <p className="text-xs sm:text-sm text-[#5D4037]">
          Have questions regarding ingredients, custom order weights, festival hampers, or courier delivery? We’d love to chat!
        </p>
      </div>

      {/* Prominent Quick WhatsApp Order Banner */}
      <div className="rounded-[28px] bg-[#25D366] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-8 h-8 fill-white" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-green-100">
              Fastest Response Channel
            </span>
            <h3 className="font-serif text-2xl font-bold">
              Prefer Ordering Directly on WhatsApp?
            </h3>
            <p className="text-xs sm:text-sm text-green-50 mt-0.5">
              Send us your snack wishlist and delivery address. We confirm stock and dispatch immediately.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openWhatsAppOrder()}
          className="px-8 py-3.5 rounded-full bg-[#3E2723] hover:bg-[#2B130B] text-white text-sm font-bold shadow-soft transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat & Order on WhatsApp</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-6 rounded-[28px] bg-white border border-[#E5E0D5] shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#3E2723] border-b border-[#E5E0D5] pb-3">
              Customer Support Channels
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#5D4037]">
              
              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E5EBDD] text-[#1B5E20] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#3E2723] block">WhatsApp Support:</span>
                  <p className="text-xs text-[#8C6D60]">+91 98260 18920 (Instant Chat)</p>
                  <button
                    onClick={() => openWhatsAppOrder()}
                    className="text-xs font-bold text-[#1B5E20] hover:underline mt-0.5 block"
                  >
                    Open Chat Now →
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F1E9] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#3E2723] block">Phone Inquiries:</span>
                  <p className="text-xs text-[#8C6D60]">+91 98260 18920 / +91 751 2490812</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F1E9] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#3E2723] block">Email Address:</span>
                  <p className="text-xs text-[#8C6D60]">care@tasteofhome.in / orders@tasteofhome.in</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FCE4EC] text-[#D81B60] flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#3E2723] block">Instagram Handle:</span>
                  <p className="text-xs text-[#8C6D60]">@tasteofhome.homemade</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F1E9] text-[#3E2723] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#3E2723] block">Artisanal Kitchen & Dispatch Address:</span>
                  <p className="text-xs text-[#8C6D60]">
                    Taste of Home Foods, 42 Heritage Lane, City Centre, Gwalior, Madhya Pradesh - 474011, India
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F1E9] text-[#3E2723] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#3E2723] block">Customer Support Timings:</span>
                  <p className="text-xs text-[#8C6D60]">
                    Monday – Saturday: 9:00 AM – 8:00 PM IST<br />
                    Sunday: 10:00 AM – 4:00 PM IST
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#5D4037] flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
            <span>
              <strong>Festive Ordering Notice:</strong> During Diwali, Holi, and Raksha Bandhan weeks, we recommend placing orders 4–5 days in advance.
            </span>
          </div>

        </div>

        {/* Right Col: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#E5E0D5] shadow-soft">
            <h3 className="font-serif font-bold text-xl text-[#3E2723] mb-1">
              Send Us a Direct Message
            </h3>
            <p className="text-xs text-[#8C6D60] mb-6">
              Fill out this form and our support team will reply via email or WhatsApp within a few hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#E5EBDD] border border-[#1B5E20]/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#1B5E20] mx-auto" />
                <h4 className="font-serif font-bold text-lg text-[#1B5E20]">
                  Thank You, {formData.name}!
                </h4>
                <p className="text-xs text-[#5D4037]">
                  We have received your message regarding "{formData.subject}". A member of our kitchen team will get in touch with you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white text-xs font-bold shadow-soft cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#8C6D60] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#8C6D60] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#8C6D60] mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#8C6D60] mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Diwali Hampers Inquiry">Diwali Hampers Inquiry</option>
                      <option value="Bulk / Wedding Gifting">Bulk / Wedding Gifting</option>
                      <option value="Custom Snack Weight">Custom Snack Weight</option>
                      <option value="Order Tracking Help">Order Tracking Help</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">Your Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what you need help with..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white font-bold text-xs shadow-soft transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
