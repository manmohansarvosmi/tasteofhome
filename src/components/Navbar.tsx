import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { Logo } from './Logo';
import { useStore, ViewType } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    cartSubtotal,
    wishlistIds,
    searchQuery,
    setSearchQuery,
    products,
    openProductDetail,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks: { label: string; view: ViewType; badge?: string }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Gift Hampers', view: 'hampers', badge: 'Diwali Special' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  // Quick filtered products for search overlay
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* --- TOP ANNOUNCEMENT BAR --- */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E0D5] shadow-xs">
        <div className="bg-[#3E2723] text-[#FDFBF7] text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 font-sans font-medium tracking-wide">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span>
                Festive Season Special: Use code <strong className="text-[#D4AF37] font-bold">SWAAD10</strong> for 10% off on all Hampers & Sweets!
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-[#E5E0D5]">
              <span className="hidden md:inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Free Delivery Above ₹499
              </span>
              <span className="hidden sm:inline-block text-[#795548]">•</span>
              <button
                onClick={() => handleNavClick('track-order')}
                className="hover:text-white transition-colors underline cursor-pointer"
              >
                Track Order
              </button>
              <span className="text-[#795548]">•</span>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-[#D4AF37] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Portal
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN HEADER --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Mobile Hamburger Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full text-[#3E2723] hover:bg-[#F5F1E9] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* BRAND LOGO */}
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer py-1.5 flex items-center group transition-transform duration-200 active:scale-95"
            >
              <Logo size="md" variant="full" />
            </div>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium font-sans uppercase tracking-wider">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.view}
                    onClick={() => handleNavClick(link.view)}
                    className={`relative py-2 transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#1B5E20] font-bold border-b-2 border-[#1B5E20]'
                        : 'text-[#3E2723] hover:text-[#1B5E20]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-[#D4AF37] text-white shadow-2xs">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT UTILITY ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-[#F5F1E9] hover:bg-[#EFEAE1] border border-[#E5E0D5] rounded-full text-xs font-sans text-[#5D4037] transition-colors cursor-pointer"
                aria-label="Search goodness"
              >
                <Search className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span className="opacity-70">Search goodness...</span>
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2.5 rounded-full text-[#3E2723] hover:bg-[#F5F1E9] hover:text-[#1B5E20] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                type="button"
                onClick={() => handleNavClick('shop')}
                className="p-2.5 rounded-full text-[#3E2723] hover:bg-[#F5F1E9] hover:text-[#D4AF37] transition-colors cursor-pointer relative"
                aria-label="Wishlist"
                title={`${wishlistIds.length} items in Wishlist`}
              >
                <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#D4AF37] rounded-full font-sans">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => handleNavClick('cart')}
                className="flex items-center gap-2 pl-3.5 pr-4 py-2 rounded-full bg-[#1B5E20] text-white hover:bg-[#144317] transition-all shadow-soft active:scale-95 cursor-pointer ml-1 font-sans"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4.5 h-4.5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] font-bold text-[#1B5E20] bg-[#D4AF37] rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold tracking-wider hidden sm:inline-block">
                  {cartCount === 0 ? 'Cart' : `₹${cartSubtotal}`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE NAVIGATION DRAWER --- */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5E0D5] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
            <div className="mb-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#F5F1E9] text-[#5D4037] text-sm text-left border border-[#E5E0D5] font-sans"
              >
                <Search className="w-4 h-4 text-[#1B5E20]" />
                <span>Search goodness (snacks, sweets, pickles)...</span>
              </button>
            </div>

            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-sans font-semibold uppercase tracking-wider transition-colors text-left ${
                    isActive
                      ? 'bg-[#1B5E20] text-white'
                      : 'text-[#3E2723] hover:bg-[#F5F1E9]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-[#D4AF37] text-white"
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-[#E5E0D5] flex flex-col gap-2.5">
              <button
                onClick={() => handleNavClick('track-order')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-sans font-medium text-[#3E2723] bg-[#F5F1E9]"
              >
                <span>Track Your Order</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium text-[#3E2723] bg-[#F5F1E9]"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
                  Store Owner Admin
                </span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- SEARCH MODAL OVERLAY --- */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200 font-sans">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-[28px] shadow-soft border border-[#E5E0D5] overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E5E0D5] flex items-center gap-3 bg-[#F5F1E9]">
              <Search className="w-5 h-5 text-[#D4AF37]" />
              <input
                type="text"
                autoFocus
                placeholder="Search homemade goodness... (e.g. Gujiya, Mathri, Pickle, Hamper)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[#3E2723] placeholder-[#8C6D60] text-base font-medium focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#8C6D60] hover:text-[#3E2723] px-2 py-1 bg-[#E5E0D5] rounded-md cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-full text-[#3E2723] hover:bg-[#E5E0D5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="px-5 py-2.5 bg-[#F5F1E9] border-b border-[#E5E0D5] flex items-center gap-2 overflow-x-auto text-xs text-[#5D4037]">
              <span className="font-semibold text-[#8C6D60]">Popular:</span>
              {['Gujiya', 'Mathri', 'Poha Chivda', 'Aam Pickle', 'Diwali Hamper', 'Besan Ladoo'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 rounded-full bg-white border border-[#E5E0D5] hover:border-[#1B5E20] hover:text-[#1B5E20] whitespace-nowrap transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div className="p-4 overflow-y-auto flex-1 divide-y divide-[#E5E0D5]">
              {searchQuery.trim() === '' ? (
                <div className="py-12 text-center text-[#8C6D60]">
                  <Sparkles className="w-8 h-8 mx-auto text-[#D4AF37] mb-2 opacity-80" />
                  <p className="font-medium text-sm">Type any traditional Indian snack, sweet or pickle above</p>
                  <p className="text-xs text-[#A88C80] mt-1">Try "Bhakarbadi", "Nimbu Pickle", or "Ladoo"</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-12 text-center text-[#8C6D60]">
                  <p className="font-semibold text-base text-[#3E2723]">No homemade foods found for "{searchQuery}"</p>
                  <p className="text-xs mt-1 text-[#8C6D60]">Please check the spelling or explore our complete Shop page.</p>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      handleNavClick('shop');
                    }}
                    className="mt-4 px-5 py-2.5 rounded-full bg-[#1B5E20] text-white text-xs font-semibold hover:bg-[#144317] shadow-soft cursor-pointer"
                  >
                    Browse All Products
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#8C6D60] uppercase tracking-wider mb-2">
                    Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'}
                  </div>
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        openProductDetail(prod.id);
                        setSearchOpen(false);
                      }}
                      className="p-3 rounded-2xl hover:bg-[#F5F1E9] transition-colors cursor-pointer flex items-center gap-3 group"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover border border-[#E5E0D5] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-[#3E2723] text-sm group-hover:text-[#1B5E20] truncate">
                            {prod.name}
                          </h4>
                          {prod.hindiName && (
                            <span className="text-xs text-[#8C6D60] font-serif hidden sm:inline">
                              {prod.hindiName}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5D4037] line-clamp-1 mt-0.5">
                          {prod.shortDescription}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-[#1B5E20]">
                            Starting from ₹{prod.variants[0].price}
                          </span>
                          <span className="text-[11px] text-[#8C6D60]">
                            ({prod.variants[0].weight})
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#F5F1E9] border-t border-[#E5E0D5] text-center">
              <button
                onClick={() => {
                  setSearchOpen(false);
                  handleNavClick('shop');
                }}
                className="text-xs font-semibold text-[#1B5E20] hover:underline cursor-pointer"
              >
                View full product catalog in Shop →
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
