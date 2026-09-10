import React, { useEffect } from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { ShopPage } from './pages/customer/ShopPage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import { CategoriesPage } from './pages/customer/CategoriesPage';
import { CustomCakePage } from './pages/customer/CustomCakePage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderConfirmationPage } from './pages/customer/OrderConfirmationPage';
import { TrackOrderPage } from './pages/customer/TrackOrderPage';
import { WishlistPage } from './pages/customer/WishlistPage';
import { AboutPage } from './pages/customer/AboutPage';
import { OurBakeryPage } from './pages/customer/OurBakeryPage';
import { CateringPage } from './pages/customer/CateringPage';
import { OffersPage } from './pages/customer/OffersPage';
import { SeasonalPage } from './pages/customer/SeasonalPage';
import { ContactPage } from './pages/customer/ContactPage';
import { FaqPage } from './pages/customer/FaqPage';
import { CustomerPortalPage } from './pages/customer/CustomerPortalPage';

// Admin Portal
import { AdminPortal } from './pages/admin/AdminPortal';

const BakeryAppContent: React.FC = () => {
  const { currentView, isAdminLoggedIn } = useBakery();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // If Admin view is active or admin is logged in and on admin view
  if (currentView === 'admin' || (isAdminLoggedIn && currentView === 'admin')) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex flex-col font-sans">
        <AdminPortal />
        <ToastContainer />
      </div>
    );
  }

  // Render Current Customer Page
  const renderCurrentPage = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'custom-cake':
      case 'custom-cakes':
        return <CustomCakePage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'track-order':
        return <TrackOrderPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <AboutPage />;
      case 'our-bakery':
        return <OurBakeryPage />;
      case 'catering':
        return <CateringPage />;
      case 'offers':
        return <OffersPage />;
      case 'seasonal':
        return <SeasonalPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'customer-portal':
        return <CustomerPortalPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#5B3A32] font-sans antialiased selection:bg-[#F58FA3] selection:text-white">
      {/* Top Banner Announcement */}
      <AnnouncementBar />

      {/* Main Responsive Navigation Bar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1 pb-12">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BakeryProvider>
      <BakeryAppContent />
    </BakeryProvider>
  );
}
