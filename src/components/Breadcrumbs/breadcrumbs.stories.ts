import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BreadcrumbsComponent, type BreadcrumbItem, type BreadcrumbSeparator } from './breadcrumbs.component';
import { IconDirective } from '../Icon/icon.directive';

const defaultItems: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Media centre', href: '#', title: 'Media centre' },
  { label: 'News', href: '#', title: 'News' },
  { label: 'Special articles', href: '#', title: 'Special articles' },
  { label: 'Press release and features', href: '#', title: 'Press release and features' },
  { label: 'A really long page name that must be affected.' },
];

const arabicItems: BreadcrumbItem[] = [
  { label: 'الصفحة الرئيسة', href: '#' },
  { label: 'المركز الإعلامي', href: '#', title: 'المركز الإعلامي' },
  { label: 'التوعية و الإرشاد', href: '#', title: 'التوعية و الإرشاد' },
  { label: 'عزيزي العامل – اعرف حقوقك' },
];

const meta: Meta<BreadcrumbsComponent> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BreadcrumbsComponent, IconDirective],
    }),
  ],
  argTypes: {
    separator: {
      control: 'select',
      options: ['slash', 'caret', 'none'] as BreadcrumbSeparator[],
      description: 'The visual separator between breadcrumb items',
    },
    showHomeIcon: {
      control: 'boolean',
      description: 'Display home icon on the first breadcrumb item',
    },
    microdata: {
      control: 'boolean',
      description: 'Render Schema.org microdata structured data attributes',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible ARIA label for navigation',
    },
  },
  args: {
    items: defaultItems,
    separator: 'slash',
    showHomeIcon: false,
    microdata: false,
    ariaLabel: 'Breadcrumb',
  },
};

export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-6">
        <ae-breadcrumbs
          [items]="items"
          [separator]="separator"
          [showHomeIcon]="showHomeIcon"
          [microdata]="microdata"
          [ariaLabel]="ariaLabel"
        ></ae-breadcrumbs>
      </div>
    `,
  }),
};

export const WithHomeIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: defaultItems,
    },
    template: `
      <div class="p-6">
        <ae-breadcrumbs
          [items]="items"
          separator="slash"
          [showHomeIcon]="true"
        ></ae-breadcrumbs>
      </div>
    `,
  }),
};

export const CaretSeparator: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: defaultItems,
    },
    template: `
      <div class="p-6">
        <ae-breadcrumbs
          [items]="items"
          separator="caret"
          [showHomeIcon]="true"
        ></ae-breadcrumbs>
      </div>
    `,
  }),
};

export const MicrodataSchema: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: defaultItems,
    },
    template: `
      <div class="p-6 space-y-3">
        <p class="text-xs text-gray-500">Inspect DOM to view Schema.org <code>BreadcrumbList</code> and <code>ListItem</code> metadata.</p>
        <ae-breadcrumbs
          [items]="items"
          separator="slash"
          [microdata]="true"
        ></ae-breadcrumbs>
      </div>
    `,
  }),
};

export const DeepHierarchy: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Government', href: '#' },
        { label: 'Ministries', href: '#' },
        { label: 'Ministry of Health and Prevention', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'Healthcare Professionals', href: '#' },
        { label: 'Licensing & Certification Guidelines for Medical Practitioners in Dubai' },
      ],
    },
    template: `
      <div class="p-6">
        <ae-breadcrumbs
          [items]="items"
          separator="slash"
          [showHomeIcon]="true"
        ></ae-breadcrumbs>
      </div>
    `,
  }),
};

export const RtlSupport: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      defaultItems,
      arabicItems,
    },
    template: `
      <div class="space-y-8 p-6">
        <div dir="ltr" class="border border-gray-200 rounded-xl p-4">
          <div class="text-xs font-bold text-gray-500 uppercase mb-3">LTR Orientation</div>
          <ae-breadcrumbs
            [items]="defaultItems"
            separator="caret"
            [showHomeIcon]="true"
          ></ae-breadcrumbs>
        </div>

        <div dir="rtl" class="border border-primary-200 bg-primary-50/10 rounded-xl p-4">
          <div class="text-xs font-bold text-primary-700 uppercase mb-3">تخطيط من اليمين إلى اليسار (RTL)</div>
          <ae-breadcrumbs
            [items]="arabicItems"
            separator="caret"
            [showHomeIcon]="true"
            ariaLabel="مسار التنقل"
          ></ae-breadcrumbs>
        </div>
      </div>
    `,
  }),
};
