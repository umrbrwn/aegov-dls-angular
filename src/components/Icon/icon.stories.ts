import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { IconComponent, type IconName } from './icon.component';
import { provideAeIcons } from './icon-registry.service';

// Custom sample SVG paths (e.g. registered by consumer apps)
const customBoxSvg = '<path d="M223.68,66.15,135.68,18a16,16,0,0,0-15.36,0L32.32,66.15A16,16,0,0,0,24,80.19V175.8a16,16,0,0,0,8.32,14l88,48.17a16,16,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.19A16,16,0,0,0,223.68,66.15ZM128,32l80,43.78-80,43.78L48,75.78ZM40,89.87l80,43.78v87.56L40,177.43Zm96,131.34V133.65l80-43.78v87.56Z"/>';
const customHeartSvg = '<path d="M223,57a58.07,58.07,0,0,0-81.92,0l-13.1,13.1-13.1-13.1A58,58,0,0,0,33,139l13.1,13.1L128,234l81.9-81.9L223,139A58.07,58.07,0,0,0,223,57Z"/>';

const defaultIcons: IconName[] = [
  'arrow-right',
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
          box: customBoxSvg,
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
    rotateRtl: {
      control: 'boolean',
      description: 'Rotate the icon 180 degrees when rendered in RTL mode',
    },
  },
  args: {
    name: 'check',
    weight: 'regular',
    size: 24,
    rotateRtl: false,
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  argTypes: {
    dir: {
      control: 'radio',
      options: ['ltr', 'rtl'],
      description: 'Direction of the container (LTR vs RTL)',
    },
  } as any,
  args: {
    name: 'caret-right',
    weight: 'regular',
    size: 32,
    rotateRtl: false,
    dir: 'ltr',
  } as any,
  render: (args) => ({
    props: args,
    template: `
      <div [attr.dir]="dir" class="p-6">
        <div class="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
          <span>Container Direction:</span>
          <span class="uppercase font-mono text-primary-600 font-bold">{{ dir }}</span>
        </div>
        <div>
          <ae-icon [name]="name" [weight]="weight" [size]="size" [rotateRtl]="rotateRtl" class="text-primary-600"></ae-icon>
        </div>
      </div>
    `,
  }),
};

export const DirectSvgInput: Story = {
  argTypes: {
    name: { table: { disable: true } },
    weight: { table: { disable: true } },
    size: { table: { disable: true } },
    rotateRtl: { table: { disable: true } },
  },
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
  argTypes: {
    name: { table: { disable: true } },
    weight: { table: { disable: true } },
    size: { table: { disable: true } },
    rotateRtl: { table: { disable: true } },
  },
  render: () => ({
    template: `
      <div class="p-6 space-y-4">
        <h2 class="text-lg font-bold text-gray-900">Consumer-Registered Icons</h2>
        <p class="text-sm text-gray-500">Registered dynamically via <code>provideAeIcons(&#123; box: '...', heart: '...' &#125;)</code> in app config or component providers.</p>
        <div class="flex items-center gap-6 pt-2">
          <div class="flex items-center gap-2 text-indigo-600">
            <ae-icon name="box" [size]="28"></ae-icon>
            <span class="font-medium text-sm">box</span>
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
    rotateRtl: { table: { disable: true } },
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
    rotateRtl: { table: { disable: true } },
  },
  render: () => ({
    props: {
      regularIcons: ['check', 'x', 'caret-down', 'info', 'warning', 'check-circle', 'x-circle'] as IconName[],
      boldIcons: ['caret-down'] as IconName[],
      fillIcons: ['check-circle', 'info', 'warning', 'x-circle'] as IconName[],
    },
    template: `
      <div class="p-6 space-y-6">
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Regular</h3>
          <div class="flex flex-wrap gap-4">
            @for (icon of regularIcons; track icon) {
              <div class="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50 border border-gray-100 min-w-[72px]">
                <ae-icon [name]="icon" weight="regular" [size]="28" class="text-primary-600"></ae-icon>
                <span class="text-[11px] text-gray-500 font-medium text-center truncate max-w-full">{{ icon }}</span>
              </div>
            }
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bold</h3>
          <div class="flex flex-wrap gap-4">
            @for (icon of boldIcons; track icon) {
              <div class="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50 border border-gray-100 min-w-[72px]">
                <ae-icon [name]="icon" weight="bold" [size]="28" class="text-primary-600"></ae-icon>
                <span class="text-[11px] text-gray-500 font-medium text-center truncate max-w-full">{{ icon }}</span>
              </div>
            }
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Fill</h3>
          <div class="flex flex-wrap gap-4">
            @for (icon of fillIcons; track icon) {
              <div class="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50 border border-gray-100 min-w-[72px]">
                <ae-icon [name]="icon" weight="fill" [size]="28" class="text-primary-600"></ae-icon>
                <span class="text-[11px] text-gray-500 font-medium text-center truncate max-w-full">{{ icon }}</span>
              </div>
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
    rotateRtl: { table: { disable: true } },
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

export const RtlSupport: Story = {
  argTypes: {
    name: { table: { disable: true } },
    weight: { table: { disable: true } },
    size: { table: { disable: true } },
    rotateRtl: { table: { disable: true } },
  },
  render: () => ({
    props: {
      directionalIcons: ['caret-right', 'caret-left', 'caret-double-right', 'caret-double-left'] as IconName[],
    },
    template: `
      <div class="p-6 space-y-8">
        <div>
          <h2 class="text-lg font-bold text-gray-900">RTL Auto-Rotation (180deg)</h2>
          <p class="text-sm text-gray-500 mt-1">
            Setting <code>[rotateRtl]="true"</code> automatically applies <code>rtl:rotate-180</code> when the icon or its parent container is in RTL mode.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- LTR Container -->
          <div dir="ltr" class="p-5 border border-gray-200 rounded-xl bg-white shadow-xs">
            <div class="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-500">LTR Mode (dir="ltr")</span>
              <span class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">Normal Orientation</span>
            </div>
            <div class="flex gap-4 items-center">
              @for (icon of directionalIcons; track icon) {
                <div class="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <ae-icon [name]="icon" [size]="24" [rotateRtl]="true" class="text-primary-600"></ae-icon>
                  <span class="text-xs text-gray-500">{{ icon }}</span>
                </div>
              }
            </div>
          </div>

          <!-- RTL Container -->
          <div dir="rtl" class="p-5 border border-primary-200 rounded-xl bg-primary-50/20 shadow-xs">
            <div class="flex items-center justify-between pb-3 border-b border-primary-100 mb-4">
              <span class="text-xs font-bold uppercase tracking-wider text-primary-700">RTL Mode (dir="rtl")</span>
              <span class="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 font-medium rounded">Rotated 180°</span>
            </div>
            <div class="flex gap-4 items-center">
              @for (icon of directionalIcons; track icon) {
                <div class="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white border border-primary-100">
                  <ae-icon [name]="icon" [size]="24" [rotateRtl]="true" class="text-primary-600"></ae-icon>
                  <span class="text-xs text-gray-500">{{ icon }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

