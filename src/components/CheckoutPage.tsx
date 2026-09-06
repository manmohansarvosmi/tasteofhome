import React, { useState } from 'react';
import {
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  ArrowRight,
  ChevronLeft,
  Printer,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Order, CustomerDetails, PaymentMethod } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    placeOrder,
    setCurrentView,
    setLastOrderId,
    showToast,
  } = useStore();

  const [customerForm, setCustomerForm] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Madhya Pradesh',
    pincode: '',
    deliveryInstructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // If cart is empty and no completed order, redirect to shop
  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4 font-sans">
        <h3 className="font-serif text-2xl font-bold text-[#3E2723]">No items in cart</h3>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white text-xs font-bold shadow-soft cursor-pointer"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  // Handle Order Submit
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!customerForm.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!customerForm.phone.trim() || customerForm.phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!customerForm.address.trim() || !customerForm.city.trim() || !customerForm.pincode.trim()) {
      showToast('Please complete your street address, city and PIN code', 'error');
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway authentication and order creation
    setTimeout(() => {
      const order = placeOrder(
        customerForm,
        paymentMethod,
        customerForm.deliveryInstructions
      );

      setIsProcessing(false);
      setCompletedOrder(order);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#1B5E20', '#E5E0D5', '#3E2723'],
        });
      } catch (err) {
        // Fallback
      }

      showToast('Order placed successfully! Welcome to Taste of Home ❤️');
    }, 1200);
  };

  // ORDER CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-500 font-sans">
        {/* Success Banner */}
        <div className="bg-white rounded-[28px] p-8 border border-[#1B5E20] shadow-soft text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#E5EBDD] text-[#1B5E20] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="px-3.5 py-1 rounded-full bg-[#E5EBDD] text-[#1B5E20] text-xs font-bold uppercase tracking-wider inline-block">
            Order Confirmed & Freshly Scheduled
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E2723]">
            Dhanyawad, {completedOrder.customer.fullName}! ❤️
          </h1>

          <p className="text-sm text-[#5D4037] max-w-lg mx-auto">
            Your homemade delicacies have been scheduled for batch preparation and hygienic packing. An SMS and WhatsApp notification has been dispatched to{' '}
            <strong>{completedOrder.customer.phone}</strong>.
          </p>

          {/* Key order metadata pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E5E0D5] text-left">
            <div className="p-3 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
              <span className="text-[10px] text-[#8C6D60] uppercase font-bold block">Order Number</span>
              <span className="text-xs font-mono font-bold text-[#3E2723]">{completedOrder.id}</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
              <span className="text-[10px] text-[#8C6D60] uppercase font-bold block">Estimated Delivery</span>
              <span className="text-xs font-bold text-[#1B5E20]">{completedOrder.estimatedDelivery}</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#8C6D60] uppercase font-bold block">Payment Status</span>
              <span className="text-xs font-bold text-[#3E2723] uppercase">
                {completedOrder.paymentStatus} ({completedOrder.paymentMethod})
              </span>
            </div>
          </div>
        </div>

        {/* Ordered items breakdown */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E5E0D5] shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
            <h3 className="font-serif font-bold text-lg text-[#3E2723]">
              Package Contents
            </h3>
            <span className="text-xs text-[#8C6D60]">
              Tracking: <strong className="font-mono text-[#1B5E20]">{completedOrder.trackingNumber}</strong>
            </span>
          </div>

          <div className="divide-y divide-[#E5E0D5]">
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F1E9] overflow-hidden border border-[#E5E0D5] flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-[#3E2723]">
                      {item.product.name}
                    </h5>
                    <span className="text-[11px] text-[#8C6D60]">
                      {item.selectedVariant.weight} × {item.quantity}
                    </span>
                    {item.personalizedMessage && (
                      <p className="text-[10px] text-[#D4AF37] italic">Note: {item.personalizedMessage}</p>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs font-bold text-[#1B5E20]">
                  ₹{item.selectedVariant.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Receipt Financials */}
          <div className="pt-3 border-t border-[#E5E0D5] space-y-1.5 text-xs text-[#5D4037]">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span>₹{completedOrder.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span>{completedOrder.deliveryFee === 0 ? 'FREE' : `₹${completedOrder.deliveryFee}`}</span>
            </div>
            {completedOrder.discount > 0 && (
              <div className="flex justify-between text-[#1B5E20]">
                <span>Discount:</span>
                <span>- ₹{completedOrder.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#3E2723] pt-2 border-t border-[#E5E0D5]">
              <span>Total Paid / Payable:</span>
              <span className="text-[#1B5E20]">₹{completedOrder.total}</span>
            </div>
          </div>

          {/* Delivery Address Review */}
          <div className="pt-4 border-t border-[#E5E0D5] text-xs text-[#8C6D60]">
            <strong className="text-[#3E2723] block mb-1">Delivering to:</strong>
            <p>
              {completedOrder.customer.fullName}, {completedOrder.customer.address},{' '}
              {completedOrder.customer.city}, {completedOrder.customer.state} -{' '}
              {completedOrder.customer.pincode}
            </p>
            {completedOrder.customer.deliveryInstructions && (
              <p>Instructions: {completedOrder.customer.deliveryInstructions}</p>
            )}
            <p>Phone: +91 {completedOrder.customer.phone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              setLastOrderId(completedOrder.id);
              setCurrentView('track-order');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 py-3.5 px-4 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white text-xs sm:text-sm font-bold shadow-soft transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Progress</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="py-3.5 px-6 rounded-full bg-white border border-[#E5E0D5] text-[#3E2723] hover:bg-[#F5F1E9] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-soft"
          >
            <Printer className="w-4 h-4" />
            <span>Print Tax Receipt</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="py-3.5 px-6 rounded-full bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] hover:bg-[#E5E0D5] text-xs font-bold transition-all cursor-pointer text-center"
          >
            Back to Pantry
          </button>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('cart')}
        className="text-xs font-bold text-[#1B5E20] hover:underline flex items-center gap-1.5 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </button>

      <div className="border-b border-[#E5E0D5] pb-3">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723]">
          Safe & Secure Checkout
        </h1>
        <p className="text-xs text-[#8C6D60]">
          Hygienic small-batch preparation begins once your address is confirmed.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Customer & Shipping Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E5E0D5] shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#3E2723] border-b border-[#E5E0D5] pb-2">
              1. Contact & Customer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#8C6D60] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Sharma"
                  value={customerForm.fullName}
                  onChange={(e) => setCustomerForm({ ...customerForm, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#8C6D60] mb-1">10-Digit Mobile Number *</label>
                <div className="flex">
                  <span className="p-3 bg-[#E5E0D5]/50 border border-r-0 border-[#E5E0D5] rounded-l-xl text-xs font-bold text-[#5D4037]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full p-3 rounded-r-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-[#8C6D60] mb-1">Email Address (for invoice & tracking)</label>
              <input
                type="email"
                placeholder="e.g. suman.sharma@example.com"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E5E0D5] shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#3E2723] border-b border-[#E5E0D5] pb-2">
              2. Delivery Address
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#8C6D60] mb-1">
                  Flat, House No., Building, Street & Locality *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 302, Royal Residency, Park Street"
                  value={customerForm.address}
                  onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhopal"
                    value={customerForm.city}
                    onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={customerForm.state}
                    onChange={(e) => setCustomerForm({ ...customerForm, state: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="462001"
                    value={customerForm.pincode}
                    onChange={(e) => setCustomerForm({ ...customerForm, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#8C6D60] mb-1">Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Call before delivery, Leave with security"
                  value={customerForm.deliveryInstructions || ''}
                  onChange={(e) => setCustomerForm({ ...customerForm, deliveryInstructions: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E5E0D5] shadow-soft space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#3E2723] border-b border-[#E5E0D5] pb-2">
              3. Select Payment Method
            </h3>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#1B5E20] bg-[#E5EBDD]/40 ring-1 ring-[#1B5E20]'
                    : 'border-[#E5E0D5] hover:bg-[#F5F1E9]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#1B5E20]"
                    />
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#1B5E20]" />
                      <span className="font-bold text-xs sm:text-sm text-[#3E2723]">
                        UPI (Instant & Zero Surcharge)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#D4AF37] text-white px-2.5 py-0.5 rounded-full font-bold">
                    Fastest
                  </span>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="pt-2 border-t border-[#E5E0D5] space-y-2 text-xs">
                    <div className="flex gap-2">
                      {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                        <span key={app} className="px-2.5 py-1 rounded-full bg-white border border-[#E5E0D5] text-[11px] font-semibold text-[#1B5E20]">
                          {app}
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. mobile@okaxis, yourname@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
                    />
                  </div>
                )}
              </label>

              {/* Card Option */}
              <label
                className={`p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#1B5E20] bg-[#E5EBDD]/40 ring-1 ring-[#1B5E20]'
                    : 'border-[#E5E0D5] hover:bg-[#F5F1E9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#1B5E20]"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#1B5E20]" />
                    <span className="font-bold text-xs sm:text-sm text-[#3E2723]">
                      Credit / Debit Card (Visa, RuPay, MasterCard)
                    </span>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="pt-2 border-t border-[#E5E0D5] space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Card Number (16 Digits)"
                      maxLength={19}
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs focus:outline-none focus:border-[#1B5E20]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs focus:outline-none focus:border-[#1B5E20]"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={3}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs focus:outline-none focus:border-[#1B5E20]"
                      />
                    </div>
                  </div>
                )}
              </label>

              {/* Cash on Delivery (COD) */}
              <label
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#1B5E20] bg-[#E5EBDD]/40 ring-1 ring-[#1B5E20]'
                    : 'border-[#E5E0D5] hover:bg-[#F5F1E9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#1B5E20]"
                  />
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-bold text-xs sm:text-sm text-[#3E2723]">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#8C6D60]">Pay at your doorstep</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Col: Sticky Order Review */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[28px] border border-[#E5E0D5] p-6 shadow-soft space-y-5 sticky top-24">
            <h3 className="font-serif font-bold text-lg text-[#3E2723] border-b border-[#E5E0D5] pb-3">
              Order Items ({cart.length})
            </h3>

            <div className="max-h-60 overflow-y-auto divide-y divide-[#E5E0D5] space-y-2 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-[#E5E0D5]"
                    />
                    <div>
                      <span className="font-serif font-bold text-[#3E2723] block truncate max-w-[150px]">
                        {item.product.name}
                      </span>
                      <span className="text-[11px] text-[#8C6D60]">
                        {item.selectedVariant.weight} × {item.quantity}
                      </span>
                    </div>
                  </div>

                  <span className="font-bold text-[#1B5E20]">
                    ₹{item.selectedVariant.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials breakdown */}
            <div className="pt-3 border-t border-[#E5E0D5] space-y-2 text-xs text-[#5D4037]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#3E2723]">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                {deliveryFee === 0 ? (
                  <span className="font-bold text-[#1B5E20]">FREE</span>
                ) : (
                  <span>₹{deliveryFee}</span>
                )}
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#1B5E20]">
                  <span>Promo Discount ({appliedCoupon?.code}):</span>
                  <span>- ₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#3E2723] pt-2 border-t border-[#E5E0D5]">
                <span>Total Payable:</span>
                <span className="text-2xl font-extrabold text-[#1B5E20]">₹{cartTotal}</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-full bg-[#1B5E20] hover:bg-[#144317] disabled:bg-gray-400 text-white font-bold text-sm shadow-soft transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order • ₹{cartTotal}</span>
                </>
              )}
            </button>

            <div className="pt-1 text-[11px] text-center text-[#8C6D60] space-y-1">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span>256-bit SSL encrypted bank transaction</span>
              </div>
              <p>Dispatch within 24 hours from Gwalior kitchen</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
