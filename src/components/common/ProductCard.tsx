import React from 'react';
import { Product } from '../../types';
import { useBakery } from '../../context/BakeryContext';
import { RatingStars } from './RatingStars';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  featuredLayout?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigateToProduct } = useBakery();
  const wishlisted = isInWishlist(product.id);

  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#F58FA3]/20 shadow-xs hover:shadow-xl hover:shadow-[#F58FA3]/15 transition-all flex flex-col h-full"
      id={`product-card-${product.id}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#FFF0F3] cursor-pointer" onClick={() => navigateToProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback to high-quality cake photo if needed
            (e.target as HTMLImageElement).src = '/assets/images/products/prod-1.jpg';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent && (
            <span className="bg-[#D94F70] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-[#B8D8B0] text-[#2F5227] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              ★ Best Seller
            </span>
          )}
          {product.status === 'Low Stock' && (
            <span className="bg-[#FFC6A8] text-[#8E3552] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Only {product.stock} Left!
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
            wishlisted
              ? 'bg-[#D94F70] text-white hover:bg-[#8E3552]'
              : 'bg-white/80 text-[#5B3A32] hover:bg-white hover:text-[#D94F70]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <motion.div
            key={wishlisted ? 'liked' : 'unliked'}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Heart size={18} className={wishlisted ? 'fill-white' : ''} />
          </motion.div>
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-[#5B3A32]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
          <span className="bg-white/95 text-[#5B3A32] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Eye size={13} /> View Details
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
          <span className="text-[#D94F70] font-semibold uppercase tracking-wider text-[11px]">
            {product.category}
          </span>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} showText />
        </div>

        {/* Product Title */}
        <h3
          onClick={() => navigateToProduct(product)}
          className="font-serif text-base sm:text-lg font-bold text-[#5B3A32] line-clamp-1 hover:text-[#D94F70] transition-colors cursor-pointer mb-1"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#5B3A32]/70 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Servings and Weight tag */}
        <div className="flex items-center gap-2 text-[11px] text-[#8E3552]/80 mb-4 bg-[#FFF8F0] px-2.5 py-1 rounded-lg border border-[#F58FA3]/20">
          <span>{product.weight}</span>
          <span>•</span>
          <span>{product.servings}</span>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#FFF0F3]">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#D94F70]">
                Rs. {(product.discountPrice || product.price).toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-[#5B3A32]/40 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#8E3552]/70 block">Freshly made daily</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 bg-[#F58FA3] hover:bg-[#D94F70] active:scale-95 text-white text-xs font-semibold px-3.5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer"
            id={`add-to-cart-${product.id}`}
          >
            <ShoppingBag size={14} />
            <span className="hidden xs:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
