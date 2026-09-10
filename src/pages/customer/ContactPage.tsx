import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContactMessage, addToast } = useBakery();

  const [name, setName] = useState('Ayesha Malik');
  const [email, setEmail] = useState('ayesha.malik@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [subject, setSubject] = useState('Custom Cake Inquiry');
  const [message, setMessage] = useState('Hello! I would love to ask about your Pistachio Rose Cake for a family gathering this Saturday.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactMessage({ name, email, phone, subject, message });
    setSubmitted(true);
    addToast('Message dispatched! 💌', 'Our bakery team will reply within 2 hours', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#D94F70] uppercase tracking-widest">
          Say Hello
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5B3A32]">
          Get In Touch With Our Bakery
        </h1>
        <p className="text-xs sm:text-sm text-[#8E3552]/80">
          Have an inquiry, custom design request, or catering question? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
            Bakery Flagship & Kitchen
          </h3>

          <div className="space-y-4 text-xs text-[#5B3A32]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#D94F70] flex items-center justify-center shrink-0">
                <MapPin size={17} />
              </div>
              <div>
                <strong className="block text-sm">Bakery Address</strong>
                <span className="text-[#8E3552]/80 leading-relaxed">
                  14-C Mini Market, Gulberg II, Lahore, Pakistan
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#D94F70] flex items-center justify-center shrink-0">
                <Phone size={17} />
              </div>
              <div>
                <strong className="block text-sm">Telephone Hotline</strong>
                <span className="text-[#8E3552]/80">+92 (042) 3571-BAKE (2253)</span>
                <p className="text-[11px] text-[#4A7840] font-semibold mt-0.5">Lines open 8:00 AM – 10:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#D94F70] flex items-center justify-center shrink-0">
                <Mail size={17} />
              </div>
              <div>
                <strong className="block text-sm">Email Inquiries</strong>
                <span className="text-[#8E3552]/80">hello@crumbandbloom.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#D94F70] flex items-center justify-center shrink-0">
                <Clock size={17} />
              </div>
              <div>
                <strong className="block text-sm">Oven Timings</strong>
                <span className="text-[#8E3552]/80">Monday – Saturday: 8:00 AM – 10:00 PM</span>
                <span className="block text-[#8E3552]/80">Sunday: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp helper button */}
          <button
            onClick={() => addToast('Connecting to WhatsApp: +92 300 1234567 💬', undefined, 'info')}
            className="w-full bg-[#B8D8B0] hover:bg-[#A6CD9D] text-[#2F5227] font-bold text-xs py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <MessageCircle size={16} />
            <span>Chat Directly on WhatsApp</span>
          </button>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#F58FA3]/25 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#5B3A32]">
            Send Us a Sweet Message
          </h3>

          {submitted ? (
            <div className="p-8 text-center bg-[#F2F8F0] border border-[#B8D8B0] rounded-2xl text-[#2F5227] space-y-2">
              <Check size={32} className="mx-auto" />
              <h4 className="font-bold text-base">Message Sent Successfully!</h4>
              <p className="text-xs">
                Thank you, {name}. Our customer care team will respond to {email} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#D94F70] hover:underline pt-2 inline-block"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5B3A32] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl px-3.5 py-2 text-xs text-[#5B3A32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5B3A32] mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FFF8F0] border border-[#F58FA3]/40 rounded-xl p-3 text-xs text-[#5B3A32]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F58FA3] hover:bg-[#D94F70] text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer text-xs sm:text-sm"
              >
                <Send size={15} />
                <span>Dispatch Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
