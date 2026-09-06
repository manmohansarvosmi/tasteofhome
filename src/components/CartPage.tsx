import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  Truck,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    showToast,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) {
      showToast('Please enter a coupon code', 'error');
      return;
    }
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const amountNeededForFreeDelivery = Math.max(0, 499 - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 font-sans">
        <div className="w-20 h-20 rounded-full bg-[#F5F1E9] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-soft">
          <ShoppingBag className="w-10 h-10" />
        </div>

        <h2 className="font-serif text-3xl font-bold text-[#3E2723]">
          Your Pantry Cart is Empty
        </h2>

        <p className="text-sm text-[#5D4037] max-w-md mx-auto">
          Explore our handmade namkeens, seasonal sweets, pickles, and festive hampers prepared with generational love.
        </p>

        <button
          type="button"
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white font-bold text-sm shadow-soft transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
        >
          <span>Explore Snacks & Sweets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723]">
            Shopping Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
          </h1>
          <p className="text-xs text-[#8C6D60]">
            Freshly packed upon your order confirmation
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView('shop')}
          className="text-xs font-bold text-[#1B5E20] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Delivery Bar */}
      <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <Truck className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
          <div>
            {amountNeededForFreeDelivery > 0 ? (
              <span>
                Add items worth <strong>₹{amountNeededForFreeDelivery}</strong> more to get <strong>FREE Express Delivery</strong>!
              </span>
            ) : (
              <span className="text-[#1B5E20] font-bold">
                🎉 Congratulations! You have unlocked FREE Express Delivery across India!
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full sm:w-48 bg-[#E5E0D5] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#1B5E20] h-full transition-all duration-300"
            style={{ width: `${Math.min(100, (cartSubtotal / 499) * 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-[28px] border border-[#E5E0D5] shadow-soft divide-y divide-[#E5E0D5] overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                {/* Product details */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F5F1E9] border border-[#E5E0D5] flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-base text-[#3E2723]">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#8C6D60]">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5F1E9] border border-[#E5E0D5] font-semibold text-[#3E2723]">
                        {item.selectedVariant.weight}
                      </span>
                      <span>₹{item.selectedVariant.price} each</span>
                    </div>

                    {item.personalizedMessage && (
                      <div className="mt-1.5 p-2 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[11px] text-[#5D4037]">
                        <strong>Personalized Note:</strong> {item.personalizedMessage}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E0D5]">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#E5E0D5] rounded-full bg-[#F5F1E9] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-[#3E2723] hover:bg-[#E5E0D5] transition-colors cursor-pointer font-bold text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-[#3E2723] min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-[#3E2723] hover:bg-[#E5E0D5] transition-colors cursor-pointer font-bold text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[80px]">
                    <span className="text-base font-bold text-[#1B5E20] block">
                      ₹{item.selectedVariant.price * item.quantity}
                    </span>
                    {item.selectedVariant.mrp > item.selectedVariant.price && (
                      <span className="text-[10px] text-[#8C6D60] line-through block">
                        ₹{item.selectedVariant.mrp * item.quantity}
                      </span>
                    )}
                  </div>

                  {/* Remove item */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#8C6D60] hover:text-red-600 transition-colors p-1.5 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={clearCart}
              className="text-[#8C6D60] hover:text-red-600 transition-colors font-semibold cursor-pointer"
            >
              Clear Cart
            </button>
            <span className="text-[#8C6D60]">
              All prices include GST
            </span>
          </div>
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-[28px] border border-[#E5E0D5] p-6 shadow-soft space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#3E2723] border-b border-[#E5E0D5] pb-3">
              Order Summary
            </h3>

            {/* Price lines */}
            <div className="space-y-3 text-xs sm:text-sm text-[#5D4037]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-[#3E2723]">₹{cartSubtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                {deliveryFee === 0 ? (
                  <span className="font-bold text-[#1B5E20]">FREE</span>
                ) : (
                  <span className="font-bold text-[#3E2723]">₹{deliveryFee}</span>
                )}
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#1B5E20] font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  <span>- ₹{cartDiscount}</span>
                </div>
              )}

              <div className="border-t border-[#E5E0D5] pt-3 flex justify-between items-baseline">
                <div>
                  <span className="font-serif font-bold text-base text-[#3E2723] block">
                    Total Amount:
                  </span>
                  <span className="text-[10px] text-[#8C6D60]">Including all taxes</span>
                </div>
                <span className="text-2xl font-extrabold text-[#1B5E20]">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* Coupon Code Box */}
            <div className="pt-2 border-t border-[#E5E0D5] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D60] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Apply Promo Code</span>
              </span>

              {appliedCoupon ? (
                <div className="p-3 rounded-2xl bg-[#E5EBDD] border border-[#1B5E20]/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#1B5E20]">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-[#5D4037]">{appliedCoupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SWAAD10, FESTIVE15"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3.5 py-2.5 rounded-full bg-[#F5F1E9] border border-[#E5E0D5] text-xs font-mono font-bold uppercase text-[#3E2723] placeholder-[#8C6D60] focus:outline-none focus:border-[#1B5E20]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#3E2723] hover:bg-[#2B1A17] text-white font-bold text-xs transition-colors cursor-pointer shadow-soft"
                  >
                    Apply
                  </button>
                </form>
              )}

              <div className="pt-1 text-[11px] text-[#8C6D60] flex items-center gap-2">
                <span>Suggested:</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('SWAAD10')}
                  className="font-bold text-[#1B5E20] hover:underline cursor-pointer"
                >
                  SWAAD10
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('FESTIVE15')}
                  className="font-bold text-[#1B5E20] hover:underline cursor-pointer"
                >
                  FESTIVE15
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => {
                setCurrentView('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-4 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white font-bold text-sm shadow-soft transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Assurances */}
            <div className="pt-2 text-[11px] text-[#8C6D60] flex items-center justify-center gap-4 text-center">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span>100% Safe Payments</span>
              </span>
              <span>•</span>
              <span>FSSAI Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
