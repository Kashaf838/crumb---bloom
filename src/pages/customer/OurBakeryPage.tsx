import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { MapPin, Clock, Phone, Mail, Coffee, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';

export const OurBakeryPage: React.FC = () => {
  const { addToast } = useBakery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest">
          Visit Our Hearth
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Our Bakery & Kitchen
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80">
          Step into our sun-drenched Gulberg bakery. Smell fresh buttery croissants and enjoy warm specialty espresso while picking up your celebration cakes.
        </p>
      </div>

      {/* Main Location & Photo Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Hours & Location */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F3] text-[#D94F70] flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">Gulberg II Flagship</h3>
              <p className="text-xs text-[#8E3552]/80 mt-1 leading-relaxed">
                14-C Mini Market, Gulberg II, Lahore, Pakistan <br />
                (Opposite Mall One, behind the boutique alley)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-4 border-t border-[#FFF0F3]">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F3] text-[#D94F70] flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">Oven Hours</h3>
              <div className="text-xs text-[#8E3552]/80 mt-1 space-y-1">
                <p>Monday – Saturday: <strong>8:00 AM – 10:00 PM</strong></p>
                <p>Sunday Brunch Bake: <strong>9:00 AM – 9:00 PM</strong></p>
                <p className="text-[11px] text-[#4A7840] font-semibold mt-1">
                  Fresh morning croissant drops at 8:15 AM and 4:30 PM daily.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-4 border-t border-[#FFF0F3]">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F3] text-[#D94F70] flex items-center justify-center shrink-0">
              <Coffee size={20} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">Coffee & Tea Bar</h3>
              <p className="text-xs text-[#8E3552]/80 mt-1 leading-relaxed">
                Featuring single-origin Ethiopian espresso, creamy iced rose lattes, and organic French herbal infusions.
              </p>
            </div>
          </div>

          <button
            onClick={() => addToast('Opening Google Maps Directions... 📍', undefined, 'info')}
            className="w-full bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold text-xs py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Navigation size={14} />
            <span>Get Driving Directions (Google Maps)</span>
          </button>
        </div>

        {/* Right: Bakery Ambience Visuals */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-16/10 bg-[#FFF0F3]">
            <img
              src="/assets/images/bakery/bakery-interior.jpg"
              alt="Bakery Interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-sm">
              <img
                src="/assets/images/bakery/pastry-display.jpg"
                alt="Pastry Display Counter"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-4/3 shadow-sm">
              <img
                src="/assets/images/bakery/dough-craft.jpg"
                alt="Flour and Dough Handcraft"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Pickup counter guidelines */}
      <div className="bg-[#FFF8F0] rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25">
        <h3 className="font-serif text-lg font-bold text-[#5B3A32] mb-3">
          Collecting Your Order In Store?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5B3A32]">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#4A7840] shrink-0 mt-0.5" />
            <span>Head to the designated "Sweet Order Pickup" glass counter on your right.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#4A7840] shrink-0 mt-0.5" />
            <span>Show your Order ID (e.g. #CB-10023) or phone number on your mobile.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#4A7840] shrink-0 mt-0.5" />
            <span>We inspect every cake box with you to ensure pristine piping and candle set.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
