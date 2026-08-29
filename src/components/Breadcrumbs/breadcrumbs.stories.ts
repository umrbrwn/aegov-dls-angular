import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';

const meta: Meta<BreadcrumbsComponent> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  decorators: [
    moduleMetadata({
      imports: [BreadcrumbsComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  args: {
    separator: 'slash',
    showHomeIcon: false,
  },
  argTypes: {
    separator: {
      control: 'select',
      options: ['slash', 'caret'],
    },
    showHomeIcon: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

const defaultItems = [
  { label: 'Home', href: '#' },
  { label: 'Media centre', href: '#' },
  { label: 'News', href: '#' },
  { label: 'Press release and features', href: '#' },
  { label: 'A really long page name that must be affected' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    separator: 'slash',
    showHomeIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-breadcrumbs [items]="items" [separator]="separator" [showHomeIcon]="showHomeIcon"></ae-breadcrumbs>`,
  }),
};

export const WithHomeIcon: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Media centre', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Press release', href: '#' },
      { label: 'A really long page name that must be affected' },
    ],
    separator: 'slash',
    showHomeIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `<ae-breadcrumbs [items]="items" [separator]="separator" [showHomeIcon]="showHomeIcon"></ae-breadcrumbs>`,
  }),
};

export const WithCaretSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Media centre', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Press release', href: '#' },
      { label: 'A really long page name that must be affected' },
    ],
    separator: 'caret',
    showHomeIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-breadcrumbs [items]="items" [separator]="separator" [showHomeIcon]="showHomeIcon"></ae-breadcrumbs>`,
  }),
};

export const WithCustomIcons: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '#', icon: 'table' },
      { label: 'Notifications', href: '#', icon: 'bell' },
      { label: 'News', href: '#', icon: 'newspaper' },
      { label: 'Current Page' },
    ],
    separator: 'caret',
    showHomeIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-breadcrumbs [items]="items" [separator]="separator" [showHomeIcon]="showHomeIcon"></ae-breadcrumbs>`,
  }),
};

export const WithMicrodata: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones' },
    ],
    separator: 'slash',
    showHomeIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Breadcrumbs component automatically embeds Schema.org BreadcrumbList microdata attributes (itemscope, itemtype, itemprop, and position) for SEO rich snippets in search engines.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<ae-breadcrumbs [items]="items" [separator]="separator" [showHomeIcon]="showHomeIcon"></ae-breadcrumbs>`,
  }),
};
