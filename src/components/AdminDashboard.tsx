import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Tag,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Search,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus, Product, CategoryType } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    coupons,
    reviews,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    addCoupon,
    toggleCouponStatus,
    deleteCoupon,
    resetAllDataToDefault,
    setCurrentView,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'coupons' | 'reviews'>('orders');

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const inStockProductsCount = products.filter((p) => p.variants.some((v) => v.inStock)).length;

  // Search & Filters for Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productForm, setProductForm] = useState({
    name: '',
    hindiName: '',
    category: 'Namkeen & Snacks' as CategoryType,
    shortDescription: '',
    fullDescription: '',
    price250g: 150,
    mrp250g: 180,
    price500g: 280,
    mrp500g: 340,
    price1kg: 520,
    mrp1kg: 620,
    shelfLife: '3 Months',
    storageInstructions: 'Store in airtight container away from moisture',
    allergenInfo: 'None',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    tags: 'Namkeen, Traditional',
  });

  // New Coupon Modal State
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'flat',
    discountValue: 15,
    minOrderValue: 399,
    description: '',
  });

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showToast('Product name is required', 'error');
      return;
    }

    const payload = {
      name: productForm.name,
      hindiName: productForm.hindiName,
      category: productForm.category,
      shortDescription: productForm.shortDescription,
      fullDescription: productForm.fullDescription || productForm.shortDescription,
      ingredients: ['Whole Spices', 'Pure Desi Ghee / Kachi Ghani Oil', 'Himalayan Salt'],
      nutritionInfo: {
        servingSize: '100g',
        calories: '450 kcal',
        protein: '8g',
        carbs: '45g',
        fat: '26g',
      },
      shelfLife: productForm.shelfLife,
      storageInstructions: productForm.storageInstructions,
      allergenInfo: productForm.allergenInfo,
      fssaiInfo: 'Lic. No. 21424010001892',
      variants: [
        {
          weight: '250g' as const,
          price: Number(productForm.price250g),
          mrp: Number(productForm.mrp250g),
          inStock: true,
          inventory: 30,
        },
        {
          weight: '500g' as const,
          price: Number(productForm.price500g),
          mrp: Number(productForm.mrp500g),
          inStock: true,
          inventory: 20,
        },
        {
          weight: '1kg' as const,
          price: Number(productForm.price1kg),
          mrp: Number(productForm.mrp1kg),
          inStock: true,
          inventory: 15,
        },
      ],
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      images: [productForm.image],
      tags: productForm.tags.split(',').map((t) => t.trim()),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setShowAddProductModal(false);
    setEditingProduct(null);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      hindiName: p.hindiName || '',
      category: p.category,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      price250g: p.variants[0]?.price || 150,
      mrp250g: p.variants[0]?.mrp || 180,
      price500g: p.variants[1]?.price || 280,
      mrp500g: p.variants[1]?.mrp || 340,
      price1kg: p.variants[2]?.price || 520,
      mrp1kg: p.variants[2]?.mrp || 620,
      shelfLife: p.shelfLife,
      storageInstructions: p.storageInstructions,
      allergenInfo: p.allergenInfo,
      image: p.images[0],
      tags: p.tags.join(', '),
    });
    setShowAddProductModal(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;

    addCoupon({
      code: couponForm.code.toUpperCase().trim(),
      discountType: couponForm.discountType,
      discountValue: Number(couponForm.discountValue),
      minOrderValue: Number(couponForm.minOrderValue),
      description: couponForm.description || `${couponForm.discountValue}% discount on homemade orders`,
      isActive: true,
      expiresAt: '2026-12-31',
    });

    setShowCouponModal(false);
    setCouponForm({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 399,
      description: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E0D5] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 text-[#1B5E20]" />
            <span>Store Administration Portal</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3E2723] mt-1">
            Taste of Home – Kitchen Operations
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 rounded-xl bg-white border border-[#E5E0D5] text-xs font-bold text-[#3E2723] hover:bg-[#F5F1E9] transition-colors cursor-pointer"
          >
            Preview Storefront
          </button>
          <button
            type="button"
            onClick={resetAllDataToDefault}
            className="px-4 py-2 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs font-bold text-[#8C6D60] hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Restore sample orders, products and reviews"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D5] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D60] block">
            Total Revenue
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#1B5E20]">
              ₹{totalRevenue.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-[#8C6D60] mt-1">Across all order channels</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D5] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D60] block">
            Total Customer Orders
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#3E2723]">
              {totalOrdersCount}
            </span>
          </div>
          <p className="text-[10px] text-[#8C6D60] mt-1">Live customer orders stored</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D5] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D60] block">
            Average Order Value
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#D4AF37]">
              ₹{avgOrderValue}
            </span>
          </div>
          <p className="text-[10px] text-[#8C6D60] mt-1">High retention & repeat rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D5] shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D60] block">
            Pantry Catalogue
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#3E2723]">
              {products.length} Delicacies
            </span>
          </div>
          <p className="text-[10px] text-[#1B5E20] font-semibold mt-1">
            {inStockProductsCount} items currently active
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl p-2 border border-[#E5E0D5] flex items-center gap-2 overflow-x-auto shadow-soft">
        {[
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
          { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#1B5E20] text-white shadow-soft'
                  : 'text-[#5D4037] hover:bg-[#F5F1E9]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ORDERS MANAGER */}
      {/* ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-[28px] border border-[#E5E0D5] shadow-soft p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8C6D60] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search orders, names, phones..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] focus:outline-none focus:border-[#1B5E20]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-[#8C6D60]">Filter:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] text-xs text-[#3E2723] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#E5E0D5]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F1E9] text-[#3E2723] border-b border-[#E5E0D5] font-bold">
                <tr>
                  <th className="p-3.5">Order ID & Date</th>
                  <th className="p-3.5">Customer & City</th>
                  <th className="p-3.5">Delicacies Ordered</th>
                  <th className="p-3.5">Total & Payment</th>
                  <th className="p-3.5">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D5] text-[#5D4037]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-xs text-[#8C6D60]">
                      No orders found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F5F1E9]/50 transition-colors">
                      <td className="p-3.5">
                        <span className="font-mono font-bold text-[#3E2723] block">
                          #{order.id}
                        </span>
                        <span className="text-[10px] text-[#8C6D60]">
                          {order.createdAt.split('T')[0] || order.createdAt}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <strong className="text-[#3E2723] block">{order.customer.fullName}</strong>
                        <span className="text-[11px] text-[#8C6D60]">
                          {order.customer.city}, {order.customer.state} • +91 {order.customer.phone}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="space-y-0.5">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="text-[11px]">
                              {i.product.name} ({i.selectedVariant.weight} × {i.quantity})
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-bold text-[#1B5E20] text-sm block">
                          ₹{order.total}
                        </span>
                        <span className="text-[10px] text-[#8C6D60] uppercase">
                          {order.paymentMethod} ({order.paymentStatus})
                        </span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold focus:outline-none cursor-pointer ${
                            order.orderStatus === 'Delivered'
                              ? 'bg-[#E5EBDD] text-[#1B5E20] border-[#1B5E20]'
                              : order.orderStatus === 'Shipped'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : order.orderStatus === 'Packed'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : 'bg-[#F5F1E9] text-[#D4AF37] border-[#E5E0D5]'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PRODUCTS & INVENTORY MANAGER */}
      {/* ========================================================================= */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-[28px] border border-[#E5E0D5] shadow-soft p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Traditional Pantry Menu ({products.length} Delicacies)
              </h3>
              <p className="text-xs text-[#8C6D60]">
                Manage quantities, pack sizes, ingredients, descriptions and pricing.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  hindiName: '',
                  category: 'Namkeen & Snacks',
                  shortDescription: '',
                  fullDescription: '',
                  price250g: 150,
                  mrp250g: 180,
                  price500g: 280,
                  mrp500g: 340,
                  price1kg: 520,
                  mrp1kg: 620,
                  shelfLife: '3 Months',
                  storageInstructions: 'Store in airtight container away from moisture',
                  allergenInfo: 'None',
                  image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
                  tags: 'Namkeen, Traditional',
                });
                setShowAddProductModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144317] text-white text-xs font-bold shadow-soft flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Delicacy</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#F5F1E9] rounded-2xl p-4 border border-[#E5E0D5] flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#E5E0D5] flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        {product.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#3E2723]">
                        {product.name}
                      </h4>
                      {product.hindiName && (
                        <span className="text-[11px] text-[#8C6D60] italic block">
                          {product.hindiName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Variants price tag */}
                  <div className="mt-3 pt-2 border-t border-[#E5E0D5] flex items-center justify-between text-xs">
                    <span className="text-[#8C6D60]">Base 250g:</span>
                    <strong className="text-[#1B5E20]">
                      ₹{product.variants[0]?.price} (MRP ₹{product.variants[0]?.mrp})
                    </strong>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E0D5] flex items-center justify-between">
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#E5E0D5] text-[#1B5E20] font-bold">
                    {product.variants.length} Pack Sizes
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(product)}
                      className="p-1.5 rounded-lg bg-white border border-[#E5E0D5] text-[#3E2723] hover:text-[#1B5E20] cursor-pointer"
                      title="Edit Delicacy"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 rounded-lg bg-white border border-[#E5E0D5] text-[#8C6D60] hover:text-red-600 cursor-pointer"
                      title="Delete Delicacy"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Product */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl border-2 border-[#D4AF37] p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-3">
              <h3 className="font-serif font-bold text-xl text-[#3E2723]">
                {editingProduct ? 'Edit Product Details' : 'Add New Homemade Delicacy'}
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-xs font-bold text-[#8C6D60] hover:text-[#3E2723] cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Khasta Mathri"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">Hindi Name</label>
                  <input
                    type="text"
                    placeholder="e.g. खस्ता मठरी"
                    value={productForm.hindiName}
                    onChange={(e) => setProductForm({ ...productForm, hindiName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                  >
                    <option value="Namkeen & Snacks">Namkeen & Snacks</option>
                    <option value="Traditional Sweets">Traditional Sweets</option>
                    <option value="Pickles">Pickles</option>
                    <option value="Papad">Papad</option>
                    <option value="Homemade Special">Homemade Special</option>
                    <option value="Gift Hampers">Gift Hampers</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#8C6D60] mb-1">Image URL</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#8C6D60] mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  placeholder="Crispy, fragrant traditional snack"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                />
              </div>

              {/* Variants Pricing Matrix */}
              <div className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] space-y-3">
                <span className="font-bold text-[#3E2723] block">Pack Size Pricing (₹):</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-[#8C6D60] block font-bold">250g Price / MRP</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="Price"
                        value={productForm.price250g}
                        onChange={(e) => setProductForm({ ...productForm, price250g: Number(e.target.value) })}
                        className="w-1/2 p-2 bg-white rounded border border-[#E5E0D5]"
                      />
                      <input
                        type="number"
                        placeholder="MRP"
                        value={productForm.mrp250g}
                        onChange={(e) => setProductForm({ ...productForm, mrp250g: Number(e.target.value) })}
                        className="w-1/2 p-2 bg-white rounded border border-[#E5E0D5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8C6D60] block font-bold">500g Price / MRP</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="Price"
                        value={productForm.price500g}
                        onChange={(e) => setProductForm({ ...productForm, price500g: Number(e.target.value) })}
                        className="w-1/2 p-2 bg-white rounded border border-[#E5E0D5]"
                      />
                      <input
                        type="number"
                        placeholder="MRP"
                        value={productForm.mrp500g}
                        onChange={(e) => setProductForm({ ...productForm, mrp500g: Number(e.target.value) })}
                        className="w-1/2 p-2 bg-white rounded border border-[#E5E0D5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#8C6D60] block font-bold">1kg Price / MRP</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="Price"
                        value={productForm.price1kg}
                        onChange={(e) => setProductForm({ ...productForm, price1kg: Number(e.target.value) })}
                        className="w-1/2 p-2 bg-white rounded border border-[#E5E0D5]"
                      />
                      <input
                        type="number"
                        placeholder="MRP"
                        value={productForm.mrp1kg}
                        onChange={(e) => setProductForm({ ...productForm, mrp1kg: Number(e.target.value) })}
                        className="w-1/2 p-2 bg-white rounded border border-[#E5E0D5]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E5E0D5] text-[#8C6D60] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1B5E20] text-white font-bold cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Add Delicacy to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: COUPONS & DISCOUNTS */}
      {/* ========================================================================= */}
      {activeTab === 'coupons' && (
        <div className="bg-white rounded-[28px] border border-[#E5E0D5] shadow-soft p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3E2723]">
                Active Coupons & Festive Promotions
              </h3>
              <p className="text-xs text-[#8C6D60]">
                Configure coupon codes for festival discounts, bulk orders and new families.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#144317] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-[#F5F1E9] rounded-2xl p-4 border border-[#E5E0D5] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white border border-[#D4AF37] rounded-lg font-mono font-bold text-xs text-[#3E2723]">
                    {coupon.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      coupon.isActive
                        ? 'bg-[#E5EBDD] text-[#1B5E20]'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {coupon.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <div className="text-xs text-[#5D4037] space-y-1">
                  <div className="font-bold text-sm text-[#1B5E20]">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}% OFF`
                      : `₹${coupon.discountValue} FLAT OFF`}
                  </div>
                  <p>{coupon.description}</p>
                  <p className="text-[11px] text-[#8C6D60]">
                    Min order: ₹{coupon.minOrderValue}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5E0D5] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => toggleCouponStatus(coupon.id)}
                    className="text-xs font-bold text-[#1B5E20] hover:underline cursor-pointer"
                  >
                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCoupon(coupon.id)}
                    className="text-xs text-[#8C6D60] hover:text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal: Create Coupon */}
          {showCouponModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl border-2 border-[#D4AF37] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E0D5] pb-2">
                  <h4 className="font-serif font-bold text-lg text-[#3E2723]">Create Promo Code</h4>
                  <button
                    onClick={() => setShowCouponModal(false)}
                    className="text-xs text-[#8C6D60]"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-[#8C6D60] mb-1">Coupon Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DIWALI20"
                      value={couponForm.code}
                      onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                      className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5] font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#8C6D60] mb-1">Discount Type</label>
                      <select
                        value={couponForm.discountType}
                        onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="flat">Flat Amount (₹)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[#8C6D60] mb-1">Value</label>
                      <input
                        type="number"
                        required
                        value={couponForm.discountValue}
                        onChange={(e) => setCouponForm({ ...couponForm, discountValue: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#8C6D60] mb-1">Min Order Value (₹)</label>
                    <input
                      type="number"
                      value={couponForm.minOrderValue}
                      onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#8C6D60] mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="15% off on festive family packages"
                      value={couponForm.description}
                      onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F5F1E9] border border-[#E5E0D5]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCouponModal(false)}
                      className="px-4 py-2 border rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1B5E20] text-white font-bold rounded-xl"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: REVIEWS MODERATION */}
      {/* ========================================================================= */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-[28px] border border-[#E5E0D5] shadow-soft p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#3E2723]">
              Customer Reviews ({reviews.length})
            </h3>
            <p className="text-xs text-[#8C6D60]">
              Real testimonials from family households across India.
            </p>
          </div>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-[#F5F1E9] border border-[#E5E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#3E2723]">{rev.customerName}</span>
                    <span className="text-[10px] text-[#8C6D60]">({rev.location})</span>
                    <div className="flex text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                  <h5 className="font-bold text-[#3E2723]">"{rev.title}"</h5>
                  <p className="text-[#5D4037] mt-0.5">{rev.comment}</p>
                </div>

                <div className="text-left sm:text-right flex-shrink-0">
                  <span className="text-[10px] bg-[#E5EBDD] text-[#1B5E20] font-bold px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                  <div className="text-[10px] text-[#8C6D60] mt-1">{rev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
