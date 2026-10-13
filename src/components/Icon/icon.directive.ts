import {
  Directive,
  input,
  computed,
  inject,
  ElementRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AeIconRegistry, type IconWeight, type IconDefinition } from './icon-registry.service';
import { cn } from '../../utils/cn';

export type { IconWeight, IconDefinition };
export type IconName = string;

/**
 * Icon directive that renders UAE Government Design System icons directly
 * onto native `<svg>` elements without wrapping shell components.
 * Automatically marks decorative icons as `aria-hidden="true"` while preserving
 * `role="img"` for standalone informative icons with accessible names.
 *
 * @example
 * ```html
 * <svg aeIcon name="check" [size]="20"></svg>
 * <svg aeIcon name="arrow-right" class="text-primary-600 rtl:-scale-x-100"></svg>
 * <svg aeIcon name="warning" aria-label="System Alert" size="24"></svg>
 * ```
 */
@Directive({
  selector: 'svg[aeIcon], [aeIcon]',
  standalone: true,
  host: {
    'xmlns': 'http://www.w3.org/2000/svg',
    'viewBox': '0 0 256 256',
    'fill': 'currentColor',
    '[attr.aria-hidden]': 'isDecorative() ? "true" : null',
    '[attr.role]': 'isDecorative() ? null : "img"',
    '[attr.width]': 'size() ?? null',
    '[attr.height]': 'size() ?? null',
    '[class]': 'computedClass()',
    '[innerHTML]': 'sanitizedSvg()',
  }
})
export class IconDirective {
  private readonly el = inject(ElementRef<SVGElement>);
  private readonly registry = inject(AeIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

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
   * Size in pixels or CSS dimension string (defaults to undefined for CSS-driven sizing)
   */
  readonly size = input<number | string | undefined>(undefined);

  /**
   * Additional CSS classes (e.g. 'text-primary-600', 'fill-current')
   */
  readonly className = input<string>('', { alias: 'class' });

  /**
   * Checks if the icon is decorative (default) or informative (has explicit accessible label)
   */
  protected isDecorative(): boolean {
    const el = this.el.nativeElement;
    return !el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby') && !el.hasAttribute('title');
  }

  protected readonly sanitizedSvg = computed<SafeHtml>(() => {
    const rawSvg = this.svg() || (this.name() ? this.registry.getIcon(this.name()!, this.weight()) : '') || '';
    return this.sanitizer.bypassSecurityTrustHtml(rawSvg);
  });

  protected readonly computedClass = computed(() =>
    cn(
      'shrink-0 inline-block',
      this.className()
    )
  );
}
