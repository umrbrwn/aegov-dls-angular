import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '../Icon/icon.directive';
import { cn } from '../../utils/cn';

export type CardVariant = 'default' | 'news' | 'service' | 'creative';
export type CardSize = 'sm' | 'base' | 'lg';

@Component({
  selector: 'ae-card-group',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="groupClasses()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class CardGroupComponent {
  /**
   * Whether cards are stacked seamlessly without inner gaps
   */
  readonly stacked = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  protected readonly groupClasses = computed(() => {
    if (this.stacked()) {
      return cn(
        'flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-aeblack-100 border border-aeblack-100 rounded-2xl overflow-hidden bg-white shadow-xs [&>*]:flex-1 [&>*]:p-6',
        this.className()
      );
    }

    return cn(
      'flex flex-col md:flex-row flex-wrap gap-6 [&>*]:flex-1',
      this.className()
    );
  });
}

@Component({
  selector: 'ae-card',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()">
      @if (isCreative()) {
        @if (imageSrc()) {
          <img [src]="imageSrc()" [alt]="imageAlt()" class="min-h-134" />
        }
        <div class="card-content">
          @if (title()) {
            {{ title() }}
          } @else {
            <ng-content></ng-content>
          }
        </div>
      } @else if (isNews()) {
        @if (imageSrc()) {
          <a [href]="linkHref() || '#'">
            <img [src]="imageSrc()" [alt]="imageAlt()" class="card-image" />
          </a>
        }
        <div class="card-content">
          <ng-content select="[card-meta], .custom-divide"></ng-content>
          @if (title()) {
            <h5 class="card-title line-clamp-3">{{ title() }}</h5>
          }
          @if (description()) {
            <p class="line-clamp-3">{{ description() }}</p>
          }
          <ng-content></ng-content>
          @if (linkText()) {
            <a [href]="linkHref() || '#'" class="aegov-link">
              {{ linkText() }}
              <svg aeIcon name="arrow-right" [size]="20" class="link-icon rtl:-scale-x-100"></svg>
            </a>
          }
        </div>
      } @else if (isService()) {
        @if (title()) {
          <h5 class="card-service-title line-clamp-2">
            <a [href]="linkHref() || '#'">{{ title() }}</a>
          </h5>
        }
        @if (description()) {
          <p>{{ description() }}</p>
        }
        <ng-content></ng-content>
        @if (linkText()) {
          <div class="flex items-center justify-between gap-4">
            <a [href]="linkHref() || '#'" class="aegov-link">
              {{ linkText() }}
              <svg aeIcon name="arrow-right" [size]="20" class="link-icon rtl:-scale-x-100"></svg>
            </a>
            <ng-content select="[card-action], .card-action"></ng-content>
          </div>
        }
      } @else {
        @if (imageSrc()) {
          <img [src]="imageSrc()" [alt]="imageAlt()" class="card-image w-full h-auto rounded-xl" />
        }
        <ng-content select="[card-header], [card-icon]"></ng-content>
        @if (title()) {
          <h5 class="card-title">{{ title() }}</h5>
        }
        @if (description()) {
          <p>{{ description() }}</p>
        }
        <ng-content></ng-content>
        @if (linkText()) {
          <div class="block">
            <a [href]="linkHref() || '#'" class="aegov-link">
              {{ linkText() }}
              <svg aeIcon name="arrow-right" [size]="20" class="link-icon rtl:-scale-x-100"></svg>
            </a>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class CardComponent {
  /**
   * Card visual variant ('default' | 'news' | 'service' | 'creative')
   */
  readonly variant = input<CardVariant>('default');

  /**
   * Card sizing scale ('sm' | 'base' | 'lg')
   */
  readonly size = input<CardSize>('base');

  /**
   * Whether to apply the design system border (.card-bordered)
   */
  readonly bordered = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Whether to apply the interactive elevation hover glow (.card-glow)
   */
  readonly glow = input<boolean, unknown>(false, { transform: booleanAttribute });

  /**
   * Card header title
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Card body description
   */
  readonly description = input<string | undefined>(undefined);

  /**
   * Optional image URL
   */
  readonly imageSrc = input<string | undefined>(undefined);

  /**
   * Image alt text for accessibility
   */
  readonly imageAlt = input<string>('Card image');

  /**
   * Action link label
   */
  readonly linkText = input<string | undefined>(undefined);

  /**
   * Action link destination URL
   */
  readonly linkHref = input<string | undefined>(undefined);

  /**
   * Additional custom CSS classes
   */
  readonly className = input<string>('');

  protected readonly isCreative = computed(() => this.variant() === 'creative');
  protected readonly isNews = computed(() => this.variant() === 'news');
  protected readonly isService = computed(() => this.variant() === 'service');

  protected readonly cardClasses = computed(() => {
    const v = this.variant();
    const s = this.size();
    return cn(
      'aegov-card',
      this.bordered() && 'card-bordered',
      this.glow() && 'card-glow',
      v === 'news' && 'card-news',
      v === 'service' && 'card-service',
      v === 'creative' && 'card-creative',
      s !== 'base' && `card-${s}`,
      this.className()
    );
  });
}
