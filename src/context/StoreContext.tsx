import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  ProductVariant,
  GiftHamper,
  CartItem,
  Order,
  OrderStatus,
  Coupon,
  CustomerReview,
  CustomerDetails,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_HAMPERS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
} from '../data/initialData';

export type ViewType =
  | 'home'
  | 'shop'
  | 'hampers'
  | 'about'
  | 'contact'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'track-order'
  | 'admin';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  lastOrderId: string | null;
  setLastOrderId: (id: string | null) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Data
  products: Product[];
  hampers: GiftHamper[];
  coupons: Coupon[];
  reviews: CustomerReview[];
  orders: Order[];

  // Admin Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCouponStatus: (id: string) => void;
  deleteCoupon: (id: string) => void;
  addCustomerReview: (review: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => void;
  toggleReviewApproval: (id: string) => void;
  deleteReview: (id: string) => void;
  resetAllDataToDefault: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number, message?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;

  // Pricing
  cartSubtotal: number;
  cartDiscount: number;
  deliveryFee: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewedIds: string[];

  // Checkout & Orders
  placeOrder: (customer: CustomerDetails, paymentMethod: Order['paymentMethod'], notes?: string) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // WhatsApp helper
  openWhatsAppOrder: (productName?: string, quantity?: number | string, variant?: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'toh_products_v4',
  HAMPERS: 'toh_hampers_v2',
  CART: 'toh_cart_v1',
  WISHLIST: 'toh_wishlist_v1',
  ORDERS: 'toh_orders_v1',
  COUPONS: 'toh_coupons_v1',
  REVIEWS: 'toh_reviews_v1',
  RECENTLY_VIEWED: 'toh_recent_v1',
};

const WHATSAPP_PHONE = '919826018920'; // Brand WhatsApp business number

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation & View states
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('prod-poha-chivda');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Core Data States
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!saved) return INITIAL_PRODUCTS;
      const parsed: Product[] = JSON.parse(saved);
      // Merge with INITIAL_PRODUCTS to always keep latest images and new items
      const initialMap = new Map(INITIAL_PRODUCTS.map((p) => [p.id, p]));
      const merged = INITIAL_PRODUCTS.map((initProd) => {
        const found = parsed.find((p) => p.id === initProd.id);
        if (found) {
          return {
            ...found,
            images: initProd.images, // Always use latest images
            name: initProd.name,
            hindiName: initProd.hindiName,
            category: initProd.category,
            shortDescription: initProd.shortDescription,
            fullDescription: initProd.fullDescription,
            ingredients: initProd.ingredients,
          };
        }
        return initProd;
      });
      // Append any custom added products from admin
      const customProds = parsed.filter((p) => !initialMap.has(p.id));
      return [...merged, ...customProds];
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [hampers, setHampers] = useState<GiftHamper[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HAMPERS);
      if (!saved) return INITIAL_HAMPERS;
      const parsed: GiftHamper[] = JSON.parse(saved);
      return INITIAL_HAMPERS.map((initHamper) => {
        const found = parsed.find((h) => h.id === initHamper.id);
        if (found) {
          return {
            ...found,
            images: initHamper.images,
          };
        }
        return initHamper;
      });
    } catch {
      return INITIAL_HAMPERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Synchronize to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HAMPERS, JSON.stringify(hampers));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [hampers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [recentlyViewedIds]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open Product Detail
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track recently viewed
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  };

  // Cart operations
  const addToCart = (
    product: Product,
    variant: ProductVariant,
    quantity: number = 1,
    message?: string
  ) => {
    const cartItemId = `${product.id}-${variant.weight}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (message) updated[existingIndex].personalizedMessage = message;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            productId: product.id,
            product,
            selectedVariant: variant,
            quantity,
            personalizedMessage: message,
          },
        ];
      }
    });

    showToast(`Added ${quantity} × ${product.name} (${variant.weight}) to your cart! 🛒`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      cartDiscount = Math.min(appliedCoupon.discountValue, cartSubtotal);
    }
  }

  // Free delivery above ₹499, otherwise ₹60 flat
  const deliveryFee = cartSubtotal === 0 || cartSubtotal >= 499 ? 0 : 60;
  const cartTotal = Math.max(0, Math.round(cartSubtotal - cartDiscount + deliveryFee));

  // Coupons
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${found.code} is ₹${found.minOrderValue}.`,
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully! 🎉`);
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  // Order Placement
  const placeOrder = (
    customer: CustomerDetails,
    paymentMethod: Order['paymentMethod'],
    notes?: string
  ): Order => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `TOH-${orderNum}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      customer,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      deliveryFee,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'Confirmed',
      trackingNumber: `DELHIVERY-TOH${orderNum}IN`,
      carrier: 'Delhivery Express',
      estimatedDelivery: 'Within 2-4 business days',
      notes,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrderId(newOrder.id);
    clearCart();
    setCurrentView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) => o.id.toLowerCase() === orderId.trim().toLowerCase()
    );
  };

  // WhatsApp Ordering Integration
  const openWhatsAppOrder = (
    productName?: string,
    quantity?: number | string,
    variant?: string
  ) => {
    let msg = '';
    if (productName) {
      msg = `Hello Taste of Home! I would like to order:
• Product: *${productName}*
• Quantity: *${quantity || 1}*${variant ? `\n• Pack Size: *${variant}*` : ''}

Please share the pricing and delivery details. Thank you!`;
    } else if (cart.length > 0) {
      const itemsList = cart
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.product.name} (${item.selectedVariant.weight}) x ${item.quantity} = ₹${
              item.selectedVariant.price * item.quantity
            }`
        )
        .join('\n');

      msg = `Hello Taste of Home! I would like to order my cart items:
${itemsList}

Subtotal: ₹${cartSubtotal}
Estimated Total: ₹${cartTotal}

Please confirm my order and share payment details. Thank you!`;
    } else {
      msg = `Hello Taste of Home! I would like to inquire about your traditional homemade snacks, pickles, and Diwali festive hampers.`;
    }

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Admin Actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now().toString().slice(-6)}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" added to catalogue!`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updated } : prod))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
    showToast('Product deleted from catalogue.', 'info');
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: status,
            ...(trackingNumber ? { trackingNumber } : {}),
            ...(status === 'Delivered' ? { paymentStatus: 'paid' } : {}),
          };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} status changed to "${status}"`);
  };

  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `c-${Date.now().toString().slice(-5)}`,
      code: couponData.code.toUpperCase().trim(),
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon code ${newCoupon.code} created!`);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon removed.');
  };

  const addCustomerReview = (
    revData: Omit<CustomerReview, 'id' | 'date' | 'approved'>
  ) => {
    const newRev: CustomerReview = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      approved: true, // auto approve for realistic experience
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your review was submitted successfully ❤️');
  };

  const toggleReviewApproval = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review removed.');
  };

  const resetAllDataToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setHampers(INITIAL_HAMPERS);
    setCoupons(INITIAL_COUPONS);
    setReviews(INITIAL_REVIEWS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setWishlistIds([]);
    setRecentlyViewedIds([]);
    setAppliedCoupon(null);
    localStorage.clear();
    showToast('Sample store data restored to original defaults!');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        lastOrderId,
        setLastOrderId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products,
        hampers,
        coupons,
        reviews,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,
        addCustomerReview,
        toggleReviewApproval,
        deleteReview,
        resetAllDataToDefault,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        deliveryFee,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        recentlyViewedIds,
        placeOrder,
        getOrderById,
        openWhatsAppOrder,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
