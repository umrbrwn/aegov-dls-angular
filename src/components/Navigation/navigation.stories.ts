import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { signal } from '@angular/core';
import {
  NavigationComponent,
  NavBrandDirective,
  NavPrimaryActionsDirective,
  NavSecondaryActionsDirective,
  NavDrawerContentDirective,
} from './navigation.component';
import { IconDirective } from '../Icon/icon.directive';
import { ButtonDirective } from '../Button/button.directive';
import { InputDirective } from '../Input/input.directive';
import { TooltipDirective } from '../Tooltip/tooltip.directive';
import { DropdownDirective, type DropdownItem } from '../Dropdown/dropdown.directive';
import type { NavItemData } from './navigation.component';

const sampleNavItems: NavItemData[] = [
  {
    label: 'Home',
    url: '/home',
    icon: 'house',
  },
  {
    label: 'Services',
    url: '/services',
    dropdownVariant: 'mega',
    dropdownColumns: 4,
    dropdown: [
      {
        title: 'Service category',
        items: [
          { label: 'Service item number #1', url: '/services/1' },
          { label: 'Service item number #2', url: '/services/2' },
          { label: 'Service item number #3', url: '/services/3' },
          { label: 'Service item number #4', url: '/services/4' },
          { label: 'View all 40 services', url: '/services' },
        ],
      },
      {
        title: 'Service category',
        items: [
          { label: 'Service item number #1', url: '/services/category/1' },
          { label: 'Service item number #2', url: '/services/category/2' },
          { label: 'Service item number #3', url: '/services/category/3' },
          { label: 'View all 40 services', url: '/services' },
        ],
      },
      {
        title: 'Service category',
        items: [
          { label: 'Service item number #1', url: '/services/sub/1' },
          { label: 'Service item number #2', url: '/services/sub/2' },
          { label: 'Service item number #3', url: '/services/sub/3' },
          { label: 'View all 20 services', url: '/services' },
        ],
      },
      {
        title: 'Service category',
        items: [
          { label: 'Service item number #1', url: '/services/group/1' },
          { label: 'Service item number #2', url: '/services/group/2' },
          { label: 'Service item number #3', url: '/services/group/3' },
          { label: 'View all 10 services', url: '/services' },
        ],
      },
    ],
  },
  {
    label: 'A custom link',
    url: 'https://example.com',
    navigation: 'href',
    target: '_blank',
  },
  {
    label: 'Digital participation',
    url: '/participation',
    dropdownVariant: 'multi-column',
    dropdownColumns: 3,
    dropdown: [
      {
        title: 'Participate',
        items: [
          { label: 'Events', url: '/events' },
          { label: 'Social media channels', url: '/social' },
          { label: 'Survey and polls', url: '/survey' },
        ],
      },
      {
        title: 'Media',
        items: [
          { label: 'News and press releases', url: '/news' },
          { label: 'Video archives', url: '/videos' },
          { label: 'Media gallery', url: '/gallery' },
          { label: 'Insights and blogs', url: '/blogs' },
          { label: 'Publications', url: '/pubs' },
        ],
      },
      {
        title: 'Policies',
        items: [
          { label: 'Digital participation policy', url: '/policy' },
          { label: 'Social media content policy', url: '/content' },
          { label: 'National relationship management', url: '/nrm' },
        ],
      },
    ],
  },
  {
    label: 'Open data',
    url: '/opendata',
  },
  {
    label: 'About',
    url: '/about',
    dropdown: [
      {
        items: [
          { label: 'About the Ministry', url: '/about/ministry' },
          { label: 'The Minister', url: '/about/minister' },
          { label: 'Minister of State for Financial Affairs', url: '/about/minister-state' },
          { label: 'Organization chart', url: '/about/chart' },
          { label: 'Strategy', url: '/about/strategy' },
          { label: 'Awards', url: '/about/awards' },
          { label: 'Contact', url: '/about/contact' },
        ],
      },
    ],
  },
  {
    label: 'More',
    url: '/more',
    dropdown: [
      {
        items: [
          { label: 'Publications', url: '/publications' },
          { label: 'Press contact and media kit', url: '/media-kit' },
          { label: 'Federal debt management office', url: '/debt-management' },
          { label: 'Digital procurement', url: '/procurement' },
        ],
      },
    ],
  },
];

const sampleUserMenuItems: DropdownItem[] = [
  { label: 'Profile Settings', icon: 'user', href: '#profile' },
  { label: 'My Applications', icon: 'file-text', href: '#applications', badge: '3' },
  { label: 'Help & Support', icon: 'info', href: '#help' },
  { label: 'Sign Out', icon: 'sign-out', href: '#logout' },
];

const meta: Meta<NavigationComponent> = {
  title: 'Components/Navigation',
  component: NavigationComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        NavigationComponent,
        NavBrandDirective,
        NavPrimaryActionsDirective,
        NavSecondaryActionsDirective,
        NavDrawerContentDirective,
        IconDirective,
        ButtonDirective,
        InputDirective,
        TooltipDirective,
        DropdownDirective,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: sampleNavItems,
  },
};

export default meta;
type Story = StoryObj<NavigationComponent>;

/**
 * Standalone Navigation Bar (without top header bar slots)
 */
export const StandaloneNavBar: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <ae-navigation [items]="items">
        <ng-template aeNavSecondaryActions>
          <ul class="flex max-sm:flex-col">
            <li>
              <a
                href="#login"
                aeTooltip="Login"
                tooltipPlacement="bottom"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="user" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span class="md:sr-only">Login</span>
              </a>
            </li>
            <li>
              <a
                href="#accessibility"
                aeTooltip="Accessibility"
                tooltipPlacement="bottom"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="person-arms-spread" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span class="md:sr-only">Accessibility</span>
              </a>
            </li>
            <li>
              <a
                href="#language"
                aeTooltip="Switch language"
                tooltipPlacement="bottom"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="globe" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span class="md:sr-only">Switch Language</span>
              </a>
            </li>
          </ul>
        </ng-template>
      </ae-navigation>
    `,
  }),
};

/**
 * Ministry Header with primary logo, GSR gold star rating, search input form,
 * mobile search toggle & drawer, integrated into a single unified ae-navigation component.
 */
export const MinistryHeader: Story = {
  render: (args) => {
    const isSearchOpen = signal(false);
    return {
      props: {
        ...args,
        items: sampleNavItems,
        isSearchOpen,
        toggleSearch: () => isSearchOpen.update((open) => !open),
      },
      template: `
        <ae-navigation [items]="items">
          <!-- Brand Logos Slot -->
          <ng-template aeNavBrand>
            <div class="logo-item">
              <a href="#" class="logo block">
                <img
                  src="https://designsystem.gov.ae/img/logo-ministry.svg"
                  alt="logo"
                />
                <span class="sr-only">Logo</span>
              </a>
            </div>
            <div class="logo-item">
              <a href="#" class="block">
                <img
                  src="https://designsystem.gov.ae/img/global-star.png"
                  alt="logo"
                  class="secondary-logo"
                />
                <span class="sr-only">Gold star Logo</span>
              </a>
            </div>
          </ng-template>

          <!-- Desktop Header Top Right Search Slot -->
          <ng-template aeNavPrimaryActions="desktop">
            <form action="#" method="post" (submit)="$event.preventDefault()">
              <div class="aegov-form-control w-64 xl:w-80">
                <div class="form-control-input">
                  <input
                    aeInput
                    type="search"
                    aria-label="search in site"
                    name="searchelem"
                    id="searchelem"
                    placeholder="search for something"
                  />
                  <button type="submit" class="control-suffix">
                    <svg aeIcon name="magnifying-glass" [size]="24"></svg>
                    <span class="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </ng-template>

          <!-- Main Navbar Right Actions Slot: Login, Accessibility, Language -->
          <ng-template aeNavSecondaryActions>
            <ul class="flex max-sm:flex-col">
              <li>
                <a
                  href="#login"
                  aeTooltip="Login"
                  tooltipPlacement="bottom"
                  class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                >
                  <svg aeIcon name="user" [size]="24" class="max-sm:me-2 fill-current"></svg>
                  <span class="md:sr-only">Login</span>
                </a>
              </li>
              <li>
                <a
                  href="#accessibility"
                  aeTooltip="Accessibility"
                  tooltipPlacement="bottom"
                  class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                >
                  <svg aeIcon name="person-arms-spread" [size]="24" class="max-sm:me-2 fill-current"></svg>
                  <span class="md:sr-only">Accessibility</span>
                </a>
              </li>
              <li>
                <a
                  href="#language"
                  aeTooltip="Switch language"
                  tooltipPlacement="bottom"
                  class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                >
                  <svg aeIcon name="globe" [size]="24" class="max-sm:me-2 fill-current"></svg>
                  <span class="md:sr-only">Switch Language</span>
                </a>
              </li>
            </ul>
          </ng-template>

          <!-- Mobile Drawer Actions: Search Toggle Button -->
          <ng-template aeNavPrimaryActions="drawer">
            <button
              aeButton
              variant="soft"
              [isIcon]="true"
              size="xs"
              aria-label="search in site"
              (click)="toggleSearch()"
            >
              <svg aeIcon name="magnifying-glass" [size]="16"></svg>
            </button>
          </ng-template>

          <!-- Mobile Drawer Content: Search Form -->
          <ng-template aeNavDrawerContent>
            @if (isSearchOpen()) {
              <form action="#" method="post" (submit)="$event.preventDefault()">
                <div class="aegov-form-control control-sm w-full mb-4">
                  <div class="form-control-input">
                    <input
                      aeInput
                      type="search"
                      aria-label="search in site"
                      name="searchelemMobile"
                      id="searchelemMobile"
                      placeholder="search for something"
                    />
                    <button type="submit" class="control-suffix">
                      <svg aeIcon name="magnifying-glass" [size]="20"></svg>
                      <span class="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </form>
            }
          </ng-template>
        </ae-navigation>
      `,
    };
  },
};

/**
 * Authority Header (TDRA / Government Entities) demonstrating the custom entity theming
 * with custom authority blue primary color tokens and right action icons.
 */
export const AuthorityHeader: Story = {
  render: (args) => {
    const isSearchOpen = signal(false);
    return {
      props: {
        ...args,
        items: sampleNavItems,
        isSearchOpen,
        toggleSearch: () => isSearchOpen.update((open) => !open),
      },
      template: `
        <div class="authority-theme w-full">
          <style>
            .authority-theme {
              --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
              --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
              --spacing: 0.25rem;
              --breakpoint-2xl: 96rem;
              --container-sm: 24rem;
              --text-xs: 0.75rem;
              --text-xs--line-height: calc(1 / 0.75);
              --text-sm: 0.875rem;
              --text-sm--line-height: calc(1.25 / 0.875);
              --text-base: 1rem;
              --text-base--line-height: calc(1.5 / 1);
              --text-lg: 1.125rem;
              --text-lg--line-height: calc(1.75 / 1.125);
              --text-xl: 1.25rem;
              --text-xl--line-height: calc(1.75 / 1.25);
              --text-2xl: 1.5rem;
              --text-2xl--line-height: calc(2 / 1.5);
              --text-3xl: 1.875rem;
              --text-3xl--line-height: calc(2.25 / 1.875);
              --font-weight-light: 300;
              --font-weight-normal: 400;
              --font-weight-medium: 500;
              --font-weight-semibold: 600;
              --font-weight-bold: 700;
              --font-weight-extrabold: 800;
              --leading-relaxed: 1.625;
              --radius-md: 0.375rem;
              --radius-lg: 0.5rem;
              --radius-xl: 0.75rem;
              --radius-2xl: 1rem;
              --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
              --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
              --ease-out: cubic-bezier(0, 0, 0.2, 1);
              --default-transition-duration: 150ms;
              --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              --default-font-family: var(--font-sans);
              --default-mono-font-family: var(--font-mono);
              --color-primary-50: #EFF3F6;
              --color-primary-100: #DBE4EC;
              --color-primary-200: #B3C5D6;
              --color-primary-300: #8CA7C1;
              --color-primary-400: #6489AC;
              --color-primary-500: #496A89;
              --color-primary-600: #344B61;
              --color-primary-700: #28394A;
              --color-primary-800: #1B2733;
              --color-primary-900: #0F151B;
            }
          </style>

          <ae-navigation [items]="items">
            <!-- Brand Logos Slot for Authorities (TDRA + Gold Star Rating) -->
            <ng-template aeNavBrand>
              <div class="logo-item">
                <a href="#" class="logo block">
                  <img
                    src="https://designsystem.gov.ae/img/logo-tdra.svg"
                    alt="TDRA Logo"
                    class="h-auto! lg:w-72! xl:w-80!"
                  />
                  <span class="sr-only">TDRA Logo</span>
                </a>
              </div>
              <div class="logo-item">
                <a href="#" class="block">
                  <img
                    src="https://designsystem.gov.ae/img/global-star.png"
                    alt="Gold star rating"
                    class="secondary-logo"
                  />
                  <span class="sr-only">Gold star Logo</span>
                </a>
              </div>
            </ng-template>

            <!-- Desktop Header Top Right: UAE Emblem -->
            <ng-template aeNavPrimaryActions="desktop">
              <a href="#" class="inline-block">
                <img
                  src="https://designsystem.gov.ae/img/emblem.png"
                  alt="UAE Emblem"
                  class="emblem-logo"
                />
              </a>
            </ng-template>

            <!-- Main Navbar Right Actions Slot -->
            <ng-template aeNavSecondaryActions>
              <ul class="flex max-sm:flex-col">
                <li>
                  <a
                    href="#login"
                    aeTooltip="Login"
                    tooltipPlacement="bottom"
                    class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                  >
                    <svg aeIcon name="user" [size]="24" class="max-sm:me-2 fill-current"></svg>
                    <span class="md:sr-only">Login</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#accessibility"
                    aeTooltip="Accessibility"
                    tooltipPlacement="bottom"
                    class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                  >
                    <svg aeIcon name="person-arms-spread" [size]="24" class="max-sm:me-2 fill-current"></svg>
                    <span class="md:sr-only">Accessibility</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#language"
                    aeTooltip="Switch language"
                    tooltipPlacement="bottom"
                    class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                  >
                    <svg aeIcon name="globe" [size]="24" class="max-sm:me-2 fill-current"></svg>
                    <span class="md:sr-only">Switch Language</span>
                  </a>
                </li>
              </ul>
            </ng-template>

            <!-- Mobile Drawer Actions: Search Toggle -->
            <ng-template aeNavPrimaryActions="drawer">
              <button
                aeButton
                variant="soft"
                [isIcon]="true"
                size="xs"
                aria-label="search in site"
                (click)="toggleSearch()"
              >
                <svg aeIcon name="magnifying-glass" [size]="16"></svg>
              </button>
            </ng-template>

            <!-- Mobile Drawer Content -->
            <ng-template aeNavDrawerContent>
              @if (isSearchOpen()) {
                <form action="#" method="post" (submit)="$event.preventDefault()">
                  <div class="aegov-form-control control-sm w-full mb-4">
                    <div class="form-control-input">
                      <input
                        aeInput
                        type="search"
                        aria-label="search in site"
                        name="searchelemMobile"
                        id="searchelemMobile"
                        placeholder="search for something"
                      />
                      <button type="submit" class="control-suffix">
                        <svg aeIcon name="magnifying-glass" [size]="20"></svg>
                        <span class="sr-only">Search</span>
                      </button>
                    </div>
                  </div>
                </form>
              }
            </ng-template>
          </ae-navigation>
        </div>
      `,
    };
  },
};

/**
 * Custom Dropdown Action demonstration on hover in Navigation Bar
 */
export const WithCustomDropdownAction: Story = {
  render: (args) => ({
    props: {
      ...args,
      userMenuItems: sampleUserMenuItems,
    },
    template: `
      <ae-navigation [items]="items">
        <!-- Desktop Navbar Right Actions with Custom User Profile Dropdown on Hover -->
        <ng-template aeNavSecondaryActions="desktop">
          <ul class="flex items-center">
            <li class="flex items-center">
              <a
                aeDropdown
                [items]="userMenuItems"
                dropdownPlacement="bottom"
                dropdownTrigger="hover"
                href="#user"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <svg aeIcon name="user" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span class="sr-only">User Account</span>
              </a>
            </li>
            <li>
              <a
                href="#accessibility"
                aeTooltip="Accessibility"
                tooltipPlacement="bottom"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="person-arms-spread" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span class="sr-only">Accessibility</span>
              </a>
            </li>
            <li>
              <a
                href="#language"
                aeTooltip="Switch language"
                tooltipPlacement="bottom"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="globe" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span class="sr-only">Switch Language</span>
              </a>
            </li>
          </ul>
        </ng-template>

        <!-- Mobile Drawer Secondary Actions: User Profile Card & Menu List -->
        <ng-template aeNavSecondaryActions="mobile">
          <ul class="flex flex-col">
            <li>
              <a
                href="#"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="user" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span>Hazza Al Mansoori (hazza&#64;gov.ae)</span>
              </a>
              <div class="space-y-3 mb-4 border-b border-secondary-100">
                <div class="space-y-1">
                  @for (item of userMenuItems; track item.label) {
                    <a
                      [href]="item.href || '#'"
                      class="flex items-center gap-3 py-2 px-2 text-sm text-secondary-800 hover:text-primary-800 rounded-md"
                    >
                      @if (item.icon) {
                        <svg aeIcon [name]="item.icon" [size]="18" class="fill-current"></svg>
                      }
                      <span>{{ item.label }}</span>
                    </a>
                  }
                </div>
              </div>
            </li>
            <li>
              <a
                href="#accessibility"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="person-arms-spread" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span>Accessibility</span>
              </a>
            </li>
            <li>
              <a
                href="#language"
                class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
              >
                <svg aeIcon name="globe" [size]="24" class="max-sm:me-2 fill-current"></svg>
                <span>Switch Language</span>
              </a>
            </li>
          </ul>
        </ng-template>
      </ae-navigation>
    `,
  }),
};

/**
 * Interactive Entity Theme Switcher demonstrating real-time dynamic switching
 * between Ministry (UAE Gold) and Authority (Custom Steel / Tech Blue) palettes.
 */
export const DynamicEntityThemeSwitcher: Story = {
  render: (args) => {
    const activeEntity = signal<'ministry' | 'authority'>('authority');
    return {
      props: {
        ...args,
        items: sampleNavItems,
        activeEntity,
        setEntity: (entity: 'ministry' | 'authority') => activeEntity.set(entity),
      },
      template: `
        <div [class.authority-theme]="activeEntity() === 'authority'" class="w-full transition-colors duration-300">
          <style>
            .authority-theme {
              --color-primary-50: #EFF3F6;
              --color-primary-100: #DBE4EC;
              --color-primary-200: #B3C5D6;
              --color-primary-300: #8CA7C1;
              --color-primary-400: #6489AC;
              --color-primary-500: #496A89;
              --color-primary-600: #344B61;
              --color-primary-700: #28394A;
              --color-primary-800: #1B2733;
              --color-primary-900: #0F151B;
            }
          </style>

          <!-- Theme Switcher Floating Toolbar -->
          <div class="bg-whitely-100 border-b border-aeblack-100 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-aeblack-900">Current Theme:</span>
              <span class="px-2 py-0.5 rounded font-mono text-xs bg-primary-100 text-primary-800 uppercase font-bold">
                {{ activeEntity() }}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-aeblack-600">Switch Theme:</span>
              <div class="flex items-center gap-1.5">
                <button
                  aeButton
                  size="xs"
                  [variant]="activeEntity() === 'ministry' ? 'solid' : 'outline'"
                  (click)="setEntity('ministry')"
                >
                  Ministry (Gold)
                </button>
                <button
                  aeButton
                  size="xs"
                  [variant]="activeEntity() === 'authority' ? 'solid' : 'outline'"
                  (click)="setEntity('authority')"
                >
                  Authority (Blue)
                </button>
              </div>
            </div>
          </div>

          <!-- Themed Header Component -->
          <ae-navigation [items]="items">
            <ng-template aeNavBrand>
              <div class="logo-item">
                <a href="#" class="logo block">
                  @if (activeEntity() === 'authority') {
                    <img
                      src="https://designsystem.gov.ae/img/logo-tdra.svg"
                      alt="TDRA Logo"
                      class="h-auto! lg:w-72! xl:w-80!"
                    />
                  } @else {
                    <img
                      src="https://designsystem.gov.ae/img/logo-ministry.svg"
                      alt="Ministry Logo"
                    />
                  }
                  <span class="sr-only">Entity Logo</span>
                </a>
              </div>
              <div class="logo-item">
                <a href="#" class="block">
                  <img
                    src="https://designsystem.gov.ae/img/global-star.png"
                    alt="Gold star rating"
                    class="secondary-logo"
                  />
                  <span class="sr-only">Gold star Logo</span>
                </a>
              </div>
            </ng-template>

            <ng-template aeNavPrimaryActions="desktop">
              <a href="#" class="inline-block">
                <img
                  src="https://designsystem.gov.ae/img/emblem.png"
                  alt="UAE Emblem"
                  class="emblem-logo"
                />
              </a>
            </ng-template>

            <ng-template aeNavSecondaryActions>
              <ul class="flex max-sm:flex-col">
                <li>
                  <a
                    href="#login"
                    aeTooltip="Login"
                    tooltipPlacement="bottom"
                    class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                  >
                    <svg aeIcon name="user" [size]="24" class="max-sm:me-2 fill-current"></svg>
                    <span class="md:sr-only">Login</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#accessibility"
                    aeTooltip="Accessibility"
                    tooltipPlacement="bottom"
                    class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                  >
                    <svg aeIcon name="person-arms-spread" [size]="24" class="max-sm:me-2 fill-current"></svg>
                    <span class="md:sr-only">Accessibility</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#language"
                    aeTooltip="Switch language"
                    tooltipPlacement="bottom"
                    class="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center gap-3"
                  >
                    <svg aeIcon name="globe" [size]="24" class="max-sm:me-2 fill-current"></svg>
                    <span class="md:sr-only">Switch Language</span>
                  </a>
                </li>
              </ul>
            </ng-template>
          </ae-navigation>
        </div>
      `,
    };
  },
};
