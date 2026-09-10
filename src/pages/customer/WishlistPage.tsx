import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../../components/common/ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setCurrentView, addToCart, toggleWishlist, addToast } = useBakery();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
    addToast('All wishlist items moved to basket! 🛍️', undefined, 'success');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#FFF0F3] text-[#F58FA3] mx-auto flex items-center justify-center">
          <Heart size={36} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#5B3A32]">
          Your wishlist is waiting for sweet treats
        </h2>
        <p className="text-xs sm:text-sm text-[#8E3552]/80 max-w-sm mx-auto">
          Whenever you see a cake or pastry you love, click the little heart to save it here for upcoming birthdays and cravings.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setCurrentView('shop')}
            className="bg-[#F58FA3] hover:bg-[#D94F70] text-white font-bold text-xs px-8 py-3 rounded-full transition-all shadow-md cursor-pointer"
          >
            Browse Fresh Bakery Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F58FA3]/25 pb-4">
        <div>
          <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest block">
            Saved Favorites
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-[#5B3A32]">
            Your Sweet Wishlist ({wishlistedProducts.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAllToCart}
            className="bg-[#F58FA3] hover:bg-[#D94F70] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag size={14} />
            <span>Move All to Basket</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

    </div>
  );
};
