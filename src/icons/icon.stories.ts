import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent, type IconName } from './icon.component';

const sampleIcons: IconName[] = [
  'check',
  'x',
  'caret-down',
  'caret-up',
  'caret-right',
  'caret-left',
  'info',
  'warning',
  'check-circle',
  'x-circle',
  'house',
  'bookmark',
  'upload-simple',
  'image',
  'quotes',
  'sun',
  'moon',
  'eye',
  'eye-slash',
  'magnifying-glass',
  'list',
  'user',
  'gear',
  'bell',
  'question',
  'newspaper',
  'table',
  'plus',
  'envelope-simple',
  'phone',
  'note',
  'heart',
  'star',
  'trash',
  'share-network',
  'pencil-simple',
  'lock',
  'lock-open',
  'shield',
  'camera',
  'video-camera',
  'folder',
  'file-text',
];

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  argTypes: {
    name: {
      control: 'select',
      options: sampleIcons,
    },
    weight: {
      control: 'select',
      options: ['regular', 'bold', 'fill', 'light', 'thin', 'duotone'],
    },
    size: {
      control: 'number',
    },
  },
  args: {
    name: 'check',
    weight: 'regular',
    size: 24,
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    name: 'check',
    weight: 'regular',
    size: 24,
  },
  render: (args) => ({
    props: args,
    template: `<ae-icon [name]="name" [weight]="weight" [size]="size"></ae-icon>`,
  }),
};

export const PhosphorIconSet: Story = {
  argTypes: {
    name: { table: { disable: true } },
    weight: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: () => ({
    props: {
      icons: sampleIcons,
    },
    template: `
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4 text-gray-900">Phosphor Icons</h2>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          @for (icon of icons; track icon) {
            <div class="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-primary-200 transition-all group">
              <ae-icon [name]="icon" [size]="32" class="text-gray-700 group-hover:text-primary-600 mb-2 transition-colors"></ae-icon>
              <span class="text-xs text-gray-500 font-medium text-center truncate max-w-full" [title]="icon">{{ icon }}</span>
            </div>
          }
        </div>
      </div>
    `,
  }),
};

export const IconWeights: Story = {
  argTypes: {
    name: { table: { disable: true } },
    weight: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: () => ({
    props: {
      sampleIcons: ['check', 'x', 'gear', 'bell', 'star', 'heart', 'user', 'caret-down'] as IconName[],
    },
    template: `
      <div class="p-6 space-y-6">
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Regular</h3>
          <div class="flex gap-4">
            @for (icon of sampleIcons; track icon) {
              <ae-icon [name]="icon" weight="regular" [size]="28" class="text-primary-600"></ae-icon>
            }
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bold</h3>
          <div class="flex gap-4">
            @for (icon of sampleIcons; track icon) {
              <ae-icon [name]="icon" weight="bold" [size]="28" class="text-primary-600"></ae-icon>
            }
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Fill</h3>
          <div class="flex gap-4">
            @for (icon of sampleIcons; track icon) {
              <ae-icon [name]="icon" weight="fill" [size]="28" class="text-primary-600"></ae-icon>
            }
          </div>
        </div>
      </div>
    `,
  }),
};

export const ColorInheritance: Story = {
  argTypes: {
    name: { table: { disable: true } },
    weight: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: () => ({
    template: `
      <div class="p-6 space-y-4">
        <h2 class="text-lg font-bold text-gray-900">Dynamic Color Styling via currentColor</h2>
        <p class="text-sm text-gray-500">Inline SVGs automatically inherit CSS text color and Tailwind color classes.</p>
        <div class="flex gap-6 items-center pt-2">
          <div class="flex items-center gap-2 text-primary-600">
            <ae-icon name="check-circle" weight="fill" [size]="28"></ae-icon>
            <span class="font-medium text-sm">Primary</span>
          </div>
          <div class="flex items-center gap-2 text-emerald-600">
            <ae-icon name="check-circle" weight="fill" [size]="28"></ae-icon>
            <span class="font-medium text-sm">Success</span>
          </div>
          <div class="flex items-center gap-2 text-amber-500">
            <ae-icon name="warning" weight="fill" [size]="28"></ae-icon>
            <span class="font-medium text-sm">Warning</span>
          </div>
          <div class="flex items-center gap-2 text-red-500">
            <ae-icon name="x-circle" weight="fill" [size]="28"></ae-icon>
            <span class="font-medium text-sm">Error</span>
          </div>
          <div class="flex items-center gap-2 text-indigo-600">
            <ae-icon name="gear" weight="bold" [size]="28"></ae-icon>
            <span class="font-medium text-sm">Custom Indigo</span>
          </div>
        </div>
      </div>
    `,
  }),
};
