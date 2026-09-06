import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  ShieldCheck,
  Award,
  ChevronLeft,
  Share2,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant, CustomerReview } from '../types';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    setCurrentView,
    addToCart,
    openWhatsAppOrder,
    toggleWishlist,
    isInWishlist,
    showToast,
    addCustomerReview,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product?.variants[0] || {
      weight: '250g',
      price: 150,
      mrp: 180,
      inStock: true,
      inventory: 20,
    }
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'ingredients' | 'nutrition' | 'storage' | 'reviews'
  >('description');

  // Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    location: '',
    rating: 5,
    title: '',
    comment: '',
  });

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppOrder = () => {
    openWhatsAppOrder(product.name, quantity, selectedVariant.weight);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard! 📋');
    } else {
      showToast('Share Taste of Home with your friends & family!');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.customerName.trim() || !reviewForm.comment.trim()) {
      showToast('Please fill in your name and review', 'error');
      return;
    }

    addCustomerReview({
      customerName: reviewForm.customerName.trim(),
      location: reviewForm.location.trim() || 'India',
      rating: reviewForm.rating,
      title: reviewForm.title.trim() || 'Authentic Homemade Quality',
      comment: reviewForm.comment.trim(),
      productPurchased: product.name,
      verified: true,
    });

    setShowReviewModal(false);
    setReviewForm({
      customerName: '',
      location: '',
      rating: 5,
      title: '',
      comment: '',
    });
  };

  // Related products (same category or bestsellers excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isBestSeller))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-sans">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-[#8C6D60]">
        <button
          onClick={() => setCurrentView('shop')}
          className="flex items-center gap-1.5 hover:text-[#1B5E20] font-semibold transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 hover:text-[#3E2723] font-medium transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Delicacy</span>
        </button>
      </div>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-1/1 rounded-[28px] overflow-hidden bg-[#F5F1E9] border border-[#E5E0D5] shadow-soft">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1 text-xs font-bold uppercase rounded-full bg-[#1B5E20] text-white shadow-soft">
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase rounded-md bg-[#D4AF37] text-white shadow-soft">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#1B5E20] ring-2 ring-[#1B5E20]/20 shadow-sm'
                      : 'border-[#E5E0D5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E0D5]">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#E5E0D5]">
              <Award className="w-5 h-5 text-[#D4AF37] mb-1" />
              <span className="text-[11px] font-bold text-[#3E2723]">Traditional Recipe</span>
              <span className="text-[10px] text-[#8C6D60]">Authentic spices</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#E5E0D5]">
              <ShieldCheck className="w-5 h-5 text-[#1B5E20] mb-1" />
              <span className="text-[11px] font-bold text-[#3E2723]">Hygienic Kitchen</span>
              <span className="text-[10px] text-[#8C6D60]">Airtight packing</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#E5E0D5]">
              <Truck className="w-5 h-5 text-[#D4AF37] mb-1" />
              <span className="text-[11px] font-bold text-[#3E2723]">Pan-India Delivery</span>
              <span className="text-[10px] text-[#8C6D60]">Express shipping</span>
            </div>
          </div>
        </div>

        {/* Right Col: Product Information & Purchase Area */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Category and Rating */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#E5E0D5] text-xs font-bold uppercase tracking-wider text-[#8C6D60]">
                {product.category}
              </span>

              <div className="flex items-center gap-1.5 bg-[#F5F1E9] border border-[#E5E0D5] px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="text-xs font-bold text-[#3E2723]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-[#8C6D60]">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Title & Hindi Title */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2723] leading-tight">
                {product.name}
              </h1>
              {product.hindiName && (
                <p className="text-sm sm:text-base text-[#8C6D60] font-serif italic mt-1">
                  {product.hindiName}
                </p>
              )}
            </div>

            {/* Price & MRP Block */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] flex items-baseline gap-3 shadow-2xs">
              <span className="text-3xl font-extrabold text-[#1B5E20]">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-sm text-[#8C6D60] line-through">
                  MRP ₹{selectedVariant.mrp}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#F5F1E9] text-[#D4AF37] font-bold text-xs border border-[#E5E0D5]">
                  Save ₹{selectedVariant.mrp - selectedVariant.price} ({discountPercent}%)
                </span>
              )}
              <span className="text-xs text-[#8C6D60] ml-auto">
                Inclusive of all taxes
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#5D4037] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variant Selector (250g / 500g / 1kg) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8C6D60]">
                  Available Quantities / Pack Sizes:
                </label>
                <span className="text-xs text-[#1B5E20] font-semibold">
                  {selectedVariant.inStock ? '● In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.weight === v.weight;
                  return (
                    <button
                      key={v.weight}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1B5E20] bg-[#E5EBDD] ring-1 ring-[#1B5E20] shadow-2xs'
                          : 'border-[#E5E0D5] bg-white hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className={`text-sm font-bold ${isSelected ? 'text-[#1B5E20]' : 'text-[#3E2723]'}`}>
                        {v.weight}
                      </div>
                      <div className="text-xs text-[#8C6D60] mt-0.5 font-medium">
                        ₹{v.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D60]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#E5E0D5] rounded-full bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-[#3E2723] hover:bg-[#F5F1E9] transition-colors font-bold text-sm cursor-pointer"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-bold text-[#3E2723] min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-[#3E2723] hover:bg-[#F5F1E9] transition-colors font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-[#8C6D60]">
                Total: <strong className="text-[#3E2723]">₹{selectedVariant.price * quantity}</strong>
              </span>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-full border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white text-sm font-bold shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white text-sm font-bold shadow-soft transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Direct WhatsApp Ordering */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-soft transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp (Instant Response)</span>
              </button>
            </div>

            {/* Delivery Assurance */}
            <div className="p-3.5 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#5D4037] flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#1B5E20] flex-shrink-0" />
              <span>
                Dispatches fresh within 24 hours. Free delivery on orders above ₹499!
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Comprehensive Product Tabs Section */}
      <div className="bg-white rounded-[28px] border border-[#E5E0D5] shadow-soft p-6 sm:p-8 space-y-6">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#E5E0D5] pb-3">
          {[
            { id: 'description', label: 'Description' },
            { id: 'ingredients', label: 'Ingredients' },
            { id: 'nutrition', label: 'Nutrition Information' },
            { id: 'storage', label: 'Shelf Life & Storage' },
            { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#3E2723] text-white shadow-soft'
                    : 'text-[#8C6D60] hover:text-[#3E2723] hover:bg-[#F5F1E9]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Detailed Description */}
        {activeTab === 'description' && (
          <div className="space-y-4 text-sm text-[#5D4037] leading-relaxed max-w-3xl font-sans">
            <h3 className="font-serif text-xl font-bold text-[#3E2723]">
              About {product.name}
            </h3>
            <p>{product.fullDescription}</p>
            <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] space-y-1">
              <span className="font-bold block text-[#1B5E20]">Traditional Assurance:</span>
              <p>
                Our batches are kept deliberately small (only 10-15 kg per preparation) to guarantee that each jar or pouch captures the same freshness and aroma as traditional home cooking.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Ingredients */}
        {activeTab === 'ingredients' && (
          <div className="space-y-4 max-w-3xl font-sans">
            <h3 className="font-serif text-xl font-bold text-[#3E2723]">
              100% Pure, Natural Ingredients
            </h3>
            <p className="text-xs text-[#5D4037]">
              We source stone-ground flours, whole Indian spices, and pure unadulterated oils from trusted regional farmers.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {product.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full bg-[#F5F1E9] border border-[#E5E0D5] text-xs font-medium text-[#3E2723]"
                >
                  ✓ {ing}
                </span>
              ))}
            </div>
            <div className="pt-2 text-xs text-[#8C6D60]">
              <strong className="text-[#3E2723]">Allergen Notice:</strong> {product.allergenInfo}
            </div>
          </div>
        )}

        {/* Tab 3: Nutrition Information Table */}
        {activeTab === 'nutrition' && (
          <div className="space-y-4 max-w-2xl font-sans">
            <div className="flex items-baseline justify-between">
              <h3 className="font-serif text-xl font-bold text-[#3E2723]">
                Nutritional Values
              </h3>
              <span className="text-xs text-[#8C6D60]">
                Approximate values per {product.nutritionInfo.servingSize}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#E5E0D5]">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F5F1E9] text-[#3E2723] border-b border-[#E5E0D5] font-bold">
                  <tr>
                    <th className="p-3">Nutrient Parameter</th>
                    <th className="p-3">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D5] text-[#5D4037]">
                  <tr>
                    <td className="p-3 font-medium">Energy / Calories</td>
                    <td className="p-3 font-bold text-[#1B5E20]">{product.nutritionInfo.calories}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Protein</td>
                    <td className="p-3">{product.nutritionInfo.protein}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Carbohydrates</td>
                    <td className="p-3">{product.nutritionInfo.carbs}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Dietary Fat</td>
                    <td className="p-3">{product.nutritionInfo.fat}</td>
                  </tr>
                  {product.nutritionInfo.sugar && (
                    <tr>
                      <td className="p-3 font-medium">Sugars</td>
                      <td className="p-3">{product.nutritionInfo.sugar}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#8C6D60]">
              * Percent daily values are based on a 2,000-calorie diet. Values may vary naturally due to artisanal handcrafted ingredients.
            </p>
          </div>
        )}

        {/* Tab 4: Shelf Life & Storage */}
        {activeTab === 'storage' && (
          <div className="space-y-4 max-w-3xl text-sm text-[#5D4037] leading-relaxed font-sans">
            <h3 className="font-serif text-xl font-bold text-[#3E2723]">
              Shelf Life & Storage Instructions
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B5E20] uppercase mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Shelf Life</span>
                </div>
                <p className="font-serif text-base font-bold text-[#3E2723]">
                  {product.shelfLife}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>FSSAI License</span>
                </div>
                <p className="text-xs text-[#3E2723] font-medium">
                  {product.fssaiInfo}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5]">
              <span className="text-xs font-bold text-[#3E2723] block mb-1">
                How to preserve authentic crispness:
              </span>
              <p className="text-xs">{product.storageInstructions}</p>
            </div>
          </div>
        )}

        {/* Tab 5: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 max-w-3xl font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#3E2723]">
                  Customer Reviews
                </h3>
                <p className="text-xs text-[#8C6D60]">
                  Rated {product.rating} / 5 based on verified family orders
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="px-5 py-2.5 rounded-full bg-[#1B5E20] hover:bg-[#144317] text-white text-xs font-bold shadow-soft cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            {/* Review form modal */}
            {showReviewModal && (
              <form
                onSubmit={handleReviewSubmit}
                className="p-6 rounded-2xl bg-[#F5F1E9] border border-[#D4AF37] space-y-3 animate-in fade-in"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#3E2723]">Share your experience</h4>
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="text-xs text-[#8C6D60] hover:text-[#3E2723] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={reviewForm.customerName}
                    onChange={(e) => setReviewForm({ ...reviewForm, customerName: e.target.value })}
                    className="p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs focus:outline-none focus:border-[#1B5E20]"
                  />
                  <input
                    type="text"
                    placeholder="City (e.g. Jaipur, Bengaluru)"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    className="p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs focus:outline-none focus:border-[#1B5E20]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8C6D60]">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewForm.rating
                              ? 'fill-[#D4AF37] text-[#D4AF37]'
                              : 'text-[#E5E0D5]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Review Title (e.g. Delicious homemade mathri!)"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs focus:outline-none focus:border-[#1B5E20]"
                />

                <textarea
                  rows={3}
                  required
                  placeholder="Tell others what you loved about the taste, packaging or texture..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs focus:outline-none focus:border-[#1B5E20] resize-none"
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1B5E20] text-white text-xs font-bold shadow-soft hover:bg-[#144317] cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Sample reviews list */}
            <div className="space-y-4 divide-y divide-[#E5E0D5]">
              <div className="pt-3 space-y-1.5">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <h5 className="font-bold text-xs text-[#3E2723]">
                  Just like my grandmother’s kitchen in Madhya Pradesh!
                </h5>
                <p className="text-xs text-[#5D4037]">
                  The spices are authentic, crunch is sublime, and no oily aftertaste at all. Highly satisfied!
                </p>
                <p className="text-[10px] text-[#8C6D60]">
                  By Sangeeta Mathur (Gwalior) • Verified Purchase
                </p>
              </div>

              <div className="pt-3 space-y-1.5">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <h5 className="font-bold text-xs text-[#3E2723]">
                  Airtight packing kept it super fresh!
                </h5>
                <p className="text-xs text-[#5D4037]">
                  Ordered to Bengaluru. It arrived within 3 days without a single broken piece. The aroma when opening the pack was heavenly.
                </p>
                <p className="text-[10px] text-[#8C6D60]">
                  By R. Narayanan (Bengaluru) • Verified Purchase
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* "You may also like" Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#E5E0D5] font-sans">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Complete Your Platter
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#3E2723]">
                You May Also Like
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-bold text-[#1B5E20] hover:underline cursor-pointer"
            >
              View More Delicacies →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
