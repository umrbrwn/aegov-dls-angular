import { type Meta, type StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRouter } from '@angular/router';
import {
  NavigationComponent,
  MainMenuComponent,
  SecondaryMenuComponent,
  NavItemComponent,
  type NavItemData,
  type NavDropdownGroup
} from './navigation.component';
import { IconComponent } from '../Icon/icon.component';
import { ButtonComponent } from '../Button/button.component';
import { AvatarComponent } from '../Avatar/avatar.component';

const ministryServiceMegaMenu: NavDropdownGroup[] = [
  {
    title: 'Service category #1',
    items: [
      { label: 'Service item number #1', href: '#' },
      { label: 'Service item number #2', href: '#' },
      { label: 'Service item number #3', href: '#' },
      { label: 'Service item number #4', href: '#' },
      { label: 'View all services', href: '#' }
    ]
  },
  {
    title: 'Service category #2',
    items: [
      { label: 'Service item number #1', href: '#' },
      { label: 'Service item number #2', href: '#' },
      { label: 'Service item number #3', href: '#' },
      { label: 'Service item number #4', href: '#' },
      { label: 'View all services', href: '#' }
    ]
  },
  {
    title: 'Service category #3',
    items: [
      { label: 'Service item number #1', href: '#' },
      { label: 'Service item number #2', href: '#' },
      { label: 'Service item number #3', href: '#' },
      { label: 'Service item number #4', href: '#' },
      { label: 'View all services', href: '#' }
    ]
  }
];

const mediaCenterDropdown: NavDropdownGroup[] = [
  {
    title: 'Media & News',
    items: [
      { label: 'Press Releases', href: '#' },
      { label: 'Latest News & Stories', href: '#' },
      { label: 'Photo & Video Gallery', href: '#' },
      { label: 'Media Kit & Guidelines', href: '#' }
    ]
  }
];

const digitalParticipationDropdown: NavDropdownGroup[] = [
  {
    title: 'Community Engagement',
    items: [
      { label: 'Public Consultations', href: '#' },
      { label: 'Ideation & Suggestions', href: '#' },
      { label: 'Digital Polls & Surveys', href: '#' },
      { label: 'Social Media Channels', href: '#' }
    ]
  }
];

const ministryAboutDropdown: NavDropdownGroup[] = [
  {
    title: 'About the Ministry',
    items: [
      { label: 'About the Ministry', href: '#' },
      { label: 'The Minister', href: '#' },
      { label: 'Minister of State for Financial Affairs', href: '#' },
      { label: 'Organization Chart', href: '#' },
      { label: 'Strategic Objectives', href: '#' },
      { label: 'Federal Decrees & Laws', href: '#' }
    ]
  }
];

const authorityAboutDropdown: NavDropdownGroup[] = [
  {
    title: 'About the Authority',
    items: [
      { label: 'About', href: '#' },
      { label: 'Organization chart', href: '#' },
      { label: 'Strategy', href: '#' },
      { label: 'Awards & Honors', href: '#' }
    ]
  }
];

export const ministryNavItems: NavItemData[] = [
  {
    label: 'Home',
    icon: 'house',
    routerLink: '/',
    routerLinkActiveOptions: { exact: true }
  },
  {
    label: 'Services',
    dropdown: ministryServiceMegaMenu
  },
  {
    label: 'Media Center',
    dropdown: mediaCenterDropdown
  },
  {
    label: 'A Custom Link',
    href: '#'
  },
  {
    label: 'Digital Participation',
    dropdown: digitalParticipationDropdown
  },
  {
    label: 'Open Data',
    href: 'https://data.gov.ae',
    target: '_blank'
  },
  {
    label: 'About Us',
    dropdown: ministryAboutDropdown
  }
];

export const authorityNavItems: NavItemData[] = [
  {
    label: 'Home',
    icon: 'house',
    routerLink: '/',
    routerLinkActiveOptions: { exact: true }
  },
  {
    label: 'Services',
    dropdown: ministryServiceMegaMenu
  },
  {
    label: 'Media Center',
    dropdown: mediaCenterDropdown
  },
  {
    label: 'A Custom Link',
    href: '#'
  },
  {
    label: 'Digital Participation',
    dropdown: digitalParticipationDropdown
  },
  {
    label: 'Open Data',
    href: 'https://data.gov.ae',
    target: '_blank'
  },
  {
    label: 'About',
    dropdown: authorityAboutDropdown
  }
];

const meta: Meta<NavigationComponent> = {
  title: 'Components/Navigation',
  component: NavigationComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([])
      ]
    }),
    moduleMetadata({
      imports: [
        CommonModule,
        RouterModule,
        NavigationComponent,
        MainMenuComponent,
        SecondaryMenuComponent,
        NavItemComponent,
        IconComponent,
        ButtonComponent,
        AvatarComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    breakpoint: {
      control: 'select',
      options: ['1100px', 'lg', 'md', 'xl'],
      description: 'Controls the viewport width at which desktop navigation collapses into the mobile header & drawer.'
    },
    drawerTitle: {
      control: 'text',
      description: 'Default title displayed in the mobile drawer header.'
    },
    containerClass: {
      control: 'text',
      description: 'Tailwind CSS classes for the horizontal desktop container.'
    },
    drawerToggleLabel: {
      control: 'text',
      description: 'Accessibility aria-label for the mobile hamburger toggle button.'
    },
    drawerCloseLabel: {
      control: 'text',
      description: 'Accessibility aria-label for the mobile drawer close button.'
    },
    items: {
      control: 'object',
      description: 'Single-source array of NavItemData objects rendered automatically across desktop and mobile.'
    }
  },
  args: {
    breakpoint: 'xl',
    drawerTitle: 'UAE Government Menu',
    containerClass: 'container mx-auto px-4 sm:px-6 lg:px-8',
    drawerToggleLabel: 'Toggle main menu',
    drawerCloseLabel: 'Close menu',
    items: ministryNavItems
  }
};

export default meta;
type Story = StoryObj<NavigationComponent>;

/**
 * Official Ministry Header Template (based on ministry-sample.html).
 */
export const Ministry: Story = {
  args: {
    drawerTitle: 'Ministry of Finance',
    items: ministryNavItems,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-navigation
        [items]="items"
        [breakpoint]="breakpoint"
        [drawerTitle]="drawerTitle"
        [containerClass]="containerClass"
        [drawerToggleLabel]="drawerToggleLabel"
        [drawerCloseLabel]="drawerCloseLabel"
      >
        <!-- Desktop Top Bar: Logos & Search -->
        <div slot="top-bar" class="py-3 border-b border-aeblack-100 bg-white">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <a href="#" class="block">
                <img src="https://designsystem.gov.ae/img/logo-ministry.svg" alt="Ministry Logo" class="h-10 lg:h-12 w-auto object-contain">
              </a>
              <a href="#" class="block">
                <img src="https://designsystem.gov.ae/img/global-star.png" alt="Gold Star Rating" class="h-8 lg:h-10 w-auto object-contain">
              </a>
            </div>
            <div class="flex items-center">
              <div class="relative w-64 xl:w-80">
                <input
                  type="search"
                  placeholder="Search in site..."
                  aria-label="Search site"
                  class="w-full h-10 ps-3.5 pe-10 text-sm border border-aeblack-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-aeblack-600 hover:text-primary-700 bg-transparent border-0 cursor-pointer"
                  title="Search"
                >
                  <ae-icon name="magnifying-glass" [size]="18"></ae-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Header Brand Logo -->
        <div slot="logo" class="flex items-center gap-2">
          <img src="https://designsystem.gov.ae/img/logo-ministry.svg" alt="Ministry Logo" class="h-8 w-auto">
          <img src="https://designsystem.gov.ae/img/global-star.png" alt="Star Rating" class="h-6 w-auto">
        </div>

        <!-- Persistent Mobile Actions -->
        <div slot="mobile-actions">
          <button class="p-1.5 text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer" title="Search">
            <ae-icon name="magnifying-glass" [size]="20"></ae-icon>
          </button>
        </div>

        <!-- Secondary Actions (Right) -->
        <ae-secondary-menu secondary-menu>
          <li class="inline-flex items-center">
            <button class="h-12 px-2.5 flex items-center justify-center text-aeblack-700 hover:text-primary-700 cursor-pointer bg-transparent border-0" title="User Login">
              <ae-icon name="user" [size]="20"></ae-icon>
            </button>
          </li>
          <li class="inline-flex items-center">
            <button class="h-12 px-2.5 flex items-center justify-center text-aeblack-700 hover:text-primary-700 cursor-pointer bg-transparent border-0" title="Accessibility">
              <ae-icon name="person-arms-spread" [size]="20"></ae-icon>
            </button>
          </li>
          <li class="inline-flex items-center">
            <button class="h-12 px-2.5 flex items-center justify-center text-aeblack-700 hover:text-primary-700 cursor-pointer bg-transparent border-0" title="Switch Language">
              <ae-icon name="globe" [size]="20"></ae-icon>
            </button>
          </li>
        </ae-secondary-menu>

        <!-- Mobile Drawer Custom Footer -->
        <div slot="drawer-footer" class="flex flex-col gap-3">
          <div class="flex items-center justify-between pb-3 border-b border-aeblack-100">
            <button class="inline-flex items-center gap-2 text-xs font-semibold text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
              <ae-icon name="globe" [size]="16"></ae-icon>
              <span>عربي (Arabic)</span>
            </button>
            <button class="inline-flex items-center gap-2 text-xs font-semibold text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
              <ae-icon name="person-arms-spread" [size]="16"></ae-icon>
              <span>Accessibility</span>
            </button>
          </div>
          <div class="flex items-center">
            <button class="inline-flex items-center gap-2 text-xs font-semibold text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
              <ae-icon name="user" [size]="16"></ae-icon>
              <span>Sign In / UAE PASS</span>
            </button>
          </div>
        </div>
      </ae-navigation>

      <main class="container mx-auto px-4 py-8">
        <div class="p-8 bg-white border border-gray-200 rounded-xl shadow-xs space-y-3">
          <h1 class="text-2xl font-bold text-aeblack-900">Ministry Header Specification</h1>
          <p class="text-sm text-aeblack-600 max-w-2xl">
            This story models the official Ministry layout with top-bar search and multi-category service mega dropdown.
            Change the <code>items</code> or <code>breakpoint</code> controls to test responsiveness and different navigation trees.
          </p>
        </div>
      </main>
    `,
  }),
};

/**
 * Official Federal Authority Header Template (based on authority-sample.html).
 */
export const Authority: Story = {
  args: {
    drawerTitle: 'TDRA UAE',
    items: authorityNavItems,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-navigation
        [items]="items"
        [breakpoint]="breakpoint"
        [drawerTitle]="drawerTitle"
        [containerClass]="containerClass"
        [drawerToggleLabel]="drawerToggleLabel"
        [drawerCloseLabel]="drawerCloseLabel"
      >
        <!-- Desktop Top Bar: TDRA Logo & UAE Emblem -->
        <div slot="top-bar" class="py-3.5 border-b border-aeblack-100 bg-white">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <a href="#" class="block">
                <img src="https://designsystem.gov.ae/img/logo-tdra.svg" alt="TDRA Logo" class="h-10 lg:h-12 w-auto object-contain">
              </a>
              <a href="#" class="block">
                <img src="https://designsystem.gov.ae/img/global-star.png" alt="Gold Star Rating" class="h-8 lg:h-10 w-auto object-contain">
              </a>
            </div>
            <div class="flex items-center">
              <a href="#" class="block">
                <img src="https://designsystem.gov.ae/img/emblem.png" alt="UAE Emblem" class="h-12 lg:h-14 w-auto object-contain">
              </a>
            </div>
          </div>
        </div>

        <!-- Mobile Header Brand Logo -->
        <div slot="logo" class="flex items-center gap-2">
          <img src="https://designsystem.gov.ae/img/logo-tdra.svg" alt="TDRA Logo" class="h-8 w-auto">
          <img src="https://designsystem.gov.ae/img/global-star.png" alt="Star Rating" class="h-6 w-auto">
        </div>

        <!-- Persistent Mobile Actions -->
        <div slot="mobile-actions">
          <button class="p-1.5 text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer" title="Search">
            <ae-icon name="magnifying-glass" [size]="20"></ae-icon>
          </button>
        </div>

        <!-- Secondary Actions with Search Trigger Button -->
        <ae-secondary-menu secondary-menu>
          <li class="inline-flex items-center">
            <button class="h-12 px-2.5 flex items-center justify-center text-aeblack-700 hover:text-primary-700 cursor-pointer bg-transparent border-0" title="Search">
              <ae-icon name="magnifying-glass" [size]="20"></ae-icon>
            </button>
          </li>
          <li class="inline-flex items-center">
            <button class="h-12 px-2.5 flex items-center justify-center text-aeblack-700 hover:text-primary-700 cursor-pointer bg-transparent border-0" title="User Login">
              <ae-icon name="user" [size]="20"></ae-icon>
            </button>
          </li>
          <li class="inline-flex items-center">
            <button class="h-12 px-2.5 flex items-center justify-center text-aeblack-700 hover:text-primary-700 cursor-pointer bg-transparent border-0" title="Accessibility">
              <ae-icon name="person-arms-spread" [size]="20"></ae-icon>
            </button>
          </li>
          <li class="inline-flex items-center">
            <button class="h-12 px-2.5 flex items-center justify-center text-aeblack-700 hover:text-primary-700 cursor-pointer bg-transparent border-0" title="Switch Language">
              <ae-icon name="globe" [size]="20"></ae-icon>
            </button>
          </li>
        </ae-secondary-menu>

        <!-- Custom Mobile Drawer Header with Emblem -->
        <div slot="drawer-header" class="flex items-center gap-3">
          <img src="https://designsystem.gov.ae/img/emblem.png" alt="UAE Emblem" class="h-8 w-auto">
          <span class="font-bold text-aeblack-900 text-sm">TDRA UAE</span>
        </div>

        <!-- Mobile Drawer Custom Footer -->
        <div slot="drawer-footer" class="flex flex-col gap-3">
          <div class="flex items-center justify-between pb-3 border-b border-aeblack-100">
            <button class="inline-flex items-center gap-2 text-xs font-semibold text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
              <ae-icon name="globe" [size]="16"></ae-icon>
              <span>عربي (Arabic)</span>
            </button>
            <button class="inline-flex items-center gap-2 text-xs font-semibold text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
              <ae-icon name="person-arms-spread" [size]="16"></ae-icon>
              <span>Accessibility</span>
            </button>
          </div>
          <div class="flex items-center">
            <button class="inline-flex items-center gap-2 text-xs font-semibold text-aeblack-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
              <ae-icon name="user" [size]="16"></ae-icon>
              <span>Sign In / UAE PASS</span>
            </button>
          </div>
        </div>
      </ae-navigation>

      <main class="container mx-auto px-4 py-8">
        <div class="p-8 bg-white border border-gray-200 rounded-xl shadow-xs space-y-3">
          <h1 class="text-2xl font-bold text-aeblack-900">Authority / Entity Header Specification</h1>
          <p class="text-sm text-aeblack-600 max-w-2xl">
            This story models the official TDRA / Federal Authority layout with top-bar emblem and secondary navigation search trigger.
            Change the <code>items</code> or <code>breakpoint</code> controls to test responsiveness and different navigation trees.
          </p>
        </div>
      </main>
    `,
  }),
};
