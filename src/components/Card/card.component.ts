import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';
import { IconComponent } from '../Icon/icon.component';

export type CardVariant = 'default' | 'news' | 'service' | 'creative';
export type CardSize = 'sm' | 'base' | 'lg';
export type CardStackDirection = 'horizontal' | 'vertical' | 'matrix';

const styles = {
  base: 'transition-all duration-300 ease-in-out bg-white',
  bordered: 'border border-primary-300 overflow-hidden',
  glow: 'hover:shadow-xl hover:shadow-primary-500/30',
  sizes: {
    sm: {
      padding: 'p-4',
      gap: 'space-y-5',
      icon: 'w-7 h-7',
      title: 'text-h6',
      rounded: 'rounded-lg',
    },
    base: {
      padding: 'p-6',
      gap: 'space-y-6',
      icon: 'w-10 h-10',
      title: 'text-h5',
      rounded: 'rounded-xl',
    },
    lg: {
      padding: 'p-7',
      gap: 'space-y-7',
      icon: 'w-14 h-14',
      title: 'text-h4',
      rounded: 'rounded-2xl',
    }
  },
  variants: {
    default: '',
    news: 'group',
    service: 'hover:bg-primary-50',
    creative: 'relative after:absolute after:inset-0 after:w-full after:h-full after:bg-linear-to-t after:from-primary-700 overflow-hidden text-white'
  }
};

@Component({
  selector: 'ae-card-link',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [href]="href()"
      [class]="linkClasses()"
    >
      <ng-content></ng-content>
      <ae-icon name="caret-right" [size]="20" class="ml-2 rtl:-scale-x-100"></ae-icon>
    </a>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class CardLinkComponent {
  readonly href = input<string>('#');
  readonly class = input<string>('');

  readonly linkClasses = computed(() =>
    cn('inline-flex items-center text-primary-600 hover:text-primary-800 font-medium', this.class())
  );
}

@Component({
  selector: 'ae-card-stack',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="stackClasses()">
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
export class CardStackComponent {
  readonly direction = input<CardStackDirection>('horizontal');
  readonly collapsed = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly gap = input<number>(4);
  readonly columns = input<number>(3);
  readonly class = input<string>('');

  readonly stackClasses = computed(() =>
    cn(
      'grid',
      this.direction() === 'horizontal' && 'grid-flow-col auto-cols-fr',
      this.direction() === 'vertical' && 'grid-flow-row',
      this.direction() === 'matrix' && `grid-cols-${this.columns()}`,
      !this.collapsed() && `gap-${this.gap()}`,
      this.class()
    )
  );
}

@Component({
  selector: 'ae-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  readonly variant = input<CardVariant>('default');
  readonly size = input<CardSize>('base');
  readonly bordered = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly glow = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly noRadius = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class = input<string>('');

  readonly cardClasses = computed(() => {
    const s = this.size();
    const v = this.variant();

    return cn(
      styles.base,
      !this.noRadius() && styles.sizes[s].rounded,
      styles.variants[v],
      this.bordered() && styles.bordered,
      this.glow() && styles.glow,
      v !== 'creative' && styles.sizes[s].padding,
      v !== 'news' && styles.sizes[s].gap,
      this.class()
    );
  });
}
