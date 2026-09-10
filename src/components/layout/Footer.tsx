import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Cake, Mail, MapPin, Phone, Clock, Instagram, Facebook, Heart, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToShop, addToast, loginAdmin, isAdminLoggedIn } = useBakery();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email', undefined, 'warning');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the Sweet Club! 💌', 'Enjoy 10% off your first order with code WELCOME10', 'success');
  };

  return (
    <footer className="bg-[#5B3A32] text-[#FFF8F0] pt-16 pb-12 border-t-4 border-[#F58FA3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Callout Banner */}
        <div className="bg-[#8E3552] rounded-3xl p-6 sm:p-10 mb-16 shadow-xl relative overflow-hidden border border-[#D94F70]/40">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[#FFC6A8] text-xs font-bold uppercase tracking-widest block mb-1">
                The Sweet Club Newsletter
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Get fresh updates & sweet offers.
              </h3>
              <p className="text-sm text-white/80">
                Subscribe to receive secret weekend cake drops, early seasonal specials, and a 10% welcome gift.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 bg-[#B8D8B0] text-[#2F5227] px-6 py-3 rounded-full text-sm font-bold shadow-md">
                  <Check size={18} />
                  <span>You're subscribed! Use coupon code: WELCOME10</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-white/15 text-white placeholder:text-white/60 text-sm rounded-full pl-11 pr-4 py-3 border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-[#FFC6A8]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#F58FA3] hover:bg-[#D94F70] text-white font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Five Major Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 text-sm">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#F58FA3] to-[#D94F70] flex items-center justify-center text-white shadow-md">
                <Cake size={22} />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#FFF8F0] block leading-none">
                  CRUMB & BLOOM
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#FFC6A8] mt-0.5 block">
                  Freshly baked, lovingly made
                </span>
              </div>
            </div>
            <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-sm">
              An artisan cozy boutique bakery crafting handmade cakes, French croissants, melt-in-the-mouth cookies, and bespoke celebration showstoppers with pure ingredients and lots of love.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); addToast('Visiting Instagram @crumbandbloom'); }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F58FA3] transition-colors flex items-center justify-center text-white cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); addToast('Visiting Facebook /crumbandbloom'); }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F58FA3] transition-colors flex items-center justify-center text-white cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => { e.preventDefault(); addToast('Visiting TikTok @crumbandbloombakes'); }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F58FA3] transition-colors flex items-center justify-center text-white cursor-pointer font-bold text-xs"
                aria-label="TikTok"
              >
                TK
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#FFC6A8] tracking-wide">
              Shop Bakes
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <button onClick={() => navigateToShop('Cakes')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Artisan Layer Cakes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('Cupcakes')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Petite Cupcakes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('Pastries')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  French Croissants & Danishes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('Cheesecakes')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Velvety Cheesecakes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop('Brownies')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Salted Caramel Brownies
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('custom-cake')} className="text-[#FFC6A8] font-semibold hover:underline cursor-pointer">
                  Custom Cake Studio ✨
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#FFC6A8] tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <button onClick={() => setCurrentView('track-order')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('faq')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('catering')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Catering & Dessert Tables
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('offers')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  Coupons & Sweet Deals
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('customer-portal')} className="hover:text-[#F58FA3] transition-colors cursor-pointer">
                  My Orders & Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (!isAdminLoggedIn) loginAdmin();
                    setCurrentView('admin');
                  }}
                  className="hover:text-[#FFC6A8] transition-colors cursor-pointer flex items-center gap-1 text-[#FFC6A8]"
                >
                  <span>Admin Dashboard</span>
                  <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded-sm">Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#FFC6A8] tracking-wide">
              Visit & Say Hello
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#F58FA3] shrink-0 mt-0.5" />
                <span>14-C Mini Market, Gulberg II, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#F58FA3] shrink-0" />
                <span>+92 (042) 3571-BAKE (2253)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-[#F58FA3] shrink-0" />
                <span>hello@crumbandbloom.com</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-white/70">
                <Clock size={15} className="text-[#B8D8B0] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 8:00 AM – 10:00 PM</p>
                  <p>Sunday: 9:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p className="flex items-center gap-1">
            © 2026 Crumb & Bloom. Freshly baked with <Heart size={13} className="text-[#F58FA3] fill-[#F58FA3]" /> for sweet moments.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
              Delivery Policy
            </button>
            <span>•</span>
            <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
              Privacy Notice
            </button>
            <span>•</span>
            <button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors">
              Our Story
            </button>
            <span>•</span>
            <button
              onClick={() => {
                if (!isAdminLoggedIn) loginAdmin();
                setCurrentView('admin');
              }}
              className="hover:text-[#FFC6A8] transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
