import {
  Component,
  input,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { phUserFill } from '../Icon/default-icons';

export type AvatarSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarVariant = 'square' | 'rounded';
export type AvatarStatus = 'online' | 'offline' | 'none';

const NO_USER_AVATAR_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="#9ca3af">${phUserFill}</svg>`
)}`;

@Component({
  selector: 'ae-avatar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="avatarClasses()"
      role="img"
      [attr.aria-label]="alt()"
    >
      <img
        [src]="effectiveSrc()"
        [class.no-user]="isNoUser()"
        [alt]="alt()"
        (error)="handleImageError()"
      />

      @if (showIndicator()) {
        <span
          class="alert-indicator"
          [class]="indicatorClass()"
          [class.bg-aegreen-500]="!indicatorClass() && status() === 'online'"
          [class.bg-aered-500]="!indicatorClass() && status() === 'offline'"
          [class.ring-whitely-50]="!indicatorClass() && (status() === 'online' || status() === 'offline')"
          [attr.aria-label]="effectiveStatusLabel()"
        ></span>
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
  /**
   * Source URL of the avatar image
   */
  readonly src = input<string | undefined>(undefined);

  /**
   * Alt text for accessibility
   */
  readonly alt = input<string>('User Avatar');

  /**
   * Size variation of the avatar ('xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl')
   */
  readonly size = input<AvatarSize>('base');

  /**
   * Shape style variation ('square' | 'rounded')
   */
  readonly variant = input<AvatarVariant>('square');

  /**
   * Status indicator type ('online' | 'offline' | 'none')
   */
  readonly status = input<AvatarStatus>('none');

  /**
   * Accessible aria-label for status indicator dot
   */
  readonly statusLabel = input<string | undefined>(undefined);

  /**
   * Custom CSS classes for the status indicator dot (e.g. 'bg-aegreen-500 ring-whitely-50')
   */
  readonly indicatorClass = input<string>('');

  /**
   * Explicitly force no-user placeholder state
   */
  readonly noUser = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes for the avatar container
   */
  readonly className = input<string>('');

  private readonly imageError = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.src();
      this.imageError.set(false);
    });
  }

  protected readonly isNoUser = computed(() => {
    return this.noUser() || !this.src() || this.imageError();
  });

  protected readonly effectiveSrc = computed(() => {
    return this.isNoUser() ? NO_USER_AVATAR_SRC : (this.src() || NO_USER_AVATAR_SRC);
  });

  protected readonly showIndicator = computed(() => {
    return this.status() !== 'none' || !!this.indicatorClass();
  });

  protected readonly effectiveStatusLabel = computed(() => {
    if (this.statusLabel()) return this.statusLabel();
    if (this.status() === 'online') return 'Online';
    if (this.status() === 'offline') return 'Offline';
    return undefined;
  });

  protected readonly avatarClasses = computed(() => {
    return cn(
      'aegov-avatar',
      this.size() !== 'base' && `avatar-${this.size()}`,
      this.variant() === 'rounded' && 'avatar-rounded',
      this.className()
    );
  });

  protected handleImageError(): void {
    this.imageError.set(true);
  }
}
