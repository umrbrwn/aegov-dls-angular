import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import {
  NavigationComponent,
  MainMenuComponent,
  SecondaryMenuComponent,
  NavItemComponent
} from './navigation.component';
import { IconComponent } from '../../icons/icon.component';

const meta: Meta<NavigationComponent> = {
  title: 'Components/Navigation',
  component: NavigationComponent,
  decorators: [
    moduleMetadata({
      imports: [
        NavigationComponent,
        MainMenuComponent,
        SecondaryMenuComponent,
        NavItemComponent,
        IconComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  subcomponents: {
    MainMenu: MainMenuComponent as any,
    SecondaryMenu: SecondaryMenuComponent as any,
    NavItem: NavItemComponent as any,
  },
};

export default meta;
type Story = StoryObj<NavigationComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <ae-navigation>
        <div logo class="text-aeblack-900 font-bold text-2xl">LOGO</div>

        <ae-main-menu main-menu>
          <ae-nav-item label="Home" href="#" icon="house" [isActive]="true"></ae-nav-item>
          <ae-nav-item label="Our services" href="#"></ae-nav-item>
          <ae-nav-item
            label="About us"
            href="#"
            [dropdown]="[
              {
                title: 'Sub Title',
                items: [
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' }
                ]
              },
              {
                title: 'Sub Title',
                items: [
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' }
                ]
              },
              {
                title: 'Sub Title',
                items: [
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
        </ae-main-menu>

        <ae-secondary-menu secondary-menu>
          <ae-nav-item label="Login" type="secondary" icon="user" href="#"></ae-nav-item>
          <ae-nav-item label="Accessibility" type="secondary" icon="person-arms-spread" href="#"></ae-nav-item>
          <ae-nav-item label="Switch language" type="secondary" icon="globe" href="#"></ae-nav-item>
        </ae-secondary-menu>
      </ae-navigation>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <ae-navigation>
        <div logo class="text-aeblack-900 font-bold text-2xl">LOGO</div>

        <ae-main-menu main-menu>
          <ae-nav-item label="Home" href="#" icon="house" [isActive]="true"></ae-nav-item>
          <ae-nav-item label="Services" href="#" icon="gear"></ae-nav-item>
          <ae-nav-item
            label="About"
            href="#"
            icon="info"
            [dropdown]="[
              {
                title: 'Company',
                items: [
                  { label: 'Our Story', href: '#' },
                  { label: 'Team', href: '#' },
                  { label: 'Careers', href: '#' }
                ]
              },
              {
                title: 'Locations',
                items: [
                  { label: 'Headquarters', href: '#' },
                  { label: 'Regional Offices', href: '#' },
                  { label: 'International', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
          <ae-nav-item label="Contact" href="#" icon="phone"></ae-nav-item>
        </ae-main-menu>

        <ae-secondary-menu secondary-menu>
          <ae-nav-item label="Account" type="secondary" icon="user" href="#"></ae-nav-item>
          <ae-nav-item label="Language" type="secondary" icon="globe" href="#"></ae-nav-item>
        </ae-secondary-menu>
      </ae-navigation>
    `,
  }),
};

export const Complex: Story = {
  render: () => ({
    template: `
      <ae-navigation>
        <div logo class="text-aeblack-900 font-bold text-2xl">LOGO</div>

        <ae-main-menu main-menu>
          <ae-nav-item label="Home" href="#" icon="house"></ae-nav-item>
          <ae-nav-item
            label="Services"
            href="#"
            icon="gear"
            [dropdown]="[
              {
                title: 'Business Services',
                items: [
                  { label: 'Consulting', href: '#' },
                  { label: 'Strategy', href: '#' },
                  { label: 'Development', href: '#' }
                ]
              },
              {
                title: 'Personal Services',
                items: [
                  { label: 'Financial Planning', href: '#' },
                  { label: 'Education', href: '#' },
                  { label: 'Health & Wellness', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
          <ae-nav-item
            label="About"
            href="#"
            icon="buildings"
            [isActive]="true"
            [dropdown]="[
              {
                title: 'Our Company',
                items: [
                  { label: 'History', href: '#' },
                  { label: 'Mission & Vision', href: '#' },
                  { label: 'Leadership', href: '#' }
                ]
              },
              {
                title: 'Careers',
                items: [
                  { label: 'Current Openings', href: '#' },
                  { label: 'Benefits', href: '#' },
                  { label: 'Culture', href: '#' }
                ]
              },
              {
                title: 'Press',
                items: [
                  { label: 'News', href: '#' },
                  { label: 'Media Kit', href: '#' },
                  { label: 'Contact PR', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
          <ae-nav-item
            label="Resources"
            href="#"
            icon="file-text"
            [dropdown]="[
              {
                title: 'Documentation',
                items: [
                  { label: 'Guides', href: '#' },
                  { label: 'API Reference', href: '#' },
                  { label: 'Examples', href: '#' }
                ]
              },
              {
                title: 'Learning',
                items: [
                  { label: 'Tutorials', href: '#' },
                  { label: 'Webinars', href: '#' },
                  { label: 'Workshops', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
          <ae-nav-item label="Contact" href="#" icon="envelope"></ae-nav-item>
        </ae-main-menu>

        <ae-secondary-menu secondary-menu>
          <ae-nav-item label="Account" type="secondary" icon="user" href="#"></ae-nav-item>
          <ae-nav-item label="Accessibility" type="secondary" icon="person-arms-spread" href="#"></ae-nav-item>
          <ae-nav-item label="Language" type="secondary" icon="globe" href="#"></ae-nav-item>
        </ae-secondary-menu>
      </ae-navigation>
    `,
  }),
};

export const Mobile: Story = {
  render: () => ({
    template: `
      <ae-navigation [isMobile]="true">
        <div logo class="text-aeblack-900 font-bold text-2xl">LOGO</div>

        <ae-main-menu main-menu>
          <ae-nav-item label="Home" href="#" icon="house"></ae-nav-item>
          <ae-nav-item label="Our services" href="#"></ae-nav-item>
          <ae-nav-item
            label="About us"
            href="#"
            [dropdown]="[
              {
                title: 'Sub Title',
                items: [
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' },
                  { label: 'Sub Item', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
        </ae-main-menu>

        <ae-secondary-menu secondary-menu>
          <ae-nav-item label="Login" type="secondary" icon="user" href="#"></ae-nav-item>
          <ae-nav-item label="Accessibility" type="secondary" icon="person-arms-spread" href="#"></ae-nav-item>
          <ae-nav-item label="Switch language" type="secondary" icon="globe" href="#"></ae-nav-item>
        </ae-secondary-menu>
      </ae-navigation>
    `,
  }),
};

export const MegaMenu: Story = {
  render: () => ({
    template: `
      <ae-navigation>
        <div logo class="text-aeblack-900 font-bold text-2xl">LOGO</div>

        <ae-main-menu main-menu>
          <ae-nav-item label="Home" href="#" icon="house" [isActive]="true"></ae-nav-item>
          <ae-nav-item
            label="Mega Menu"
            [isActive]="true"
            [dropdown]="[
              {
                title: 'Cities',
                items: [
                  { label: 'Dubai', href: '#' },
                  { label: 'Abu Dhabi', href: '#' },
                  { label: 'Sharjah', href: '#' }
                ]
              },
              {
                title: 'Foods',
                items: [
                  { label: 'Shawarma', href: '#' },
                  { label: 'Falafel', href: '#' },
                  { label: 'Hummus', href: '#' }
                ]
              },
              {
                title: 'Landmarks',
                items: [
                  { label: 'Burj Khalifa', href: '#' },
                  { label: 'The Creek', href: '#' },
                  { label: 'Palm Jumeirah', href: '#' }
                ]
              },
              {
                title: 'Activities',
                items: [
                  { label: 'Desert Safari', href: '#' },
                  { label: 'Dhow Cruise', href: '#' },
                  { label: 'Ski Dubai', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
          <ae-nav-item label="About us" href="#"></ae-nav-item>
        </ae-main-menu>

        <ae-secondary-menu secondary-menu>
          <ae-nav-item label="Login" type="secondary" icon="user" href="#"></ae-nav-item>
          <ae-nav-item label="Accessibility" type="secondary" icon="person-arms-spread" href="#"></ae-nav-item>
          <ae-nav-item label="Switch language" type="secondary" icon="globe" href="#"></ae-nav-item>
        </ae-secondary-menu>
      </ae-navigation>
    `,
  }),
};

export const MultiColumnDropdown: Story = {
  render: () => ({
    template: `
      <ae-navigation>
        <div logo class="text-aeblack-900 font-bold text-2xl">LOGO</div>

        <ae-main-menu main-menu>
          <ae-nav-item label="Home" href="#" icon="house" [isActive]="true"></ae-nav-item>
          <ae-nav-item label="Our services" href="#"></ae-nav-item>
          <ae-nav-item
            label="About us"
            [isActive]="true"
            [dropdown]="[
              {
                title: 'Section 1',
                items: [
                  { label: 'Sub Item 1', href: '#' },
                  { label: 'Sub Item 2', href: '#' },
                  { label: 'Sub Item 3', href: '#' }
                ]
              },
              {
                title: 'Section 2',
                items: [
                  { label: 'Sub Item 4', href: '#' },
                  { label: 'Sub Item 5', href: '#' },
                  { label: 'Sub Item 6', href: '#' }
                ]
              },
              {
                title: 'Section 3',
                items: [
                  { label: 'Sub Item 7', href: '#' },
                  { label: 'Sub Item 8', href: '#' },
                  { label: 'Sub Item 9', href: '#' }
                ]
              }
            ]"
          ></ae-nav-item>
        </ae-main-menu>

        <ae-secondary-menu secondary-menu>
          <ae-nav-item label="Login" type="secondary" icon="user" href="#"></ae-nav-item>
          <ae-nav-item label="Accessibility" type="secondary" icon="person-arms-spread" href="#"></ae-nav-item>
          <ae-nav-item label="Switch language" type="secondary" icon="globe" href="#"></ae-nav-item>
        </ae-secondary-menu>
      </ae-navigation>
    `,
  }),
};
