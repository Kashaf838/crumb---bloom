import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Truck,
  ArrowRight,
  Printer,
  Sparkles,
  ShoppingBag,
  Layers
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, setCurrentView, addToast } = useBakery();

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#5B3A32] mb-2">No recent order found</h2>
        <p className="text-xs text-[#8E3552]/80 mb-6">Explore our fresh bakery catalog to place an order.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-[#F58FA3] text-white text-xs font-bold px-6 py-3 rounded-full"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-linear-to-br from-[#FFF0F3] via-white to-[#FFC6A8]/30 rounded-3xl p-8 sm:p-12 text-center border-2 border-[#F58FA3]/40 shadow-xl space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#B8D8B0] text-[#2F5227] mx-auto flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle2 size={44} />
        </div>

        <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block">
          Order Successfully Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Freshly Baked Happiness is on its Way!
        </h1>

        <p className="text-sm text-[#5B3A32]/80 max-w-lg mx-auto">
          Thank you for choosing <strong>Crumb & Bloom</strong>. Our bakers have received your sweet request and are preparing fresh ingredients.
        </p>

        <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border border-[#F58FA3]/40 text-xs font-bold text-[#5B3A32] shadow-xs">
          <span>Order Reference:</span>
          <span className="text-[#D94F70] text-sm">{currentOrder.orderNumber}</span>
        </div>
      </div>

      {/* Details Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#FFF0F3] gap-2">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#5B3A32]">Order Details</h2>
            <p className="text-xs text-[#8E3552]/70">Placed on {new Date(currentOrder.createdAt).toLocaleDateString()} at {new Date(currentOrder.createdAt).toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#FFF0F3] text-[#D94F70] border border-[#F58FA3] text-xs font-bold px-3 py-1 rounded-full">
              Status: {currentOrder.status}
            </span>
            <button
              onClick={handlePrint}
              className="p-2 text-[#5B3A32]/60 hover:text-[#5B3A32] rounded-full hover:bg-[#FFF0F3] transition-colors"
              title="Print Receipt"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>

        {/* 3 info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#5B3A32]">
          <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/20 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#D94F70] mb-1">
              <Calendar size={15} />
              <span>Target Delivery Date</span>
            </div>
            <p className="font-semibold">{currentOrder.deliveryDate}</p>
            <p className="text-[#8E3552]/70">{currentOrder.deliveryTime}</p>
          </div>

          <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/20 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#D94F70] mb-1">
              <MapPin size={15} />
              <span>Destination</span>
            </div>
            <p className="font-semibold">{currentOrder.customer.name}</p>
            <p className="text-[#8E3552]/70 line-clamp-2">{currentOrder.customer.address}</p>
          </div>

          <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/20 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#D94F70] mb-1">
              <Truck size={15} />
              <span>Payment Mode</span>
            </div>
            <p className="font-semibold">{currentOrder.paymentMethod}</p>
            <p className="text-[#8E3552]/70">
              Fulfillment: {currentOrder.deliveryType === 'delivery' ? 'Chilled Delivery Van' : 'Bakery Pickup'}
            </p>
          </div>
        </div>

        {/* Itemized list */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5B3A32]">Items Ordered</h3>
          <div className="divide-y divide-[#FFF0F3]">
            {currentOrder.items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-[#5B3A32]">{item.product.name}</p>
                    <p className="text-[11px] text-[#8E3552]/70">Qty: {item.quantity} × Rs. {(item.product.discountPrice || item.product.price).toLocaleString()}</p>
                  </div>
                </div>
                <span className="font-bold text-[#D94F70]">
                  Rs. {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-[#FFF0F3] pt-4 space-y-1.5 text-xs text-[#5B3A32] max-w-xs ml-auto">
          <div className="flex justify-between">
            <span className="text-[#8E3552]/70">Subtotal</span>
            <span>Rs. {currentOrder.subtotal.toLocaleString()}</span>
          </div>
          {currentOrder.discount > 0 && (
            <div className="flex justify-between text-[#2F5227]">
              <span>Discount</span>
              <span>-Rs. {currentOrder.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#8E3552]/70">Delivery</span>
            <span>{currentOrder.deliveryFee === 0 ? 'FREE' : `Rs. ${currentOrder.deliveryFee}`}</span>
          </div>
          <div className="border-t border-[#FFF0F3] pt-2 flex justify-between font-bold text-sm">
            <span>Total Paid</span>
            <span className="text-base text-[#D94F70]">Rs. {currentOrder.total.toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => setCurrentView('track-order')}
          className="w-full sm:w-auto bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <Layers size={16} />
          <span>Track Order Status</span>
        </button>

        <button
          onClick={() => setCurrentView('customer-portal')}
          className="w-full sm:w-auto bg-[#FFF8F0] hover:bg-[#FFF0F3] border border-[#F58FA3] text-[#5B3A32] font-bold px-6 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <span>View My Account</span>
        </button>

        <button
          onClick={() => setCurrentView('shop')}
          className="w-full sm:w-auto text-[#D94F70] hover:underline font-bold text-xs"
        >
          Continue Shopping →
        </button>
      </div>

    </div>
  );
};
