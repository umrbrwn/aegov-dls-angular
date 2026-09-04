import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';
import { ButtonComponent } from '../Button/button.component';
import { CheckboxComponent } from '../Checkbox/checkbox.component';
import { IconComponent } from '../Icon/icon.component';

const meta: Meta<DropdownComponent> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [DropdownComponent, ButtonComponent, CheckboxComponent, IconComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    side: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
  },
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const Default: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-dropdown
          [align]="align"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              items: [
                { label: 'Profile', value: 'profile' },
                { label: 'Settings', value: 'settings' },
                { label: 'Logout', value: 'logout' }
              ]
            }
          ]"
        >
          <ae-button trigger color="secondary" variant="solid">
            <span>Select An Option</span>
            <ae-icon name="caret-down" [size]="16" class="ml-2"></ae-icon>
          </ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-dropdown
          [align]="align"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              items: [
                { label: 'Profile', value: 'profile', icon: 'user' },
                { label: 'Notifications', value: 'notifications', icon: 'bell' },
                { label: 'Settings', value: 'settings', icon: 'gear' },
                { label: 'Logout', value: 'logout', icon: 'sign-out' }
              ]
            }
          ]"
        >
          <ae-button trigger color="secondary" variant="solid">
            <span>Select An Option</span>
            <ae-icon name="caret-down" [size]="16" class="ml-2"></ae-icon>
          </ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const WithGroups: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-dropdown
          [align]="align"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              label: 'Account',
              items: [
                { label: 'Profile', value: 'profile', icon: 'user' },
                { label: 'Settings', value: 'settings', icon: 'gear' }
              ]
            },
            {
              label: 'Shopping',
              items: [
                { label: 'Cart', value: 'cart', icon: 'shopping-cart' },
                { label: 'Orders', value: 'orders', icon: 'package' },
                { label: 'Wishlist', value: 'wishlist', icon: 'heart' }
              ]
            },
            {
              label: 'Billing',
              items: [
                { label: 'Payment Methods', value: 'payment', icon: 'credit-card' },
                { label: 'Subscriptions', value: 'subscriptions', icon: 'package' }
              ]
            }
          ]"
        >
          <ae-button trigger color="secondary" variant="solid">
            <span>Select An Option</span>
            <ae-icon name="caret-down" [size]="16" class="ml-2"></ae-icon>
          </ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const ArabicDropdown: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center" dir="rtl">
        <ae-dropdown
          [align]="align"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              label: 'الحساب',
              items: [
                { label: 'الملف الشخصي', value: 'profile', icon: 'user' },
                { label: 'الإعدادات', value: 'settings', icon: 'gear' }
              ]
            },
            {
              label: 'التسوق',
              items: [
                { label: 'السلة', value: 'cart', icon: 'shopping-cart' },
                { label: 'الطلبات', value: 'orders', icon: 'package' },
                { label: 'المفضلة', value: 'wishlist', icon: 'heart' }
              ]
            }
          ]"
        >
          <ae-button trigger color="secondary" variant="solid">
            <span>حدد خياراً</span>
            <ae-icon name="caret-down" [size]="16" class="mr-2"></ae-icon>
          </ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const LanguageSelector: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-dropdown
          [align]="align"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              items: [
                { label: 'English', value: 'en' },
                { label: 'العربية', value: 'ar' }
              ]
            }
          ]"
        >
          <ae-button trigger variant="outline" color="secondary">
            <ae-icon name="globe" [size]="16" class="mr-2"></ae-icon>
            <span>Language</span>
            <ae-icon name="caret-down" [size]="16" class="ml-2"></ae-icon>
          </ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const Alignments: Story = {
  argTypes: {
    align: { table: { disable: true } },
  },
  args: {
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex gap-4 justify-center">
        <ae-dropdown
          align="start"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              items: [
                { label: 'Left aligned', value: '1' },
                { label: 'Item 2', value: '2' }
              ]
            }
          ]"
        >
          <ae-button trigger color="secondary" variant="solid">Left</ae-button>
        </ae-dropdown>

        <ae-dropdown
          align="center"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              items: [
                { label: 'Center aligned', value: '1' },
                { label: 'Item 2', value: '2' }
              ]
            }
          ]"
        >
          <ae-button trigger color="secondary" variant="solid">Center</ae-button>
        </ae-dropdown>

        <ae-dropdown
          align="end"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              items: [
                { label: 'Right aligned', value: '1' },
                { label: 'Item 2', value: '2' }
              ]
            }
          ]"
        >
          <ae-button trigger color="secondary" variant="solid">Right</ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const Placements: Story = {
  argTypes: {
    side: { table: { disable: true } },
  },
  args: {
    align: 'start',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-24 flex gap-6 justify-center">
        <ae-dropdown
          side="bottom"
          [align]="align"
          [trigger]="trigger"
          [groups]="[{ items: [{ label: 'Bottom', value: '1' }] }]"
        >
          <ae-button trigger color="secondary" variant="solid">Bottom</ae-button>
        </ae-dropdown>

        <ae-dropdown
          side="top"
          [align]="align"
          [trigger]="trigger"
          [groups]="[{ items: [{ label: 'Top', value: '1' }] }]"
        >
          <ae-button trigger color="secondary" variant="solid">Top</ae-button>
        </ae-dropdown>

        <ae-dropdown
          side="right"
          [align]="align"
          [trigger]="trigger"
          [groups]="[{ items: [{ label: 'Right', value: '1' }] }]"
        >
          <ae-button trigger color="secondary" variant="solid">Right</ae-button>
        </ae-dropdown>

        <ae-dropdown
          side="left"
          [align]="align"
          [trigger]="trigger"
          [groups]="[{ items: [{ label: 'Left', value: '1' }] }]"
        >
          <ae-button trigger color="secondary" variant="solid">Left</ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const WithHeaderDividerAndIcons: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-dropdown
          header="Signed in as john@example.com"
          [align]="align"
          [side]="side"
          [trigger]="trigger"
          [groups]="[
            {
              items: [
                { label: 'Alerts', value: 'item-1', icon: 'bell' },
                { label: 'Profile', value: 'item-2', icon: 'user' },
                { label: 'Region', value: 'item-3', icon: 'globe' }
              ]
            },
            {
              items: [
                { label: 'Settings', value: 'item-4', icon: 'gear' },
                { label: 'Cart', value: 'item-5', icon: 'shopping-cart' },
                { label: 'Orders', value: 'item-6', icon: 'package' }
              ]
            }
          ]"
        >
          <ae-button trigger color="primary" variant="solid">
            <span>Open dropdown</span>
            <ae-icon name="caret-down" [size]="20" class="ml-2"></ae-icon>
          </ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const WithCheckboxes: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-dropdown
          [align]="align"
          [side]="side"
          [trigger]="trigger"
        >
          <ae-button trigger color="primary" variant="solid">
            <span>Open checkboxes</span>
            <ae-icon name="caret-down" [size]="20" class="ml-2"></ae-icon>
          </ae-button>
          <div dropdown-content class="p-4 min-w-[320px] flex flex-col gap-4">
            <ae-checkbox
              label="Comments"
              description="Get notified when someone posts a comment."
              size="lg"
              variant="primary"
            ></ae-checkbox>
            <ae-checkbox
              label="Alerts"
              description="Get notified when there is a critical issue."
              size="lg"
              variant="primary"
            ></ae-checkbox>
            <ae-checkbox
              label="Updates"
              description="Get notified when there is a new feature."
              size="lg"
              variant="primary"
            ></ae-checkbox>
          </div>
        </ae-dropdown>
      </div>
    `,
  }),
};

export const TriggerOnHover: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    trigger: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-dropdown
          [trigger]="trigger"
          [align]="align"
          [side]="side"
          [groups]="[
            {
              items: [
                { label: 'Hover item 1', value: 'hover-1' },
                { label: 'Hover item 2', value: 'hover-2' }
              ]
            }
          ]"
        >
          <ae-button trigger color="primary" variant="solid">
            <span>Open on hover</span>
            <ae-icon name="caret-down" [size]="20" class="ml-2"></ae-icon>
          </ae-button>
        </ae-dropdown>
      </div>
    `,
  }),
};
