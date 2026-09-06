import React, { useState } from 'react';
import { MessageCircle, X, Send, HeartHandshake, PhoneCall } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsAppOrder, products, cart } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || 'Poha Chivda');
  const [quantity, setQuantity] = useState('1');
  const [customQuery, setCustomQuery] = useState('');

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuery.trim()) {
      const msg = `Hello Taste of Home! I have an inquiry:\n"${customQuery.trim()}"`;
      const url = `https://wa.me/919826018920?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    } else {
      openWhatsAppOrder(selectedProduct, quantity);
    }
    setIsOpen(false);
    setCustomQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* WhatsApp Chat Popup Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-[24px] shadow-2xl border border-[#E5E0D5] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 font-sans">
          {/* Header */}
          <div className="bg-[#1B5E20] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1B5E20] font-bold shadow-xs">
                  <MessageCircle className="w-6 h-6 fill-[#25D366] text-[#25D366]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#4ade80] rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">Taste of Home Desk</h4>
                <p className="text-[11px] text-[#E5EBDD] flex items-center gap-1">
                  <span>Usually replies within 5 mins</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FDFBF7] space-y-3.5 text-xs text-[#3E2723]">
            <div className="bg-white p-3.5 rounded-2xl border border-[#E5E0D5] shadow-2xs">
              <p className="font-bold text-[#1B5E20] mb-1">Namaste! 🙏</p>
              <p className="text-[#5D4037] leading-relaxed">
                Welcome to <strong>Taste of Home</strong>. Need help choosing traditional sweets, festive hampers, or custom spice levels? Message us right here!
              </p>
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  openWhatsAppOrder();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-full bg-[#E5EBDD] border border-[#1B5E20]/30 text-[#1B5E20] font-bold flex items-center justify-center gap-2 hover:bg-[#d5dfca] transition-colors cursor-pointer"
              >
                <span>Send Cart ({cart.length} items) on WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            )}

            <form onSubmit={handleSendOrder} className="space-y-2.5">
              <div>
                <label className="block font-bold text-[#5D4037] mb-1">Select Item to Order:</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E5E0D5] font-medium text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Taste of Home Family Festive Hamper">
                    Festive Gift Hamper
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#5D4037] mb-1">Quantity / Packs:</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 2 packs of 500g"
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E5E0D5] font-medium text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5D4037] mb-1">Or write a custom message:</label>
                <textarea
                  rows={2}
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="e.g. Inquiring for corporate Diwali gifting or custom bulk packs..."
                  className="w-full p-2.5 bg-white rounded-xl border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold flex items-center justify-center gap-2 shadow-soft transition-transform active:scale-95 cursor-pointer"
              >
                <span>Start WhatsApp Chat</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Floating WhatsApp Bubble */}
      <button
        id="floating-whatsapp-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white ${
          !isOpen ? 'animate-subtle-pulse' : ''
        }`}
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="font-bold text-sm tracking-wide hidden md:inline">
          Order on WhatsApp
        </span>
      </button>
    </div>
  );
};
