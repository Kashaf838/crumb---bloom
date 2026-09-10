import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Cake, Sparkles, Heart, Award, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useBakery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest bg-[#FFF0F3] px-3.5 py-1.5 rounded-full inline-block">
          Our Flour, Butter & Heart
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#5B3A32] leading-tight">
          Baked with pure passion, served with genuine warmth.
        </h1>
        <p className="text-base text-[#5B3A32]/80 leading-relaxed">
          Crumb & Bloom began with a simple craving: an artisan bakery that refuses shortcuts. No commercial premixes, no margarine, and never imitation flavoring. Just honest, slow fermentation, Normandy butter, and madagascar vanilla beans.
        </p>
      </div>

      {/* Visual story grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src="/assets/images/bakery/bakery-flour.jpg"
              alt="Bakery Kitchen Flour"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#F58FA3]/30 hidden sm:block max-w-xs">
            <p className="font-serif text-sm font-bold text-[#5B3A32]">
              "Flour, butter, sugar and love — when honest hands fold them, magic happens."
            </p>
            <span className="text-[11px] text-[#D94F70] font-semibold mt-1 block">
              — Zahra Khan, Founder
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D94F70]">
            The Journey
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#5B3A32]">
            From a Small Cottage Oven to Lahore's Favorite Morning Stop
          </h2>
          <p className="text-sm text-[#5B3A32]/80 leading-relaxed">
            Founded in 2021 by pastry chef Zahra Khan following her classical training in Paris, Crumb & Bloom was born in a sunlit kitchen. What began as weekend sourdough loaves and strawberry tiered cakes for neighborhood weddings quickly grew into our boutique bakery on Mini Market.
          </p>
          <p className="text-sm text-[#5B3A32]/80 leading-relaxed">
            Today, our team of 14 passionate bakers and pastry decorators starts every morning at 5:00 AM so our glass counters are filled with fragrant croissants, crackly sourdough, and luscious layer cakes by dawn.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/20">
              <span className="font-serif text-2xl font-bold text-[#D94F70]">84%</span>
              <p className="text-xs font-semibold text-[#5B3A32] mt-1">Normandy Butterfat</p>
              <p className="text-[11px] text-[#8E3552]/70">For sublime flaky pastry lamination</p>
            </div>
            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/20">
              <span className="font-serif text-2xl font-bold text-[#D94F70]">0%</span>
              <p className="text-xs font-semibold text-[#5B3A32] mt-1">Shortening or Premixes</p>
              <p className="text-[11px] text-[#8E3552]/70">Pure natural farm-fresh ingredients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest">
            The Artisans
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#5B3A32]">
            Meet Our Pastry Masters
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs text-center space-y-3">
            <img
              src="/assets/images/staff/chef-maryam.jpg"
              alt="Zahra Khan"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#F58FA3]"
            />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">Zahra Khan</h3>
              <p className="text-xs text-[#D94F70] font-semibold">Founder & Head Pastry Chef</p>
              <p className="text-[11px] text-[#8E3552]/70 mt-1">Le Cordon Bleu Paris alumna specializing in botanical floral cakes and French patisserie.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs text-center space-y-3">
            <img
              src="/assets/images/staff/chef-julian.jpg"
              alt="Tariq Mansoor"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#F58FA3]"
            />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">Tariq Mansoor</h3>
              <p className="text-xs text-[#D94F70] font-semibold">Master Boulanger</p>
              <p className="text-[11px] text-[#8E3552]/70 mt-1">15 years mastering slow-ferment sourdough, country loaves, and crisp pain au chocolat.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs text-center space-y-3">
            <img
              src="/assets/images/staff/decorator-zoya.jpg"
              alt="Amina Siddiqui"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#F58FA3]"
            />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">Amina Siddiqui</h3>
              <p className="text-xs text-[#D94F70] font-semibold">Senior Cake Artist</p>
              <p className="text-[11px] text-[#8E3552]/70 mt-1">Sculpting bespoke Lambeth ruffles, edible sugar blooms, and wedding centerpieces.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
