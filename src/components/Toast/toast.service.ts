import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Component,
  ChangeDetectionStrategy,
  signal,
  type ComponentRef
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ToastComponent } from './toast.component';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastOptions {
  id?: string;
  title?: string;
  message?: string;
  variant?: ToastVariant;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  duration?: number;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  dismissible?: boolean;
  dismissAriaLabel?: string;
  position?: ToastPosition;
  className?: string;
  dir?: 'ltr' | 'rtl';
}

export interface ToastItem {
  id: string;
  title?: string;
  message?: string;
  variant: ToastVariant;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  duration: number;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  dismissible: boolean;
  dismissAriaLabel?: string;
  position: ToastPosition;
  className?: string;
  dir?: 'ltr' | 'rtl';
  timerId?: ReturnType<typeof setTimeout>;
}

export type ToastMessage = ToastOptions;

const DEFAULT_ICONS: Record<ToastVariant, { icon: string; color: string }> = {
  success: { icon: 'check-circle', color: 'text-aegreen-600' },
  error: { icon: 'x-circle', color: 'text-aered-600' },
  warning: { icon: 'warning', color: 'text-camel-600' },
  info: { icon: 'info', color: 'text-primary-600' },
};

@Component({
  selector: 'ae-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (pos of positions; track pos) {
      @if (hasToastsInPosition(pos)) {
        <div
          class="fixed z-50 flex flex-col gap-3 pointer-events-none p-4 max-w-sm w-full"
          [class]="positionClasses[pos]"
          role="region"
          aria-live="polite"
        >
          @for (toast of getToastsByPosition(pos); track toast.id) {
            <div [attr.dir]="toast.dir || null" class="w-full max-w-xs transition-all duration-300 ease-in-out">
              <ae-toast
                class="pointer-events-auto shadow-lg"
                [id]="toast.id"
                [title]="toast.title"
                [message]="toast.message"
                [icon]="toast.icon"
                [iconColor]="toast.iconColor || ''"
                [iconSize]="toast.iconSize || 32"
                [actionText]="toast.actionText"
                [actionHref]="toast.actionHref"
                [dismissible]="toast.dismissible"
                [dismissAriaLabel]="toast.dismissAriaLabel || 'Close'"
                [className]="toast.className || ''"
                (dismiss)="dismiss(toast.id)"
                (actionClick)="handleAction(toast, $event)"
              ></ae-toast>
            </div>
          }
        </div>
      }
    }
  `,
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);
  protected readonly positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  protected readonly positionClasses: Record<ToastPosition, string> = {
    'top-right': 'top-0 end-0 items-end',
    'top-left': 'top-0 start-0 items-start',
    'top-center': 'top-0 start-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-0 end-0 items-end',
    'bottom-left': 'bottom-0 start-0 items-start',
    'bottom-center': 'bottom-0 start-1/2 -translate-x-1/2 items-center',
  };

  protected getToastsByPosition(pos: ToastPosition): ToastItem[] {
    return this.toastService.toasts().filter((t) => t.position === pos);
  }

  protected hasToastsInPosition(pos: ToastPosition): boolean {
    return this.toastService.toasts().some((t) => t.position === pos);
  }

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  protected handleAction(toast: ToastItem, _event: MouseEvent): void {
    if (toast.onAction) {
      toast.onAction();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  readonly toasts = signal<ToastItem[]>([]);
  private containerRef: ComponentRef<ToastContainerComponent> | null = null;

  private ensureContainer(): void {
    if (this.containerRef || typeof document === 'undefined') return;

    const hostEl = this.document.createElement('div');
    hostEl.setAttribute('id', 'ae-toast-portal');
    this.document.body.appendChild(hostEl);

    this.containerRef = createComponent(ToastContainerComponent, {
      environmentInjector: this.injector,
      hostElement: hostEl,
    });

    this.appRef.attachView(this.containerRef.hostView);
    this.containerRef.changeDetectorRef.detectChanges();
  }

  /**
   * Shows a toast notification.
   */
  show(options: ToastOptions | string): string {
    this.ensureContainer();

    const opts: ToastOptions = typeof options === 'string' ? { message: options } : options;
    const id = opts.id || `toast-${Math.random().toString(36).slice(2, 9)}`;
    const variant = opts.variant || 'info';
    const defaults = DEFAULT_ICONS[variant];

    const duration = opts.duration !== undefined ? opts.duration : 5000;
    const position = opts.position || 'bottom-right';

    let timerId: ReturnType<typeof setTimeout> | undefined = undefined;
    if (duration > 0) {
      timerId = setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    const item: ToastItem = {
      id,
      title: opts.title,
      message: opts.message,
      variant,
      icon: opts.icon !== undefined ? opts.icon : defaults.icon,
      iconColor: opts.iconColor || defaults.color,
      iconSize: opts.iconSize || 32,
      duration,
      actionText: opts.actionText,
      actionHref: opts.actionHref,
      onAction: opts.onAction,
      dismissible: opts.dismissible ?? true,
      dismissAriaLabel: opts.dismissAriaLabel || 'Close',
      position,
      className: opts.className,
      dir: opts.dir,
      timerId,
    };

    this.toasts.update((prev) => [...prev, item]);
    return id;
  }

  /**
   * Shows a success toast.
   */
  success(message: string, title?: string, options?: Partial<ToastOptions>): string {
    return this.show({ ...options, message, title, variant: 'success' });
  }

  /**
   * Shows an error toast.
   */
  error(message: string, title?: string, options?: Partial<ToastOptions>): string {
    return this.show({ ...options, message, title, variant: 'error' });
  }

  /**
   * Shows an info toast.
   */
  info(message: string, title?: string, options?: Partial<ToastOptions>): string {
    return this.show({ ...options, message, title, variant: 'info' });
  }

  /**
   * Shows a warning toast.
   */
  warning(message: string, title?: string, options?: Partial<ToastOptions>): string {
    return this.show({ ...options, message, title, variant: 'warning' });
  }

  /**
   * Dismisses a toast by its id.
   */
  dismiss(id: string): void {
    const current = this.toasts();
    const item = current.find((t) => t.id === id);
    if (item && item.timerId) {
      clearTimeout(item.timerId);
    }
    this.toasts.update((prev) => prev.filter((t) => t.id !== id));
  }

  /**
   * Clears all active toasts.
   */
  clear(): void {
    for (const item of this.toasts()) {
      if (item.timerId) {
        clearTimeout(item.timerId);
      }
    }
    this.toasts.set([]);
  }
}
