import React, { useState, useMemo } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  Cake,
  Sparkles,
  Heart,
  Calendar,
  Clock,
  Upload,
  CheckCircle2,
  Layers,
  Palette,
  ArrowRight,
  Info
} from 'lucide-react';

export const CustomCakePage: React.FC = () => {
  const { submitCustomCakeRequest, setCurrentView } = useBakery();

  // Custom cake builder state
  const [occasion, setOccasion] = useState('Birthday');
  const [flavor, setFlavor] = useState('Pistachio Rose');
  const [filling, setFilling] = useState('Belgian Chocolate Ganache');
  const [tiers, setTiers] = useState(2);
  const [size, setSize] = useState('20-30 Servings');
  const [shape, setShape] = useState('Round');
  const [decorations, setDecorations] = useState<string[]>([
    'Fresh Organic Edible Flowers',
    'Gold Leaf & Shimmer Pearls'
  ]);
  const [message, setMessage] = useState("Celebrating Zara's 25th");
  const [date, setDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    'Pastel pink and pistachio green Lambeth ruffles please! Chilled delivery needed.'
  );
  const [customerName, setCustomerName] = useState('Ayesha Malik');
  const [customerEmail, setCustomerEmail] = useState('ayesha.malik@example.com');
  const [customerPhone, setCustomerPhone] = useState('+92 300 1234567');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string>(
    '/assets/images/custom-cake/lambeth-heart.jpg'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic price calculation
  const estimatedPrice = useMemo(() => {
    let base = 3500;
    if (tiers === 2) base += 2500;
    if (tiers === 3) base += 5500;
    if (tiers === 4) base += 9000;

    if (size === '20-30 Servings') base += 1500;
    if (size === '40-60 Servings') base += 3500;
    if (size === '70-100 Servings') base += 6000;

    base += decorations.length * 500;
    return base;
  }, [tiers, size, decorations]);

  const occasions = [
    'Birthday',
    'Wedding & Reception',
    'Anniversary',
    'Bridal Shower',
    'Baby Shower',
    'Graduation',
    'Corporate Launch'
  ];

  const flavorOptions = [
    'Pistachio Rose Infusion',
    'Rich Belgian Chocolate Fudge',
    'Wild Strawberry & Vanilla Cream',
    'Velvety Red Velvet',
    'Lemon Curd & Sweet Raspberry',
    'Classic Madagascar Vanilla Bean'
  ];

  const fillingOptions = [
    'Belgian Chocolate Ganache',
    'Fresh Strawberry Puree & Cream',
    'Salted Caramel & Roasted Pecans',
    'Creamy Vanilla Buttercream',
    'Nutella Hazelnut Swirl',
    'Tangy Passionfruit Curd'
  ];

  const shapes = ['Round', 'Heart Shaped', 'Square', 'Vintage Lambeth Tier'];

  const decorationOptions = [
    'Fresh Organic Edible Flowers',
    'Gold Leaf & Shimmer Pearls',
    'Handmade French Macarons',
    'Vintage Royal Ruffle Piping',
    'Fresh Berry Cascade (Strawberries, Raspberries)',
    'Custom Acrylic / Mirror Topper'
  ];

  const handleDecorationToggle = (item: string) => {
    setDecorations((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleImageUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImagePreview(URL.createObjectURL(file));
    }
  };

  const inspirationLookbook = [
    {
      title: 'Romantic Lambeth Heart',
      occasion: 'Birthday',
      shape: 'Heart Shaped',
      tiers: 1,
      flavor: 'Velvety Red Velvet',
      image: '/assets/images/custom-cake/lambeth-heart.jpg',
      note: 'Vintage Lambeth piping with ruffled borders and glossy cherries.'
    },
    {
      title: 'Botanical Wildflower & Gold Tier',
      occasion: 'Wedding & Reception',
      shape: 'Round',
      tiers: 3,
      flavor: 'Pistachio Rose Infusion',
      image: '/assets/images/custom-cake/wildflower-tier.jpg',
      note: 'Pressed edible organic petals, gold foil leaf, and smooth buttercream.'
    },
    {
      title: 'Pistachio Rose Decadence',
      occasion: 'Anniversary',
      shape: 'Round',
      tiers: 2,
      flavor: 'Pistachio Rose Infusion',
      image: '/assets/images/custom-cake/pistachio-rose.jpg',
      note: 'Crushed pistachio praline, dried Persian rosebuds, and cardamom syrup.'
    },
    {
      title: 'Dark Valrhona Ganache Mud',
      occasion: 'Birthday',
      shape: 'Round',
      tiers: 2,
      flavor: 'Rich Belgian Chocolate Fudge',
      image: '/assets/images/custom-cake/valrhona-mud.jpg',
      note: '70% dark chocolate drip, cocoa nibs, and gold lustre dust.'
    },
    {
      title: 'Parisian Macaron Crown',
      occasion: 'Bridal Shower',
      shape: 'Round',
      tiers: 2,
      flavor: 'Lemon Curd & Sweet Raspberry',
      image: '/assets/images/custom-cake/macaron-crown.jpg',
      note: 'French almond macarons and pastel floral wreath topper.'
    },
    {
      title: 'Naked Mountain Strawberry',
      occasion: 'Birthday',
      shape: 'Round',
      tiers: 2,
      flavor: 'Wild Strawberry & Vanilla Cream',
      image: '/assets/images/custom-cake/naked-strawberry.jpg',
      note: 'Naked vanilla sponge, fresh mascarpone cream, and overflowing berries.'
    }
  ];

  const handleSelectInspiration = (item: typeof inspirationLookbook[0]) => {
    setUploadedImagePreview(item.image);
    setOccasion(item.occasion);
    setShape(item.shape);
    setTiers(item.tiers);
    setFlavor(item.flavor);
    setSpecialInstructions(item.note);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCustomCakeRequest({
      customerName,
      customerEmail,
      customerPhone,
      occasion,
      flavor,
      filling,
      tiers,
      size,
      decorations,
      message,
      date,
      specialInstructions,
      referenceImage: uploadedImagePreview,
      estimatedBudget: `Rs. ${estimatedPrice.toLocaleString()}`
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Studio Header */}
      <div className="bg-linear-to-r from-[#FFF0F3] via-[#FFF8F0] to-[#FFC6A8]/30 rounded-3xl p-8 sm:p-12 text-center border border-[#F58FA3]/30 shadow-xs relative overflow-hidden">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest block mb-1">
          Bespoke Pastry Artistry
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#5B3A32]">
          Custom Cake Studio
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80 max-w-xl mx-auto mt-2">
          From multi-tiered romantic wedding cakes to vintage piped birthday hearts, design your dream celebration bake with our master decorators.
        </p>
      </div>

      {/* Real Cakes Inspiration Lookbook Carousel / Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-[#D94F70] uppercase tracking-wider">
              Popular Cake Styles
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#5B3A32]">
              Pick from Our Signature Lookbook
            </h2>
          </div>
          <p className="text-xs text-[#8E3552]/70">
            Click any cake to load its style into the custom builder
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
          {inspirationLookbook.map((cake, idx) => {
            const isSelected = uploadedImagePreview === cake.image;
            return (
              <button
                type="button"
                key={idx}
                onClick={() => handleSelectInspiration(cake)}
                className={`text-left group rounded-2xl p-2.5 transition-all border cursor-pointer ${
                  isSelected
                    ? 'border-[#D94F70] bg-[#FFF0F3] ring-2 ring-[#D94F70]/20 shadow-md'
                    : 'border-[#F58FA3]/20 bg-[#FFF8F0]/50 hover:bg-white hover:border-[#F58FA3]/50 shadow-xs'
                }`}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-[#FFF0F3] relative">
                  <img
                    src={cake.image}
                    alt={cake.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/images/custom-cake/lambeth-heart.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <span className="absolute top-1.5 right-1.5 bg-[#D94F70] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-[#5B3A32] line-clamp-1 leading-tight">{cake.title}</p>
                <p className="text-[10px] text-[#8E3552]/70 mt-0.5">{cake.tiers} Tier • {cake.shape}</p>
              </button>
            );
          })}
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-[#F58FA3]/30 shadow-xl max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#B8D8B0] text-[#2F5227] mx-auto flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#5B3A32]">
            Custom Cake Request Dispatched!
          </h2>
          <p className="text-xs sm:text-sm text-[#5B3A32]/80 leading-relaxed">
            Our Head Pastry Designer is reviewing your flavor profile and reference images. We will contact you at <strong>{customerPhone}</strong> within 2 hours to confirm details.
          </p>
          <div className="p-4 bg-[#FFF8F0] rounded-2xl border border-[#F58FA3]/20 text-xs text-[#8E3552]">
            Estimated Initial Quote: <strong className="text-[#D94F70] text-sm">Rs. {estimatedPrice.toLocaleString()}</strong>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-bold text-[#D94F70] hover:underline"
            >
              Design Another Cake
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs font-bold text-[#5B3A32] hover:text-[#D94F70]"
            >
              Return Home
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Builder Controls */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Occasion & Date */}
            <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#5B3A32] flex items-center gap-2">
                <Sparkles size={18} className="text-[#D94F70]" />
                <span>1. Event & Celebration Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] font-semibold focus:outline-hidden"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Target Event Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shape, Tiers & Serving Size */}
            <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#5B3A32] flex items-center gap-2">
                <Layers size={18} className="text-[#D94F70]" />
                <span>2. Cake Architecture & Guest Count</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-2">Number of Tiers</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTiers(t)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                        tiers === t
                          ? 'bg-[#D94F70] text-white shadow-xs'
                          : 'bg-[#FFF8F0] text-[#5B3A32] border border-[#F58FA3]/30 hover:bg-[#FFF0F3]'
                      }`}
                    >
                      {t} {t === 1 ? 'Tier' : 'Tiers'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Cake Shape</label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] font-semibold focus:outline-hidden"
                  >
                    {shapes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Estimated Guests / Servings</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] font-semibold focus:outline-hidden"
                  >
                    <option value="10-15 Servings">10-15 Servings (Petite Party)</option>
                    <option value="20-30 Servings">20-30 Servings (Popular Celebration)</option>
                    <option value="40-60 Servings">40-60 Servings (Grand Banquet)</option>
                    <option value="70-100 Servings">70-100 Servings (Wedding / Gala)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Flavors & Fillings */}
            <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#5B3A32] flex items-center gap-2">
                <Palette size={18} className="text-[#D94F70]" />
                <span>3. Gourmet Sponge & Filling</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Sponge Flavor</label>
                  <select
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] font-semibold focus:outline-hidden"
                  >
                    {flavorOptions.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Filling / Frosting</label>
                  <select
                    value={filling}
                    onChange={(e) => setFilling(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] font-semibold focus:outline-hidden"
                  >
                    {fillingOptions.map((fl) => (
                      <option key={fl} value={fl}>{fl}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Decorations & Accents */}
            <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">
                4. Decorative Finishes
              </h3>
              <p className="text-xs text-[#8E3552]/70">
                Select your luxury embellishments (+Rs. 500 each):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {decorationOptions.map((dec) => (
                  <label
                    key={dec}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs cursor-pointer transition-all ${
                      decorations.includes(dec)
                        ? 'border-[#D94F70] bg-[#FFF0F3] font-semibold text-[#D94F70]'
                        : 'border-[#F58FA3]/20 bg-[#FFF8F0] text-[#5B3A32] hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={decorations.includes(dec)}
                      onChange={() => handleDecorationToggle(dec)}
                      className="accent-[#D94F70]"
                    />
                    <span>{dec}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Inscription, Image & Special Notes */}
            <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">
                5. Inscription & Visual References
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">
                  Cake Piping Message / Plaque
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Hina! or Just Married"
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#5B3A32] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">
                  Attach Reference Inspiration Photo (Pinterest, Instagram)
                </label>
                <div className="border-2 border-dashed border-[#F58FA3]/50 rounded-2xl p-4 text-center bg-[#FFF8F0] relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadMock}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={22} className="text-[#D94F70]" />
                    <span className="text-xs font-bold text-[#5B3A32]">
                      Click or drag a cake photo here
                    </span>
                    <span className="text-[10px] text-[#8E3552]/70">
                      JPG, PNG, WEBP up to 10MB
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">
                  Design Notes & Color Palette
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl p-3 text-xs text-[#5B3A32] focus:outline-hidden"
                />
              </div>
            </div>

            {/* 6. Contact Information */}
            <div className="bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#5B3A32]">
                6. Your Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
              </div>
            </div>

          </div>

          {/* RIGHT: Live Preview & Estimation Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#F58FA3]/25 shadow-lg space-y-6 sticky top-28">
            <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
              Live Cake Preview
            </h3>

            <div className="aspect-square rounded-2xl overflow-hidden bg-[#FFF0F3] border border-[#F58FA3]/30 relative shadow-inner">
              <img
                src={uploadedImagePreview}
                alt="Custom Cake Concept"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs rounded-xl p-2 text-white text-[11px] text-center">
                "{message}"
              </div>
            </div>

            {/* Spec summary */}
            <div className="space-y-2 text-xs text-[#5B3A32] border-t border-[#FFF0F3] pt-4">
              <div className="flex justify-between">
                <span className="text-[#8E3552]/70">Occasion:</span>
                <span className="font-semibold">{occasion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E3552]/70">Tiers & Shape:</span>
                <span className="font-semibold">{tiers} Tiers • {shape}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E3552]/70">Flavor:</span>
                <span className="font-semibold">{flavor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E3552]/70">Size:</span>
                <span className="font-semibold">{size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E3552]/70">Accents:</span>
                <span className="font-semibold">{decorations.length} Selected</span>
              </div>

              <div className="border-t border-[#FFF0F3] pt-3 flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-sm text-[#5B3A32] block">Estimated Quote</span>
                  <span className="text-[10px] text-[#8E3552]/70">Subject to chef consultation</span>
                </div>
                <span className="text-2xl font-extrabold text-[#D94F70]">
                  Rs. {estimatedPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold py-4 rounded-full transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Cake size={18} />
              <span>Submit Custom Request</span>
            </button>

            <div className="flex items-start gap-2 bg-[#FFF8F0] p-3 rounded-xl text-[11px] text-[#8E3552]">
              <Info size={14} className="shrink-0 mt-0.5 text-[#D94F70]" />
              <span>We require at least 48 hours notice for bespoke multi-tiered celebration orders.</span>
            </div>
          </div>

        </form>
      )}

    </div>
  );
};
