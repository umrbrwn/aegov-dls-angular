import type { Meta, StoryObj } from '@storybook/angular';
import { RangeSliderComponent } from './range-slider.component';

const meta: Meta<RangeSliderComponent> = {
  title: 'Components/RangeSlider',
  component: RangeSliderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: undefined,
    name: undefined,
    label: 'A range',
    value: 20,
    min: 0,
    max: 100,
    step: 1,
    size: 'base',
    variant: 'primary',
    helperText: 'Select your preferred value from the range.',
    error: '',
    disabled: false,
    required: false,
    className: '',
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'HTML id attribute for the range input',
    },
    name: {
      control: 'text',
      description: 'Form control name attribute',
    },
    label: {
      control: 'text',
      description: 'Label text above the slider',
    },
    value: {
      control: 'number',
      description: 'Initial / controlled value',
    },
    min: {
      control: 'number',
      description: 'Minimum value of the range slider',
    },
    max: {
      control: 'number',
      description: 'Maximum value of the range slider',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Sizing scale',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual colour variant',
    },
    helperText: {
      control: 'text',
      description: 'Helper / description text below the slider',
    },
    error: {
      control: 'text',
      description: 'Error message text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required indicator',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<RangeSliderComponent>;

// ─── Default ────────────────────────────────────────────────────────────────────
export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      id: args.id || undefined,
      name: args.name || undefined,
      label: args.label || undefined,
      helperText: args.helperText || undefined,
      error: args.error || undefined,
    },
    template: `
      <div class="w-[500px] p-6">
        <ae-range-slider
          [id]="id"
          [name]="name"
          [label]="label"
          [value]="value"
          [min]="min"
          [max]="max"
          [step]="step"
          [size]="size"
          [variant]="variant"
          [helperText]="helperText"
          [error]="error"
          [disabled]="disabled"
          [required]="required"
          [className]="className"
        ></ae-range-slider>
      </div>
    `,
  }),
};

// ─── Secondary Variant ──────────────────────────────────────────────────────────
export const Secondary: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-[500px] p-6">
        <ae-range-slider
          label="A range"
          [value]="20"
          variant="secondary"
        ></ae-range-slider>
      </div>
    `,
  }),
};

// ─── Disabled ───────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-[500px] p-6">
        <ae-range-slider
          label="A range"
          [value]="20"
          [disabled]="true"
        ></ae-range-slider>
      </div>
    `,
  }),
};

// ─── With Helper Text ───────────────────────────────────────────────────────────
export const WithHelperText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-[500px] p-6">
        <ae-range-slider
          label="Volume"
          [value]="50"
          helperText="Adjust the volume level"
        ></ae-range-slider>
      </div>
    `,
  }),
};

// ─── With Error ─────────────────────────────────────────────────────────────────
export const WithError: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-[500px] p-6">
        <ae-range-slider
          label="Price Range"
          [value]="80"
          error="Please select a value below 70"
        ></ae-range-slider>
      </div>
    `,
  }),
};

// ─── Required ───────────────────────────────────────────────────────────────────
export const Required: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-[500px] p-6">
        <ae-range-slider
          label="Required field"
          [value]="20"
          [required]="true"
        ></ae-range-slider>
      </div>
    `,
  }),
};

// ─── Custom Range (Temperature) ─────────────────────────────────────────────────
export const CustomRange: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-[500px] p-6">
        <ae-range-slider
          label="Temperature"
          [value]="10"
          [min]="-20"
          [max]="40"
          [step]="5"
          helperText="Select temperature in Celsius"
        ></ae-range-slider>
      </div>
    `,
  }),
};

// ─── RTL Support ────────────────────────────────────────────────────────────────
export const RTL: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div dir="rtl" class="w-[500px] p-6">
        <ae-range-slider
          label="نطاق"
          [value]="20"
        ></ae-range-slider>
      </div>
    `,
  }),
};
