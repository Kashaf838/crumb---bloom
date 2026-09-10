import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { X, Mail, Lock, User, ArrowRight, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginCustomer,
    addToast
  } = useBakery();

  const [email, setEmail] = useState('ayesha.malik@example.com');
  const [password, setPassword] = useState('sweetbakery123');
  const [name, setName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      loginCustomer(email);
      setIsAuthModalOpen(false);
    } else if (authModalMode === 'register') {
      loginCustomer(email);
      setIsAuthModalOpen(false);
    } else {
      setResetSent(true);
      addToast('Reset instructions sent', `Check your inbox at ${email}`, 'info');
      setTimeout(() => {
        setResetSent(false);
        setAuthModalMode('login');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-[#5B3A32]/40 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative bg-[#FFF8F0] w-full max-w-md rounded-3xl shadow-2xl border border-[#F58FA3]/30 overflow-hidden z-10"
      >
        {/* Header decoration */}
        <div className="bg-linear-to-r from-[#F58FA3] to-[#D94F70] p-6 text-white text-center relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 mx-auto flex items-center justify-center mb-2 shadow-inner">
            <Sparkles size={24} className="text-[#FFF0F3]" />
          </div>
          <h3 className="font-serif text-2xl font-bold">
            {authModalMode === 'login' && 'Welcome Back'}
            {authModalMode === 'register' && 'Join The Sweet Club'}
            {authModalMode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            {authModalMode === 'login' && 'Sign in to access your orders, sweet rewards & favorites.'}
            {authModalMode === 'register' && 'Create an account to track orders & enjoy member perks.'}
            {authModalMode === 'forgot' && 'We’ll email you instructions to reset your password.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authModalMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#5B3A32] mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E3552]/40" size={16} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Malik"
                  className="w-full bg-white border border-[#F58FA3]/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#5B3A32] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E3552]/40" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border border-[#F58FA3]/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
              />
            </div>
          </div>

          {authModalMode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#5B3A32]">Password</label>
                {authModalMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthModalMode('forgot')}
                    className="text-[11px] text-[#D94F70] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E3552]/40" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#F58FA3]/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#5B3A32] focus:outline-hidden focus:ring-2 focus:ring-[#D94F70]/30"
                />
              </div>
            </div>
          )}

          {resetSent ? (
            <div className="p-3 bg-[#F2F8F0] border border-[#B8D8B0] text-[#2F5227] rounded-xl text-xs flex items-center gap-2">
              <Check size={16} />
              <span>Password reset email dispatched to {email}!</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#F58FA3] hover:bg-[#D94F70] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer text-sm"
            >
              <span>
                {authModalMode === 'login' && 'Sign In'}
                {authModalMode === 'register' && 'Create Account'}
                {authModalMode === 'forgot' && 'Send Reset Link'}
              </span>
              <ArrowRight size={16} />
            </button>
          )}

          {/* Switch Modes */}
          <div className="pt-2 text-center text-xs text-[#8E3552]/80 border-t border-[#FFF0F3]">
            {authModalMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="text-[#D94F70] font-bold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-[#D94F70] font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
