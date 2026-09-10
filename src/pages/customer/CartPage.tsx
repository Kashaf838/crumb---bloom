import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ChevronLeft,
  ShieldCheck,
  Clock
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    deliveryFee,
    cartTotal,
    setCurrentView,
    navigateToProduct
  } = useBakery();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-[#FFF0F3] text-[#F58FA3] mx-auto flex items-center justify-center mb-6 shadow-inner">
          <ShoppingBag size={42} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#5B3A32] mb-3">
          Your sweet basket is feeling a little empty
        </h2>
        <p className="text-sm text-[#8E3552]/80 max-w-md mx-auto mb-8">
          Our morning ovens are warm and fragrant. Discover handcrafted cakes, pastries, and sweet treats waiting for you.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-[#F58FA3] hover:bg-[#D94F70] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-xl cursor-pointer"
        >
          Explore Fresh Bakery Menu 🥐
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8E3552] hover:text-[#D94F70] transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="border-b border-[#F58FA3]/25 pb-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Your Sweet Basket
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80 mt-1">
          Review your selected bakery treats and celebration bakes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Cart Items Table / List */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-6">
          <div className="divide-y divide-[#FFF0F3]">
            {cart.map((item) => {
              const itemPrice = item.product.discountPrice || item.product.price;
              return (
                <div key={item.product.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onClick={() => navigateToProduct(item.product)}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover cursor-pointer hover:opacity-90 shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-bold text-[#D94F70] uppercase">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => navigateToProduct(item.product)}
                        className="font-serif text-base sm:text-lg font-bold text-[#5B3A32] hover:text-[#D94F70] cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#8E3552]/70 mt-0.5">
                        {item.product.weight} • {item.product.servings}
                      </p>
                      {item.specialInstructions && (
                        <p className="text-[11px] text-[#5B3A32]/80 bg-[#FFF8F0] px-2 py-0.5 rounded-md mt-1 italic">
                          Note: "{item.specialInstructions}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#F58FA3]/40 rounded-full bg-[#FFF8F0] px-2.5 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#5B3A32] hover:text-[#D94F70]"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold px-3 text-[#5B3A32]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#5B3A32] hover:text-[#D94F70]"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-[#D94F70]">
                        Rs. {(itemPrice * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-[11px] text-[#8E3552]/60">
                        Rs. {itemPrice.toLocaleString()} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-[#5B3A32]/40 hover:text-[#D94F70] transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bakery Delivery Assurance */}
          <div className="bg-[#FFF8F0] rounded-2xl p-4 border border-[#F58FA3]/25 flex items-center gap-3 text-xs text-[#5B3A32]">
            <ShieldCheck size={20} className="text-[#4A7840] shrink-0" />
            <div>
              <strong className="block text-[#5B3A32]">Chilled Delivery Guarantee</strong>
              <span>Every cake is transported inside an insulated cold box with fragile stabilization.</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
            Order Summary
          </h3>

          {/* Coupon input */}
          <div>
            <label className="block text-xs font-bold text-[#5B3A32] mb-1">Coupon Code</label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-[#F2F8F0] border border-[#B8D8B0] p-3 rounded-xl text-xs">
                <span className="font-bold text-[#2F5227]">
                  {appliedCoupon.code} applied (-Rs. {discountAmount.toLocaleString()})
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-[#D94F70] font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="SWEET20 / WELCOME10"
                  className="flex-1 bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3 py-2 text-xs uppercase text-[#5B3A32]"
                />
                <button
                  type="submit"
                  className="bg-[#5B3A32] hover:bg-[#8E3552] text-white text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Numbers */}
          <div className="space-y-2 text-xs text-[#5B3A32] border-t border-[#FFF0F3] pt-4">
            <div className="flex justify-between">
              <span className="text-[#8E3552]/70">Subtotal</span>
              <span className="font-semibold">Rs. {cartSubtotal.toLocaleString()}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-[#2F5227]">
                <span>Discount ({appliedCoupon.code})</span>
                <span className="font-semibold">-Rs. {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#8E3552]/70">Delivery</span>
              <span className="font-semibold">
                {deliveryFee === 0 ? <span className="text-[#4A7840]">FREE</span> : `Rs. ${deliveryFee}`}
              </span>
            </div>
            <div className="border-t border-[#FFF0F3] pt-3 flex justify-between text-base font-bold text-[#5B3A32]">
              <span>Grand Total</span>
              <span className="text-xl text-[#D94F70]">Rs. {cartTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full bg-[#F58FA3] hover:bg-[#D94F70] text-white font-bold py-4 rounded-full transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
