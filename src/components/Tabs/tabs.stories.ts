import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { TabsComponent, type TabItem } from './tabs.component';
import { IconDirective } from '../Icon/icon.directive';

const defaultItems: TabItem[] = [
  { value: 'all', label: 'All services', content: 'This is the content area for the tab "all services"' },
  { value: 'cat1', label: 'Category 1', content: 'This is the content area for the tab "category 1"' },
  { value: 'cat2', label: 'Category 2', content: 'This is the content area for the tab "category 2"' },
  { value: 'cat3', label: 'Category 3', content: 'This is the content area for the tab "category 3"' },
];

const iconItems: TabItem[] = [
  { value: 'account', label: 'My account', icon: 'user', content: 'This is the content area for the tab "My account"' },
  { value: 'settings', label: 'Settings', icon: 'globe', content: 'This is the content area for the tab "Settings"' },
  { value: 'notifications', label: 'Notifications', icon: 'bell-simple', content: 'This is the content area for the tab "Notifications"' },
  { value: 'support', label: 'Support', icon: 'info', content: 'This is the content area for the tab "Support"' },
];

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TabsComponent, IconDirective],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  args: {
    variant: 'default',
    items: defaultItems,
    defaultValue: undefined,
    className: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'pills'],
      description: 'Visual variant style',
    },
    items: {
      control: 'object',
      description: 'Array of tab items defining label, value, content and icon',
    },
    defaultValue: {
      control: 'text',
      description: 'Initial active tab value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes forwarded to the root wrapper',
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

// ─── Default Tabs ───────────────────────────────────────────────────────────────
export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      defaultValue: args.defaultValue || undefined,
    },
    template: `
      <ae-tabs
        [variant]="variant"
        [items]="items"
        [defaultValue]="defaultValue"
        [className]="className"
      ></ae-tabs>
    `,
  }),
};

// ─── Compact Tabs (tab-sm) ──────────────────────────────────────────────────────
export const Compact: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { value: 'all', label: 'All services', content: 'This is the content area for the tab "all services"' },
        { value: 'cat1', label: 'Category 1', content: 'This is the content area for the tab "category 1"' },
        { value: 'cat2', label: 'Category 2', content: 'This is the content area for the tab "category 2"' },
      ],
    },
    template: `
      <ae-tabs
        variant="compact"
        [items]="items"
      ></ae-tabs>
    `,
  }),
};

// ─── Pills Tabs ─────────────────────────────────────────────────────────────────
export const Pills: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { value: 'all', label: 'All services', content: 'This is the content area for the tab "all services"' },
        { value: 'cat1', label: 'Category 1', content: 'This is the content area for the tab "category 1"' },
        { value: 'cat2', label: 'Category 2', content: 'This is the content area for the tab "category 2"' },
      ],
    },
    template: `
      <ae-tabs
        variant="pills"
        [items]="items"
      ></ae-tabs>
    `,
  }),
};

// ─── Tabs with Icons ────────────────────────────────────────────────────
export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { value: 'account', label: 'My account', icon: 'user', content: 'This is the content area for the tab "My account"' },
        { value: 'settings', label: 'Settings', icon: 'globe', content: 'This is the content area for the tab "Settings"' },
        { value: 'notifications', label: 'Notifications', icon: 'bell-simple', content: 'This is the content area for the tab "Notifications"' },
        { value: 'support', label: 'Support', icon: 'info', content: 'This is the content area for the tab "Support"' },
      ],
    },
    template: `
      <ae-tabs
        variant="default"
        [items]="items"
      ></ae-tabs>
    `,
  }),
};

// ─── Compact Tabs with Icons ────────────────────────────────────────────────────
export const CompactWithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { value: 'account', label: 'My account', icon: 'user', content: 'This is the content area for the tab "My account"' },
        { value: 'settings', label: 'Settings', icon: 'globe', content: 'This is the content area for the tab "Settings"' },
        { value: 'notifications', label: 'Notifications', icon: 'bell-simple', content: 'This is the content area for the tab "Notifications"' },
      ],
    },
    template: `
      <ae-tabs
        variant="compact"
        [items]="items"
      ></ae-tabs>
    `,
  }),
};

// ─── Pills with Icons ──────────────────────────────────────────────────────────
export const PillsWithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { value: 'account', label: 'My account', icon: 'user', content: 'This is the content area for the tab "My account"' },
        { value: 'settings', label: 'Settings', icon: 'globe', content: 'This is the content area for the tab "Settings"' },
        { value: 'notifications', label: 'Notifications', icon: 'bell-simple', content: 'This is the content area for the tab "Notifications"' },
      ],
    },
    template: `
      <ae-tabs
        variant="pills"
        [items]="items"
      ></ae-tabs>
    `,
  }),
};

// ─── Default Active Tab ─────────────────────────────────────────────────────────
export const DefaultActiveTab: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { value: 'all', label: 'All services', content: 'This is the content area for the tab "all services"' },
        { value: 'cat1', label: 'Category 1', content: 'This is the content area for the tab "category 1"' },
        { value: 'cat2', label: 'Category 2', content: 'This is the content area for the tab "category 2"' },
      ],
    },
    template: `
      <ae-tabs
        variant="default"
        [items]="items"
        defaultValue="cat2"
      ></ae-tabs>
    `,
  }),
};

// ─── RTL Support ────────────────────────────────────────────────────────────────
export const RTL: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { value: 'burj', label: 'برج خليفة', content: 'هذا المحتوى لتبويب "برج خليفة"' },
        { value: 'palm', label: 'نخلة جميرا', content: 'هذا المحتوى لتبويب "نخلة جميرا"' },
        { value: 'mall', label: 'مول دبي', content: 'هذا المحتوى لتبويب "مول دبي"' },
        { value: 'safari', label: 'سفاري الصحراء', content: 'هذا المحتوى لتبويب "سفاري الصحراء"' },
      ],
    },
    template: `
      <div dir="rtl">
        <ae-tabs
          variant="default"
          [items]="items"
        ></ae-tabs>
      </div>
    `,
  }),
};
