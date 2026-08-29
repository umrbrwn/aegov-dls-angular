import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { TabsComponent } from './tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  decorators: [
    moduleMetadata({
      imports: [TabsComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  args: {
    variant: 'default',
    items: [
      {
        value: 'all',
        label: 'All services',
        content: 'This is the content area for the tab "all services"',
      },
      {
        value: 'cat1',
        label: 'Category 1',
        content: 'This is the content area for the tab "category 1"',
      },
      {
        value: 'cat2',
        label: 'Category 2',
        content: 'This is the content area for the tab "category 2"',
      },
      {
        value: 'cat3',
        label: 'Category 3',
        content: 'This is the content area for the tab "category 3"',
      },
    ],
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'compact'],
    },
    defaultValue: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: `<ae-tabs [variant]="variant" [items]="items" [defaultValue]="defaultValue"></ae-tabs>`,
  }),
};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
  render: (args) => ({
    props: args,
    template: `<ae-tabs [variant]="variant" [items]="items" [defaultValue]="defaultValue"></ae-tabs>`,
  }),
};

export const Pills: Story = {
  args: {
    variant: 'pills',
  },
  render: (args) => ({
    props: args,
    template: `<ae-tabs [variant]="variant" [items]="items" [defaultValue]="defaultValue"></ae-tabs>`,
  }),
};

export const Arabic: Story = {
  args: {
    variant: 'default',
    items: [
      {
        value: 'all',
        label: 'جميع الخدمات',
        content: 'هذه مساحة المحتوى لتبويب "جميع الخدمات"',
      },
      {
        value: 'cat1',
        label: 'الفئة الأولى',
        content: 'هذه مساحة المحتوى لتبويب "الفئة الأولى"',
      },
      {
        value: 'cat2',
        label: 'الفئة الثانية',
        content: 'هذه مساحة المحتوى لتبويب "الفئة الثانية"',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<div dir="rtl"><ae-tabs [variant]="variant" [items]="items" [defaultValue]="defaultValue"></ae-tabs></div>`,
  }),
};

export const WithIcons: Story = {
  args: {
    variant: 'default',
    items: [
      {
        value: 'account',
        label: 'My account',
        icon: 'user',
        content: 'This is the content area for the tab "My account"',
      },
      {
        value: 'settings',
        label: 'Settings',
        icon: 'gear',
        content: 'This is the content area for the tab "Settings"',
      },
      {
        value: 'notifications',
        label: 'Notifications',
        icon: 'bell',
        content: 'This is the content area for the tab "Notifications"',
      },
      {
        value: 'support',
        label: 'Support',
        icon: 'question',
        content: 'This is the content area for the tab "Support"',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<ae-tabs [variant]="variant" [items]="items" [defaultValue]="defaultValue"></ae-tabs>`,
  }),
};
