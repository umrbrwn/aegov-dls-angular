import {
  Component,
  input,
  computed,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AeIconRegistry, type IconWeight } from './icon-registry.service';
import { cn } from '../utils/cn';

export type { IconWeight };
export type IconName = string;

@Component({
  selector: 'ae-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      [attr.width]="size()"
      [attr.height]="size()"
      [class]="computedClass()"
      fill="currentColor"
      aria-hidden="true"
      [innerHTML]="sanitizedSvg()"
    ></svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      vertical-align: middle;
    }
    svg {
      display: inline-block;
      vertical-align: middle;
    }
  `]
})
export class IconComponent {
  private registry = inject(AeIconRegistry);
  private sanitizer = inject(DomSanitizer);

  /**
   * The icon name registered in AeIconRegistry (e.g. 'check', 'warning', 'caret-down')
   */
  readonly name = input<IconName>();

  /**
   * Directly pass SVG inner content string (e.g. phCheck) for zero-lookup rendering
   */
  readonly svg = input<string>();

  /**
   * Weight variant ('regular' | 'bold' | 'fill' | 'light' | 'thin' | 'duotone')
   */
  readonly weight = input<IconWeight>('regular');

  /**
   * Size in pixels or CSS dimension string (defaults to 16)
   */
  readonly size = input<number | string>(16);

  /**
   * Additional CSS classes (e.g. 'text-primary-600', 'fill-current')
   */
  readonly class = input<string>('');

  readonly sanitizedSvg = computed<SafeHtml>(() => {
    const rawSvg = this.svg() || (this.name() ? this.registry.getIcon(this.name()!, this.weight()) : '') || '';
    return this.sanitizer.bypassSecurityTrustHtml(rawSvg);
  });

  readonly computedClass = computed(() => cn('shrink-0 inline-block', this.class()));
}
