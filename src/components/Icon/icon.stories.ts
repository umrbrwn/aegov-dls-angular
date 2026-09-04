import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { IconComponent, type IconName } from './icon.component';
import { provideAeIcons } from './icon-registry.service';

// Custom sample SVG paths (e.g. registered by consumer apps)
const customGearSvg = '<path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>';
const customHeartSvg = '<path d="M223,57a58.07,58.07,0,0,0-81.92,0l-13.1,13.1-13.1-13.1A58,58,0,0,0,33,139l13.1,13.1L128,234l81.9-81.9L223,139A58.07,58.07,0,0,0,223,57Z"/>';

const defaultIcons: IconName[] = [
  'check',
  'x',
  'caret-down',
  'caret-up',
  'caret-right',
  'caret-left',
  'caret-double-left',
  'caret-double-right',
  'info',
  'warning',
  'check-circle',
  'x-circle',
  'house',
  'upload-simple',
  'image',
  'sun',
  'moon',
  'eye',
  'eye-slash',
  'magnifying-glass',
  'list',
  'user',
];

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAeIcons({
          gear: customGearSvg,
          heart: customHeartSvg,
        }),
      ],
    }),
  ],
  argTypes: {
    name: {
      control: 'select',
      options: defaultIcons,
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

export const DirectSvgInput: Story = {
  render: () => ({
    props: {
      mySvg: customHeartSvg,
    },
    template: `
      <div class="p-6 space-y-4">
        <h2 class="text-lg font-bold text-gray-900">Direct SVG Rendering (Zero-Lookup)</h2>
        <p class="text-sm text-gray-500">Consumers can pass raw SVG path strings directly via [svg] input without registering in AeIconRegistry.</p>
        <div class="flex items-center gap-4 pt-2">
          <ae-icon [svg]="mySvg" [size]="32" class="text-red-500"></ae-icon>
          <span class="text-sm font-medium text-gray-700">Custom Heart rendered via [svg] input</span>
        </div>
      </div>
    `,
  }),
};

export const ConsumerRegisteredIcons: Story = {
  render: () => ({
    template: `
      <div class="p-6 space-y-4">
        <h2 class="text-lg font-bold text-gray-900">Consumer-Registered Icons</h2>
        <p class="text-sm text-gray-500">Registered dynamically via provideAeIcons({ gear: '...', heart: '...' }) in app config or component providers.</p>
        <div class="flex items-center gap-6 pt-2">
          <div class="flex items-center gap-2 text-indigo-600">
            <ae-icon name="gear" [size]="28"></ae-icon>
            <span class="font-medium text-sm">gear</span>
          </div>
          <div class="flex items-center gap-2 text-rose-500">
            <ae-icon name="heart" [size]="28"></ae-icon>
            <span class="font-medium text-sm">heart</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const BuiltInIconSet: Story = {
  argTypes: {
    name: { table: { disable: true } },
    weight: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: () => ({
    props: {
      icons: defaultIcons,
    },
    template: `
      <div class="p-6">
        <h2 class="text-xl font-bold mb-2 text-gray-900">Built-in Default Icons</h2>
        <p class="text-sm text-gray-500 mb-6">Zero-config icons pre-bundled for aegov internal components (Alert, Select, Toast, etc.).</p>
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
      sampleIcons: ['check', 'x', 'caret-down', 'info', 'warning', 'check-circle', 'x-circle'] as IconName[],
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
        </div>
      </div>
    `,
  }),
};
