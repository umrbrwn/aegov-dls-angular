import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../Icon/icon.component';

export type BannerPosition = 'top' | 'bottom' | 'static';
export type BannerVariant = 'default' | 'camel' | 'red' | 'dark' | 'primaryNotice' | 'secondaryNotice';

export interface BannerAction {
  text: string;
  href?: string;
  onClick?: () => void;
}

@Component({
  selector: 'ae-banner',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div
        role="alert"
        [class]="containerClasses()"
      >
        @if (isNotice()) {
          <div class="py-4 max-w-(--breakpoint-lg) flex-1">
            @if (title()) {
              <h2 class="mb-4 text-xl font-bold text-slate-800">{{ title() }}</h2>
            }
            <p class="font-normal text-slate-800 mb-0">
              <ng-content></ng-content>
            </p>
          </div>
          <div class="flex items-center gap-4 shrink-0">
            @if (effectiveAction(); as act) {
              <a
                [href]="act.href || '#'"
                [class]="actionClasses()"
                (click)="onActionClick($event, act)"
              >
                {{ act.text }}
                <ae-icon name="caret-right" [size]="20" class="rtl:-scale-x-100"></ae-icon>
              </a>
            }
            @if (effectiveDismissible()) {
              <button
                type="button"
                (click)="handleDismiss()"
                class="p-0.5 hover:opacity-60 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 rounded-sm cursor-pointer"
                aria-label="Dismiss"
              >
                <ae-icon name="x" [size]="20"></ae-icon>
              </button>
            }
          </div>
        } @else {
          <div [class]="contentWrapperClasses()">
            <div [class]="textContentClasses()">
              @if (title()) {
                <div class="font-bold mb-1">{{ title() }}</div>
              }
              <ng-content></ng-content>
            </div>
            @if (effectiveAction(); as act) {
              <div [class]="actionWrapperClasses()">
                <a
                  [href]="act.href || '#'"
                  [class]="actionClasses()"
                  (click)="onActionClick($event, act)"
                >
                  {{ act.text }}
                  <ae-icon name="caret-right" [size]="20" class="rtl:-scale-x-100"></ae-icon>
                </a>
              </div>
            }
          </div>
          @if (effectiveDismissible()) {
            <div class="flex items-center">
              <button
                type="button"
                (click)="handleDismiss()"
                class="p-0.5 hover:opacity-60 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 rounded-sm cursor-pointer"
                aria-label="Dismiss"
              >
                <ae-icon name="x" [size]="20"></ae-icon>
              </button>
            </div>
          }
        }
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class BannerComponent {
  readonly position = input<BannerPosition>('static');
  readonly variant = input<BannerVariant>('default');
  readonly title = input<string | undefined>(undefined);
  readonly action = input<BannerAction | undefined>(undefined);
  readonly actionText = input<string | undefined>(undefined);
  readonly actionHref = input<string | undefined>(undefined);
  readonly isDismissible = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly dismissible = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly centered = input<boolean, unknown>(true, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly dismiss = output<void>();

  readonly isVisible = signal<boolean>(true);

  readonly effectiveDismissible = computed(() => this.isDismissible() || this.dismissible());
  readonly effectiveAction = computed<BannerAction | undefined>(() => {
    if (this.action()) return this.action();
    if (this.actionText()) {
      return {
        text: this.actionText()!,
        href: this.actionHref() || '#'
      };
    }
    return undefined;
  });

  readonly variantStyles: Record<BannerVariant, string> = {
    default: 'bg-slate-50 border-slate-500 text-slate-600',
    camel: 'bg-camel-600 border-camel-500 text-camel-50',
    red: 'bg-aered-50 border-aered-500 text-aered-600',
    primaryNotice: 'bg-primary-50 border-primary-700',
    secondaryNotice: 'bg-slate-50 border-slate-700',
    dark: 'bg-slate-700 text-slate-50 rounded-xl m-4',
  };

  readonly actionStyles: Record<BannerVariant, string> = {
    default: 'text-slate-600 hover:text-slate-700 focus-visible:ring-slate-400',
    camel: 'text-camel-50 hover:text-camel-100 focus-visible:ring-camel-400',
    red: 'text-aered-600 hover:text-aered-700 focus-visible:ring-aered-400',
    primaryNotice: 'text-primary-700 hover:text-primary-800 focus-visible:ring-primary-400',
    secondaryNotice: 'text-secondary-700 hover:text-secondary-800 focus-visible:ring-secondary-400',
    dark: 'text-slate-50 hover:text-slate-100 focus-visible:ring-slate-400',
  };

  readonly positionStyles: Record<BannerPosition, string> = {
    top: 'border-b-2 fixed top-0 left-0 right-0 z-50',
    bottom: 'border-t-2 fixed bottom-0 left-0 right-0 z-50',
    static: 'border-b-2 relative'
  };

  readonly isNotice = computed(() =>
    this.variant() === 'primaryNotice' || this.variant() === 'secondaryNotice'
  );

  readonly containerClasses = computed(() =>
    cn(
      'relative px-4 py-3 flex',
      this.variantStyles[this.variant()],
      this.positionStyles[this.position()],
      this.isNotice() && 'flex flex-col md:flex-row justify-between gap-4 items-center',
      this.class()
    )
  );

  readonly actionClasses = computed(() =>
    cn(
      'inline-flex items-center gap-2 font-medium underline underline-offset-1 hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xs whitespace-nowrap',
      this.actionStyles[this.variant()]
    )
  );

  readonly contentWrapperClasses = computed(() =>
    cn(
      'flex flex-col md:flex-row gap-3 grow',
      this.centered() ? 'justify-center' : 'justify-start'
    )
  );

  readonly textContentClasses = computed(() =>
    cn(this.centered() ? 'text-center' : 'text-left')
  );

  readonly actionWrapperClasses = computed(() =>
    cn(
      'flex items-center gap-3',
      this.centered() ? 'justify-center' : 'justify-start'
    )
  );

  handleDismiss(): void {
    this.isVisible.set(false);
    this.dismiss.emit();
  }

  onActionClick(event: MouseEvent, act: BannerAction): void {
    if (act.onClick) {
      event.preventDefault();
      act.onClick();
    }
  }
}
