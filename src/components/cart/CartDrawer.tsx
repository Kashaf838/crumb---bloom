import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { X, Trash2, Heart, Plus, Minus, ArrowRight, ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
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

  const [couponCodeInput, setCouponCodeInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponCodeInput)) {
      setCouponCodeInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="absolute inset-0 bg-[#5B3A32]/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FFF8F0] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#F58FA3]/25 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#D94F70]">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#5B3A32]">Your Sweet Basket</h3>
                    <p className="text-[11px] text-[#8E3552]/70">
                      {cart.reduce((s, i) => s + i.quantity, 0)} freshly baked items
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-2 text-[#5B3A32]/60 hover:text-[#5B3A32] rounded-full hover:bg-[#FFF0F3] transition-colors"
                  aria-label="Close basket"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="bg-[#FFF0F3] px-5 py-2.5 border-b border-[#F58FA3]/20 text-xs text-[#8E3552]">
                {cartSubtotal >= 5000 ? (
                  <span className="font-semibold text-[#4A7840] flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#B8D8B0]" />
                    Sweet! You unlocked FREE Standard Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#D94F70]">Rs. {(5000 - cartSubtotal).toLocaleString()}</strong> more to get <strong>FREE Delivery</strong>!
                  </span>
                )}
              </div>

              {/* Body: Cart Items or Empty State */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5B3A32]">
                    <div className="w-20 h-20 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#F58FA3] mb-4 shadow-inner">
                      <ShoppingBag size={36} />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[#5B3A32] mb-1">
                      Your basket is feeling a little empty
                    </h4>
                    <p className="text-xs text-[#8E3552]/70 max-w-xs mb-6">
                      Our morning ovens are warm and fragrant. Discover handcrafted cakes, pastries, and sweet treats waiting for you.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        setCurrentView('shop');
                      }}
                      className="bg-[#F58FA3] hover:bg-[#D94F70] text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Explore Fresh Bakes 🥐
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const itemPrice = item.product.discountPrice || item.product.price;
                    return (
                      <div
                        key={item.product.id}
                        className="bg-white rounded-2xl p-3 border border-[#F58FA3]/20 shadow-xs flex gap-3 relative group"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onClick={() => {
                            navigateToProduct(item.product);
                            setIsCartDrawerOpen(false);
                          }}
                          className="w-20 h-20 rounded-xl object-cover cursor-pointer hover:opacity-90 shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h5
                                onClick={() => {
                                  navigateToProduct(item.product);
                                  setIsCartDrawerOpen(false);
                                }}
                                className="text-sm font-bold text-[#5B3A32] truncate cursor-pointer hover:text-[#D94F70]"
                              >
                                {item.product.name}
                              </h5>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-[#5B3A32]/40 hover:text-[#D94F70] p-1 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <p className="text-xs font-bold text-[#D94F70]">
                              Rs. {itemPrice.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-[#F58FA3]/30 rounded-full bg-[#FFF8F0] px-2 py-0.5">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-[#5B3A32] hover:text-[#D94F70]"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold px-2 text-[#5B3A32]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-[#5B3A32] hover:text-[#D94F70]"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-[#5B3A32]">
                              Rs. {(itemPrice * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer / Summary */}
              {cart.length > 0 && (
                <div className="p-5 bg-white border-t border-[#F58FA3]/25 space-y-4">
                  
                  {/* Coupon Form */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-[#F2F8F0] border border-[#B8D8B0] px-3 py-2 rounded-xl text-xs">
                        <div className="flex items-center gap-1.5 text-[#2F5227] font-semibold">
                          <Tag size={13} />
                          <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-Rs. {discountAmount.toLocaleString()})</span>
                        </div>
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
                          value={couponCodeInput}
                          onChange={(e) => setCouponCodeInput(e.target.value)}
                          placeholder="Coupon: SWEET20 or WELCOME10"
                          className="flex-1 bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3 py-2 text-xs text-[#5B3A32] uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-[#D94F70]"
                        />
                        <button
                          type="submit"
                          className="bg-[#5B3A32] hover:bg-[#8E3552] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-[#5B3A32]">
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
                      <span className="text-[#8E3552]/70">Estimated Delivery</span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? <span className="text-[#4A7840]">FREE</span> : `Rs. ${deliveryFee}`}
                      </span>
                    </div>
                    <div className="border-t border-[#FFF0F3] pt-2 flex justify-between text-sm font-bold text-[#5B3A32]">
                      <span>Total</span>
                      <span className="text-base text-[#D94F70]">Rs. {cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#F58FA3] hover:bg-[#D94F70] active:scale-[0.99] text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer text-sm"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        setCurrentView('cart');
                      }}
                      className="w-full text-center text-xs font-semibold text-[#8E3552] hover:text-[#D94F70] py-1 cursor-pointer"
                    >
                      View Detailed Cart Page
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
