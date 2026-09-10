import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../../components/common/ProductCard';
import {
  Sparkles,
  Cake,
  ArrowRight,
  Heart,
  Clock,
  ShieldCheck,
  Truck,
  Award,
  Star,
  ChevronRight,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProductCategory } from '../../types';

export const HomePage: React.FC = () => {
  const {
    products,
    categories,
    navigateToShop,
    setCurrentView,
    navigateToProduct
  } = useBakery();

  const featuredProducts = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-[36px] bg-linear-to-br from-[#FFF0F3] via-[#FFF8F0] to-[#FFC6A8]/20 border border-[#F58FA3]/25 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl shadow-[#F58FA3]/10">
            
            {/* Soft decorative background circles */}
            <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#F58FA3]/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FFC6A8]/20 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
              
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Micro Pill */}
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#F58FA3]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#D94F70] shadow-xs">
                  <Sparkles size={14} className="text-[#D94F70]" />
                  <span>Artisan Warm Bakery • Dawn Ovens Fresh</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#5B3A32] leading-[1.12] tracking-tight">
                  Little moments, <br />
                  <span className="text-[#D94F70] italic">freshly baked.</span>
                </h1>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg text-[#5B3A32]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Handcrafted cakes, French laminated pastries, and sweet treats made fresh with pure Normandy butter, organic berries, and lots of love.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => navigateToShop()}
                    className="w-full sm:w-auto bg-[#F58FA3] hover:bg-[#D94F70] active:scale-95 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all shadow-md hover:shadow-xl shadow-[#F58FA3]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Shop Fresh Bakes</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => setCurrentView('custom-cake')}
                    className="w-full sm:w-auto bg-white hover:bg-[#FFF0F3] border-2 border-[#F58FA3] text-[#D94F70] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Cake size={18} />
                    <span>Order a Custom Cake</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#F58FA3]/20 max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#B8D8B0] shrink-0" />
                    <span className="text-xs font-semibold text-[#5B3A32]">100% Pure Butter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#B8D8B0] shrink-0" />
                    <span className="text-xs font-semibold text-[#5B3A32]">Baked at 6:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#B8D8B0] shrink-0" />
                    <span className="text-xs font-semibold text-[#5B3A32]">Custom Orders</span>
                  </div>
                </div>
              </div>

              {/* Hero Right Media Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Decorative Frame */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square bg-white">
                    <img
                      src="/assets/images/hero/hero-strawberry-cake.jpg"
                      alt="Artisan Strawberry Cake"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Floating pill over photo */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-[#F58FA3]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/images/hero/hero-thumb.jpg"
                          alt="Strawberry Dream Cake"
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#5B3A32] leading-tight">Strawberry Dream Cake</p>
                          <p className="text-[11px] text-[#D94F70] font-semibold">Today's Star Bake • Rs. 3,499</p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigateToProduct(products[0])}
                        className="bg-[#D94F70] text-white p-2 rounded-xl hover:bg-[#8E3552] transition-colors cursor-pointer"
                        title="View cake"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Floating floating badge 1 */}
                  <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white rounded-2xl p-3 shadow-xl border border-[#F58FA3]/30 flex items-center gap-2 text-xs font-bold text-[#5B3A32]">
                    <div className="w-8 h-8 rounded-full bg-[#B8D8B0]/40 flex items-center justify-center text-[#2F5227]">
                      ★
                    </div>
                    <div>
                      <p className="text-[11px] text-[#8E3552]/70 leading-none">Rated 4.9/5</p>
                      <p className="text-xs font-extrabold text-[#5B3A32]">Over 1,200 Sweet Reviews</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SECTION: "What's Your Craving?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block mb-1">
              Handcrafted Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B3A32]">
              What's Your Craving?
            </h2>
          </div>
          <button
            onClick={() => navigateToShop()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D94F70] hover:text-[#8E3552] transition-colors cursor-pointer group"
          >
            <span>Explore All Categories</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToShop(cat.name as ProductCategory)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#F58FA3]/20 shadow-xs hover:shadow-xl hover:shadow-[#F58FA3]/15 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#FFF0F3]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/categories/cakes.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
                  {cat.count} Treats
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#5B3A32] group-hover:text-[#D94F70] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#8E3552]/70 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFF0F3] group-hover:bg-[#F58FA3] text-[#D94F70] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS: "Fresh From The Oven" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block mb-1">
              Morning Bake
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B3A32]">
              Fresh From The Oven
            </h2>
            <p className="text-xs sm:text-sm text-[#8E3552]/80 mt-1">
              Pulled warm from our dawn ovens, glazed, dusted, and ready for your sweet cravings.
            </p>
          </div>
          <button
            onClick={() => navigateToShop()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D94F70] hover:text-[#8E3552] transition-colors cursor-pointer group"
          >
            <span>View Full Bakery Shop</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. SPECIAL BANNER: "Made For Your Moments" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[36px] bg-linear-to-r from-[#FFF0F3] via-[#FFC6A8]/30 to-[#B8D8B0]/30 border-2 border-[#F58FA3]/30 p-8 sm:p-14 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-block bg-[#D94F70] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Celebration Cakes
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#5B3A32] leading-tight">
                Made For Your Moments
              </h2>
              <p className="text-base sm:text-lg text-[#5B3A32]/85 max-w-xl">
                Birthdays, weddings, celebrations or simply because — we'll bake something beautiful for it.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('custom-cake')}
                  className="bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer mx-auto lg:mx-0"
                >
                  <Cake size={18} />
                  <span>Create Your Cake</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src="/assets/images/hero/cake-showcase.jpg"
                  alt="Floral Cake"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE BAKERY ATMOSPHERE: "From Our Hearth & Glass Displays" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block mb-1">
            Behind The Ovens
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B3A32]">
            From Our Hearth & Glass Displays
          </h2>
          <p className="text-xs sm:text-sm text-[#8E3552]/80 mt-1">
            A peek inside our kitchen at dawn: rolling French pastry dough, roasting pistachios, and piping delicate petal swirls.
          </p>
        </div>

        {/* 6-Photo Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm bg-[#FFF0F3]">
            <img
              src="/assets/images/atmosphere/hearth-croissants.jpg"
              alt="Golden flaky croissants on cooling rack"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-[11px] font-semibold leading-tight">Honeycomb Butter Croissants</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm bg-[#FFF0F3]">
            <img
              src="/assets/images/atmosphere/hearth-ganache.jpg"
              alt="Artisan cake piping and finishing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-[11px] font-semibold leading-tight">Dark Valrhona Ganache</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm bg-[#FFF0F3]">
            <img
              src="/assets/images/atmosphere/hearth-sourdough.jpg"
              alt="Artisan wild sourdough boule fresh from oven"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-[11px] font-semibold leading-tight">36-Hour Sourdough Boule</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm bg-[#FFF0F3]">
            <img
              src="/assets/images/atmosphere/hearth-macarons.jpg"
              alt="Pastel French macarons fresh batch"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-[11px] font-semibold leading-tight">Parisian Macarons</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm bg-[#FFF0F3]">
            <img
              src="/assets/images/atmosphere/hearth-donuts.jpg"
              alt="Strawberry glazed brioche donuts"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-[11px] font-semibold leading-tight">Glazed Brioche Donuts</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm bg-[#FFF0F3]">
            <img
              src="/assets/images/atmosphere/hearth-lambeth.jpg"
              alt="Vintage piped Lambeth cake details"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-[11px] font-semibold leading-tight">Vintage Lambeth Ruffles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS: "Everyone's Favorite" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block mb-1">
              Customer Loved
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5B3A32]">
              Everyone's Favorite
            </h2>
            <p className="text-xs sm:text-sm text-[#8E3552]/80 mt-1">
              The treats our regulars order again and again. Order early before they sell out!
            </p>
          </div>
          <button
            onClick={() => navigateToShop()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D94F70] hover:text-[#8E3552] transition-colors cursor-pointer group"
          >
            <span>See All Best Sellers</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. REAL CUSTOMER CELEBRATIONS PHOTO WALL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF0F3]/40 rounded-3xl sm:rounded-[36px] border border-[#F58FA3]/25 p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block mb-1">
                Real Memories • #CrumbAndBloomLahore
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#5B3A32]">
                Celebrations With Crumb & Bloom
              </h2>
              <p className="text-xs sm:text-sm text-[#8E3552]/80 mt-1">
                From intimate 1st birthdays to lavish DHA garden weddings, thank you for inviting our bakes to your table.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('custom-cake')}
              className="bg-[#D94F70] hover:bg-[#8E3552] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-xs cursor-pointer shrink-0"
            >
              Order Your Cake
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#F58FA3]/20 shadow-xs p-3 space-y-2.5">
              <div className="aspect-4/3 rounded-xl overflow-hidden">
                <img
                  src="/assets/images/celebrations/celebration-1.jpg"
                  alt="Aiman's 25th Birthday Cake"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#5B3A32]">Aiman & Bilal's Engagement</p>
                <p className="text-[11px] text-[#8E3552]/70 italic">"The pistachio rose flavor made everyone gasp — pure poetry!"</p>
                <span className="text-[10px] text-[#D94F70] font-semibold block mt-1">Custom 3-Tier Rose Cake</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-[#F58FA3]/20 shadow-xs p-3 space-y-2.5">
              <div className="aspect-4/3 rounded-xl overflow-hidden">
                <img
                  src="/assets/images/celebrations/celebration-2.jpg"
                  alt="Baby Zara's 1st Birthday"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#5B3A32]">Zara's First Birthday Party</p>
                <p className="text-[11px] text-[#8E3552]/70 italic">"The softest vanilla sponge we have ever tasted in Lahore."</p>
                <span className="text-[10px] text-[#D94F70] font-semibold block mt-1">Vintage Pink Heart Cake</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-[#F58FA3]/20 shadow-xs p-3 space-y-2.5">
              <div className="aspect-4/3 rounded-xl overflow-hidden">
                <img
                  src="/assets/images/celebrations/celebration-3.jpg"
                  alt="Sunday Family High Tea"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#5B3A32]">Sunday Family High Tea</p>
                <p className="text-[11px] text-[#8E3552]/70 italic">"The strawberry dream cake vanished in 10 minutes flat!"</p>
                <span className="text-[10px] text-[#D94F70] font-semibold block mt-1">Strawberry Dream Cake</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-[#F58FA3]/20 shadow-xs p-3 space-y-2.5">
              <div className="aspect-4/3 rounded-xl overflow-hidden">
                <img
                  src="/assets/images/celebrations/celebration-4.jpg"
                  alt="Corporate Morning Breakfast"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#5B3A32]">Agency Strategy Morning</p>
                <p className="text-[11px] text-[#8E3552]/70 italic">"Warm croissants arrived at 8:30 AM sharp, warm and fragrant."</p>
                <span className="text-[10px] text-[#D94F70] font-semibold block mt-1">Butter Croissant Grazing Box</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CRUMB & BLOOM / BAKERY PROMISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F58FA3]/20 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#D94F70] text-xs font-bold uppercase tracking-widest block mb-1">
              Pure Ingredients, Honest Baking
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#5B3A32]">
              The Crumb & Bloom Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3 p-4 rounded-2xl bg-[#FFF8F0]">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] text-[#D94F70] mx-auto flex items-center justify-center shadow-xs">
                <Award size={24} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#5B3A32]">European Pasture Butter</h3>
              <p className="text-xs text-[#5B3A32]/70 leading-relaxed">
                We use pure 84% butterfat Normandy butter for our croissants and cakes. No shortening, ever.
              </p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-2xl bg-[#FFF8F0]">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] text-[#D94F70] mx-auto flex items-center justify-center shadow-xs">
                <Clock size={24} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#5B3A32]">Baked Fresh at 6:00 AM</h3>
              <p className="text-xs text-[#5B3A32]/70 leading-relaxed">
                Our bakers arrive while the city sleeps to roll croissants, whip frostings, and pull warm loaves.
              </p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-2xl bg-[#FFF8F0]">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] text-[#D94F70] mx-auto flex items-center justify-center shadow-xs">
                <Heart size={24} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#5B3A32]">Customized With Love</h3>
              <p className="text-xs text-[#5B3A32]/70 leading-relaxed">
                Every bespoke cake is piped by hand by passionate pastry artists tailored to your celebration.
              </p>
            </div>

            <div className="text-center space-y-3 p-4 rounded-2xl bg-[#FFF8F0]">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] text-[#D94F70] mx-auto flex items-center justify-center shadow-xs">
                <Truck size={24} />
              </div>
              <h3 className="font-serif text-base font-bold text-[#5B3A32]">Careful Temperature Ride</h3>
              <p className="text-xs text-[#5B3A32]/70 leading-relaxed">
                Delivered in secure chilled bakery vaults so your tiered creations arrive pristine and picture-perfect.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
