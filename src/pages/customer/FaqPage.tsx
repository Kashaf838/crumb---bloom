import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ChevronDown, HelpCircle, Phone, Mail, Sparkles } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { setCurrentView } = useBakery();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How far in advance should I place my cake order?',
      a: 'For our signature catalog cakes (such as the Strawberry Dream Cake or Belgian Chocolate Fudge), you can order same-day or 24 hours in advance. For bespoke tiered custom celebration cakes, we recommend 48 to 72 hours so our artists can sculpt sugar flowers and prepare fillings.'
    },
    {
      q: 'Are all your bakery treats 100% Halal?',
      a: 'Yes, absolutely. All our ingredients, vanilla extracts, and gelatins (where used in mousses) are strictly 100% Halal-certified. We never use alcohol in any baking or pastry soaking syrups.'
    },
    {
      q: 'Do you offer Eggless or Gluten-Free bakes?',
      a: 'Yes! We have an extensive eggless range including our Belgian Chocolate Fudge Cake, Lotus Biscoff Cupcakes, and Salted Caramel Brownies. You can also filter our shop menu by "Eggless" or "Gluten-Free" with one click.'
    },
    {
      q: 'How do you ensure cakes do not melt during delivery?',
      a: 'We operate our own dedicated temperature-controlled chilled delivery vans throughout Lahore. Every cake is locked inside a rigid bakery crate with anti-slip silicone stabilizing mats, ensuring pristine delivery even in summer.'
    },
    {
      q: 'How should I store and serve my cake?',
      a: 'Keep all fresh cream, cheesecake, and fruit cakes refrigerated until 20–30 minutes before cutting. Serving at room temperature allows the European butter and ganache to soften to its creamiest texture. Use a warm, dry knife for clean bakery-style slices.'
    },
    {
      q: 'Can I pick up my order from your Gulberg bakery?',
      a: 'Yes! Simply choose "In-Bakery Pickup" during checkout. There is zero delivery charge, and our pickup counter at 14-C Mini Market, Gulberg II is open until 10:00 PM daily.'
    },
    {
      q: 'Can you write a personalized message on the cake box or board?',
      a: 'Yes, complimentary! When adding any cake to your basket, or during checkout, simply type your greeting (e.g. "Happy 21st Birthday Zara") in the inscription field, and our chefs will pipe it in delicate script.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest">
          Got Questions?
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80 max-w-md mx-auto">
          Everything you need to know about our dawn bakes, delivery promise, allergy precautions, and custom celebration cakes.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#F58FA3]/25 overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFF8F0]/50 transition-colors"
              >
                <span className="font-serif text-base font-bold text-[#5B3A32]">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#D94F70] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#5B3A32]/80 leading-relaxed border-t border-[#FFF0F3] pt-3 bg-[#FFF8F0]/30">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact callout */}
      <div className="bg-[#FFF0F3] rounded-3xl p-8 border border-[#F58FA3]/30 text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
          Still have a sweet question?
        </h3>
        <p className="text-xs text-[#8E3552]/80 max-w-md mx-auto">
          Our friendly bakery concierge is available via WhatsApp, phone, or in person at our bakery.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentView('contact')}
            className="bg-[#F58FA3] hover:bg-[#D94F70] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-xs cursor-pointer"
          >
            Contact Our Team
          </button>
        </div>
      </div>

    </div>
  );
};
