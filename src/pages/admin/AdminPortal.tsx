import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Package,
  Cake,
  Tag,
  Star,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Truck,
  Edit,
  Trash2,
  Eye,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Product, Order, CustomCakeRequest, IngredientInventory } from '../../types';

export const AdminPortal: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    setCurrentView,
    logoutAdmin,
    products,
    orders,
    inventory,
    customCakeRequests,
    coupons,
    reviews,
    contactMessages,
    staff,
    analytics,
    settings,
    updateOrderStatus,
    updateCustomCakeStatus,
    updateInventoryStock,
    updateSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    addCoupon,
    deleteCoupon,
    addToast
  } = useBakery();

  // Search & Filter state for admin views
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // New Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Cakes' as any,
    price: 3200,
    discountPrice: 0,
    description: '',
    weight: '1.2 kg',
    servings: '8-10 people',
    freshness: 'Baked fresh daily at 6:00 AM',
    ingredients: 'Flour, Pure Butter, Eggs, Sugar',
    allergens: 'Dairy, Wheat, Eggs',
    stock: 15,
    status: 'In Stock' as any,
    image: '/assets/images/products/prod-3.jpg',
    featured: true,
    bestSeller: false
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    bakeryName: settings?.bakeryName || 'Crumb & Bloom Artisan Bakery',
    announcementText: settings?.announcementText || '✨ Fresh batches baked at 6:00 AM daily! Free delivery over Rs. 3,500.',
    freeDeliveryThreshold: settings?.freeDeliveryThreshold || 3500,
    deliveryFee: settings?.deliveryFee || 250,
    address: settings?.address || '14-C Mini Market, Gulberg II, Lahore, Pakistan',
    phone: settings?.phone || '042-3571-BAKE',
    email: settings?.email || 'orders@crumbandbloom.com',
    openingHours: settings?.openingHours || '8:00 AM - 10:00 PM',
    ...settings
  });

  // Handle saving product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: newProductForm.name,
      category: newProductForm.category,
      price: Number(newProductForm.price),
      discountPrice: newProductForm.discountPrice ? Number(newProductForm.discountPrice) : undefined,
      description: newProductForm.description,
      image: newProductForm.image,
      ingredients: newProductForm.ingredients.split(',').map((s) => s.trim()),
      allergens: newProductForm.allergens.split(',').map((s) => s.trim()),
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
      weight: newProductForm.weight,
      servings: newProductForm.servings,
      freshness: newProductForm.freshness,
      stock: Number(newProductForm.stock),
      status: newProductForm.status,
      featured: newProductForm.featured,
      bestSeller: newProductForm.bestSeller,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    if (editingProduct) {
      updateProduct(productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setNewProductForm({
      name: p.name,
      category: p.category,
      price: p.price,
      discountPrice: p.discountPrice || 0,
      description: p.description,
      weight: p.weight,
      servings: p.servings,
      freshness: p.freshness,
      ingredients: p.ingredients.join(', '),
      allergens: p.allergens.join(', '),
      stock: p.stock,
      status: p.status,
      image: p.image,
      featured: p.featured,
      bestSeller: p.bestSeller
    });
    setIsProductModalOpen(true);
  };

  const navItems = [
    { id: 'dashboard', label: 'Bakery Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag, badge: orders.filter((o) => o.status !== 'Delivered').length },
    { id: 'products', label: 'Product Catalog', icon: Package, badge: products.length },
    { id: 'custom-cakes', label: 'Custom Cake Studio', icon: Cake, badge: customCakeRequests.filter((c) => c.status === 'Pending Review').length },
    { id: 'inventory', label: 'Pantry & Ingredients', icon: Layers, badge: inventory.filter((i) => i.status === 'Low Stock' || i.status === 'Out of Stock').length },
    { id: 'coupons', label: 'Promos & Vouchers', icon: Tag },
    { id: 'reviews', label: 'Reviews Moderation', icon: Star },
    { id: 'messages', label: 'Customer Messages', icon: MessageSquare, badge: contactMessages.filter((m) => m.status === 'Unread').length },
    { id: 'staff', label: 'Bakers & Staff', icon: Users },
    { id: 'analytics', label: 'Sales & Revenue', icon: BarChart3 },
    { id: 'settings', label: 'Bakery Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#5B3A32] flex flex-col">
      
      {/* Admin Top Bar */}
      <header className="bg-[#5B3A32] text-white px-6 py-3.5 flex items-center justify-between border-b border-[#D94F70]/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#D94F70] flex items-center justify-center text-white">
            <Cake size={18} />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight block leading-none">
              CRUMB & BLOOM • BAKERY OS
            </span>
            <span className="text-[10px] text-[#FFC6A8] tracking-wider uppercase font-semibold">
              Management Portal & Production Dispatch
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <ExternalLink size={13} />
            <span>View Customer Website</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1 bg-[#D94F70] hover:bg-[#8E3552] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span>Exit Portal</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-white border-r border-[#F58FA3]/25 p-4 space-y-1 shrink-0 overflow-y-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E3552]/70 px-3 py-1 block">
            Management
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#F58FA3] text-white shadow-xs'
                    : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.2 rounded-full ${
                      isActive ? 'bg-white text-[#D94F70]' : 'bg-[#FFF0F3] text-[#D94F70]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* CONTENT VIEW AREA */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
          
          {/* ========================================================
              1. DASHBOARD OVERVIEW
             ======================================================== */}
          {adminTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                  Bakery Overview
                </h1>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Live oven metrics, incoming celebration orders, and ingredient alerts.
                </p>
              </div>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-[#F58FA3]/25 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[#8E3552]/70">
                    <span className="text-xs font-bold">Total Bakery Revenue</span>
                    <TrendingUp size={16} className="text-[#4A7840]" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#D94F70]">
                    Rs. {(analytics?.totalRevenue ?? 142850).toLocaleString()}
                  </p>
                  <span className="text-[11px] text-[#4A7840] font-semibold block">
                    +18.4% from last month
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#F58FA3]/25 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[#8E3552]/70">
                    <span className="text-xs font-bold">Total Orders Placed</span>
                    <ShoppingBag size={16} className="text-[#D94F70]" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#5B3A32]">
                    {analytics?.totalOrders ?? (orders?.length || 0)}
                  </p>
                  <span className="text-[11px] text-[#8E3552]/70 block">
                    Avg. Order Value: Rs. {(analytics?.averageOrderValue ?? 3200).toLocaleString()}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#F58FA3]/25 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[#8E3552]/70">
                    <span className="text-xs font-bold">Pending Custom Cakes</span>
                    <Cake size={16} className="text-[#FFC6A8]" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#5B3A32]">
                    {(customCakeRequests || []).filter((c) => c.status === 'Pending Review').length}
                  </p>
                  <span className="text-[11px] text-[#D94F70] font-semibold block">
                    Requires chef price quote
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#F58FA3]/25 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[#8E3552]/70">
                    <span className="text-xs font-bold">Low Pantry Stock</span>
                    <AlertTriangle size={16} className="text-[#D94F70]" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#D94F70]">
                    {(inventory || []).filter((i) => i.status !== 'In Stock').length}
                  </p>
                  <span className="text-[11px] text-[#D94F70] font-semibold block">
                    Normandy Butter & Strawberries low
                  </span>
                </div>
              </div>

              {/* Recent Orders & Today's Oven Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-[#5B3A32]">
                      Live Production Orders
                    </h3>
                    <button
                      onClick={() => setAdminTab('orders')}
                      className="text-xs font-bold text-[#D94F70] hover:underline"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#FFF0F3] text-[#8E3552]/70 uppercase tracking-wider text-[10px]">
                          <th className="pb-3">Order ID</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Items</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#FFF0F3]">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-[#FFF8F0]/60 transition-colors">
                            <td className="py-3 font-bold text-[#D94F70]">{order.orderNumber}</td>
                            <td className="py-3">
                              <p className="font-semibold text-[#5B3A32]">{order.customer.name}</p>
                              <p className="text-[10px] text-[#8E3552]/70">{order.customer.phone}</p>
                            </td>
                            <td className="py-3">{order.items.length} items</td>
                            <td className="py-3 font-bold">Rs. {order.total.toLocaleString()}</td>
                            <td className="py-3">
                              <span className="bg-[#FFF0F3] text-[#D94F70] text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                className="bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-lg text-[10px] font-semibold px-2 py-1"
                              >
                                <option value="Placed">Placed</option>
                                <option value="Baking">Baking</option>
                                <option value="Decorating">Decorating</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right: Low Ingredient Alerts */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#5B3A32]">
                    Pantry Restock Alerts
                  </h3>
                  <div className="space-y-3">
                    {inventory
                      .filter((i) => i.status !== 'In Stock')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#FFF0F3] p-3.5 rounded-2xl border border-[#F58FA3]/40 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-bold text-[#5B3A32]">{item.ingredientName}</p>
                            <p className="text-[11px] text-[#D94F70]">
                              Current: {item.quantity} {item.unit} (Min: {item.minThreshold} {item.unit})
                            </p>
                          </div>
                          <button
                            onClick={() => updateInventoryStock(item.id, item.quantity + 15)}
                            className="bg-[#D94F70] hover:bg-[#8E3552] text-white text-[10px] font-bold px-3 py-1 rounded-full"
                          >
                            + Restock
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              2. ORDER MANAGEMENT
             ======================================================== */}
          {adminTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                    Order Management ({orders.length})
                  </h1>
                  <p className="text-xs text-[#8E3552]/80 mt-0.5">
                    Live dispatch board. Update order status to keep customers notified.
                  </p>
                </div>

                <div className="flex gap-2">
                  {['All', 'Placed', 'Baking', 'Decorating', 'Out for Delivery', 'Delivered'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                        orderStatusFilter === st
                          ? 'bg-[#D94F70] text-white shadow-xs'
                          : 'bg-white text-[#5B3A32] border border-[#F58FA3]/30 hover:bg-[#FFF0F3]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="bg-white rounded-3xl border border-[#F58FA3]/25 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF8F0] border-b border-[#F58FA3]/20 text-[#8E3552]/70 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Order Ref</th>
                      <th className="p-4">Customer & Phone</th>
                      <th className="p-4">Delivery Window</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Current Status</th>
                      <th className="p-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FFF0F3]">
                    {orders
                      .filter((o) => (orderStatusFilter === 'All' ? true : o.status === orderStatusFilter))
                      .map((order) => (
                        <tr key={order.id} className="hover:bg-[#FFF8F0]/40">
                          <td className="p-4 font-bold text-[#D94F70]">
                            {order.orderNumber}
                            <span className="block text-[10px] text-[#8E3552]/60 font-normal">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-[#5B3A32]">{order.customer.name}</p>
                            <p className="text-[11px] text-[#8E3552]/70">{order.customer.phone}</p>
                            <p className="text-[10px] text-[#8E3552]/60 truncate max-w-[180px]">{order.customer.address}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-semibold">{order.deliveryDate}</p>
                            <p className="text-[10px] text-[#8E3552]/70">{order.deliveryTime}</p>
                          </td>
                          <td className="p-4">
                            <span className="bg-[#FFF8F0] text-[#5B3A32] px-2 py-0.5 rounded-md font-semibold text-[10px] border border-[#F58FA3]/20">
                              {order.deliveryType === 'delivery' ? 'Chilled Van' : 'Store Pickup'}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-sm text-[#D94F70]">
                            Rs. {order.total.toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span className="bg-[#FFF0F3] text-[#D94F70] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#F58FA3]/40">
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                              className="bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#5B3A32] focus:outline-hidden"
                            >
                              <option value="Placed">Placed</option>
                              <option value="Baking">Baking</option>
                              <option value="Decorating">Decorating</option>
                              <option value="Ready for Pickup">Ready for Pickup</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              3. PRODUCT CATALOG MANAGEMENT
             ======================================================== */}
          {adminTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                    Product Catalog ({products.length})
                  </h1>
                  <p className="text-xs text-[#8E3552]/80 mt-0.5">
                    Manage your daily bakery items, stock counts, pricing, and ingredients.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProductForm({
                      name: '',
                      category: 'Cakes',
                      price: 3200,
                      discountPrice: 0,
                      description: '',
                      weight: '1.2 kg',
                      servings: '8-10 people',
                      freshness: 'Baked fresh daily at 6:00 AM',
                      ingredients: 'Normandy Butter, Pastry Flour, Vanilla, Eggs',
                      allergens: 'Dairy, Wheat, Eggs',
                      stock: 20,
                      status: 'In Stock',
                      image: '/assets/images/products/prod-3.jpg',
                      featured: false,
                      bestSeller: false
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="bg-[#F58FA3] hover:bg-[#D94F70] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Add New Bake</span>
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-3xl p-4 border border-[#F58FA3]/25 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-[#FFF0F3]">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-[#D94F70] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {prod.category}
                        </span>
                        <span className="absolute top-2 right-2 bg-white/90 text-[#5B3A32] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Stock: {prod.stock}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-base font-bold text-[#5B3A32]">{prod.name}</h3>
                        <p className="text-xs text-[#D94F70] font-bold mt-0.5">
                          Rs. {prod.price.toLocaleString()}
                          {prod.discountPrice && (
                            <span className="text-gray-400 line-through ml-1.5 font-normal">
                              Rs. {prod.discountPrice.toLocaleString()}
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-[#8E3552]/70 line-clamp-2 mt-1">{prod.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#FFF0F3] flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prod.status === 'In Stock' ? 'bg-[#F2F8F0] text-[#2F5227]' : 'bg-[#FFF0F3] text-[#D94F70]'
                      }`}>
                        {prod.status}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF0F3] rounded-lg transition-colors"
                          title="Edit Bake"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-[#5B3A32]/50 hover:text-[#D94F70] hover:bg-[#FFF0F3] rounded-lg transition-colors"
                          title="Delete Bake"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              4. CUSTOM CAKE STUDIO REQUESTS
             ======================================================== */}
          {adminTab === 'custom-cakes' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                  Custom Cake Studio Queue ({customCakeRequests.length})
                </h1>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Bespoke multi-tiered celebration cake inquiries awaiting chef quotation and scheduling.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {customCakeRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-wider block">
                          {req.occasion}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
                          {req.customerName}
                        </h3>
                        <p className="text-xs text-[#8E3552]/70">{req.customerPhone} • {req.customerEmail}</p>
                      </div>
                      <span className="bg-[#FFF0F3] text-[#D94F70] text-xs font-bold px-3 py-1 rounded-full border border-[#F58FA3]/40">
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-[#FFF8F0] p-3.5 rounded-2xl border border-[#F58FA3]/20">
                      <div>
                        <span className="text-[#8E3552]/70 block">Target Event Date:</span>
                        <strong className="text-[#5B3A32]">{req.date}</strong>
                      </div>
                      <div>
                        <span className="text-[#8E3552]/70 block">Tiers & Size:</span>
                        <strong className="text-[#5B3A32]">{req.tiers} Tiers • {req.size}</strong>
                      </div>
                      <div>
                        <span className="text-[#8E3552]/70 block">Sponge & Filling:</span>
                        <strong className="text-[#5B3A32]">{req.flavor} / {req.filling}</strong>
                      </div>
                      <div>
                        <span className="text-[#8E3552]/70 block">Estimated Budget:</span>
                        <strong className="text-[#D94F70]">{req.estimatedBudget}</strong>
                      </div>
                    </div>

                    {req.message && (
                      <div className="text-xs">
                        <span className="font-bold text-[#5B3A32]">Piping Message: </span>
                        <span className="italic text-[#8E3552]">"{req.message}"</span>
                      </div>
                    )}

                    {req.referenceImage && (
                      <div>
                        <span className="text-[11px] font-bold text-[#5B3A32] block mb-1">Customer Reference Image:</span>
                        <img src={req.referenceImage} alt="Reference" className="w-20 h-20 rounded-xl object-cover border border-[#F58FA3]/30" />
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#FFF0F3] flex items-center justify-between gap-3">
                      <span className="text-xs text-[#8E3552]/70">Action Status:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateCustomCakeStatus(req.id, 'Approved')}
                          className="bg-[#B8D8B0] hover:bg-[#A6CD9D] text-[#2F5227] text-xs font-bold px-3 py-1.5 rounded-full"
                        >
                          Approve Quote
                        </button>
                        <button
                          onClick={() => updateCustomCakeStatus(req.id, 'Baking')}
                          className="bg-[#F58FA3] hover:bg-[#D94F70] text-white text-xs font-bold px-3 py-1.5 rounded-full"
                        >
                          Move to Baking
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              5. PANTRY & INVENTORY
             ======================================================== */}
          {adminTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                    Bakery Pantry & Raw Ingredients ({inventory.length})
                  </h1>
                  <p className="text-xs text-[#8E3552]/80 mt-0.5">
                    Monitor flour, butter, organic fruit stocks, and automated reorder points.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#F58FA3]/25 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF8F0] border-b border-[#F58FA3]/20 text-[#8E3552]/70 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Ingredient Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Current Stock</th>
                      <th className="p-4">Min. Threshold</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FFF0F3]">
                    {inventory.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FFF8F0]/40">
                        <td className="p-4 font-bold text-[#5B3A32]">{item.ingredientName}</td>
                        <td className="p-4 text-[#8E3552]/80">{item.category}</td>
                        <td className="p-4 font-bold text-sm">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="p-4 text-[#8E3552]/70">
                          {item.minThreshold} {item.unit}
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              item.status === 'In Stock'
                                ? 'bg-[#F2F8F0] text-[#2F5227]'
                                : item.status === 'Low Stock'
                                ? 'bg-[#FFF4ED] text-[#8E3552] border border-[#FFC6A8]'
                                : 'bg-[#FFF0F3] text-[#D94F70]'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => updateInventoryStock(item.id, item.quantity + 20)}
                            className="bg-[#F58FA3] hover:bg-[#D94F70] text-white text-[11px] font-bold px-3 py-1 rounded-full cursor-pointer"
                          >
                            +20 {item.unit}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              6. COUPONS & PROMOTIONS
             ======================================================== */}
          {adminTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                    Discount Coupons & Vouchers ({coupons.length})
                  </h1>
                  <p className="text-xs text-[#8E3552]/80 mt-0.5">
                    Create promo codes for festive drops and loyalty rewards.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coupons.map((c) => (
                  <div key={c.id} className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#FFF0F3] text-[#D94F70] text-xs font-extrabold px-3 py-1 rounded-full">
                        {c.code}
                      </span>
                      <button
                        onClick={() => deleteCoupon(c.id)}
                        className="text-gray-400 hover:text-[#D94F70]"
                        title="Delete voucher"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <h3 className="font-bold text-sm text-[#5B3A32]">{c.description}</h3>
                    <p className="text-xs text-[#8E3552]/80">
                      Discount: <strong>{c.discountValue}{c.discountType === 'percentage' ? '%' : ' Rs.'} OFF</strong>
                    </p>
                    <p className="text-[11px] text-[#8E3552]/60">Valid until: {c.validUntil}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              7. REVIEWS MODERATION
             ======================================================== */}
          {adminTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                  Customer Reviews Moderation ({reviews.length})
                </h1>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Approve and respond to customer feedback across cake and pastry collections.
                </p>
              </div>

              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl p-4 border border-[#F58FA3]/25 shadow-2xs flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#5B3A32]">{r.customerName}</span>
                        <span className="text-[11px] text-[#D94F70] font-semibold">★ {r.rating}.0 on {r.productName}</span>
                      </div>
                      <p className="text-xs text-[#5B3A32]/80 mt-1">{r.comment}</p>
                      <span className="text-[10px] text-[#8E3552]/60 mt-1 block">{r.date}</span>
                    </div>
                    <span className="text-[10px] bg-[#F2F8F0] text-[#2F5227] px-2 py-0.5 rounded-full font-bold">
                      Published
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              8. CUSTOMER MESSAGES
             ======================================================== */}
          {adminTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                  Customer Inquiries & Messages ({contactMessages.length})
                </h1>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Messages received via the contact page and catering inquiries.
                </p>
              </div>

              <div className="space-y-4">
                {contactMessages.map((m) => (
                  <div key={m.id} className="bg-white rounded-2xl p-5 border border-[#F58FA3]/25 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#5B3A32]">{m.name}</h4>
                        <p className="text-xs text-[#8E3552]/70">{m.email} • {m.phone}</p>
                      </div>
                      <span className="text-[10px] text-[#8E3552]/60">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#D94F70]">{m.subject}</p>
                    <p className="text-xs text-[#5B3A32]/80 leading-relaxed bg-[#FFF8F0] p-3 rounded-xl">
                      "{m.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              9. STAFF & BAKERS
             ======================================================== */}
          {adminTab === 'staff' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                  Bakery Staff & Pastry Brigade ({staff.length})
                </h1>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Chef shifts, kitchen assistants, decorators, and delivery chauffeurs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member) => (
                  <div key={member.id} className="bg-white rounded-3xl p-5 border border-[#F58FA3]/25 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#5B3A32]">{member.name}</h4>
                      <span className="bg-[#FFF0F3] text-[#D94F70] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#8E3552]/80">Shift: <strong>{member.shift}</strong></p>
                    <p className="text-xs text-[#8E3552]/70">Phone: {member.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              10. ANALYTICS & REPORTS
             ======================================================== */}
          {adminTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                  Sales & Revenue Reports
                </h1>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Financial breakdowns in Pakistani Rupees (Rs.) and top flavor demand.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-[#F58FA3]/25 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#8E3552]/70 uppercase">Daily Gross Sales</span>
                  <p className="font-serif text-3xl font-extrabold text-[#D94F70]">Rs. 72,400</p>
                  <span className="text-[11px] text-[#4A7840] font-semibold">24 orders processed today</span>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[#F58FA3]/25 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#8E3552]/70 uppercase">Monthly Projected</span>
                  <p className="font-serif text-3xl font-extrabold text-[#5B3A32]">Rs. 1,840,000</p>
                  <span className="text-[11px] text-[#4A7840] font-semibold">+22% vs Ramadan season</span>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-[#F58FA3]/25 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-[#8E3552]/70 uppercase">Custom Cake Share</span>
                  <p className="font-serif text-3xl font-extrabold text-[#D94F70]">38% of Total</p>
                  <span className="text-[11px] text-[#8E3552]/70">Highest margin category</span>
                </div>
              </div>

              {/* Top Selling Flavors */}
              <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#5B3A32]">
                  Most Popular Flavors & Bakes
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Strawberry Dream Cake', percent: 85, revenue: 'Rs. 182,000' },
                    { name: 'Pistachio Rose Cake', percent: 78, revenue: 'Rs. 154,000' },
                    { name: 'Belgian Chocolate Fudge', percent: 72, revenue: 'Rs. 142,000' },
                    { name: 'Classic Butter Croissants', percent: 64, revenue: 'Rs. 96,000' }
                  ].map((fl) => (
                    <div key={fl.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{fl.name}</span>
                        <span className="text-[#D94F70]">{fl.revenue}</span>
                      </div>
                      <div className="w-full bg-[#FFF0F3] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#D94F70] h-full rounded-full" style={{ width: `${fl.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              11. BAKERY SETTINGS
             ======================================================== */}
          {adminTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
                  Bakery Configuration & Settings
                </h1>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Update live store hours, free delivery thresholds, and announcement banner text.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(settingsForm);
                }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs space-y-4 max-w-2xl text-xs"
              >
                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Bakery Business Name</label>
                  <input
                    type="text"
                    value={settingsForm.bakeryName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bakeryName: e.target.value })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#5B3A32] mb-1">Free Delivery Min. Order (Rs.)</label>
                    <input
                      type="number"
                      value={settingsForm.freeDeliveryThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                      className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#5B3A32] mb-1">Standard Delivery Fee (Rs.)</label>
                    <input
                      type="number"
                      value={settingsForm.deliveryFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFee: Number(e.target.value) })}
                      className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Flagship Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Hotline Phone</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Save Bakery Settings
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#5B3A32]/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#F58FA3]/30 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
              {editingProduct ? 'Edit Bakery Product' : 'Add New Bakery Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block font-bold text-[#5B3A32] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="e.g. Cardamom Rose Loaf"
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value as any })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  >
                    <option value="Cakes">Cakes</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Pastries">Pastries</option>
                    <option value="Cookies">Cookies</option>
                    <option value="Brownies">Brownies</option>
                    <option value="Breads">Breads</option>
                    <option value="Donuts">Donuts</option>
                    <option value="Cheesecakes">Cheesecakes</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5B3A32] mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl p-3 text-[#5B3A32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newProductForm.image}
                    onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProductForm.featured}
                    onChange={(e) => setNewProductForm({ ...newProductForm, featured: e.target.checked })}
                    className="accent-[#D94F70]"
                  />
                  <span>Featured on Home</span>
                </label>
                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProductForm.bestSeller}
                    onChange={(e) => setNewProductForm({ ...newProductForm, bestSeller: e.target.checked })}
                    className="accent-[#D94F70]"
                  />
                  <span>Best Seller Badge</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="bg-gray-100 text-[#5B3A32] font-bold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold px-5 py-2 rounded-xl"
                >
                  Save Bake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
