export type ViewMode = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'categories'
  | 'custom-cake'
  | 'custom-cakes'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'track-order'
  | 'wishlist'
  | 'about'
  | 'our-bakery'
  | 'catering'
  | 'offers'
  | 'seasonal'
  | 'contact'
  | 'faq'
  | 'customer-portal'
  | 'admin';

export type AdminTab = 
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'categories'
  | 'custom-cakes'
  | 'inventory'
  | 'customers'
  | 'coupons'
  | 'offers'
  | 'reviews'
  | 'messages'
  | 'staff'
  | 'analytics'
  | 'reports'
  | 'settings';

export type ProductCategory = 
  | 'Cakes'
  | 'Cupcakes'
  | 'Pastries'
  | 'Cookies'
  | 'Brownies'
  | 'Breads'
  | 'Donuts'
  | 'Cheesecakes';

export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: ProductCategory;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  ingredients: string[];
  allergens: string[];
  weight: string;
  servings: string;
  freshness: string;
  featured: boolean;
  bestSeller: boolean;
  dietary?: ('Eggless' | 'Nut-Free' | 'Gluten-Free' | 'Halal' | 'Dairy-Free')[];
  occasion?: ('Birthday' | 'Wedding' | 'Anniversary' | 'Celebration' | 'Daily Treat' | 'Engagement')[];
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  preparationTime?: string;
  createdAt: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  specialNote?: string;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Baking'
  | 'Decorating'
  | 'Ready'
  | 'Ready for Pickup'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  orderNumber?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  deliveryMethod: 'Standard Delivery' | 'Express Delivery' | 'Bakery Pickup';
  deliveryType?: 'delivery' | 'pickup';
  deliveryDate?: string;
  deliveryTime?: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  paymentMethod: 'Cash on Delivery' | 'Card Payment' | 'Mobile Wallet';
  estimatedDeliveryTime: string;
  createdAt: string;
}

export interface CustomCakeRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  occasion: 'Birthday' | 'Wedding' | 'Anniversary' | 'Graduation' | 'Baby Shower' | 'Engagement' | 'Other';
  cakeSize: '1 Pound' | '2 Pound' | '3 Pound' | '4 Pound' | '5 Pound+';
  size?: string;
  tiers?: number | string;
  flavor: 'Chocolate' | 'Vanilla' | 'Red Velvet' | 'Strawberry' | 'Pistachio' | 'Lotus' | 'Coffee' | 'Customized';
  frosting: 'Buttercream' | 'Cream Cheese' | 'Whipped Cream' | 'Chocolate Ganache';
  filling?: string;
  designStyle: 'Minimal' | 'Floral' | 'Cartoon' | 'Elegant' | 'Vintage' | 'Photo Cake' | 'Custom';
  customMessage?: string;
  message?: string;
  preferredDate: string;
  date?: string;
  preferredTime: string;
  specialInstructions?: string;
  referenceImageName?: string;
  referenceImage?: string;
  estimatedPrice: number;
  estimatedBudget?: string | number;
  status: 'New' | 'Reviewing' | 'Quoted' | 'Approved' | 'In Production' | 'Completed' | 'Cancelled' | 'Pending Review';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  avatar?: string;
  cakePhoto?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface IngredientInventory {
  id: string;
  name: string;
  ingredientName?: string;
  currentStock: number;
  quantity?: number;
  unit: 'kg' | 'liters' | 'units' | 'boxes';
  minimumLevel: number;
  minThreshold?: number;
  category?: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  usageLimit: number;
  timesUsed: number;
  expiry: string;
  status: 'Active' | 'Expired';
}

export interface Offer {
  id: string;
  title: string;
  tag: string;
  description: string;
  discountBadge: string;
  code?: string;
  image: string;
  bgColor: string;
  ctaText: string;
  targetCategory?: ProductCategory;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  joinDate?: string;
  rewardPoints?: number;
  status: 'Active' | 'Inactive';
  savedAddresses: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  shift: string;
  status: 'Active' | 'On Leave';
  avatar: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'General' | 'Catering' | 'Custom Cake' | 'Feedback';
  date: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface BakerySettings {
  bakeryName: string;
  announcementText: string;
  freeDeliveryThreshold: number;
  deliveryFee: number;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
