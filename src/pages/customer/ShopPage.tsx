import React, { useState, useMemo } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../../components/common/ProductCard';
import { ProductCategory, Product } from '../../types';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  Star,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Check
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory
  } = useBakery();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(4500);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [stockOnly, setStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  const dietaryOptions = ['Eggless', 'Nut-Free', 'Gluten-Free', 'Halal', 'Dairy-Free'];
  const occasions = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Celebration', 'Daily Treat'];
  const itemsPerPage = 8;

  const handleDietaryToggle = (item: string) => {
    setSelectedDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setMaxPrice(4500);
    setSelectedDietary([]);
    setSelectedOccasion('All');
    setMinRating(0);
    setStockOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search term
      if (
        searchTerm.trim() &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      const effectivePrice = product.discountPrice || product.price;
      if (effectivePrice > maxPrice) {
        return false;
      }

      // Dietary filter
      if (
        selectedDietary.length > 0 &&
        !selectedDietary.every((d) => (product.dietary as string[]).includes(d))
      ) {
        return false;
      }

      // Occasion filter
      if (
        selectedOccasion !== 'All' &&
        (!product.occasion || !product.occasion.includes(selectedOccasion as any))
      ) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Stock only
      if (stockOnly && product.status === 'Out of Stock') {
        return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    searchTerm,
    maxPrice,
    selectedDietary,
    selectedOccasion,
    minRating,
    stockOnly
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      case 'price-desc':
        return list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'bestselling':
        return list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
      case 'newest':
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#FFF0F3] to-[#FFF8F0] rounded-3xl p-6 sm:p-10 border border-[#F58FA3]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block mb-1">
            Artisan Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
            {selectedCategory === 'All' ? 'All Fresh Bakes' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-[#8E3552]/80 mt-1">
            Browse our handmade selection. Prepared daily with pure ingredients.
          </p>
        </div>

        {/* Search Input in Shop */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E3552]/50" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search treats in shop..."
            className="w-full bg-white border border-[#F58FA3]/30 rounded-full py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30 shadow-2xs"
          />
        </div>
      </div>

      {/* Main Layout: Sidebar & Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Mobile filter toggle */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center gap-2 bg-white border border-[#F58FA3]/40 px-4 py-2 rounded-full text-xs font-bold text-[#5B3A32]"
          >
            <SlidersHorizontal size={14} />
            <span>Filter Products ({filteredProducts.length})</span>
          </button>
          <span className="text-xs text-[#8E3552]">Showing {sortedProducts.length} items</span>
        </div>

        {/* LEFT SIDEBAR FILTERS */}
        <aside
          className={`lg:col-span-3 bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-6 ${
            isMobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#FFF0F3]">
            <h3 className="font-serif text-lg font-bold text-[#5B3A32] flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#D94F70]" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#D94F70] hover:text-[#8E3552] flex items-center gap-1 font-semibold"
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#5B3A32] uppercase tracking-wider">
              Category
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === 'All'
                    ? 'bg-[#FFF0F3] text-[#D94F70] font-bold'
                    : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[11px] text-[#8E3552]/70">{products.length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name as ProductCategory);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.name
                      ? 'bg-[#FFF0F3] text-[#D94F70] font-bold'
                      : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-[#8E3552]/70">
                    {products.filter((p) => p.category === cat.name).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price Range */}
          <div className="space-y-2 pt-3 border-t border-[#FFF0F3]">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#5B3A32] uppercase tracking-wider">
                Max Price
              </h4>
              <span className="text-xs font-bold text-[#D94F70]">
                Rs. {maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="400"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-[#D94F70] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8E3552]/60">
              <span>Rs. 400</span>
              <span>Rs. 5,000+</span>
            </div>
          </div>

          {/* 3. Dietary Options */}
          <div className="space-y-2 pt-3 border-t border-[#FFF0F3]">
            <h4 className="text-xs font-bold text-[#5B3A32] uppercase tracking-wider">
              Dietary Preference
            </h4>
            <div className="space-y-1.5">
              {dietaryOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-xs text-[#5B3A32] cursor-pointer hover:text-[#D94F70]"
                >
                  <input
                    type="checkbox"
                    checked={selectedDietary.includes(opt)}
                    onChange={() => handleDietaryToggle(opt)}
                    className="accent-[#D94F70] rounded-xs"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Occasion */}
          <div className="space-y-2 pt-3 border-t border-[#FFF0F3]">
            <h4 className="text-xs font-bold text-[#5B3A32] uppercase tracking-wider">
              Occasion
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => {
                    setSelectedOccasion(occ);
                    setCurrentPage(1);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all ${
                    selectedOccasion === occ
                      ? 'bg-[#F58FA3] text-white shadow-xs'
                      : 'bg-[#FFF8F0] text-[#5B3A32] hover:bg-[#FFF0F3]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Rating Filter */}
          <div className="space-y-2 pt-3 border-t border-[#FFF0F3]">
            <h4 className="text-xs font-bold text-[#5B3A32] uppercase tracking-wider">
              Customer Rating
            </h4>
            <div className="space-y-1">
              {[4.8, 4.5, 4.0].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setMinRating(minRating === star ? 0 : star);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
                    minRating === star
                      ? 'bg-[#FFF0F3] text-[#D94F70] font-bold'
                      : 'text-[#5B3A32] hover:bg-[#FFF8F0]'
                  }`}
                >
                  <Star size={13} className="fill-[#D94F70] text-[#D94F70]" />
                  <span>{star} stars & above</span>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Availability */}
          <div className="pt-3 border-t border-[#FFF0F3]">
            <label className="flex items-center gap-2 text-xs text-[#5B3A32] cursor-pointer">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
                className="accent-[#D94F70]"
              />
              <span>In-stock items only</span>
            </label>
          </div>
        </aside>

        {/* RIGHT SIDE PRODUCTS GRID */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Sorting and Result Counter Bar */}
          <div className="bg-white rounded-2xl p-4 border border-[#F58FA3]/25 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs font-medium text-[#5B3A32]">
              Showing <strong className="text-[#D94F70]">{paginatedProducts.length}</strong> of{' '}
              <strong>{sortedProducts.length}</strong> treats
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#8E3552]/70 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FFF8F0] border border-[#F58FA3]/30 rounded-xl px-3 py-1.5 text-xs text-[#5B3A32] font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#D94F70]"
              >
                <option value="featured">Featured First</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#F58FA3]/25 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F3] text-[#F58FA3] mx-auto flex items-center justify-center">
                <ShoppingBag size={28} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#5B3A32]">
                We couldn't find that treat 🍓
              </h3>
              <p className="text-xs sm:text-sm text-[#8E3552]/80 max-w-sm mx-auto">
                No bakery items match your selected filters. Try clearing your search or resetting the dietary filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#F58FA3] hover:bg-[#D94F70] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#D94F70] text-white shadow-sm'
                        : 'bg-white text-[#5B3A32] border border-[#F58FA3]/30 hover:bg-[#FFF0F3]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </main>
      </div>

    </div>
  );
};
