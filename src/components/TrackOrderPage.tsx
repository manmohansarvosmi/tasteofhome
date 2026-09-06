import React, { useState, useEffect } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';

export const TrackOrderPage: React.FC = () => {
  const { orders, lastOrderId } = useStore();

  const [searchQuery, setSearchQuery] = useState(lastOrderId || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (lastOrderId) {
      setSearchQuery(lastOrderId);
      const match = orders.find(
        (o) =>
          o.id.toLowerCase() === lastOrderId.toLowerCase() ||
          (o.trackingNumber && o.trackingNumber.toLowerCase() === lastOrderId.toLowerCase())
      );
      setSearchedOrder(match || null);
      setHasSearched(true);
    } else if (orders.length > 0) {
      // Default to the first order
      setSearchedOrder(orders[0]);
      setSearchQuery(orders[0].id);
      setHasSearched(true);
    }
  }, [lastOrderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === q ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === q) ||
        o.customer.phone.includes(q)
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'Pending', label: 'Order Placed', desc: 'Received in kitchen' },
    { status: 'Confirmed', label: 'Confirmed', desc: 'Fresh batch assigned' },
    { status: 'Packed', label: 'Hygienically Packed', desc: 'Sealed with care' },
    { status: 'Shipped', label: 'Out for Delivery', desc: 'In express transit' },
    { status: 'Delivered', label: 'Delivered', desc: 'Enjoy Ghar Ka Swaad' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    const idx = steps.findIndex((s) => s.status === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.orderStatus) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-sans">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          Live Dispatch Status
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E2723]">
          Track Your Homemade Order
        </h1>
        <p className="text-xs sm:text-sm text-[#5D4037]">
          Enter your Order ID (e.g. <code>TOH-9281</code>) or your 10-digit mobile number.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C6D60] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Order ID or Mobile Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-[#E5E0D5] text-xs sm:text-sm text-[#3E2723] placeholder-[#8C6D60] focus:outline-none focus:border-[#1B5E20] shadow-soft"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white text-xs sm:text-sm font-bold shadow-soft transition-all active:scale-95 cursor-pointer"
        >
          Track
        </button>
      </form>

      {/* Order Status Display */}
      {searchedOrder ? (
        <div className="bg-white rounded-[28px] border border-[#E5E0D5] p-6 sm:p-8 shadow-soft space-y-8">
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E0D5] pb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D60]">
                Tracking Order
              </span>
              <h2 className="font-serif font-bold text-2xl text-[#3E2723]">
                #{searchedOrder.id}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#5D4037] mt-1">
                <span>Placed on: {searchedOrder.createdAt.split('T')[0] || searchedOrder.createdAt}</span>
                <span>•</span>
                <span className="font-semibold text-[#1B5E20]">
                  Status: {searchedOrder.orderStatus}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] text-left sm:text-right">
              <span className="text-[10px] text-[#8C6D60] uppercase font-bold block">
                Estimated Delivery
              </span>
              <span className="font-serif font-bold text-base text-[#1B5E20]">
                {searchedOrder.estimatedDelivery}
              </span>
              <span className="text-[10px] text-[#8C6D60] block">
                Via {searchedOrder.carrier || 'Delhivery Express'}
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="py-4">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-6 right-6 h-1 bg-[#E5E0D5] -z-0">
                <div
                  className="bg-[#1B5E20] h-full transition-all duration-500"
                  style={{
                    width: `${(currentStepIdx / (steps.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Steps Icons */}
              <div className="relative z-10 flex justify-between">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.status} className="flex flex-col items-center text-center max-w-[100px]">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-soft ${
                          isCompleted
                            ? 'bg-[#1B5E20] text-white ring-4 ring-[#E5EBDD]'
                            : 'bg-white border-2 border-[#E5E0D5] text-[#8C6D60]'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <h5 className={`mt-2 font-bold text-xs leading-tight ${isCurrent ? 'text-[#1B5E20]' : 'text-[#3E2723]'}`}>
                        {step.label}
                      </h5>
                      <p className="text-[10px] text-[#8C6D60] mt-0.5 hidden sm:block">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Package Details & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E5E0D5] text-xs">
            {/* Delivery address */}
            <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] space-y-2">
              <span className="font-bold text-[#3E2723] flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Delivery Address</span>
              </span>
              <p className="text-[#5D4037] leading-relaxed">
                <strong>{searchedOrder.customer.fullName}</strong><br />
                {searchedOrder.customer.address}<br />
                {searchedOrder.customer.city}, {searchedOrder.customer.state} - {searchedOrder.customer.pincode}<br />
                Phone: +91 {searchedOrder.customer.phone}
              </p>
            </div>

            {/* Courier & Dispatch details */}
            <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] space-y-2">
              <span className="font-bold text-[#3E2723] flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <Truck className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span>Shipment Particulars</span>
              </span>
              <p className="text-[#5D4037] leading-relaxed">
                Carrier: <strong>{searchedOrder.carrier || 'Delhivery Express'}</strong><br />
                AWB / Tracking: <strong>{searchedOrder.trackingNumber || 'Available upon dispatch'}</strong><br />
                Payment: <strong>{searchedOrder.paymentMethod.toUpperCase()} ({searchedOrder.paymentStatus})</strong><br />
                Total Amount: <strong>₹{searchedOrder.total}</strong>
              </p>
            </div>
          </div>

          {/* Items in package */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif font-bold text-base text-[#3E2723]">
              Items In This Package ({searchedOrder.items.length})
            </h4>

            <div className="divide-y divide-[#E5E0D5]">
              {searchedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-[#E5E0D5]"
                    />
                    <div>
                      <span className="font-bold text-[#3E2723] block">
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
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white rounded-[28px] p-10 text-center border border-[#E5E0D5] shadow-soft space-y-3">
          <AlertCircle className="w-10 h-10 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#3E2723]">
            No order found for "{searchQuery}"
          </h3>
          <p className="text-xs text-[#8C6D60] max-w-sm mx-auto">
            Please double-check your Order ID or phone number. Sample order IDs in your store: <code>TOH-9281</code>, <code>TOH-9280</code>.
          </p>
        </div>
      ) : null}
    </div>
  );
};
