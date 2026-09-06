import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  Heart,
  ShoppingBag,
  Zap,
  CheckCircle2,
  MessageCircle,
  Award,
  Send,
  PenTool,
  PhoneCall,
  Flame,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GiftHamper, Product } from '../types';

export const HampersPage: React.FC = () => {
  const {
    hampers,
    products,
    addToCart,
    setCurrentView,
    openWhatsAppOrder,
    showToast,
  } = useStore();

  // Custom personalized message for hampers
  const [selectedHamperForMessage, setSelectedHamperForMessage] = useState<GiftHamper | null>(null);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');

  // Corporate inquiry state
  const [corporateForm, setCorporateForm] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    quantity: '50',
    budget: 'Under ₹1000 per hamper',
  });
  const [corporateSubmitted, setCorporateSubmitted] = useState(false);

  // Helper to convert hamper to product format for cart
  const createHamperCartProduct = (hamper: GiftHamper): Product => {
    return {
      id: hamper.id,
      name: hamper.name,
      category: 'Gift Hampers',
      shortDescription: hamper.tagline,
      fullDescription: hamper.description,
      ingredients: hamper.contents,
      nutritionInfo: {
        servingSize: 'Assorted',
        calories: 'Festive Assortment',
        protein: 'High',
        carbs: 'Assorted',
        fat: 'Pure Desi Ghee',
      },
      shelfLife: '2 Months',
      storageInstructions: 'Store in cool dry place',
      allergenInfo: 'Contains Gluten, Dairy & Tree Nuts',
      fssaiInfo: 'FSSAI Certified Gifting Hampers',
      variants: [
        {
          weight: 'Gift Box',
          price: hamper.price,
          mrp: hamper.mrp,
          inStock: true,
          inventory: 25,
        },
      ],
      rating: hamper.rating,
      reviewCount: hamper.reviewCount,
      images: hamper.images,
      tags: ['Festive Hamper', 'Diwali Special', 'Personalized Gift'],
    };
  };

  const handleAddHamperToCart = (hamper: GiftHamper, withCustomMessage: boolean = false) => {
    const product = createHamperCartProduct(hamper);
    const variant = product.variants[0];
    const customNote = withCustomMessage && personalizedMessage.trim()
      ? `To: ${recipientName || 'Family'} | From: ${senderName || 'Well-wisher'} | Message: "${personalizedMessage}"`
      : undefined;

    addToCart(product, variant, 1, customNote);
    if (withCustomMessage) {
      setSelectedHamperForMessage(null);
      setPersonalizedMessage('');
      setSenderName('');
      setRecipientName('');
    }
  };

  const handleBuyHamperNow = (hamper: GiftHamper) => {
    const product = createHamperCartProduct(hamper);
    const variant = product.variants[0];
    addToCart(product, variant, 1);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCorporateSubmitted(true);
    showToast('Inquiry received! Our gifting concierge will contact you within 2 hours.');
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F5F1E9] border-b border-[#E5E0D5] py-12 sm:py-20 text-center font-sans">
        <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37] text-xs font-bold text-[#3E2723] shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Diwali & Festive Gifting Collection 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#3E2723] leading-tight">
            Is Diwali, Gift the Taste of Home <span className="text-red-500">❤️</span>
          </h1>

          <p className="text-sm sm:text-lg text-[#5D4037] max-w-2xl mx-auto font-medium leading-relaxed">
            Move away from commercial mass-produced chocolates. Gift your loved ones, clients, and family the nostalgia of authentic homemade sweets, crunchy snacks, and festive brass diyas.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3 text-xs font-semibold text-[#1B5E20]">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#E5E0D5] shadow-2xs">
              ✓ Gold-Embossed Keepsake Boxes
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#E5E0D5] shadow-2xs">
              ✓ Free Personalized Calligraphy Wish Card
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#E5E0D5] shadow-2xs">
              ✓ Includes Handcrafted Brass Diyas
            </span>
          </div>
        </div>
      </section>

      {/* Hampers Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            Curated Celebrations
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#3E2723] mt-1">
            Choose Your Festive Hamper
          </h2>
          <p className="text-xs sm:text-sm text-[#5D4037] mt-2">
            Each hamper is carefully hand-assembled, vacuum-sealed for maximum crunch, and presented in a luxury box.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {hampers.map((hamper) => {
            const discountPercent = Math.round(
              ((hamper.mrp - hamper.price) / hamper.mrp) * 100
            );

            return (
              <div
                key={hamper.id}
                className="bg-white rounded-[28px] border border-[#E5E0D5] hover:border-[#D4AF37] shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#F5F1E9]">
                    <img
                      src={hamper.images[0]}
                      alt={hamper.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    {hamper.badge && (
                      <span className="absolute top-4 left-4 px-3.5 py-1 text-xs font-bold uppercase rounded-full bg-[#1B5E20] text-white shadow-soft">
                        {hamper.badge}
                      </span>
                    )}
                    <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-bold uppercase rounded-md bg-[#D4AF37] text-white shadow-soft">
                      {discountPercent}% OFF
                    </span>
                  </div>

                  {/* Hamper details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D60]">
                        {hamper.boxType}
                      </div>
                      <h3 className="font-serif font-bold text-2xl text-[#3E2723] mt-1">
                        {hamper.name}
                      </h3>
                      <p className="text-xs text-[#5D4037] mt-1.5 leading-relaxed">
                        {hamper.description}
                      </p>
                    </div>

                    {/* Contents Breakdown */}
                    <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D5] space-y-2">
                      <span className="text-xs font-bold uppercase text-[#3E2723] tracking-wide flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Included Homemade Delicacies:</span>
                      </span>
                      <ul className="space-y-1.5">
                        {hamper.contents.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-[#5D4037] leading-tight"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Personalized Message Option Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedHamperForMessage(hamper)}
                      className="w-full py-2.5 px-3 rounded-full bg-[#F5F1E9] hover:bg-[#E5E0D5] border border-[#D4AF37]/50 text-xs font-bold text-[#3E2723] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <PenTool className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Add Personalised Message Card (+ Free)</span>
                    </button>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="p-6 sm:p-7 pt-0 border-t border-[#E5E0D5]">
                  <div className="flex items-baseline gap-2 mb-4 pt-4">
                    <span className="text-3xl font-extrabold text-[#1B5E20]">
                      ₹{hamper.price}
                    </span>
                    <span className="text-sm text-[#8C6D60] line-through">
                      MRP ₹{hamper.mrp}
                    </span>
                    <span className="text-xs text-[#8C6D60] ml-auto">
                      Pan-India Delivery
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleAddHamperToCart(hamper)}
                      className="w-full py-3 px-3 rounded-full border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBuyHamperNow(hamper)}
                      className="w-full py-3 px-3 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white text-xs font-bold transition-all shadow-soft active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 fill-white" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Personalized Greeting Message Modal */}
      {selectedHamperForMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-[28px] shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <div className="flex items-center gap-2 text-[#3E2723]">
                <PenTool className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif font-bold text-lg">
                  Personalize Your Festive Card
                </h3>
              </div>
              <button
                onClick={() => setSelectedHamperForMessage(null)}
                className="text-xs font-bold text-[#8C6D60] hover:text-[#3E2723] cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-[#5D4037]">
              We will print your heartfelt message on a golden royal card and nestle it inside <strong>{selectedHamperForMessage.name}</strong>.
            </p>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5D4037] mb-1">Recipient Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Sharma Family"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-2.5 bg-[#F5F1E9] border border-[#E5E0D5] rounded-xl text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5D4037] mb-1">From / Sender:</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul & Neha"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-2.5 bg-[#F5F1E9] border border-[#E5E0D5] rounded-xl text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5D4037] mb-1">Your Personal Wish / Message:</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Wishing you and your family a luminous, joyful, and prosperous Diwali! May your home be blessed with health, love, and sweet memories."
                  value={personalizedMessage}
                  onChange={(e) => setPersonalizedMessage(e.target.value)}
                  className="w-full p-3 bg-[#F5F1E9] border border-[#E5E0D5] rounded-xl text-[#3E2723] focus:outline-none focus:border-[#1B5E20] resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleAddHamperToCart(selectedHamperForMessage, true)}
                className="flex-1 py-3 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white font-bold text-xs shadow-soft transition-all cursor-pointer"
              >
                Save & Add Hamper to Cart
              </button>
              <button
                type="button"
                onClick={() => setSelectedHamperForMessage(null)}
                className="px-5 py-3 rounded-full bg-[#F5F1E9] border border-[#E5E0D5] text-xs font-semibold text-[#5D4037] hover:bg-[#E5E0D5] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate / Bulk Gifting Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="bg-[#3E2723] rounded-[32px] p-8 sm:p-12 text-white border-2 border-[#D4AF37] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-[#D4AF37] text-white text-[11px] font-bold uppercase tracking-wider">
                Corporate & Bulk Orders
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
                Custom Festive Hampers for Your Team & Clients
              </h3>
              <p className="text-xs sm:text-sm text-[#E5E0D5] leading-relaxed">
                Looking to send 25 to 5,000+ hampers across India? We provide customized brand logos on gift boxes, personalized client greeting inserts, tailored item combinations, and bulk GST invoices.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openWhatsAppOrder('Bulk Corporate Diwali Hamper Inquiry', '50+ Hampers')}
                  className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-soft"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss on WhatsApp</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] px-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>Dedicated Concierge: +91 98260 18920</span>
                </div>
              </div>
            </div>

            {/* Corporate Form */}
            <div className="lg:col-span-6">
              {corporateSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#4E342E] border border-[#D4AF37] text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#81C784] mx-auto" />
                  <h4 className="font-serif font-bold text-xl text-[#FDFBF7]">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs text-[#E5E0D5]">
                    Our corporate gifting specialist is reviewing your requirements and will reach out with customized sample hampers and bulk pricing tier within 2 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleCorporateSubmit}
                  className="p-6 sm:p-7 rounded-[24px] bg-[#4E342E] border border-[#5D4037] space-y-3 text-xs"
                >
                  <h4 className="font-serif font-bold text-base text-[#D4AF37] mb-2">
                    Request Corporate Gifting Catalogue
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Company / Organization *"
                      value={corporateForm.companyName}
                      onChange={(e) => setCorporateForm({ ...corporateForm, companyName: e.target.value })}
                      className="p-2.5 rounded-xl bg-[#2B1A17] border border-[#5D4037] text-white placeholder-[#8C6D60] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Contact Person *"
                      value={corporateForm.contactPerson}
                      onChange={(e) => setCorporateForm({ ...corporateForm, contactPerson: e.target.value })}
                      className="p-2.5 rounded-xl bg-[#2B1A17] border border-[#5D4037] text-white placeholder-[#8C6D60] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={corporateForm.phone}
                      onChange={(e) => setCorporateForm({ ...corporateForm, phone: e.target.value })}
                      className="p-2.5 rounded-xl bg-[#2B1A17] border border-[#5D4037] text-white placeholder-[#8C6D60] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <select
                      value={corporateForm.quantity}
                      onChange={(e) => setCorporateForm({ ...corporateForm, quantity: e.target.value })}
                      className="p-2.5 rounded-xl bg-[#2B1A17] border border-[#5D4037] text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="25-50">Estimated 25 – 50 Hampers</option>
                      <option value="51-150">51 – 150 Hampers</option>
                      <option value="150-500">150 – 500 Hampers</option>
                      <option value="500+">500+ Hampers</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#D4AF37] hover:bg-[#c09d2e] text-[#3E2723] font-bold text-xs transition-colors cursor-pointer shadow-soft"
                  >
                    Submit Corporate Inquiry →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
