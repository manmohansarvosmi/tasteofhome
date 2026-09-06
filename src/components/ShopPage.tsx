import React, { useState, useMemo } from 'react';
import {
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
  Gift,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryType } from '../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    hampers,
    selectedCategory,
    setSelectedCategory,
    setCurrentView,
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: CategoryType[] = [
    'All',
    'Namkeen & Snacks',
    'Traditional Sweets',
    'Pickles',
    'Papad',
    'Homemade Special',
    'Gift Hampers',
  ];

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All' && selectedCategory !== 'Gift Hampers') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // In-stock only filter
    if (inStockOnly) {
      result = result.filter((p) => p.variants.some((v) => v.inStock));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: featured order
      result.sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
    }

    return result;
  }, [products, selectedCategory, searchFilter, inStockOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 font-sans">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          Fresh Homemade Delicacies
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E2723]">
          Traditional Snacks & Sweets Pantry
        </h1>
        <p className="text-xs sm:text-sm text-[#5D4037]">
          Every item is prepared in small hygienic batches with pure ingredients. Select your desired pack size (250g, 500g, or 1kg).
        </p>
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white rounded-[28px] p-4 sm:p-6 border border-[#E5E0D5] shadow-soft space-y-4 font-sans">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  if (cat === 'Gift Hampers') {
                    setCurrentView('hampers');
                  } else {
                    setSelectedCategory(cat);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B5E20] text-white shadow-soft font-bold'
                    : 'bg-[#F5F1E9] text-[#5D4037] hover:bg-[#E5E0D5]'
                }`}
              >
                {cat === 'Gift Hampers' ? '🎁 ' + cat : cat}
              </button>
            );
          })}
        </div>

        {/* Search, Sort and Stock Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E5E0D5]">
          
          {/* Search in Shop */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter by name, spice..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-[#F5F1E9] rounded-full border border-[#E5E0D5] text-xs text-[#3E2723] placeholder-[#8C6D60] focus:outline-none focus:border-[#1B5E20]"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-2.5 text-[#8C6D60] hover:text-[#3E2723]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 text-xs text-[#5D4037] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#1B5E20] focus:ring-[#1B5E20] accent-[#1B5E20]"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#F5F1E9] border border-[#E5E0D5] rounded-full px-3 py-1.5 text-xs text-[#3E2723]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-[28px] p-12 text-center border border-[#E5E0D5] space-y-3 font-sans">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#3E2723]">
            No snacks found matching your filters
          </h3>
          <p className="text-xs text-[#8C6D60] max-w-sm mx-auto">
            Try resetting your search or category filter to discover all 10 authentic delicacies.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchFilter('');
              setInStockOnly(false);
            }}
            className="px-6 py-2.5 rounded-full bg-[#1B5E20] text-white text-xs font-bold shadow-soft hover:bg-[#144317] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Gift Hamper Callout Banner */}
      <div className="rounded-[28px] bg-white border-2 border-[#D4AF37] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft font-sans">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-[#3E2723]">
              Planning Diwali or Festive Gifting?
            </h4>
            <p className="text-xs text-[#5D4037] mt-0.5">
              Explore our curated gift hampers with personalized greeting cards, handcrafted diyas, and royal trunk box packaging.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('hampers');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-full bg-[#3E2723] hover:bg-[#2B1A17] text-white text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer shadow-soft"
        >
          View Diwali Hampers →
        </button>
      </div>

    </div>
  );
};
