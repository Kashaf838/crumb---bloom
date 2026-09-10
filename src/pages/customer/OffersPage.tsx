import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Tag, Sparkles, Copy, ArrowRight, Gift, Clock, Check } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { coupons, applyCoupon, addToast, setCurrentView } = useBakery();

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    addToast(`Coupon "${code}" applied to your basket! 🎉`, undefined, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest">
          Exclusive Sweet Perks
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Bakery Offers & Discount Vouchers
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80">
          Enjoy member treats, seasonal celebrations, and weekend dessert codes. Click any voucher to apply automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-3xl p-6 border-2 border-dashed border-[#F58FA3]/40 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden"
          >
            {/* Cutout circles simulation */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFF8F0] border-r border-[#F58FA3]/40" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFF8F0] border-l border-[#F58FA3]/40" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#FFF0F3] text-[#D94F70] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Gift size={13} />
                  <span>
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}% OFF`
                      : `Rs. ${coupon.discountValue} FLAT OFF`}
                  </span>
                </span>
                <span className="text-[11px] text-[#4A7840] font-semibold bg-[#F2F8F0] px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
                {coupon.code}
              </h3>

              <p className="text-xs text-[#5B3A32]/75 leading-relaxed">
                {coupon.description}
              </p>

              <div className="text-[11px] text-[#8E3552]/70 space-y-0.5">
                <p>Minimum Order: <strong>Rs. {coupon.minOrder.toLocaleString()}</strong></p>
                <p>Valid until: <strong>{coupon.validUntil}</strong></p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#FFF0F3] flex items-center justify-between gap-2">
              <button
                onClick={() => handleCopyCode(coupon.code)}
                className="w-full bg-[#FFF8F0] hover:bg-[#FFF0F3] border border-[#F58FA3] text-[#D94F70] font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy size={13} />
                <span>Apply Code: {coupon.code}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Special Delivery Perk banner */}
      <div className="bg-linear-to-r from-[#FFF0F3] via-[#FFC6A8]/30 to-[#B8D8B0]/30 rounded-3xl p-8 border border-[#F58FA3]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
            Free Insulated Chilled Van Delivery
          </h3>
          <p className="text-xs sm:text-sm text-[#5B3A32]/80">
            Automatically unlocked on all bakery baskets of Rs. 5,000 or above across Lahore!
          </p>
        </div>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-[#D94F70] hover:bg-[#8E3552] text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
        >
          Start Shopping Treats
        </button>
      </div>

    </div>
  );
};
