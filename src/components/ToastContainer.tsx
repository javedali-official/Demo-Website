import React from 'react';
import { AnimatePresence } from 'motion/react';
import { ToastItem as ToastItemType } from '../types/toast';
import { ToastItem } from './ToastItem';

interface ToastContainerProps {
  toasts: ToastItemType[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      role="region"
      aria-label="Notifications"
      className="fixed top-5 right-0 left-0 sm:left-auto sm:right-6 z-[99999] flex flex-col gap-3 px-4 sm:px-0 sm:w-96 max-w-full pointer-events-none items-end"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};
