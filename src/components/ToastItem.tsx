import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Copy,
  Check,
} from 'lucide-react';
import { ToastItem as ToastItemType } from '../types/toast';

interface ToastItemProps {
  toast: ToastItemType;
  onDismiss: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(toast.duration || 5000);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const duration = toast.duration ?? 5000;
  const isInfinite = duration <= 0 || duration === Infinity;

  // Auto-dismiss countdown with pause support
  useEffect(() => {
    if (isInfinite) return;

    if (!isPaused) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onDismiss(toast.id);
        toast.onDismiss?.();
      }, remainingTime);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused, remainingTime, toast.id, isInfinite]);

  const handleMouseEnter = () => {
    if (isInfinite) return;
    // Calculate how much time had elapsed
    const elapsed = Date.now() - startTimeRef.current;
    setRemainingTime((prev) => Math.max(0, prev - elapsed));
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (isInfinite) return;
    setIsPaused(false);
  };

  const handleCopyReference = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (toast.referenceId) {
      navigator.clipboard.writeText(toast.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine styling based on toast variant
  const getVariantStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
          iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          accentBorder: 'border-l-4 border-l-emerald-600',
          progressBar: 'bg-emerald-600',
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
          iconBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
          accentBorder: 'border-l-4 border-l-rose-600',
          progressBar: 'bg-rose-600',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
          iconBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          accentBorder: 'border-l-4 border-l-amber-500',
          progressBar: 'bg-amber-500',
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-[#A95B30] flex-shrink-0" />,
          iconBg: 'bg-[#A95B30]/10 text-[#A95B30] border-[#A95B30]/20',
          accentBorder: 'border-l-4 border-l-[#A95B30]',
          progressBar: 'bg-[#A95B30]',
        };
    }
  };

  const variant = getVariantStyles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -16, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={toast.type === 'error' ? 'alert' : 'status'}
      tabIndex={0}
      data-testid={`toast-${toast.id}`}
      className={`pointer-events-auto w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#171715]/10 overflow-hidden relative group transition-all duration-200 hover:shadow-2xl ${variant.accentBorder}`}
    >
      <div className="p-4 sm:p-4.5 flex items-start gap-3.5">
        {/* Type Icon Badge */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs flex-shrink-0 mt-0.5 ${variant.iconBg}`}
        >
          {variant.icon}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm sm:text-base text-[#171715] tracking-tight leading-tight">
              {toast.title}
            </h4>
          </div>

          {toast.description && (
            <div className="mt-1 text-xs sm:text-sm text-[#555550] leading-relaxed">
              {toast.description}
            </div>
          )}

          {/* Optional Reference ID Pill */}
          {toast.referenceId && (
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-medium text-[#777771] uppercase tracking-wider">
                Ref ID:
              </span>
              <button
                type="button"
                onClick={handleCopyReference}
                title="Click to copy reference"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#171715]/10 hover:border-[#A95B30]/40 hover:bg-[#F3EFEA] text-[11px] font-mono font-semibold text-[#171715] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A95B30]/30"
              >
                <span>{toast.referenceId}</span>
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-[#777771] hover:text-[#171715]" />
                )}
              </button>
              {copied && (
                <span className="text-[11px] font-medium text-emerald-700 animate-in fade-in duration-200">
                  Copied!
                </span>
              )}
            </div>
          )}

          {/* Optional Action Button */}
          {toast.action && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss(toast.id);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#171715] text-[#FAF9F6] hover:bg-[#A95B30] transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#A95B30]"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => {
            onDismiss(toast.id);
            toast.onDismiss?.();
          }}
          aria-label="Dismiss notification"
          className="text-[#999992] hover:text-[#171715] hover:bg-black/5 p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#A95B30]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Animated Linear Progress Bar */}
      {!isInfinite && (
        <div className="w-full bg-black/5 h-1 overflow-hidden">
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: isPaused ? undefined : 0 }}
            transition={{
              duration: remainingTime / 1000,
              ease: 'linear',
            }}
            style={{ originX: 0 }}
            className={`h-full ${variant.progressBar}`}
          />
        </div>
      )}
    </motion.div>
  );
};
