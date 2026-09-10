import React from 'react';
import { Sparkles, ShieldCheck, Clock, ShieldAlert } from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';

export const AnnouncementBar: React.FC = () => {
  const { setCurrentView, loginAdmin, isAdminLoggedIn } = useBakery();

  return (
    <div className="bg-[#8E3552] text-white text-xs py-2 px-4 border-b border-[#D94F70]/30 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left perk */}
        <div className="hidden md:flex items-center gap-2 text-white/90">
          <Clock size={13} className="text-[#FFC6A8]" />
          <span>Fresh ovens at 6:00 AM • Custom celebration orders open</span>
        </div>

        {/* Center message */}
        <div className="flex-1 text-center font-medium flex items-center justify-center gap-2">
          <Sparkles size={13} className="text-[#F58FA3] animate-pulse" />
          <span>Freshly baked every morning • Free delivery over Rs. 5,000</span>
          <span className="hidden sm:inline text-white/50">•</span>
          <span className="hidden sm:inline text-[#FFC6A8]">Use code: SWEET20</span>
        </div>

        {/* Right action / Admin switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('track-order')}
            className="hover:text-[#FFC6A8] transition-colors text-[11px] underline underline-offset-2 hidden sm:inline"
          >
            Track Order
          </button>
          <button
            onClick={() => {
              if (isAdminLoggedIn) {
                setCurrentView('admin');
              } else {
                loginAdmin();
              }
            }}
            className="bg-[#D94F70] hover:bg-[#F58FA3] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
            title="Switch to bakery business management view"
          >
            <ShieldCheck size={12} />
            <span>Bakery Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
