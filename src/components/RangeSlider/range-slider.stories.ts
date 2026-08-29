import type { Meta, StoryObj } from '@storybook/angular';
import { RangeSliderComponent } from './range-slider.component';

const meta: Meta<RangeSliderComponent> = {
  title: 'Components/RangeSlider',
  component: RangeSliderComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<RangeSliderComponent>;

export const Default: Story = {
  args: {
    label: 'Volume',
    helperText: 'Adjust the volume level',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-80"><ae-range-slider [label]="label" [helperText]="helperText" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [error]="error" [min]="min" [max]="max" [step]="step"></ae-range-slider></div>`,
  }),
};

export const WithError: Story = {
  args: {
    label: 'Price Range',
    error: 'Please select a value below 70',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-[500px]"><ae-range-slider [label]="label" [error]="error" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [helperText]="helperText" [min]="min" [max]="max" [step]="step"></ae-range-slider></div>`,
  }),
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    size: 'base',
    variant: 'primary',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-80"><ae-range-slider [label]="label" [required]="required" [size]="size" [variant]="variant" [disabled]="disabled" [helperText]="helperText" [error]="error" [min]="min" [max]="max" [step]="step"></ae-range-slider></div>`,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Slider',
    disabled: true,
    helperText: 'This slider is disabled',
    size: 'base',
    variant: 'primary',
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-80"><ae-range-slider [label]="label" [disabled]="disabled" [helperText]="helperText" [size]="size" [variant]="variant" [required]="required" [error]="error" [min]="min" [max]="max" [step]="step"></ae-range-slider></div>`,
  }),
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Variant',
    variant: 'secondary',
    size: 'base',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-80"><ae-range-slider [label]="label" [variant]="variant" [size]="size" [disabled]="disabled" [required]="required" [helperText]="helperText" [error]="error" [min]="min" [max]="max" [step]="step"></ae-range-slider></div>`,
  }),
};

export const Small: Story = {
  args: {
    label: 'Small Size',
    size: 'sm',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-80"><ae-range-slider [label]="label" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [helperText]="helperText" [error]="error" [min]="min" [max]="max" [step]="step"></ae-range-slider></div>`,
  }),
};

export const Large: Story = {
  args: {
    label: 'Large Size',
    size: 'lg',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-80"><ae-range-slider [label]="label" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [helperText]="helperText" [error]="error" [min]="min" [max]="max" [step]="step"></ae-range-slider></div>`,
  }),
};

export const CustomRange: Story = {
  args: {
    label: 'Temperature',
    min: -20,
    max: 40,
    step: 5,
    helperText: 'Select temperature in Celsius',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-80"><ae-range-slider [label]="label" [min]="min" [max]="max" [step]="step" [helperText]="helperText" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [error]="error"></ae-range-slider></div>`,
  }),
};
