import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);

  show(toast: Omit<ToastMessage, 'id'>): string {
    const id = `toast-${Math.random().toString(36).slice(2, 9)}`;
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration ?? 5000
    };

    this.toasts.update(prev => [...prev, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }

    return id;
  }

  success(message: string, title?: string): string {
    return this.show({ message, title, variant: 'success' });
  }

  error(message: string, title?: string): string {
    return this.show({ message, title, variant: 'error' });
  }

  info(message: string, title?: string): string {
    return this.show({ message, title, variant: 'info' });
  }

  warning(message: string, title?: string): string {
    return this.show({ message, title, variant: 'warning' });
  }

  dismiss(id: string): void {
    this.toasts.update(prev => prev.filter(t => t.id !== id));
  }
}
