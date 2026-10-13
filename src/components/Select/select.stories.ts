import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SelectDirective, type SelectOption } from './select.directive';
import { FormControlDirective } from '../Input/input.directive';

const countryOptions: SelectOption[] = [
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'india', label: 'India', disabled: true },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'usa', label: 'USA' },
];

export interface SelectStoryArgs {
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  size?: 'sm' | 'base' | 'lg';
  variant?: 'primary' | 'secondary';
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
}

const meta: Meta<SelectStoryArgs> = {
  title: 'Components/Select',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SelectDirective, FormControlDirective],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Country of Residence',
    placeholder: 'Select a country',
    options: countryOptions,
    size: 'base',
    variant: 'primary',
    error: '',
    helperText: 'Select your preferred option from the list.',
    disabled: false,
    required: false,
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    options: { control: 'object' },
    size: { control: 'select', options: ['sm', 'base', 'lg'] },
    variant: { control: 'select', options: ['primary', 'secondary'] },
    error: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<SelectStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-[400px] p-6">
        <div aeFormControl [size]="size" [variant]="variant" [error]="!!error">
          @if (label) {
            <label for="sample-select">
              {{ label }}
              @if (required) {
                <span class="text-aered-600 ms-0.5">*</span>
              }
            </label>
          }
          <div class="form-control-input">
            <select
              aeSelect
              id="sample-select"
              [options]="options"
              [placeholder]="placeholder"
              [disabled]="disabled"
              [required]="required"
            ></select>
          </div>
          @if (error) {
            <p class="error-message">{{ error }}</p>
          } @else if (helperText) {
            <p class="mt-2 text-xs leading-6 text-aeblack-500">{{ helperText }}</p>
          }
        </div>
      </div>
    `,
  }),
};

export const DeclarativeOptions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-[400px] p-6">
        <div aeFormControl>
          <label for="decl-select">Country <span class="text-aered-600">*</span></label>
          <div class="form-control-input">
            <select aeSelect id="decl-select">
              <option value="" disabled selected hidden>Select an option</option>
              <option value="uae">United Arab Emirates</option>
              <option value="sa">Saudi Arabia</option>
              <option value="om">Oman</option>
              <option value="kw">Kuwait</option>
            </select>
          </div>
          <p class="mt-2 text-xs leading-6 text-aeblack-500">Rendered with standard child option tags.</p>
        </div>
      </div>
    `,
  }),
};

export const ErrorState: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      options: countryOptions,
    },
    template: `
      <div class="w-[400px] p-6">
        <div aeFormControl [error]="true">
          <label for="err-select">Country <span class="text-aered-600">*</span></label>
          <div class="form-control-input">
            <select
              aeSelect
              id="err-select"
              [options]="options"
              placeholder="-- Please choose an option --"
            ></select>
          </div>
          <p class="error-message">Error: We encountered a problem with your selection.</p>
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
    props: {
      emirateOptions: [
        { value: 'auh', label: 'أبوظبي' },
        { value: 'dxb', label: 'دبي' },
        { value: 'shj', label: 'الشارقة' },
        { value: 'ajm', label: 'عجمان' },
        { value: 'uaq', label: 'أم القيوين' },
        { value: 'rak', label: 'رأس الخيمة' },
        { value: 'fuj', label: 'الفجيرة' },
      ],
    },
    template: `
      <div class="w-[400px] p-6" dir="rtl">
        <div aeFormControl>
          <label for="rtl-select">الإمارة <span class="text-aered-600">*</span></label>
          <div class="form-control-input">
            <select
              aeSelect
              id="rtl-select"
              [options]="emirateOptions"
              placeholder="اختر الإمارة"
            ></select>
          </div>
          <p class="mt-2 text-xs leading-6 text-aeblack-500">يرجى تحديد إمارة الإقامة من القائمة.</p>
        </div>
      </div>
    `,
  }),
};
