import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-soft border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-right-5 ${
              isSuccess
                ? 'bg-[#1B5E20] border-[#2E7D32] text-white'
                : isError
                ? 'bg-[#991B1B] border-[#DC2626] text-white'
                : 'bg-[#3E2723] border-[#D4AF37] text-[#FDFBF7]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isSuccess ? (
                <CheckCircle className="w-4 h-4 text-[#A5D6A7] flex-shrink-0" />
              ) : isError ? (
                <AlertCircle className="w-4 h-4 text-red-200 flex-shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-[#E0BA5E] flex-shrink-0" />
              )}
              <span className="text-xs font-semibold truncate leading-tight">
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md hover:bg-white/20 text-white/80 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
