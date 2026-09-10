import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Truck,
  Store,
  ChevronLeft,
  Sparkles,
  Check
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    discountAmount,
    deliveryFee,
    cartTotal,
    placeOrder,
    setCurrentView,
    currentUser
  } = useBakery();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Ayesha Malik',
    email: currentUser?.email || 'ayesha.malik@example.com',
    phone: currentUser?.phone || '+92 300 1234567',
    address: 'House 42, Street 8, Phase 5 DHA',
    city: 'Lahore',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deliveryTime: '2:00 PM - 5:00 PM',
    paymentMethod: 'Cash on Delivery (COD)' as any,
    notes: 'Please write "Happy Birthday Ayesha!" in soft pink piping.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '10:00 AM - 1:00 PM (Morning Slot)',
    '2:00 PM - 5:00 PM (Afternoon Slot)',
    '6:00 PM - 9:00 PM (Evening Celebration Slot)'
  ];

  const paymentMethods = [
    {
      id: 'Cash on Delivery (COD)',
      title: 'Cash on Delivery / Pay at Pickup',
      desc: 'Pay cash when your chilled bakery box arrives or when collecting in bakery.'
    },
    {
      id: 'JazzCash / EasyPaisa',
      title: 'JazzCash / EasyPaisa Wallet',
      desc: 'Instant mobile transfer to Crumb & Bloom official till: 0300-CRUMB-01'
    },
    {
      id: 'Bank Transfer',
      title: 'Direct Bank Wire (HBL / Meezan)',
      desc: 'Account Title: Crumb & Bloom Bakery. IBAN PK36MEZN000123456789'
    },
    {
      id: 'Credit/Debit Card',
      title: 'Credit / Debit Card (Visa / Mastercard)',
      desc: 'Encrypted online transaction simulation'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order = await placeOrder({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: deliveryType === 'delivery' ? `${formData.address}, ${formData.city}` : 'Store Pickup (Gulberg II Bakery)',
          city: formData.city
        },
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        deliveryFee: deliveryType === 'delivery' ? deliveryFee : 0,
        total: deliveryType === 'delivery' ? cartTotal : cartTotal - deliveryFee,
        deliveryType,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.notes
      });

      setIsSubmitting(false);
      setCurrentView('order-confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#5B3A32] mb-2">No treats in your basket</h2>
        <p className="text-xs text-[#8E3552]/80 mb-6">Please add some bakery items before checking out.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-[#F58FA3] text-white text-xs font-bold px-6 py-3 rounded-full"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back to Cart */}
      <div>
        <button
          onClick={() => setCurrentView('cart')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8E3552] hover:text-[#D94F70] transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Back to Basket</span>
        </button>
      </div>

      <div className="border-b border-[#F58FA3]/25 pb-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Bakery Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80 mt-1">
          Provide your delivery details and choose your preferred freshly-baked time window.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Customer info & delivery method */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Fulfillment Mode: Delivery vs Pickup */}
          <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#5B3A32] flex items-center gap-2">
              <Truck size={18} className="text-[#D94F70]" />
              <span>How would you like to receive your bakes?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                  deliveryType === 'delivery'
                    ? 'border-[#D94F70] bg-[#FFF0F3]/40 shadow-xs'
                    : 'border-[#F58FA3]/30 bg-white hover:bg-[#FFF8F0]'
                }`}
              >
                <Truck className="text-[#D94F70] shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-sm text-[#5B3A32]">Chilled Delivery Van</h4>
                  <p className="text-xs text-[#8E3552]/80 mt-0.5">
                    Carefully delivered to your doorstep in temperature-regulated containers.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                  deliveryType === 'pickup'
                    ? 'border-[#D94F70] bg-[#FFF0F3]/40 shadow-xs'
                    : 'border-[#F58FA3]/30 bg-white hover:bg-[#FFF8F0]'
                }`}
              >
                <Store className="text-[#B8D8B0] shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-sm text-[#5B3A32]">In-Bakery Pickup (FREE)</h4>
                  <p className="text-xs text-[#8E3552]/80 mt-0.5">
                    Collect warm & fresh from our bakery at Mini Market, Gulberg II.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Customer Contact & Address */}
          <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#5B3A32]">
              Customer & Recipient Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Mobile Phone (for delivery SMS)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
                />
              </div>

              {deliveryType === 'delivery' && (
                <>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#5B3A32] mb-1">Delivery Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House number, Street, Block, Society"
                      className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5B3A32] mb-1">City</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.city}
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] font-semibold"
                    />
                    <span className="text-[10px] text-[#8E3552]/70 mt-1 block">
                      Currently serving Lahore metropolitan areas
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 3. Date & Time Slot */}
          <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#5B3A32] flex items-center gap-2">
              <Calendar size={18} className="text-[#D94F70]" />
              <span>Select Date & Preferred Window</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Time Slot</label>
                <select
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] font-medium focus:outline-hidden"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5B3A32] mb-1">
                Custom Inscription or Delivery Instruction (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Please pipe 'Happy Birthday' on cake / Leave with reception"
                className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl p-3 text-xs text-[#5B3A32] focus:outline-hidden"
              />
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#5B3A32] flex items-center gap-2">
              <CreditCard size={18} className="text-[#D94F70]" />
              <span>Select Payment Method</span>
            </h3>

            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 cursor-pointer transition-all ${
                    formData.paymentMethod === pm.id
                      ? 'border-[#D94F70] bg-[#FFF0F3]/40'
                      : 'border-[#F58FA3]/25 hover:bg-[#FFF8F0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={pm.id}
                    checked={formData.paymentMethod === pm.id}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    className="accent-[#D94F70] mt-1"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#5B3A32]">{pm.title}</h4>
                    <p className="text-xs text-[#8E3552]/70 mt-0.5">{pm.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-6 sticky top-28">
          <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
            Order Review
          </h3>

          {/* Mini line items */}
          <div className="max-h-64 overflow-y-auto divide-y divide-[#FFF0F3] pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <p className="font-bold text-[#5B3A32] truncate">{item.product.name}</p>
                    <p className="text-[10px] text-[#8E3552]/70">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-[#D94F70] shrink-0">
                  Rs. {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Financials */}
          <div className="space-y-2 text-xs text-[#5B3A32] border-t border-[#FFF0F3] pt-4">
            <div className="flex justify-between">
              <span className="text-[#8E3552]/70">Subtotal</span>
              <span className="font-semibold">Rs. {cartSubtotal.toLocaleString()}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-[#2F5227]">
                <span>Coupon ({appliedCoupon.code})</span>
                <span className="font-semibold">-Rs. {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#8E3552]/70">Delivery Fee</span>
              <span className="font-semibold">
                {deliveryType === 'pickup' || deliveryFee === 0 ? (
                  <span className="text-[#4A7840]">FREE</span>
                ) : (
                  `Rs. ${deliveryFee}`
                )}
              </span>
            </div>
            <div className="border-t border-[#FFF0F3] pt-3 flex justify-between text-base font-bold text-[#5B3A32]">
              <span>Final Total</span>
              <span className="text-xl text-[#D94F70]">
                Rs. {(deliveryType === 'pickup' ? cartTotal - deliveryFee : cartTotal).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold py-4 rounded-full transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {isSubmitting ? (
              <span>Preparing your fresh order...</span>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Place Sweet Order</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-[#8E3552]/60 text-center leading-relaxed">
            By placing your order, you agree to Crumb & Bloom's fresh preparation guidelines and delivery promise.
          </p>
        </div>

      </form>

    </div>
  );
};
