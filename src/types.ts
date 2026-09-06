export type CategoryType =
  | 'All'
  | 'Namkeen & Snacks'
  | 'Traditional Sweets'
  | 'Pickles'
  | 'Papad'
  | 'Homemade Special'
  | 'Gift Hampers';

export interface ProductVariant {
  weight: '250g' | '500g' | '1kg' | 'Single Pack' | 'Gift Box';
  price: number;
  mrp: number;
  inStock: boolean;
  inventory: number;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  sugar?: string;
  servingSize: string;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: CategoryType;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  nutritionInfo: NutritionInfo;
  shelfLife: string;
  storageInstructions: string;
  allergenInfo: string;
  fssaiInfo: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  images: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  tags: string[];
  badge?: string;
  featuredOrder?: number;
}

export interface GiftHamper {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  mrp: number;
  images: string[];
  contents: string[];
  description: string;
  boxType: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  includesDiyas: boolean;
}

export interface CartItem {
  id: string; // unique item id (productId + variant)
  productId: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  personalizedMessage?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string; // e.g. TOH-9281
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery: string;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
  expiresAt?: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  productPurchased: string;
  date: string;
  verified: boolean;
  approved: boolean;
  avatarColor?: string;
}
