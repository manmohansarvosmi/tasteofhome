import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Zap, MessageCircle } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    addToCart,
    setCurrentView,
    toggleWishlist,
    isInWishlist,
    openWhatsAppOrder,
  } = useStore();

  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      weight: '250g',
      price: 150,
      mrp: 180,
      inStock: true,
      inventory: 20,
    }
  );

  const discountPercent = Math.round(
    ((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100
  );

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppOrder(product.name, 1, selectedVariant.weight);
  };

  return (
    <div
      onClick={() => openProductDetail(product.id)}
      className="group bg-white rounded-2xl border border-[#E5E0D5] shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 sm:aspect-[16/11] overflow-hidden bg-[#F5F1E9]">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 font-sans">
          {product.badge && (
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-[#1B5E20] text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md bg-[#D4AF37] text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-[#3E2723] hover:text-[#D4AF37] shadow-xs hover:scale-110 active:scale-90 transition-all z-10 cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`}
          />
        </button>

        {/* Quick WhatsApp Ordering Pill */}
        <button
          type="button"
          onClick={handleWhatsApp}
          title="Order directly on WhatsApp"
          className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full bg-[#25D366] text-white text-[10px] font-semibold shadow-xs hover:opacity-100 hover:scale-105 transition-all z-10 cursor-pointer font-sans"
        >
          <MessageCircle className="w-3 h-3 fill-white" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and category */}
          <div className="flex items-center justify-between gap-1.5 mb-1 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D60] truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-[#F5F1E9] border border-[#E5E0D5] px-1.5 py-0.5 rounded text-[11px] shrink-0">
              <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-bold text-[#3E2723]">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[9px] text-[#8C6D60]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Titles */}
          <h3 className="font-serif text-[15px] sm:text-base font-bold text-[#3E2723] group-hover:text-[#1B5E20] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-[11px] text-[#8C6D60] font-serif italic mt-0.5 line-clamp-1">
              {product.hindiName}
            </p>
          )}

          {/* Short Description */}
          <p className="text-[11px] text-[#5D4037] line-clamp-1 mt-1 leading-normal font-sans">
            {product.shortDescription}
          </p>

          {/* Variants Selector */}
          <div className="mt-2.5 pt-2 border-t border-[#E5E0D5]/70 flex items-center justify-between gap-1">
            <span className="text-[9px] font-bold uppercase text-[#8C6D60] tracking-wider font-sans shrink-0">
              Pack:
            </span>
            <div className="flex flex-wrap gap-1 font-sans justify-end" onClick={(e) => e.stopPropagation()}>
              {product.variants.map((v) => {
                const isSelected = selectedVariant.weight === v.weight;
                return (
                  <button
                    key={v.weight}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-md border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1B5E20] bg-[#E5EBDD] text-[#1B5E20] font-bold'
                        : 'border-[#E5E0D5] bg-[#FDFBF7] text-[#5D4037] hover:border-[#D4AF37]'
                    }`}
                  >
                    {v.weight}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-2.5 pt-2 border-t border-[#E5E0D5]/70 font-sans">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-[#1B5E20]">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-[11px] text-[#8C6D60] line-through">
                  ₹{selectedVariant.mrp}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-[#8C6D60]">
              / {selectedVariant.weight}
            </span>
          </div>

          {/* Buttons: Add to Cart and Buy Now */}
          <div className="grid grid-cols-2 gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg border border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white transition-all text-[11px] font-bold active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#1B5E20] hover:bg-[#144317] text-white transition-all text-[11px] font-bold shadow-xs active:scale-95 cursor-pointer"
            >
              <Zap className="w-3 h-3 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
