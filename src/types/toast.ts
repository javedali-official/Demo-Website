import React from 'react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: React.ReactNode;
  referenceId?: string;
  duration?: number; // milliseconds; 0 or Infinity for persistent
  action?: ToastAction;
  timestamp: number;
  onDismiss?: () => void;
}

export type ToastOptions = Omit<ToastItem, 'id' | 'timestamp'>;

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  success: (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
  info: (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
  warning: (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
  error: (title: string, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
}
