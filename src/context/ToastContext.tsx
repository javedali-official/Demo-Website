import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ToastContextValue, ToastItem, ToastOptions, ToastType } from '../types/toast';
import { addToastToList, removeToastFromList } from '../utils/toastManager';
import { ToastContainer } from '../components/ToastContainer';

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => removeToastFromList(prev, id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = useCallback((options: ToastOptions): string => {
    let assignedId = '';
    setToasts((prev) => {
      const res = addToastToList(prev, options);
      assignedId = res.newId;
      return res.toasts;
    });
    return assignedId;
  }, []);

  const success = useCallback(
    (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => {
      return addToast({
        type: 'success',
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => {
      return addToast({
        type: 'info',
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => {
      return addToast({
        type: 'warning',
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => {
      return addToast({
        type: 'error',
        title,
        description,
        ...options,
      });
    },
    [addToast]
  );

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      clearToasts,
      success,
      info,
      warning,
      error,
    }),
    [toasts, addToast, removeToast, clearToasts, success, info, warning, error]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
