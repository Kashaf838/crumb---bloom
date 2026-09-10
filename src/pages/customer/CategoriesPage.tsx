import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCategory } from '../../types';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, navigateToShop, products } = useBakery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest">
          Handmade Daily Collections
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Bakery Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80">
          Explore our artisan catalog sorted by craving. Prepared freshly each morning with pure pasture butter and organic fruits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const categoryProducts = products.filter((p) => p.category === cat.name);
          return (
            <div
              key={cat.id}
              onClick={() => navigateToShop(cat.name as ProductCategory)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#F58FA3]/25 shadow-xs hover:shadow-xl hover:shadow-[#F58FA3]/15 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#FFF0F3]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/categories/cakes.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#D94F70] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {categoryProducts.length} Items
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#5B3A32] group-hover:text-[#D94F70] transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#5B3A32]/70 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#FFF0F3] flex items-center justify-between text-xs font-bold text-[#D94F70]">
                  <span>Explore {cat.name}</span>
                  <div className="w-7 h-7 rounded-full bg-[#FFF0F3] group-hover:bg-[#F58FA3] text-[#D94F70] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
