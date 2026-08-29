import {
  Component,
  input,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../../icons/icon.component';

export type AvatarSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarVariant = 'square' | 'rounded-sm' | 'rounded' | 'circle';
export type AvatarStatus = 'online' | 'offline' | 'none';

@Component({
  selector: 'ae-avatar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative inline-block leading-0">
      <div [class]="avatarClasses()">
        @if (src() && !imageError()) {
          <img
            [src]="src()"
            [alt]="alt()"
            class="h-full w-full object-cover"
            (error)="onImageError()"
          />
        } @else if (fallback()) {
          <div class="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700 font-semibold text-xs uppercase select-none">
            {{ fallback() }}
          </div>
        } @else {
          <div class="flex h-full w-full items-center justify-center bg-gray-100">
            <ae-icon name="user" [size]="iconSizes[size()]" class="text-gray-400"></ae-icon>
          </div>
        }
      </div>

      @if (status() !== 'none') {
        <span [class]="statusBadgeClasses()"></span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
      line-height: 0;
    }
  `]
})
export class AvatarComponent {
  readonly src = input<string | undefined>(undefined);
  readonly alt = input<string>('Avatar');
  readonly fallback = input<string | undefined>(undefined);
  readonly size = input<AvatarSize>('base');
  readonly variant = input<AvatarVariant>('square');
  readonly shape = input<string | undefined>(undefined); // alias for backwards compatibility
  readonly status = input<AvatarStatus>('none');
  readonly class = input<string>('');

  readonly imageError = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.src();
      this.imageError.set(false);
    });
  }

  readonly effectiveVariant = computed(() => {
    const v = (this.variant() || this.shape()) as string;
    if (v === 'rounded-sm' || v === 'rounded' || v === 'circle') return 'rounded-sm';
    return 'square';
  });

  readonly sizeStyles: Record<AvatarSize, string> = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    base: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-14 w-14',
    '2xl': 'h-16 w-16',
    '3xl': 'h-20 w-20'
  };

  readonly iconSizes: Record<AvatarSize, number> = {
    xs: 12,
    sm: 16,
    base: 20,
    lg: 24,
    xl: 28,
    '2xl': 32,
    '3xl': 40
  };

  readonly borderRadiusStyles: Record<AvatarSize, string> = {
    xs: 'rounded-[4px]',
    sm: 'rounded-[4px]',
    base: 'rounded-[6px]',
    lg: 'rounded-[6px]',
    xl: 'rounded-[8px]',
    '2xl': 'rounded-[8px]',
    '3xl': 'rounded-[8px]'
  };

  readonly statusStyles: Record<AvatarStatus, string> = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    none: 'hidden'
  };

  readonly statusSizeStyles: Record<AvatarSize, string> = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    base: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
    '2xl': 'h-4 w-4',
    '3xl': 'h-5 w-5',
  };

  readonly avatarClasses = computed(() =>
    cn(
      'relative inline-flex items-center justify-center overflow-hidden',
      this.sizeStyles[this.size()],
      this.effectiveVariant() === 'rounded-sm' ? 'rounded-full' : this.borderRadiusStyles[this.size()],
      this.class()
    )
  );

  readonly statusBadgeClasses = computed(() =>
    cn(
      'absolute -right-0.5 -top-0.5 block rounded-full ring-2 ring-white',
      this.statusStyles[this.status()],
      this.statusSizeStyles[this.size()]
    )
  );

  onImageError(): void {
    this.imageError.set(true);
  }
}
