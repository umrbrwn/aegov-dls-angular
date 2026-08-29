import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

const countryOptions = [
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'india', label: 'India' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'usa', label: 'USA' },
];

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  parameters: {
    layout: 'padded',
  },
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    placeholder: 'Choose a country',
    label: 'Country',
    options: countryOptions,
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
    placeholder: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Basic: Story = {
  args: {
    label: 'Select an option',
    placeholder: 'Choose a country',
    id: 'country',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    options: countryOptions,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-md"><ae-select [label]="label" [placeholder]="placeholder" [id]="id" [options]="options" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [error]="error" [helperText]="helperText"></ae-select></div>`,
  }),
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country',
    helperText: 'Select your country of residence',
    id: 'country-helper',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    options: countryOptions,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-md"><ae-select [label]="label" [placeholder]="placeholder" [helperText]="helperText" [id]="id" [options]="options" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [error]="error"></ae-select></div>`,
  }),
};

export const WithError: Story = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country',
    error: 'Please select a country',
    id: 'country-error',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    options: countryOptions,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-md"><ae-select [label]="label" [placeholder]="placeholder" [error]="error" [id]="id" [options]="options" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [helperText]="helperText"></ae-select></div>`,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4 max-w-md">
        <ae-select size="sm" label="Small Select" placeholder="Small size" id="small" [variant]="variant" [disabled]="disabled" [required]="required" [options]="[
          { value: 'uae', label: 'United Arab Emirates' },
          { value: 'india', label: 'India' }
        ]"></ae-select>
        <ae-select size="base" label="Base Select" placeholder="Base size" id="base" [variant]="variant" [disabled]="disabled" [required]="required" [options]="[
          { value: 'uae', label: 'United Arab Emirates' },
          { value: 'india', label: 'India' }
        ]"></ae-select>
        <ae-select size="lg" label="Large Select" placeholder="Large size" id="large" [variant]="variant" [disabled]="disabled" [required]="required" [options]="[
          { value: 'uae', label: 'United Arab Emirates' },
          { value: 'india', label: 'India' }
        ]"></ae-select>
      </div>
    `,
  }),
};

export const Variants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
  },
  args: {
    size: 'base',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4 max-w-md">
        <ae-select variant="primary" label="Primary Select" placeholder="Primary variant" id="primary" [size]="size" [disabled]="disabled" [required]="required" [options]="[
          { value: 'uae', label: 'United Arab Emirates' },
          { value: 'india', label: 'India' }
        ]"></ae-select>
        <ae-select variant="secondary" label="Secondary Select" placeholder="Secondary variant" id="secondary" [size]="size" [disabled]="disabled" [required]="required" [options]="[
          { value: 'uae', label: 'United Arab Emirates' },
          { value: 'india', label: 'India' }
        ]"></ae-select>
      </div>
    `,
  }),
};

export const Required: Story = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country',
    required: true,
    id: 'required-country',
    size: 'base',
    variant: 'primary',
    disabled: false,
    options: countryOptions,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-md"><ae-select [label]="label" [placeholder]="placeholder" [required]="required" [id]="id" [options]="options" [size]="size" [variant]="variant" [disabled]="disabled" [error]="error" [helperText]="helperText"></ae-select></div>`,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    placeholder: 'This select is disabled',
    disabled: true,
    id: 'disabled',
    size: 'base',
    variant: 'primary',
    required: false,
    options: countryOptions,
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-md"><ae-select [label]="label" [placeholder]="placeholder" [disabled]="disabled" [id]="id" [options]="options" [size]="size" [variant]="variant" [required]="required" [error]="error" [helperText]="helperText"></ae-select></div>`,
  }),
};

export const LongList: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    id: 'long-list',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    options: [
      { value: 'af', label: 'Afghanistan' },
      { value: 'al', label: 'Albania' },
      { value: 'dz', label: 'Algeria' },
      { value: 'ar', label: 'Argentina' },
      { value: 'au', label: 'Australia' },
      { value: 'at', label: 'Austria' },
      { value: 'bd', label: 'Bangladesh' },
      { value: 'be', label: 'Belgium' },
      { value: 'br', label: 'Brazil' },
      { value: 'bg', label: 'Bulgaria' },
      { value: 'kh', label: 'Cambodia' },
      { value: 'ca', label: 'Canada' },
      { value: 'cl', label: 'Chile' },
      { value: 'cn', label: 'China' },
      { value: 'co', label: 'Colombia' },
      { value: 'hr', label: 'Croatia' },
      { value: 'dk', label: 'Denmark' },
      { value: 'eg', label: 'Egypt' },
      { value: 'fi', label: 'Finland' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'gr', label: 'Greece' },
      { value: 'in', label: 'India' },
      { value: 'id', label: 'Indonesia' },
      { value: 'ir', label: 'Iran' },
      { value: 'iq', label: 'Iraq' },
      { value: 'ie', label: 'Ireland' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-md"><ae-select [label]="label" [placeholder]="placeholder" [id]="id" [options]="options" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [error]="error" [helperText]="helperText"></ae-select></div>`,
  }),
};

export const HtmlMultiSelect: Story = {
  render: () => ({
    template: `
      <div class="max-w-md">
        <label for="country_multiple" class="font-semibold mb-2 block">
          Select options
        </label>
        <select
          multiple
          id="country_multiple"
          name="country_multiple"
          class="w-full min-h-[120px] border-2 border-[#c9a227] rounded-lg p-2 text-[#6b4226] text-[15px] focus:outline-hidden focus:ring-2 focus:ring-[#c9a227]"
        >
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="India">India</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="USA">USA</option>
        </select>
        <p class="mt-2 text-gray-500 text-xs">
          This is a native HTML <code>&lt;select multiple&gt;</code> element for multi-select functionality.
        </p>
      </div>
    `,
  }),
};
