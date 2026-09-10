import React, { useState, useEffect } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../../components/common/ProductCard';
import { RatingStars } from '../../components/common/RatingStars';
import {
  Heart,
  ShoppingBag,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Share2,
  Calendar,
  Layers,
  Utensils
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    addToast,
    reviews,
    addReview
  } = useBakery();

  // If no product selected, default to first product
  const product = selectedProduct || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);

  useEffect(() => {
    setActiveImage(product.image);
  }, [product.id, product.image]);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialNote, setSpecialNote] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'reviews'>('details');

  // New review form
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewComment, setReviewComment] = useState<string>('');

  const wishlisted = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id || r.productName === product.name);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, specialNote);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, specialNote);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link copied to clipboard! 📋', 'Share this sweet bake with friends', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      addToast('Please complete all review fields', undefined, 'warning');
      return;
    }
    addReview({
      productId: product.id,
      productName: product.name,
      customerName: reviewerName,
      rating: reviewRating,
      comment: reviewComment
    });
    setReviewerName('');
    setReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8E3552] hover:text-[#D94F70] transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Back to Bakery Shop</span>
        </button>
      </div>

      {/* Main Product Hero Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#F58FA3]/25 shadow-lg">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/products/prod-1.jpg';
              }}
              className="w-full h-full object-cover"
            />
            {product.discountPrice && (
              <span className="absolute top-4 left-4 bg-[#D94F70] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                SAVE Rs. {(product.price - product.discountPrice).toLocaleString()}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === img
                      ? 'border-[#D94F70] shadow-md scale-95'
                      : 'border-transparent hover:border-[#F58FA3]'
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/products/prod-1.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category & Action icons */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D94F70] bg-[#FFF0F3] px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-[#5B3A32]/60 hover:text-[#5B3A32] rounded-full hover:bg-[#FFF0F3] transition-colors cursor-pointer"
                title="Share treat"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  wishlisted
                    ? 'text-[#D94F70] bg-[#FFF0F3]'
                    : 'text-[#5B3A32]/60 hover:text-[#D94F70] hover:bg-[#FFF0F3]'
                }`}
                title="Save to sweet wishlist"
              >
                <Heart size={18} className={wishlisted ? 'fill-[#D94F70]' : ''} />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B3A32] leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={18} showText />
            <span className="text-xs text-[#8E3552]/70">• Verified Bakery Customer Favorite</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-2 border-b border-[#FFF0F3]">
            <span className="text-3xl font-extrabold text-[#D94F70]">
              Rs. {(product.discountPrice || product.price).toLocaleString()}
            </span>
            {product.discountPrice && (
              <span className="text-base text-[#5B3A32]/40 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-bold text-[#4A7840] bg-[#F2F8F0] px-2.5 py-0.5 rounded-md">
              Fresh Daily Bake
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5B3A32]/80 leading-relaxed">
            {product.description}
          </p>

          {/* Freshness & Spec Cards */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="bg-[#FFF8F0] border border-[#F58FA3]/25 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-[#8E3552]/70 block">Serving Size</span>
              <span className="text-xs font-bold text-[#5B3A32]">{product.servings}</span>
            </div>
            <div className="bg-[#FFF8F0] border border-[#F58FA3]/25 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-[#8E3552]/70 block">Approx. Weight</span>
              <span className="text-xs font-bold text-[#5B3A32]">{product.weight}</span>
            </div>
            <div className="bg-[#FFF8F0] border border-[#F58FA3]/25 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-[#8E3552]/70 block">Preparation</span>
              <span className="text-xs font-bold text-[#4A7840]">Ready Today</span>
            </div>
          </div>

          {/* Freshness banner */}
          <div className="bg-[#FFF0F3] border border-[#F58FA3]/30 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-[#8E3552]">
            <Clock size={16} className="text-[#D94F70] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#5B3A32]">Freshness Promise:</strong> {product.freshness}
            </div>
          </div>

          {/* Quantity & Notes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-[#5B3A32]">Quantity</label>
              <div className="flex items-center border-2 border-[#F58FA3]/30 rounded-full bg-white px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#5B3A32] hover:text-[#D94F70]"
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold px-4 text-[#5B3A32]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#5B3A32] hover:text-[#D94F70]"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-xs text-[#8E3552]/70">
                Total: <strong className="text-[#D94F70]">Rs. {((product.discountPrice || product.price) * quantity).toLocaleString()}</strong>
              </span>
            </div>

            {/* Custom piping note on cake box */}
            <div>
              <label className="block text-xs font-bold text-[#5B3A32] mb-1">
                Complimentary Gift Note or Message Plaque (Optional)
              </label>
              <input
                type="text"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Happy Birthday Ayesha! / Ring the doorbell twice"
                className="w-full bg-white border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="bg-[#F58FA3] hover:bg-[#D94F70] active:scale-95 text-white font-bold py-3.5 px-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <ShoppingBag size={18} />
              <span>Add To Basket</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-[#5B3A32] hover:bg-[#8E3552] active:scale-95 text-white font-bold py-3.5 px-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Sparkles size={18} className="text-[#FFC6A8]" />
              <span>Buy Now</span>
            </button>
          </div>

        </div>

      </div>

      {/* Tabs Section: Description, Ingredients & Allergens, Reviews */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F58FA3]/25 shadow-xs space-y-6">
        
        <div className="flex border-b border-[#FFF0F3] gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-[#D94F70] text-[#D94F70]'
                : 'border-transparent text-[#5B3A32]/60 hover:text-[#5B3A32]'
            }`}
          >
            Bake Details & Care
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'ingredients'
                ? 'border-[#D94F70] text-[#D94F70]'
                : 'border-transparent text-[#5B3A32]/60 hover:text-[#5B3A32]'
            }`}
          >
            Ingredients & Allergens
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#D94F70] text-[#D94F70]'
                : 'border-transparent text-[#5B3A32]/60 hover:text-[#5B3A32]'
            }`}
          >
            Reviews ({productReviews.length})
          </button>
        </div>

        {/* Tab 1: Details */}
        {activeTab === 'details' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#5B3A32]/80 leading-relaxed">
            <p>{product.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/20">
                <h4 className="font-bold text-[#5B3A32] mb-1 flex items-center gap-1.5">
                  <Clock size={15} className="text-[#D94F70]" />
                  <span>Serving Suggestions</span>
                </h4>
                <p className="text-xs text-[#5B3A32]/70">
                  For cakes, remove from the refrigerator 20–30 minutes before cutting for the creamiest mouthfeel. For croissants, pop into an oven at 180°C for 2–3 minutes.
                </p>
              </div>
              <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F58FA3]/20">
                <h4 className="font-bold text-[#5B3A32] mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-[#B8D8B0]" />
                  <span>Storage & Preservation</span>
                </h4>
                <p className="text-xs text-[#5B3A32]/70">
                  Store inside our sealed bakery box away from strong odors. Cheesecakes and mousse cakes must remain refrigerated.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ingredients & Allergens */}
        {activeTab === 'ingredients' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B3A32] mb-2">
                Pure Natural Ingredients
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-[#FFF8F0] border border-[#F58FA3]/30 px-3 py-1 rounded-full text-xs font-medium text-[#5B3A32]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D94F70] mb-2 flex items-center gap-1">
                <AlertCircle size={14} />
                <span>Allergen Notice</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((allg, i) => (
                  <span
                    key={i}
                    className="bg-[#FFF0F3] border border-[#F58FA3] text-[#D94F70] px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    Contains: {allg}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#8E3552]/70 mt-2">
                Our kitchen also handles tree nuts, wheat, dairy, and eggs. Please let our team know of severe allergies in your order notes.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Review List */}
            <div className="space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-xs text-[#8E3552]/70 italic">Be the first to review this bake!</p>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="border-b border-[#FFF0F3] pb-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {rev.avatar ? (
                          <img
                            src={rev.avatar}
                            alt={rev.customerName}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full object-cover border border-[#F58FA3]/30"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#FFF0F3] text-[#D94F70] font-bold text-xs flex items-center justify-center">
                            {rev.customerName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#5B3A32]">{rev.customerName}</span>
                            {rev.verified && (
                              <span className="text-[10px] bg-[#F2F8F0] text-[#2F5227] px-2 py-0.5 rounded-full font-bold">
                                Verified Taste
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#8E3552]/60">{rev.date}</span>
                        </div>
                      </div>
                      <RatingStars rating={rev.rating} size={13} />
                    </div>
                    <p className="text-xs text-[#5B3A32]/85 leading-relaxed">{rev.comment}</p>
                    {rev.cakePhoto && (
                      <div className="pt-1">
                        <img
                          src={rev.cakePhoto}
                          alt="Customer review photo"
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-[#F58FA3]/30 shadow-xs"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Submit Review Form */}
            <div className="bg-[#FFF8F0] p-6 rounded-2xl border border-[#F58FA3]/25 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#5B3A32]">Leave a Sweet Review</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#5B3A32]">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                        className={`text-lg transition-transform ${s <= reviewRating ? 'text-[#D94F70]' : 'text-gray-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Your Name (e.g. Maham A.)"
                  className="w-full bg-white border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32] focus:outline-hidden"
                />

                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="What did you think of the flavor, texture, and presentation?"
                  className="w-full bg-white border border-[#F58FA3]/40 rounded-xl p-3 text-xs text-[#5B3A32] focus:outline-hidden"
                />

                <button
                  type="submit"
                  className="bg-[#D94F70] hover:bg-[#8E3552] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-xs cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <h3 className="font-serif text-2xl font-bold text-[#5B3A32]">
            More From Our {product.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
