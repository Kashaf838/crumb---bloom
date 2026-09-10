import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Cake,
  Flame,
  Sparkles,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Order } from '../../types';

export const TrackOrderPage: React.FC = () => {
  const { orders, currentOrder, setCurrentView } = useBakery();

  const defaultOrder = currentOrder || orders[0] || null;
  const [orderQuery, setOrderQuery] = useState(defaultOrder?.orderNumber || defaultOrder?.id || 'CB-2026-1048');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(defaultOrder);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const clean = orderQuery.trim().replace('#', '').toUpperCase();
    if (!clean) {
      setSearchedOrder(defaultOrder);
      return;
    }
    const found = orders.find(
      (o) =>
        (o.orderNumber && o.orderNumber.toUpperCase().includes(clean)) ||
        (o.id && o.id.toUpperCase().includes(clean)) ||
        (o.customer?.phone && o.customer.phone.includes(clean)) ||
        (o.customerPhone && o.customerPhone.includes(clean)) ||
        (o.customer?.email && o.customer.email.toLowerCase().includes(orderQuery.trim().toLowerCase())) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(orderQuery.trim().toLowerCase())) ||
        (o.customerName && o.customerName.toLowerCase().includes(orderQuery.trim().toLowerCase()))
    );
    setSearchedOrder(found || null);
  };

  const trackingSteps = [
    { title: 'Order Received', desc: 'Recipe queued with our pastry chefs', icon: Clock, status: 'Completed' },
    { title: 'Mixing & Preparing', desc: 'Organic butter & dough folded with care', icon: Sparkles, status: 'Completed' },
    { title: 'Oven Baking', desc: 'Baking gently at precise temperatures', icon: Flame, status: 'In Progress' },
    { title: 'Piping & Decoration', desc: 'Hand-decorated with fresh berries & cream', icon: Cake, status: 'Pending' },
    { title: 'Chilled Transit', desc: 'Chilled temperature-regulated courier ride', icon: Truck, status: 'Pending' },
  ];

  // Helper to determine step progress index
  const getProgressIndex = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 5;
      case 'Out for Delivery':
      case 'Ready for Pickup':
        return 4;
      case 'Decorating':
        return 3;
      case 'Baking':
        return 2;
      case 'Preparing':
        return 1;
      case 'Pending':
      default:
        return 0;
    }
  };

  const activeStepIdx = searchedOrder ? getProgressIndex(searchedOrder.status) : 2;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest">
          Live Bakery Tracker
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Track Your Sweet Creation
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80 max-w-md mx-auto">
          Enter your Order Number (e.g. CB-2026-1048) or phone number to see live oven updates and delivery ETA.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E3552]/50" size={16} />
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Order ID: e.g. CB-2026-1048 or CB-2026-1047"
            className="w-full bg-white border-2 border-[#F58FA3]/40 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#5B3A32] focus:outline-hidden focus:border-[#D94F70]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#D94F70] hover:bg-[#8E3552] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
        >
          Track
        </button>
      </form>

      {/* Tracking Result Card */}
      {hasSearched && (
        searchedOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs space-y-8">
            
            {/* Status Top Line */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#FFF0F3] gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#8E3552]/70 uppercase tracking-wider block">
                  Order Reference
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#5B3A32]">
                  {searchedOrder.orderNumber || searchedOrder.id}
                </h2>
                <p className="text-xs text-[#8E3552]/80 mt-0.5">
                  Ordered for: <strong>{searchedOrder.deliveryDate || 'Today'} ({searchedOrder.deliveryTime || searchedOrder.estimatedDeliveryTime || 'Today by 4:30 PM'})</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="bg-[#FFF0F3] text-[#D94F70] border border-[#F58FA3] text-xs font-bold px-3 py-1.5 rounded-full inline-block">
                  Current Status: {searchedOrder.status}
                </span>
                <p className="text-xs text-[#4A7840] font-semibold mt-1">
                  Estimated Delivery: {(searchedOrder.deliveryTime || searchedOrder.estimatedDeliveryTime || 'Within 90 mins').split(' - ')[0]}
                </p>
              </div>
            </div>

            {/* Stepper timeline */}
            <div className="py-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B3A32] mb-6">
                Bakery Progress Timeline
              </h3>
              
              <div className="relative">
                {/* Horizontal line for desktop */}
                <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-[#FFF0F3] -z-0" />
                <div
                  className="hidden md:block absolute top-5 left-8 h-1 bg-[#D94F70] -z-0 transition-all duration-500"
                  style={{ width: `${Math.min(100, activeStepIdx * 25)}%` }}
                />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  {trackingSteps.map((step, idx) => {
                    const isPassed = idx <= activeStepIdx;
                    const isCurrent = idx === activeStepIdx;
                    const Icon = step.icon;

                    return (
                      <div key={step.title} className="flex md:flex-col items-center md:items-center gap-4 md:gap-2 text-left md:text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs ${
                            isCurrent
                              ? 'bg-[#D94F70] text-white ring-4 ring-[#FFF0F3] scale-110'
                              : isPassed
                              ? 'bg-[#B8D8B0] text-[#2F5227]'
                              : 'bg-[#FFF8F0] text-gray-400 border border-[#F58FA3]/20'
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold ${isPassed ? 'text-[#5B3A32]' : 'text-gray-400'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[10px] text-[#8E3552]/70 leading-tight mt-0.5 max-w-[120px]">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items Snapshot */}
            <div className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-6 border border-[#F58FA3]/25 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B3A32]">
                Order Contents ({searchedOrder.items.length} items)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#F58FA3]/20">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#5B3A32] truncate">{item.product.name}</p>
                      <p className="text-[11px] text-[#8E3552]/70">Quantity: {item.quantity} × Rs. {(item.product.discountPrice || item.product.price).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-[#5B3A32]">
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#D94F70]" />
                <span>Questions about your order? Call our bakery dispatch: <strong>042-3571-BAKE</strong></span>
              </div>
              <button
                onClick={() => setCurrentView('contact')}
                className="text-[#D94F70] hover:underline font-bold"
              >
                Contact Bakery Team →
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#F58FA3]/25 shadow-xs space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#5B3A32]">Order Not Found</h3>
            <p className="text-xs text-[#8E3552]/80 max-w-sm mx-auto">
              We couldn't locate an active order with reference "{orderQuery}". Try <strong>CB-2026-1048</strong> or <strong>CB-2026-1047</strong> to test the live tracking.
            </p>
          </div>
        )
      )}

    </div>
  );
};
