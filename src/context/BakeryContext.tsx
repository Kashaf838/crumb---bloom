import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ViewMode,
  AdminTab,
  Product,
  CategoryInfo,
  CartItem,
  Order,
  OrderStatus,
  CustomCakeRequest,
  IngredientInventory,
  Coupon,
  Review,
  Customer,
  StaffMember,
  ContactMessage,
  ToastMessage,
  ProductCategory
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_CUSTOM_CAKES,
  INITIAL_INGREDIENTS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_CUSTOMERS,
  INITIAL_STAFF,
  INITIAL_MESSAGES
} from '../data/mockData';

interface BakeryContextType {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  
  // Products & Categories
  products: Product[];
  categories: CategoryInfo[];
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, specialNote?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Pricing
  cartSubtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;
  deliveryFee: number;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  recentOrder: Order | null;
  currentOrder: Order | null;
  placeOrder: (orderInfo: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryMethod: Order['deliveryMethod'];
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Custom Cakes
  customCakes: CustomCakeRequest[];
  customCakeRequests: CustomCakeRequest[];
  submitCustomCakeRequest: (req: Omit<CustomCakeRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateCustomCakeStatus: (id: string, status: CustomCakeRequest['status']) => void;
  
  // Inventory
  ingredients: IngredientInventory[];
  inventory: IngredientInventory[];
  updateIngredientStock: (id: string, newStock: number) => void;
  updateInventoryStock: (id: string, newStock: number) => void;
  
  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'timesUsed'>) => void;
  deleteCoupon: (id: string) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified' | 'status'>) => void;
  updateReviewStatus: (id: string, status: Review['status']) => void;
  
  // Messages & Catering
  messages: ContactMessage[];
  contactMessages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  
  // Customers & Staff
  customers: Customer[];
  staff: StaffMember[];
  
  // Auth
  currentUser: Customer | null;
  loginCustomer: (email: string) => boolean;
  logoutCustomer: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  isAdminLoggedIn: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  
  // Admin Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Settings & Analytics
  settings: {
    bakeryName: string;
    announcementText: string;
    freeDeliveryThreshold: number;
    deliveryFee: number;
    address: string;
    phone: string;
    email: string;
    openingHours: string;
  };
  updateSettings: (newSettings: Partial<BakeryContextType['settings']>) => void;
  analytics: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    dailyGross: number;
    monthlyProjected: number;
    customCakeShare: number;
    ordersToday: number;
    growthRate: number;
  };

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  // Navigation helper
  navigateToProduct: (product: Product) => void;
  navigateToShop: (category?: ProductCategory) => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

const normalizeRoute = (pathname: string, hash: string): { view: ViewMode; adminTab?: AdminTab; productId?: string } => {
  let p = pathname;
  if (hash && hash.startsWith('#/')) {
    p = hash.slice(1);
  }
  const clean = p.toLowerCase().split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  
  if (clean === '' || clean === '/' || clean === '/home') return { view: 'home' };
  if (clean === '/shop') return { view: 'shop' };
  if (clean === '/categories' || clean === '/category') return { view: 'categories' };
  if (clean === '/custom-cake' || clean === '/custom-cakes' || clean === '/custom') return { view: 'custom-cake' };
  if (clean === '/cart' || clean === '/basket') return { view: 'cart' };
  if (clean === '/checkout') return { view: 'checkout' };
  if (clean === '/order-confirmation' || clean === '/confirmation') return { view: 'order-confirmation' };
  if (clean === '/track-order' || clean === '/track' || clean === '/tracking') return { view: 'track-order' };
  if (clean === '/wishlist' || clean === '/favorites') return { view: 'wishlist' };
  if (clean === '/about' || clean === '/our-story') return { view: 'about' };
  if (clean === '/our-bakery' || clean === '/bakery' || clean === '/kitchen') return { view: 'our-bakery' };
  if (clean === '/catering' || clean === '/events') return { view: 'catering' };
  if (clean === '/offers' || clean === '/deals' || clean === '/coupons') return { view: 'offers' };
  if (clean === '/seasonal') return { view: 'seasonal' };
  if (clean === '/contact' || clean === '/contact-us') return { view: 'contact' };
  if (clean === '/faq' || clean === '/faqs') return { view: 'faq' };
  if (clean === '/customer-portal' || clean === '/my-account' || clean === '/profile' || clean === '/account') return { view: 'customer-portal' };
  
  if (clean.startsWith('/product/') || clean.startsWith('/products/')) {
    const parts = clean.split('/');
    const id = parts[2];
    return { view: 'product-detail', productId: id };
  }
  if (clean === '/product-detail') return { view: 'product-detail' };

  if (clean.startsWith('/admin')) {
    const parts = clean.split('/');
    const tab = (parts[2] as AdminTab) || 'dashboard';
    const validTabs: AdminTab[] = [
      'dashboard', 'orders', 'products', 'categories', 'custom-cakes',
      'inventory', 'customers', 'coupons', 'offers', 'reviews',
      'messages', 'staff', 'analytics', 'reports', 'settings'
    ];
    return { view: 'admin', adminTab: validTabs.includes(tab) ? tab : 'dashboard' };
  }

  return { view: 'home' };
};

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewState] = useState<ViewMode>('home');
  const [adminTab, setAdminTabState] = useState<AdminTab>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const [settings, setSettings] = useState({
    bakeryName: 'Crumb & Bloom Artisan Bakery',
    announcementText: '✨ Fresh Warm Bakes Every Morning at 7:00 AM • Free Delivery on Orders Over Rs. 5,000 ✨',
    freeDeliveryThreshold: 5000,
    deliveryFee: 200,
    address: 'Plot 14-C, Main Boulevard, Gulberg III, Lahore, Pakistan',
    phone: '+92 300 8421990',
    email: 'hello@crumbandbloom.com',
    openingHours: 'Mon - Sun: 7:00 AM - 11:30 PM'
  });

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<CategoryInfo[]>(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pre-seed cart with 1 treat for nice demo look or start with initial items
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState<string[]>([INITIAL_PRODUCTS[1].id, INITIAL_PRODUCTS[4].id]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [recentOrder, setRecentOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  
  const [customCakes, setCustomCakes] = useState<CustomCakeRequest[]>(INITIAL_CUSTOM_CAKES);
  const [ingredients, setIngredients] = useState<IngredientInventory[]>(INITIAL_INGREDIENTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [staff] = useState<StaffMember[]>(INITIAL_STAFF);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<Customer | null>(INITIAL_CUSTOMERS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cart Totals Calculation
  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;

  const deliveryFee = cartSubtotal > 0 ? (cartSubtotal > 5000 ? 0 : 200) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Safe Navigation with URL PushState
  const setCurrentView = (view: ViewMode) => {
    setCurrentViewState(view);
    if (view === 'admin') {
      setIsAdminLoggedIn(true);
    }
    
    let target = `/${view}`;
    if (view === 'home') target = '/';
    else if (view === 'admin') target = `/admin/${adminTab}`;
    else if (view === 'product-detail' && selectedProduct) target = `/product/${selectedProduct.id}`;

    if (window.location.pathname !== target) {
      try {
        window.history.pushState({ view, adminTab }, '', target);
      } catch {
        // ignore cross-origin or sandbox restrictions if any
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setAdminTab = (tab: AdminTab) => {
    setAdminTabState(tab);
    setCurrentViewState('admin');
    setIsAdminLoggedIn(true);
    const target = `/admin/${tab}`;
    if (window.location.pathname !== target) {
      try {
        window.history.pushState({ view: 'admin', adminTab: tab }, '', target);
      } catch {
        // ignore
      }
    }
  };

  // Sync state from location (browser refresh, back/forward, direct URL)
  const syncFromCurrentUrl = () => {
    try {
      const { view, adminTab: tab, productId } = normalizeRoute(window.location.pathname, window.location.hash);
      setCurrentViewState(view);
      if (tab) {
        setAdminTabState(tab);
      }
      if (view === 'admin') {
        setIsAdminLoggedIn(true);
      }
      if (productId) {
        const found = INITIAL_PRODUCTS.find(p => p.id === productId || p.slug === productId);
        if (found) {
          setSelectedProduct(found);
        }
      }
    } catch {
      // fallback safe
    }
  };

  useEffect(() => {
    syncFromCurrentUrl();

    const onPopState = () => {
      syncFromCurrentUrl();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('Bakery configuration updated', undefined, 'success');
  };

  const addToCart = (product: Product, quantity = 1, specialNote?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity, specialNote: specialNote || item.specialNote }
            : item
        );
      }
      return [...prev, { product, quantity, specialNote }];
    });
    addToast(`Added to your sweet basket! 🍓`, `${quantity}x ${product.name}`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item removed from basket', undefined, 'info');
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const item = products.find(p => p.id === productId);
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addToast('Removed from your sweet wishlist', item?.name, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to your sweet wishlist! 💖', item?.name, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === clean && c.status === 'Active');
    if (!found) {
      addToast('Invalid Coupon Code', 'Please check and try again.', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      addToast('Order Minimum Not Met', `Minimum order for ${found.code} is Rs. ${found.minOrder.toLocaleString()}`, 'warning');
      return false;
    }
    setAppliedCoupon(found);
    addToast(`Coupon ${found.code} applied!`, `You saved with ${found.discountValue}${found.discountType === 'percentage' ? '%' : ' Rs'} off!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', undefined, 'info');
  };

  const placeOrder = (orderInfo: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryMethod: Order['deliveryMethod'];
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
  }): Order => {
    const orderId = `CB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      orderNumber: orderId,
      customerName: orderInfo.customerName,
      customerEmail: orderInfo.customerEmail,
      customerPhone: orderInfo.customerPhone,
      customer: {
        name: orderInfo.customerName,
        email: orderInfo.customerEmail,
        phone: orderInfo.customerPhone,
        address: orderInfo.shippingAddress.address
      },
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      deliveryFee,
      tax: 0,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
      status: 'Confirmed',
      deliveryMethod: orderInfo.deliveryMethod,
      deliveryType: orderInfo.deliveryMethod === 'Bakery Pickup' ? 'pickup' : 'delivery',
      deliveryDate: 'Today',
      deliveryTime: orderInfo.deliveryMethod === 'Express Delivery' ? 'Within 90 minutes' : orderInfo.deliveryMethod === 'Bakery Pickup' ? 'Ready for pickup in 45 minutes' : 'Today by 5:30 PM',
      shippingAddress: orderInfo.shippingAddress,
      paymentMethod: orderInfo.paymentMethod,
      estimatedDeliveryTime: orderInfo.deliveryMethod === 'Express Delivery' ? 'Within 90 minutes' : orderInfo.deliveryMethod === 'Bakery Pickup' ? 'Ready for pickup in 45 minutes' : 'Today by 5:30 PM',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    setRecentOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    setCurrentView('order-confirmation');
    addToast('Order Placed Successfully! 🍰', `Order #${newOrder.id} is now baking`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (recentOrder?.id === orderId) {
      setRecentOrder(prev => prev ? { ...prev, status } : null);
    }
    addToast(`Order ${orderId} updated`, `Status changed to ${status}`, 'info');
  };

  const submitCustomCakeRequest = (req: Omit<CustomCakeRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: CustomCakeRequest = {
      ...req,
      id: `REQ-${Math.floor(900 + Math.random() * 100)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setCustomCakes(prev => [newReq, ...prev]);
    addToast('Custom Cake Request Received! 🎂', 'Our Master Pastry Chef will review and send confirmation within 2 hours.', 'success');
  };

  const updateCustomCakeStatus = (id: string, status: CustomCakeRequest['status']) => {
    setCustomCakes(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    addToast(`Cake Request #${id} updated`, `Status changed to ${status}`, 'info');
  };

  const updateIngredientStock = (id: string, newStock: number) => {
    setIngredients(prev => prev.map(item => {
      if (item.id === id) {
        const status = newStock <= 0 ? 'Out of Stock' : newStock <= item.minimumLevel ? 'Low Stock' : 'In Stock';
        return { ...item, currentStock: newStock, status, lastUpdated: 'Just now' };
      }
      return item;
    }));
    addToast('Stock level updated', undefined, 'success');
  };

  const addCoupon = (newCoupon: Omit<Coupon, 'id' | 'timesUsed'>) => {
    const c: Coupon = {
      ...newCoupon,
      id: `c-${Date.now()}`,
      timesUsed: 0
    };
    setCoupons(prev => [c, ...prev]);
    addToast('New coupon created', `Code: ${c.code}`, 'success');
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    addToast('Coupon deleted', undefined, 'info');
  };

  const addReview = (review: Omit<Review, 'id' | 'date' | 'verified' | 'status'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true,
      status: 'Approved'
    };
    setReviews(prev => [newRev, ...prev]);
    addToast('Review submitted! ⭐️', 'Thank you for sharing your sweet feedback!', 'success');
  };

  const updateReviewStatus = (id: string, status: Review['status']) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addToast('Review status updated', `Marked as ${status}`, 'info');
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: 'Just now',
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
    addToast('Message Sent! 💌', 'Our bakery team will reply to your email shortly.', 'success');
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    addToast('Message updated', undefined, 'info');
  };

  const loginCustomer = (email: string): boolean => {
    const cust = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (cust) {
      setCurrentUser(cust);
      addToast(`Welcome back, ${cust.name}! 🥐`, 'Happy baking memories!', 'success');
      return true;
    }
    // Create new customer on the fly if not found
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email,
      phone: '+92 300 0000000',
      ordersCount: 0,
      totalSpent: 0,
      joinedDate: 'Today',
      status: 'Active',
      savedAddresses: ['Gulberg III, Lahore']
    };
    setCustomers(prev => [...prev, newCust]);
    setCurrentUser(newCust);
    addToast(`Account created! Welcome, ${newCust.name}! 🍓`, undefined, 'success');
    return true;
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
    addToast('Logged out successfully', undefined, 'info');
  };

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    setCurrentView('admin');
    addToast('Logged in to Bakery Admin 👑', 'Welcome back, Maryam!', 'success');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('home');
    addToast('Logged out of Admin Portal', undefined, 'info');
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProd, ...prev]);
    addToast('Product added to bakery catalog! 🧁', newProd.name, 'success');
  };

  const updateProduct = (idOrProduct: string | Product, updates?: Partial<Product>) => {
    if (typeof idOrProduct === 'object') {
      const p = idOrProduct;
      setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, ...p } : prod));
    } else {
      setProducts(prev => prev.map(p => p.id === idOrProduct ? { ...p, ...updates } : p));
    }
    addToast('Product updated in catalog', undefined, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product removed from catalog', undefined, 'info');
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('All');
    }
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BakeryContext.Provider value={{
      currentView,
      setCurrentView,
      adminTab,
      setAdminTab,
      selectedProduct,
      setSelectedProduct,
      products,
      categories,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      wishlist,
      toggleWishlist,
      isInWishlist,
      cartSubtotal,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      discountAmount,
      deliveryFee,
      cartTotal,
      orders,
      recentOrder,
      currentOrder: recentOrder,
      placeOrder,
      updateOrderStatus,
      customCakes,
      customCakeRequests: customCakes,
      submitCustomCakeRequest,
      updateCustomCakeStatus,
      ingredients,
      inventory: ingredients,
      updateIngredientStock,
      updateInventoryStock: updateIngredientStock,
      coupons,
      addCoupon,
      deleteCoupon,
      reviews,
      addReview,
      updateReviewStatus,
      messages,
      contactMessages: messages,
      addMessage,
      updateMessageStatus,
      customers,
      staff,
      currentUser,
      loginCustomer,
      logoutCustomer,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      settings,
      updateSettings,
      analytics: {
        totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0) + 142850,
        totalOrders: orders.length + 42,
        averageOrderValue: Math.round((orders.reduce((sum, o) => sum + (o.total || 0), 0) + 142850) / Math.max(1, orders.length + 42)),
        dailyGross: 72400,
        monthlyProjected: 1840000,
        customCakeShare: 38,
        ordersToday: orders.length,
        growthRate: 22
      },
      toasts,
      addToast,
      removeToast,
      navigateToProduct,
      navigateToShop
    }}>
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
