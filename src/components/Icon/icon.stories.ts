import { type Meta, type StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { IconDirective, type IconWeight, type IconName } from './icon.directive';
import { provideAeIcons } from './icon-registry.service';

const phUserBold = '<path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z"/>';
const phUserFill = '<path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"/>';

const meta: Meta<IconDirective> = {
  title: 'Components/Icon',
  component: IconDirective,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IconDirective],
    }),
  ],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'house',
        'user',
        'gear',
        'bell-simple',
        'info',
        'check-circle',
        'x-circle',
        'warning',
        'magnifying-glass',
        'globe',
        'arrow-right',
        'caret-down',
        'download-simple',
        'paperclip',
        'trash',
      ] as IconName[],
      description: 'Built-in icon name from Phosphor catalog',
    },
    weight: {
      control: 'select',
      options: ['regular', 'bold', 'fill', 'light', 'thin', 'duotone'] as IconWeight[],
      description: 'Icon stroke weight variant',
    },
    size: {
      control: 'number',
      description: 'Width and height size in pixels',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes (e.g. text color utilities)',
    },
  },
  args: {
    name: 'house',
    weight: 'regular',
    size: 32,
    className: 'text-primary-600',
  },
};

export default meta;
type Story = StoryObj<IconDirective>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex items-center justify-center">
        <svg
          aeIcon
          [name]="name"
          [weight]="weight"
          [size]="size"
          [class]="className"
        ></svg>
      </div>
    `,
  }),
};

export const DirectSvgInput: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      customSvg: '<circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-width="16"/><polyline points="128 72 128 128 168 152" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/>',
    },
    template: `
      <div class="p-8 flex items-center justify-center text-primary-800">
        <svg aeIcon [svg]="customSvg" [size]="48"></svg>
      </div>
    `,
  }),
};

export const ConsumerRegisteredIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 flex flex-wrap gap-8 items-center justify-center text-primary-700">
        <div class="flex flex-col items-center gap-2">
          <svg aeIcon name="user" [size]="36"></svg>
          <span class="text-xs text-gray-500">user</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <svg aeIcon name="globe" [size]="36"></svg>
          <span class="text-xs text-gray-500">globe</span>
        </div>
      </div>
    `,
  }),
};

export const BuiltInIconSet: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 text-center text-aeblack-800">
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="house" [size]="28"></svg>
          <span class="text-xs font-mono">house</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="user" [size]="28"></svg>
          <span class="text-xs font-mono">user</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="gear" [size]="28"></svg>
          <span class="text-xs font-mono">gear</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="bell-simple" [size]="28"></svg>
          <span class="text-xs font-mono">bell-simple</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="check-circle" [size]="28" class="text-aegreen-600"></svg>
          <span class="text-xs font-mono">check-circle</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="warning" [size]="28" class="text-camel-600"></svg>
          <span class="text-xs font-mono">warning</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="x-circle" [size]="28" class="text-aered-600"></svg>
          <span class="text-xs font-mono">x-circle</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="globe" [size]="28"></svg>
          <span class="text-xs font-mono">globe</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="magnifying-glass" [size]="28"></svg>
          <span class="text-xs font-mono">magnifying-glass</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="arrow-right" [size]="28"></svg>
          <span class="text-xs font-mono">arrow-right</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="download-simple" [size]="28"></svg>
          <span class="text-xs font-mono">download-simple</span>
        </div>
        <div class="p-4 border border-aeblack-100 rounded-xl flex flex-col items-center gap-2 hover:bg-aeblack-50">
          <svg aeIcon name="paperclip" [size]="28"></svg>
          <span class="text-xs font-mono">paperclip</span>
        </div>
      </div>
    `,
  }),
};

export const IconWeights: Story = {
  decorators: [
    applicationConfig({
      providers: [
        provideAeIcons({ 'user': phUserBold }, 'bold'),
        provideAeIcons({ 'user': phUserFill }, 'fill'),
      ],
    }),
  ],
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 flex flex-wrap gap-8 items-center justify-center text-primary-800">
        <div class="flex flex-col items-center gap-2">
          <svg aeIcon name="user" weight="regular" [size]="48"></svg>
          <span class="text-xs font-mono">regular</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <svg aeIcon name="user" weight="bold" [size]="48"></svg>
          <span class="text-xs font-mono">bold</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <svg aeIcon name="user" weight="fill" [size]="48"></svg>
          <span class="text-xs font-mono">fill</span>
        </div>
      </div>
    `,
  }),
};

export const ColorInheritance: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 flex flex-wrap gap-8 items-center justify-center">
        <div class="text-primary-600 flex items-center gap-2">
          <svg aeIcon name="check-circle" [size]="28"></svg>
          <span>Primary-600</span>
        </div>
        <div class="text-aegreen-600 flex items-center gap-2">
          <svg aeIcon name="check-circle" [size]="28"></svg>
          <span>Aegreen-600</span>
        </div>
        <div class="text-aered-600 flex items-center gap-2">
          <svg aeIcon name="x-circle" [size]="28"></svg>
          <span>Aered-600</span>
        </div>
        <div class="text-camel-600 flex items-center gap-2">
          <svg aeIcon name="warning" [size]="28"></svg>
          <span>Camel-600</span>
        </div>
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
      <div class="p-8 space-y-6 max-w-md" dir="rtl">
        <div class="flex items-center gap-3 p-4 bg-primary-50/20 border border-primary-200 rounded-xl">
          <svg aeIcon name="arrow-right" [size]="24" class="text-primary-700 rtl:-scale-x-100"></svg>
          <span class="text-sm font-semibold text-primary-900">سهم الاتجاه يتم عكسه في الواجهة العربية باستخدام كلاس rtl:-scale-x-100</span>
        </div>
      </div>
    `,
  }),
};
