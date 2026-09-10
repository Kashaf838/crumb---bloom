import React, { useState, useRef, useEffect } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Cake,
  Sparkles,
  ChevronDown,
  Calendar,
  Layers,
  MapPin,
  Phone,
  HelpCircle,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    wishlist,
    setIsCartDrawerOpen,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    products,
    navigateToProduct,
    navigateToShop,
    setSelectedCategory,
    logoutCustomer
  } = useBakery();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Search results
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop', view: 'shop' as const },
    { label: 'Categories', view: 'categories' as const },
    { label: 'Custom Cakes', view: 'custom-cake' as const, highlight: true },
    { label: 'Offers', view: 'offers' as const },
    { label: 'About', view: 'about' as const },
  ];

  const moreLinks = [
    { label: 'Our Bakery & Kitchen', view: 'our-bakery' as const, icon: MapPin },
    { label: 'Seasonal Collection', view: 'seasonal' as const, icon: Sparkles },
    { label: 'Catering & Events', view: 'catering' as const, icon: Calendar },
    { label: 'Track My Order', view: 'track-order' as const, icon: Layers },
    { label: 'FAQ & Storage Tips', view: 'faq' as const, icon: HelpCircle },
    { label: 'Contact Us', view: 'contact' as const, icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#F58FA3]/25 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Logo & Brand Icon */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
              id="brand-logo"
            >
              {/* Bakery emblem */}
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#F58FA3] to-[#D94F70] flex items-center justify-center text-white shadow-md shadow-[#F58FA3]/30 group-hover:scale-105 transition-transform">
                <Cake size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#5B3A32] group-hover:text-[#D94F70] transition-colors block leading-none">
                  CRUMB & BLOOM
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#8E3552]/80 mt-1 block">
                  Freshly baked, lovingly made
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setCurrentView(link.view);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#F58FA3] text-white shadow-xs font-semibold'
                      : link.highlight
                      ? 'text-[#D94F70] hover:bg-[#FFF0F3] font-semibold'
                      : 'text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF0F3]'
                  }`}
                >
                  {link.highlight && <Sparkles size={14} className="text-[#D94F70]" />}
                  {link.label}
                </button>
              );
            })}

            {/* "More" dropdown for additional pages */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  isMoreMenuOpen ? 'bg-[#FFF0F3] text-[#D94F70]' : 'text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF0F3]'
                }`}
              >
                <span>Discover</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMoreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#F58FA3]/30 p-2 z-50"
                  >
                    {moreLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            setCurrentView(item.view);
                            setIsMoreMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium rounded-xl transition-colors cursor-pointer text-left ${
                            currentView === item.view
                              ? 'bg-[#FFF0F3] text-[#D94F70] font-semibold'
                              : 'text-[#5B3A32] hover:bg-[#FFF8F0] hover:text-[#D94F70]'
                          }`}
                        >
                          <Icon size={15} className="text-[#F58FA3]" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* RIGHT: Actions (Search, Wishlist, Account, Cart, Mobile Menu) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Search Icon Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF0F3] rounded-full transition-colors cursor-pointer"
              aria-label="Search bakery treats"
              id="nav-search-btn"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2.5 text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF0F3] rounded-full transition-colors cursor-pointer"
              aria-label="View sweet wishlist"
              id="nav-wishlist-btn"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute 1.5 top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#D94F70] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Icon & Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  if (currentUser) {
                    setIsUserMenuOpen(!isUserMenuOpen);
                  } else {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }
                }}
                className="p-2.5 text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF0F3] rounded-full transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Customer account"
                id="nav-account-btn"
              >
                <User size={20} />
                {currentUser && (
                  <span className="hidden xl:inline text-xs font-semibold text-[#5B3A32]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && currentUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#F58FA3]/30 p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-[#FFF0F3] mb-1">
                      <p className="text-xs font-bold text-[#5B3A32]">{currentUser.name}</p>
                      <p className="text-[11px] text-[#8E3552]/70 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentView('customer-portal');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#5B3A32] hover:bg-[#FFF8F0] hover:text-[#D94F70] rounded-xl transition-colors cursor-pointer"
                    >
                      My Dashboard & Orders
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('wishlist');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#5B3A32] hover:bg-[#FFF8F0] hover:text-[#D94F70] rounded-xl transition-colors cursor-pointer"
                    >
                      Saved Sweet Treats ({wishlist.length})
                    </button>
                    <button
                      onClick={() => {
                        logoutCustomer();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#D94F70] hover:bg-[#FFF0F3] rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <LogOut size={13} />
                      <span>Log Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-[#F58FA3] hover:bg-[#D94F70] active:scale-95 text-white px-3.5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer ml-1"
              id="nav-cart-btn"
              aria-label="Open Shopping Basket"
            >
              <ShoppingBag size={18} />
              <span className="text-xs font-bold hidden sm:inline">Basket</span>
              <span className="w-5 h-5 rounded-full bg-white text-[#D94F70] text-[11px] font-bold flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF0F3] rounded-full transition-colors cursor-pointer lg:hidden ml-1"
              aria-label="Toggle navigation menu"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Global Search Expandable Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-[#F58FA3]/20 pb-4 pt-2"
            >
              <div className="relative max-w-2xl mx-auto">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 text-[#8E3552]/60" size={18} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cakes, cookies, pistachio, croissants, chocolate fudge..."
                    className="w-full bg-white border-2 border-[#F58FA3] rounded-full py-2.5 pl-11 pr-10 text-sm text-[#5B3A32] placeholder:text-[#8E3552]/40 focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30 shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 text-[#8E3552]/50 hover:text-[#5B3A32] p-1"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Autocomplete Results Box */}
                {searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#F58FA3]/30 overflow-hidden z-50 max-h-80 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="p-2 divide-y divide-[#FFF0F3]">
                        <div className="px-3 py-1.5 text-[11px] font-bold text-[#8E3552]/70 uppercase tracking-wider">
                          Found {searchResults.length} sweet {searchResults.length === 1 ? 'treat' : 'treats'}
                        </div>
                        {searchResults.slice(0, 5).map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              navigateToProduct(prod);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-3 p-2.5 hover:bg-[#FFF8F0] cursor-pointer rounded-xl transition-colors"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#5B3A32] truncate">
                                {prod.name}
                              </p>
                              <p className="text-xs text-[#D94F70] font-medium">
                                {prod.category} • Rs. {(prod.discountPrice || prod.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        {searchResults.length > 5 && (
                          <button
                            onClick={() => {
                              setSelectedCategory('All');
                              setCurrentView('shop');
                              setIsSearchOpen(false);
                            }}
                            className="w-full text-center py-2.5 text-xs font-bold text-[#D94F70] hover:bg-[#FFF0F3] transition-colors"
                          >
                            View all {searchResults.length} results in shop →
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-sm text-[#5B3A32]/70">
                        <p className="font-serif text-base font-semibold mb-1">We couldn’t find that treat 🍓</p>
                        <p className="text-xs text-[#8E3552]/70">
                          Try searching for "chocolate", "croissant", "pistachio", or "cake"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-[#F58FA3]/25 px-5 py-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setCurrentView(link.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    currentView === link.view
                      ? 'bg-[#FFF0F3] text-[#D94F70] font-bold'
                      : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="border-t border-[#FFF0F3] pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E3552]/70 block mb-2">
                Discover More
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {moreLinks.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setCurrentView(item.view);
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 text-left text-[#5B3A32] hover:text-[#D94F70] hover:bg-[#FFF8F0] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <item.icon size={13} className="text-[#F58FA3]" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#FFF0F3] pt-3 flex items-center justify-between">
              {currentUser ? (
                <button
                  onClick={() => {
                    setCurrentView('customer-portal');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-[#5B3A32] hover:text-[#D94F70]"
                >
                  My Account ({currentUser.name})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="text-xs font-bold text-[#D94F70]"
                >
                  Sign In / Register
                </button>
              )}
              <button
                onClick={() => {
                  setCurrentView('track-order');
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-[#8E3552]/80 hover:text-[#5B3A32]"
              >
                Track Order
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
