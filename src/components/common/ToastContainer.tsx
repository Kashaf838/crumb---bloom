import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBakery();

  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#F58FA3]/30 rounded-2xl p-4 shadow-xl flex items-start gap-3 text-[#5B3A32]"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-[#B8D8B0] fill-[#4A7840]/20" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-[#D94F70]" />
              )}
              {toast.type === 'warning' && (
                <AlertCircle className="w-5 h-5 text-[#FFC6A8]" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-[#F58FA3]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#5B3A32] leading-tight">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-xs text-[#8E3552]/80 mt-1 leading-normal">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-[#8E3552]/50 hover:text-[#5B3A32] p-1 rounded-full hover:bg-[#FFF0F3] transition-colors"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
