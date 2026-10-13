import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import {
  DropdownDirective,
  DropdownTriggerDirective,
  type DropdownItem,
  type DropdownGroup,
  type DropdownPlacement,
  type DropdownTrigger,
} from './dropdown.directive';
import { ButtonDirective, type AegovButtonVariant, type AegovButtonColor, type AegovButtonSize } from '../Button/button.directive';
import { IconDirective } from '../Icon/icon.directive';
import { provideAeIcons } from '../Icon/icon-registry.service';

const currencyCircleDollarSvg =
  '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-80a8,8,0,0,1-8,8H116v16a8,8,0,0,1-16,0V144H96a8,8,0,0,1,0-16h40a8,8,0,0,0,0-16H112a24,24,0,0,1,0-48h8V48a8,8,0,0,1,16,0V64h8a8,8,0,0,1,0,16H112a8,8,0,0,0,0,16h24A24,24,0,0,1,144,136Z"/>';

const standardItems: DropdownItem[] = [
  { value: '1', label: 'Dashboard', href: '#dashboard' },
  { value: '2', label: 'Settings', href: '#settings' },
  { value: '3', label: 'Earnings', href: '#earnings' },
  { value: '4', label: 'Sign out', href: '#logout' },
];

export interface DropdownStoryArgs {
  triggerText: string;
  triggerVariant: AegovButtonVariant;
  triggerColor: AegovButtonColor;
  triggerSize: AegovButtonSize;
  trigger: DropdownTrigger;
  side: DropdownPlacement;
  showCaret: boolean;
  widthClass: string;
  items: DropdownItem[];
  triggerIconLeft?: string;
  disabled: boolean;
}

const meta: Meta<DropdownStoryArgs> = {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAeIcons({
          'currency-circle-dollar': currencyCircleDollarSvg,
        }),
      ],
    }),
    moduleMetadata({
      imports: [DropdownDirective, DropdownTriggerDirective, ButtonDirective, IconDirective],
    }),
  ],
  argTypes: {
    triggerText: {
      control: 'text',
      description: 'Text shown on the trigger button',
    },
    triggerVariant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'link'],
      description: 'Button visual variant applied via aeButton',
    },
    triggerColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button color scheme applied via aeButton',
    },
    triggerSize: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg'],
      description: 'Size applied via aeButton',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'] as DropdownTrigger[],
      description: 'Event type that opens the dropdown menu',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'] as DropdownPlacement[],
      description: 'Placement side relative to trigger',
    },
    showCaret: {
      control: 'boolean',
      description: 'Displays a caret arrow on the trigger button',
    },
    widthClass: {
      control: 'text',
      description: 'Width CSS utility class for dropdown panel',
    },
    items: {
      control: 'object',
      description: 'Array of data-driven menu items',
    },
    triggerIconLeft: {
      control: 'text',
      description: 'Leading icon name rendered inside trigger button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether dropdown interaction is disabled',
    },
  },
  args: {
    triggerText: 'Open dropdown',
    triggerVariant: 'solid',
    triggerColor: 'primary',
    triggerSize: 'base',
    trigger: 'click',
    side: 'bottom',
    showCaret: true,
    widthClass: 'w-44',
    items: standardItems,
    triggerIconLeft: undefined,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<DropdownStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      triggerIconLeft: args.triggerIconLeft || undefined,
    },
    template: `
      <div class="p-20 flex justify-center">
        <button
          aeButton
          [variant]="triggerVariant"
          [color]="triggerColor"
          [size]="triggerSize"
          [disabled]="disabled"
          aeDropdown
          [items]="items"
          [dropdownPlacement]="side"
          [dropdownTrigger]="trigger"
          [widthClass]="widthClass"
        >
          @if (triggerIconLeft) {
            <svg aeIcon [name]="triggerIconLeft" [size]="18" class="me-1.5"></svg>
          }
          <span>{{ triggerText }}</span>
          @if (showCaret) {
            <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
          }
        </button>
      </div>
    `,
  }),
};

export const Languages: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      langItems: [
        { value: 'en', label: 'English (US)', href: '#en' },
        { value: 'ar', label: 'العربية (UAE)', href: '#ar' },
        { value: 'fr', label: 'Français', href: '#fr' },
      ],
    },
    template: `
      <div class="p-20 flex justify-center">
        <button aeButton aeDropdown [items]="langItems">
          <svg aeIcon name="globe" [size]="18" class="me-1.5"></svg>
          <span>Language</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>
      </div>
    `,
  }),
};

export const WithHeaderDividerAndIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-20 flex justify-center">
        <button aeButton [aeDropdownTrigger]="userMenu">
          <svg aeIcon name="user" [size]="18" class="me-1.5"></svg>
          <span>User Account</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>

        <div #userMenu class="aegov-dropdown hidden w-52">
          <div class="dropdown-header">
            <div class="font-bold text-aeblack-900 truncate">Bonnie Green</div>
            <div class="text-sm font-normal text-aeblack-600 truncate">name&#64;aegov.ae</div>
          </div>
          <div class="dropdown-body text-aeblack-600">
            <ul class="py-1" role="menu">
              <li role="none">
                <a href="#dashboard" class="dropdown-item">
                  <svg aeIcon name="house" [size]="20"></svg>
                  <span class="flex-1 text-left rtl:text-right">Dashboard</span>
                </a>
              </li>
              <li role="none">
                <a href="#settings" class="dropdown-item">
                  <svg aeIcon name="gear" [size]="20"></svg>
                  <span class="flex-1 text-left rtl:text-right">Settings</span>
                </a>
              </li>
            </ul>
            <ul class="py-1 border-t border-aeblack-50" role="menu">
              <li role="none">
                <a href="#signout" class="dropdown-item">
                  <svg aeIcon name="sign-out" [size]="20"></svg>
                  <span class="flex-1 text-left rtl:text-right">Sign out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithIconsOnly: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      iconItems: [
        { value: '1', label: 'Dashboard', icon: 'house', href: '#dashboard' },
        { value: '2', label: 'Settings', icon: 'gear', href: '#settings' },
        { value: '3', label: 'Sign out', icon: 'sign-out', href: '#signout' },
      ] as DropdownItem[],
    },
    template: `
      <div class="p-20 flex justify-center">
        <button aeButton aeDropdown [items]="iconItems">
          <span>Actions Menu</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>
      </div>
    `,
  }),
};

export const WithDividersOnly: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      dividedGroups: [
        {
          items: [
            { value: '1', label: 'Dashboard', href: '#dashboard' },
            { value: '2', label: 'Settings', href: '#settings' },
          ],
        },
        {
          items: [
            { value: '3', label: 'Earnings', href: '#earnings' },
          ],
        },
        {
          items: [
            { value: '4', label: 'Sign out', href: '#signout' },
          ],
        },
      ] as DropdownGroup[],
    },
    template: `
      <div class="p-20 flex justify-center">
        <button aeButton aeDropdown [groups]="dividedGroups">
          <span>Divided Sections</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>
      </div>
    `,
  }),
};

export const WithCheckboxes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-20 flex justify-center">
        <button aeButton [aeDropdownTrigger]="dropdownCheckboxes">
          <span>Open dropdown</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>

        <div #dropdownCheckboxes class="aegov-dropdown hidden w-80">
          <div class="dropdown-body mb-4" data-dropdown-prevent-close>
            <div class="aegov-check-group rounded-md hover:bg-aeblack-50 px-5 pt-4 pb-2">
              <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox">
              <div>
                <label for="comments">Comments</label>
                <p id="comments-description" class="text-sm">Get notified when someone posts a comment on a posting.</p>
              </div>
            </div>
            <div class="aegov-check-group rounded-md hover:bg-aeblack-50 px-5 pt-4 pb-2">
              <input id="alert" aria-describedby="alert-description" name="alert" type="checkbox" checked>
              <div>
                <label for="alert">Alerts</label>
                <p id="alert-description" class="text-sm">Get notified when there is a critical issue.</p>
              </div>
            </div>
            <div class="aegov-check-group rounded-md hover:bg-aeblack-50 px-5 pt-4 pb-2">
              <input id="update" aria-describedby="update-description" name="update" type="checkbox">
              <div>
                <label for="update">Updates</label>
                <p id="update-description" class="text-sm">Get notified when there is a new feature released.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const CustomUIMenu: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-20 flex justify-center">
        <button aeButton [aeDropdownTrigger]="dropdownDescMenu">
          <span>Open dropdown</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>

        <div #dropdownDescMenu class="aegov-dropdown hidden w-80">
          <div class="dropdown-body">
            <div class="group hover:bg-primary-500 p-4">
              <a href="#" (click)="$event.preventDefault()" class="no-underline">
                <div class="font-bold text-aeblack-950 uppercase mb-2 group-hover:text-primary-50">PUBLISHED</div>
                <p class="text-sm text-aeblack-300 group-hover:text-whitely-50 !mb-0">by publishing an item, the content will be pushed on the production version of the site.</p>
              </a>
            </div>
            <div class="group hover:bg-primary-500 p-4">
              <a href="#" (click)="$event.preventDefault()" class="no-underline">
                <div class="font-bold text-aeblack-950 uppercase mb-2 group-hover:text-primary-50">DRAFT</div>
                <p class="text-sm text-aeblack-300 group-hover:text-whitely-50 !mb-0">Save a working copy of your file and save the progress before publishing</p>
              </a>
            </div>
            <div class="group hover:bg-primary-500 p-4">
              <a href="#" (click)="$event.preventDefault()" class="no-underline">
                <div class="font-bold text-aeblack-950 uppercase mb-2 group-hover:text-primary-50">PRIVATE</div>
                <p class="text-sm text-aeblack-300 group-hover:text-whitely-50 !mb-0">make this post as a private post and only visible to selected user</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const TriggerOnHover: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      hoverItems: standardItems,
    },
    template: `
      <div class="p-20 flex justify-center">
        <button aeButton aeDropdown dropdownTrigger="hover" [items]="hoverItems">
          <span>Hover to open</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>
      </div>
    `,
  }),
};

export const Placements: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      placementItems: standardItems,
    },
    template: `
      <div class="min-h-[600px] flex flex-wrap gap-8 justify-center items-center p-8">
        <button aeButton aeDropdown dropdownPlacement="top" [items]="placementItems">
          <span>Top Dropdown</span>
          <svg aeIcon name="caret-up" [size]="16" class="ms-1.5"></svg>
        </button>
        <button aeButton aeDropdown dropdownPlacement="right" [items]="placementItems">
          <span>Right Dropdown</span>
          <svg aeIcon name="caret-right" [size]="16" class="ms-1.5"></svg>
        </button>
        <button aeButton aeDropdown dropdownPlacement="bottom" [items]="placementItems">
          <span>Bottom Dropdown</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>
        <button aeButton aeDropdown dropdownPlacement="left" [items]="placementItems">
          <span>Left Dropdown</span>
          <svg aeIcon name="caret-left" [size]="16" class="ms-1.5"></svg>
        </button>
      </div>
    `,
  }),
};

export const RtlSupport: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-20 flex justify-center" dir="rtl">
        <button aeButton [aeDropdownTrigger]="arabicUserMenu">
          <svg aeIcon name="user" [size]="18" class="me-1.5"></svg>
          <span>الحساب الشخصي</span>
          <svg aeIcon name="caret-down" [size]="16" class="ms-1.5"></svg>
        </button>

        <div #arabicUserMenu class="aegov-dropdown hidden w-52">
          <div class="dropdown-header">
            <div class="font-bold text-aeblack-900 truncate">سعادة محمد بن راشد</div>
            <div class="text-sm font-normal text-aeblack-600 truncate">mohammed&#64;aegov.ae</div>
          </div>
          <div class="dropdown-body text-aeblack-600">
            <ul class="py-1" role="menu">
              <li role="none">
                <a href="#dashboard" class="dropdown-item">
                  <svg aeIcon name="house" [size]="20"></svg>
                  <span class="flex-1 text-right">لوحة التحكم</span>
                </a>
              </li>
              <li role="none">
                <a href="#settings" class="dropdown-item">
                  <svg aeIcon name="gear" [size]="20"></svg>
                  <span class="flex-1 text-right">الإعدادات العامة</span>
                </a>
              </li>
              <li role="none">
                <a href="#earnings" class="dropdown-item">
                  <svg aeIcon name="currency-circle-dollar" [size]="20"></svg>
                  <span class="flex-1 text-right">الأرباح والتقارير</span>
                </a>
              </li>
            </ul>
            <ul class="py-1 border-t border-aeblack-50" role="menu">
              <li role="none">
                <a href="#logout" class="dropdown-item">
                  <svg aeIcon name="sign-out" [size]="20"></svg>
                  <span class="flex-1 text-right">تسجيل الخروج</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `,
  }),
};
