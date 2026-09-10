import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../../components/common/ProductCard';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';

export const SeasonalPage: React.FC = () => {
  const { products, setCurrentView } = useBakery();

  // Pick special items for seasonal highlight
  const seasonalItems = products.filter(
    (p) =>
      p.name.includes('Pistachio') ||
      p.name.includes('Strawberry') ||
      p.name.includes('Raspberry') ||
      p.name.includes('Berry')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Seasonal Hero Banner */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-linear-to-r from-[#FFF0F3] via-[#FFF8F0] to-[#FFC6A8]/30 border-2 border-[#F58FA3]/35 p-8 sm:p-14 overflow-hidden shadow-md text-center sm:text-left">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#D94F70] text-white text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles size={13} />
            <span>Limited Edition • Spring Blossom Edition</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#5B3A32] leading-tight">
            Rose Water, Wild Berries & Emerald Pistachio
          </h1>
          <p className="text-xs sm:text-base text-[#5B3A32]/80 leading-relaxed">
            Our master pastry artists welcome the new season with fragrant Iranian rosewater, organic hand-picked alpine berries, and slow-roasted Sicilian pistachios.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-[#8E3552]">
            <Clock size={15} className="text-[#D94F70]" />
            <span>Available daily through April only • Baked in small morning batches</span>
          </div>
        </div>
      </div>

      {/* Seasonal Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#5B3A32]">
            Spring Seasonal Bakes ({seasonalItems.length})
          </h2>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-[#D94F70] hover:underline"
          >
            View Full Bakery Menu →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};
