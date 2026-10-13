import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective, type IconName } from '../Icon/icon.directive';

import { DEFAULT_TAWASUL_LOGO } from './tawasul-logo';
export { DEFAULT_TAWASUL_LOGO };

export interface FooterLink {
  label: string;
  href?: string;
  target?: string;
}

export interface FooterCategory {
  title: string;
  links: FooterLink[];
}

export type FooterSocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'x' | 'youtube';

export interface FooterSocialLink {
  platform: FooterSocialPlatform | string;
  href?: string;
  ariaLabel?: string;
  icon?: IconName;
}

@Component({
  selector: 'ae-footer-nav',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'aegov-accordion aegov-mobile-accordion [&_.accordion-active_svg]:rotate-45 flex-1 block',
    'id': 'mobile-accordion-collapse',
    'data-accordion': 'collapse'
  },
  template: `
    <nav aria-label="footer navigation" class="w-full">
      <ul class="grid sm:gap-x-2.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-y-8 md:gap-y-12 w-full">
        @for (category of categories(); track category.title; let idx = $index) {
          <li class="accordion-item border-b border-aeblack-100 sm:border-none">
            <div class="accordion-title sm:mb-4" [id]="'mobile-accordion-collapse-heading-' + (idx + 1)">
              <button
                class="max-sm:py-4 max-sm:flex justify-between sm:justify-start max-sm:items-center xl:cursor-default sm:pointer-events-none w-full text-start"
                aria-label="heading"
                type="button"
                [attr.data-accordion-target]="'#mobile-accordion-collapse-body-' + (idx + 1)"
                [attr.aria-expanded]="isCategoryOpen(idx)"
                [attr.aria-controls]="'mobile-accordion-collapse-body-' + (idx + 1)"
                (click)="toggleCategory(idx)"
              >
                <span>{{ category.title }}</span>
                <span class="sm:hidden inline-flex items-center">
                  <svg
                    aeIcon
                    name="plus"
                    [size]="24"
                    class="transition-transform duration-200"
                    [class.rotate-45]="isCategoryOpen(idx)"
                  ></svg>
                </span>
              </button>
            </div>
            <div
              class="accordion-content max-sm:py-4 sm:block"
              [class.hidden]="!isCategoryOpen(idx)"
              [id]="'mobile-accordion-collapse-body-' + (idx + 1)"
              [attr.aria-labelledby]="'mobile-accordion-collapse-heading-' + (idx + 1)"
            >
              <ul class="accordion-content-body">
                @for (link of category.links; track link.label) {
                  <li><a [href]="link.href || '#'" [target]="link.target || '_self'">{{ link.label }}</a></li>
                }
              </ul>
            </div>
          </li>
        }
      </ul>
    </nav>
  `
})
export class FooterNavComponent {
  /**
   * Navigation categories with nested links.
   */
  readonly categories = input<FooterCategory[]>([]);

  protected readonly openCategory = signal<number | null>(null);

  protected toggleCategory(index: number): void {
    this.openCategory.update(current => (current === index ? null : index));
  }

  protected isCategoryOpen(index: number): boolean {
    return this.openCategory() === index;
  }
}

@Component({
  selector: 'ae-footer-contact',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'text-center footer-contact lg:w-48 xl:w-[277px] max-sm:mt-6 block shrink-0'
  },
  template: `
    <ul class="divide-y divide-aeblack-100">
      <li>
        <a [href]="tawasulHref()" class="inline-block py-2">
          <img
            [src]="tawasulLogoSrc()"
            [alt]="tawasulLogoAlt()"
            class="inline-block w-36 lg:w-auto"
          >
        </a>
      </li>
      <li class="custom-divide">
        <a [href]="number171Href()" class="inline-with-gap">
          <svg aeIcon name="phone-call" [size]="18" class="fill-aegreen-600 text-aegreen-600"></svg>
          <span>{{ number171() }}</span>
        </a>
        <a [href]="landlineHref()" class="inline-with-gap">
          <svg aeIcon name="phone" [size]="18" class="fill-aegreen-600 text-aegreen-600"></svg>
          <span>{{ landlineNumber() }}</span>
        </a>
      </li>
      <li class="inline-with-gap">
        <span class="text-aeblack-500 inline-with-gap">
          <svg aeIcon name="phone-outgoing" [size]="18"></svg>
          {{ tollFreeLabel() }}
        </span>
        <a [href]="tollFreeHref() || '#'" class="">
          {{ tollFreeNumber() }}
        </a>
      </li>
    </ul>
  `
})
export class FooterContactComponent {
  /**
   * Tawasul logo image path or data URI (defaults to embedded official Tawasul PNG)
   */
  readonly tawasulLogoSrc = input<string>(DEFAULT_TAWASUL_LOGO);

  /**
   * Tawasul logo alternative text
   */
  readonly tawasulLogoAlt = input<string>('tawasul');

  /**
   * Tawasul portal link URL
   */
  readonly tawasulHref = input<string>('#');

  /**
   * 171 short code display label
   */
  readonly number171 = input<string>('171');

  /**
   * 171 phone link URL (e.g. 'tel:171')
   */
  readonly number171Href = input<string>('tel:171');

  /**
   * 04-7771777 direct telephone number
   */
  readonly landlineNumber = input<string>('04-7771777');

  /**
   * Direct telephone link URL (e.g. 'tel:047771777')
   */
  readonly landlineHref = input<string>('tel:047771777');

  /**
   * Toll free label (e.g. 'Toll free:' or 'الرقم المجاني:')
   */
  readonly tollFreeLabel = input<string>('Toll free:');

  /**
   * Entity's toll free telephone number (e.g. '800 12')
   */
  readonly tollFreeNumber = input<string>('800 12');

  /**
   * Entity's toll free link URL (e.g. 'tel:80012')
   */
  readonly tollFreeHref = input<string>('tel:80012');
}

@Component({
  selector: 'ae-footer-top',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block w-full'
  },
  template: `
    <div class="footer-top sm:py-6 md:py-12">
      <div class="container mx-auto">
        <div class="footer-top-left sm:flex gap-3 xl:px-6 max-sm:px-4">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class FooterTopComponent {}

@Component({
  selector: 'ae-footer-copyright',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'w-full lg:w-7/12 block'
  },
  template: `
    <div class="text-aeblack-700 text-xs sm:text-sm mb-0">
      &copy; {{ currentYear() }}. {{ entityName() }}. {{ allRightsReservedText() }}
      @if (lastUpdated()) {
        <span class="text-aeblack-500"> {{ lastUpdatedPrefix() }} {{ lastUpdated() }}</span>
      }
    </div>
  `
})
export class FooterCopyrightComponent {
  /**
   * Entity name (e.g. 'Ministry of Finance', 'TDRA', etc.)
   */
  readonly entityName = input<string>('');

  /**
   * Year string or number. Defaults dynamically to the current year (new Date().getFullYear())
   */
  readonly year = input<number | string | undefined>(undefined);

  /**
   * Computed year value ensuring dynamic change every year per guideline
   */
  protected readonly currentYear = () => this.year() ?? new Date().getFullYear();

  /**
   * "All rights reserved." suffix text (customizable for multilingual / Arabic)
   */
  readonly allRightsReservedText = input<string>('All rights reserved.');

  /**
   * Optional last updated timestamp (e.g. '24/04/2026 at 15:45')
   */
  readonly lastUpdated = input<string | undefined>(undefined);

  /**
   * Prefix for last updated (e.g. 'Last updated on' or 'آخر تحديث في')
   */
  readonly lastUpdatedPrefix = input<string>('Last updated on');
}

@Component({
  selector: 'ae-footer-social',
  standalone: true,
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'w-full lg:w-5/12 social-sharing max-md:w-full flex items-center justify-center lg:justify-end gap-4'
  },
  template: `
    @if (label()) {
      <span class="text-sm text-aeblack-700 max-sm:hidden whitespace-nowrap">{{ label() }} </span>
    }
    <ul class="flex items-center gap-6">
      @for (social of links(); track social.platform) {
        <li>
          <a [href]="social.href || '#'" [attr.aria-label]="social.ariaLabel || social.platform" class="text-aeblack-700 hover:text-primary-600 transition-colors inline-flex items-center justify-center">
            <svg aeIcon [name]="social.icon || getPlatformIcon(social.platform)" [size]="24"></svg>
            <span class="sr-only">{{ social.ariaLabel || social.platform }}</span>
          </a>
        </li>
      }
    </ul>
  `
})
export class FooterSocialComponent {
  /**
   * Heading label next to social links (e.g. 'Follow us on:' or 'تابعنا على:')
   */
  readonly label = input<string | undefined>('Follow us on:');

  /**
   * Array of social media links with official brand platforms
   */
  readonly links = input<FooterSocialLink[]>([
    { platform: 'facebook', href: '#' },
    { platform: 'instagram', href: '#' },
    { platform: 'linkedin', href: '#' },
    { platform: 'twitter', href: '#' },
    { platform: 'youtube', href: '#' },
  ]);

  protected getPlatformIcon(platform: string): string {
    const p = platform.toLowerCase().trim();
    switch (p) {
      case 'facebook':
        return 'facebook-logo';
      case 'instagram':
        return 'instagram-logo';
      case 'linkedin':
        return 'linkedin-logo';
      case 'twitter':
        return 'twitter-logo';
      case 'x':
        return 'x-logo';
      case 'youtube':
        return 'youtube-logo';
      default:
        return p;
    }
  }
}

@Component({
  selector: 'ae-footer-bottom',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block w-full'
  },
  template: `
    <div class="footer-bottom py-6 md:py-12">
      <div class="container mx-auto">
        <div class="flex flex-wrap gap-y-6 items-center justify-between max-sm:px-4">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class FooterBottomComponent {}

@Component({
  selector: 'ae-footer',
  standalone: true,
  imports: [
    CommonModule,
    FooterTopComponent,
    FooterBottomComponent,
    FooterNavComponent,
    FooterContactComponent,
    FooterCopyrightComponent,
    FooterSocialComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block w-full'
  },
  template: `
    <footer class="aegov-footer">
      @if (hasDeclarativeProps()) {
        <ae-footer-top>
          <ae-footer-nav [categories]="categories()"></ae-footer-nav>
          <ae-footer-contact
            [tawasulLogoSrc]="tawasulLogoSrc()"
            [tawasulLogoAlt]="tawasulLogoAlt()"
            [tawasulHref]="tawasulHref()"
            [number171]="number171()"
            [number171Href]="number171Href()"
            [landlineNumber]="landlineNumber()"
            [landlineHref]="landlineHref()"
            [tollFreeLabel]="tollFreeLabel()"
            [tollFreeNumber]="tollFreeNumber()"
            [tollFreeHref]="tollFreeHref()"
          ></ae-footer-contact>
        </ae-footer-top>
        <ae-footer-bottom>
          <ae-footer-copyright
            [entityName]="entityName()"
            [year]="year()"
            [allRightsReservedText]="allRightsReservedText()"
            [lastUpdated]="lastUpdated()"
            [lastUpdatedPrefix]="lastUpdatedPrefix()"
          ></ae-footer-copyright>
          <ae-footer-social
            [label]="socialLabel()"
            [links]="socialLinks()"
          ></ae-footer-social>
        </ae-footer-bottom>
      } @else {
        <ng-content></ng-content>
      }
    </footer>
  `
})
export class FooterComponent {
  /**
   * Navigation categories (Top-Left section)
   */
  readonly categories = input<FooterCategory[]>([]);

  /**
   * Entity Name for Copyright (Bottom-Left section)
   */
  readonly entityName = input<string>('');

  /**
   * Optional manual year override. Defaults dynamically to current year (e.g. 2026)
   */
  readonly year = input<number | string | undefined>(undefined);

  /**
   * "All rights reserved." suffix text
   */
  readonly allRightsReservedText = input<string>('All rights reserved.');

  /**
   * Optional last updated timestamp (e.g. '24/04/2026 at 15:45')
   */
  readonly lastUpdated = input<string | undefined>(undefined);

  /**
   * Prefix text for last updated
   */
  readonly lastUpdatedPrefix = input<string>('Last updated on');

  /**
   * Tawasul logo image path or data URI (defaults to embedded official Tawasul PNG)
   */
  readonly tawasulLogoSrc = input<string>(DEFAULT_TAWASUL_LOGO);

  /**
   * Tawasul logo alternative text
   */
  readonly tawasulLogoAlt = input<string>('tawasul');

  /**
   * Tawasul portal link URL
   */
  readonly tawasulHref = input<string>('');

  /**
   * 171 short code display label
   */
  readonly number171 = input<string>('171');

  /**
   * 171 phone link URL
   */
  readonly number171Href = input<string>('tel:171');

  /**
   * 04-7771777 direct telephone number
   */
  readonly landlineNumber = input<string>('04-7771777');

  /**
   * Direct telephone link URL
   */
  readonly landlineHref = input<string>('tel:047771777');

  /**
   * Toll free label
   */
  readonly tollFreeLabel = input<string>('Toll free:');

  /**
   * Entity's toll free telephone number (e.g. '800 12')
   */
  readonly tollFreeNumber = input<string>('800 12');

  /**
   * Entity's toll free link URL
   */
  readonly tollFreeHref = input<string>('tel:80012');

  /**
   * Social sharing label
   */
  readonly socialLabel = input<string | undefined>('Follow us on:');

  /**
   * Social media links array
   */
  readonly socialLinks = input<FooterSocialLink[]>([
    { platform: 'facebook', href: '#' },
    { platform: 'instagram', href: '#' },
    { platform: 'linkedin', href: '#' },
    { platform: 'twitter', href: '#' },
    { platform: 'youtube', href: '#' },
  ]);

  protected hasDeclarativeProps(): boolean {
    return this.categories().length > 0;
  }
}

