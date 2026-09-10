import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Calendar, Users, Sparkles, Check, ArrowRight, Utensils, Award } from 'lucide-react';

export const CateringPage: React.FC = () => {
  const { addToast, setCurrentView } = useBakery();

  const [formData, setFormData] = useState({
    name: 'Ayesha Malik',
    email: 'ayesha.malik@example.com',
    phone: '+92 300 1234567',
    eventType: 'Wedding Reception',
    guestCount: '80 Guests',
    eventDate: '2026-10-15',
    venue: 'Royal Palm Golf & Country Club, Lahore',
    packageChoice: 'The Grand Celebration Dessert Bar',
    notes: 'Pastel pink theme with tiered macarons, mini strawberry tarts, and a cutting cake.'
  });
  const [submitted, setSubmitted] = useState(false);

  const packages = [
    {
      name: 'Petite Sweet Grazing Table',
      guests: '20 - 40 Guests',
      price: 'Starting Rs. 35,000',
      items: [
        'Assorted French Macarons (40 pcs)',
        'Mini Strawberry & Passionfruit Tarts (30 pcs)',
        'Dark Chocolate Fudge Brownie Bites (35 pcs)',
        'Vintage Display Racks & Floral Styling'
      ]
    },
    {
      name: 'The Grand Celebration Dessert Bar',
      guests: '50 - 100 Guests',
      price: 'Starting Rs. 75,000',
      popular: true,
      items: [
        'Custom 2-Tier Celebration Cutting Cake',
        'Laminated Mini Croissants & Danishes (60 pcs)',
        'Berry Cheesecake Shooters (50 pcs)',
        'Pistachio Rose Choux Buns (50 pcs)',
        'On-site Pastry Stylist & Tiered Stands'
      ]
    },
    {
      name: 'Corporate Breakfast & High Tea',
      guests: '30 - 70 Guests',
      price: 'Starting Rs. 48,000',
      items: [
        'Savory & Sweet French Croissant Baskets',
        'Petite Lemon Blueberry Tea Cakes',
        'Gourmet Cookies & Shortbreads',
        'Specialty Cold Brew & Herbal Tea Urns'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Catering inquiry submitted! 🥂', 'Our event coordinator will reach out within 4 hours', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest bg-[#FFF0F3] px-3.5 py-1.5 rounded-full inline-block">
          Events & Celebrations
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#5B3A32]">
          Catering & Dessert Tables
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80 leading-relaxed">
          Create unforgettable memories with showstopping dessert displays, decadent grazing tables, and artisan pastry spreads curated for weddings, corporate galas, and milestones.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`bg-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative shadow-xs transition-all ${
              pkg.popular
                ? 'border-2 border-[#D94F70] shadow-lg shadow-[#F58FA3]/15 scale-[1.02]'
                : 'border-[#F58FA3]/25 hover:shadow-md'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D94F70] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                ★ Most Requested
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#8E3552]/70 block">{pkg.guests}</span>
                <h3 className="font-serif text-xl font-bold text-[#5B3A32] mt-1">{pkg.name}</h3>
                <p className="text-sm font-extrabold text-[#D94F70] mt-1">{pkg.price}</p>
              </div>

              <div className="border-t border-[#FFF0F3] pt-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B3A32] block">
                  Includes:
                </span>
                <ul className="space-y-2 text-xs text-[#5B3A32]/80">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={14} className="text-[#B8D8B0] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#FFF0F3]">
              <button
                onClick={() => {
                  setFormData({ ...formData, packageChoice: pkg.name });
                  const el = document.getElementById('catering-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pkg.popular
                    ? 'bg-[#F58FA3] hover:bg-[#D94F70] text-white shadow-xs'
                    : 'bg-[#FFF8F0] hover:bg-[#FFF0F3] text-[#5B3A32] border border-[#F58FA3]/30'
                }`}
              >
                Inquire For This Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Form */}
      <div id="catering-form" className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F58FA3]/25 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[#5B3A32]">
            Book a Dessert Consultation
          </h2>
          <p className="text-xs text-[#8E3552]/80">
            Tell us about your event vision and our catering team will craft a customized quotation and tasting box.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-[#F2F8F0] border border-[#B8D8B0] rounded-2xl text-[#2F5227] space-y-2">
            <Check size={32} className="mx-auto" />
            <h4 className="font-bold text-base">Inquiry Successfully Dispatched!</h4>
            <p className="text-xs max-w-sm mx-auto">
              Our wedding and event stylist will review your date ({formData.eventDate}) and contact you within 4 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Mobile / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Event Type</label>
                <input
                  type="text"
                  required
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  placeholder="Wedding / Birthday / High Tea"
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Event Date</label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Guest Count</label>
                <input
                  type="text"
                  required
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Package Selection</label>
                <input
                  type="text"
                  required
                  value={formData.packageChoice}
                  onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5B3A32] mb-1">Venue Location</label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g. Royal Palm, Lahore / Residence in DHA"
                className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5B3A32] mb-1">Specific Vision / Dessert Choices</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl p-3 text-xs text-[#5B3A32]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D94F70] hover:bg-[#8E3552] text-white font-bold py-3.5 rounded-full transition-all shadow-md cursor-pointer text-xs sm:text-sm"
            >
              Submit Event Inquiry
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
