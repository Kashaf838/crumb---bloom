import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  User,
  ShoppingBag,
  Heart,
  Gift,
  MapPin,
  Clock,
  Layers,
  Sparkles,
  LogOut,
  Edit2,
  Check,
  ChevronRight,
  Truck
} from 'lucide-react';

export const CustomerPortalPage: React.FC = () => {
  const {
    currentUser,
    orders,
    wishlist,
    setCurrentView,
    logoutCustomer,
    addToCart,
    addToast,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useBakery();

  const [activeTab, setActiveTab] = useState<'orders' | 'rewards' | 'addresses' | 'profile'>('orders');

  // If not logged in, prompt
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFF0F3] text-[#D94F70] mx-auto flex items-center justify-center">
          <User size={30} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#5B3A32]">
          Please Sign In to Access Your Account
        </h2>
        <p className="text-xs text-[#8E3552]/80">
          Access your past cake orders, sweet reward points, and saved addresses.
        </p>
        <button
          onClick={() => {
            setAuthModalMode('login');
            setIsAuthModalOpen(true);
          }}
          className="bg-[#D94F70] hover:bg-[#8E3552] text-white text-xs font-bold px-6 py-2.5 rounded-full cursor-pointer transition-all shadow-sm"
        >
          Sign In
        </button>
      </div>
    );
  }

  const userOrders = orders.filter(
    (o) => (o.customer?.email || o.customerEmail || '').toLowerCase() === (currentUser.email || '').toLowerCase()
  );

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => addToCart(item.product, item.quantity));
    addToast(`Reordered ${order.items.length} items to your basket! 🍰`, undefined, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Profile Header Card */}
      <div className="bg-linear-to-r from-[#FFF0F3] via-[#FFF8F0] to-[#FFC6A8]/30 rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-20 h-20 rounded-full bg-linear-to-tr from-[#F58FA3] to-[#D94F70] text-white font-serif text-3xl font-bold flex items-center justify-center shadow-md">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#5B3A32]">
                {currentUser.name}
              </h1>
              <span className="bg-[#B8D8B0] text-[#2F5227] text-[10px] font-bold px-2 py-0.5 rounded-full">
                Sweet VIP Member
              </span>
            </div>
            <p className="text-xs text-[#8E3552]/80 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
            <p className="text-[11px] text-[#5B3A32]/70 mt-1">
              Member since {currentUser.joinDate} • <strong>{userOrders.length}</strong> bakery orders placed
            </p>
          </div>
        </div>

        {/* Loyalty pill */}
        <div className="bg-white rounded-2xl p-4 border border-[#F58FA3]/30 text-center shadow-xs min-w-[160px]">
          <span className="text-[11px] font-bold text-[#8E3552]/70 uppercase tracking-wider block">
            Sweet Points Balance
          </span>
          <span className="text-2xl font-extrabold text-[#D94F70] block">
            {currentUser.rewardPoints} pts
          </span>
          <span className="text-[10px] text-[#4A7840] font-semibold">
            = Rs. {(currentUser.rewardPoints * 2).toLocaleString()} off next order
          </span>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Tabs (Sidebar) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-[#F58FA3]/25 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-[#F58FA3] text-white shadow-xs'
                : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
            }`}
          >
            <ShoppingBag size={16} />
            <span>My Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'rewards'
                ? 'bg-[#F58FA3] text-white shadow-xs'
                : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
            }`}
          >
            <Gift size={16} />
            <span>Sweet Club Rewards</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'addresses'
                ? 'bg-[#F58FA3] text-white shadow-xs'
                : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
            }`}
          >
            <MapPin size={16} />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-[#F58FA3] text-white shadow-xs'
                : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
            }`}
          >
            <User size={16} />
            <span>Profile Settings</span>
          </button>

          <div className="pt-3 border-t border-[#FFF0F3] mt-2">
            <button
              onClick={logoutCustomer}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-[#D94F70] hover:bg-[#FFF0F3] transition-colors text-left"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#FFF0F3]">
                <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
                  Order History ({userOrders.length})
                </h3>
              </div>

              {userOrders.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#8E3552]/70 space-y-3">
                  <p>You haven't placed any bakery orders yet.</p>
                  <button
                    onClick={() => setCurrentView('shop')}
                    className="bg-[#F58FA3] text-white font-bold px-5 py-2 rounded-full"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#F58FA3]/30 rounded-2xl p-4 sm:p-5 hover:border-[#D94F70] transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#FFF0F3] pb-3">
                        <div>
                          <span className="text-xs font-bold text-[#D94F70]">
                            {order.orderNumber || order.id}
                          </span>
                          <span className="text-xs text-[#8E3552]/70 ml-2">
                            Placed {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-[#FFF0F3] text-[#D94F70] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            {order.status}
                          </span>
                          <span className="text-sm font-bold text-[#5B3A32]">
                            Rs. {order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Line items */}
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-2 bg-[#FFF8F0] px-2.5 py-1 rounded-xl text-xs text-[#5B3A32]">
                            <img src={item.product.image} alt={item.product.name} className="w-6 h-6 rounded-md object-cover" />
                            <span>{item.product.name} (×{item.quantity})</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 text-xs">
                        <span className="text-[#8E3552]/70">
                          Delivery: {order.deliveryDate || 'Today'} ({order.deliveryTime || order.estimatedDeliveryTime || 'Standard'})
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCurrentView('track-order')}
                            className="text-[#D94F70] hover:underline font-bold"
                          >
                            Track Live
                          </button>
                          <span>•</span>
                          <button
                            onClick={() => handleReorder(order)}
                            className="text-[#5B3A32] hover:text-[#D94F70] font-semibold"
                          >
                            Reorder All
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REWARDS */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
                Sweet Club Loyalty & Perks
              </h3>
              <p className="text-xs text-[#5B3A32]/80 leading-relaxed">
                Earn 10 Sweet Points for every Rs. 1,000 spent. Redeem points for free cupcakes, artisanal croissants, and discounts on custom celebration cakes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/25 space-y-1">
                  <span className="text-xs font-bold text-[#D94F70]">Free Petite Cupcake Box</span>
                  <p className="text-xs text-[#5B3A32]/70">Redeem with 200 points</p>
                  <button
                    onClick={() => addToast('Reward voucher added! 🧁', undefined, 'success')}
                    className="bg-[#D94F70] text-white text-[11px] font-bold px-3 py-1 rounded-full mt-2"
                  >
                    Redeem Now
                  </button>
                </div>

                <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/25 space-y-1">
                  <span className="text-xs font-bold text-[#D94F70]">Rs. 500 Celebration Voucher</span>
                  <p className="text-xs text-[#5B3A32]/70">Redeem with 250 points</p>
                  <button
                    onClick={() => addToast('Voucher code REWARD500 copied!', undefined, 'success')}
                    className="bg-[#D94F70] text-white text-[11px] font-bold px-3 py-1 rounded-full mt-2"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#FFF0F3]">
                <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
                  Saved Delivery Addresses
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border-2 border-[#D94F70] bg-[#FFF0F3]/30 flex items-start justify-between text-xs">
                  <div>
                    <span className="bg-[#D94F70] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block">
                      Default Home
                    </span>
                    <h4 className="font-bold text-[#5B3A32] text-sm">DHA Residence</h4>
                    <p className="text-[#8E3552]/80 mt-0.5">House 42, Street 8, Phase 5 DHA, Lahore</p>
                    <p className="text-[#8E3552]/70 mt-0.5">Phone: +92 300 1234567</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#F58FA3]/30 bg-white flex items-start justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#5B3A32] text-sm">Gulberg Studio Office</h4>
                    <p className="text-[#8E3552]/80 mt-0.5">Floor 3, Siddiq Trade Centre, Gulberg, Lahore</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
                Personal Profile Information
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addToast('Profile updated successfully! ✨', undefined, 'success');
                }}
                className="space-y-4 max-w-md text-xs"
              >
                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5B3A32] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={currentUser.phone}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-[#5B3A32]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
