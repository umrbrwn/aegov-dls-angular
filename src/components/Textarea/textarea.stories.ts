import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    rows: 4,
    label: 'Label',
    placeholder: 'Enter text...',
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
    rows: {
      control: 'number',
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
type Story = StoryObj<TextareaComponent>;

export const Basic: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description',
    id: 'description',
    rows: 4,
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-96"><ae-textarea [label]="label" [placeholder]="placeholder" [id]="id" [rows]="rows" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [error]="error" [helperText]="helperText"></ae-textarea></div>`,
  }),
};

export const WithHelperText: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments',
    helperText: 'Please provide detailed feedback to help us improve.',
    id: 'comments',
    rows: 4,
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-96"><ae-textarea [label]="label" [placeholder]="placeholder" [helperText]="helperText" [id]="id" [rows]="rows" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [error]="error"></ae-textarea></div>`,
  }),
};

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description',
    error: 'Description is required and must be at least 10 characters',
    id: 'description-error',
    rows: 4,
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-96"><ae-textarea [label]="label" [placeholder]="placeholder" [error]="error" [id]="id" [rows]="rows" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [helperText]="helperText"></ae-textarea></div>`,
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
    rows: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4 w-96">
        <ae-textarea size="sm" label="Small Textarea" placeholder="Small size textarea" id="small" [rows]="rows" [variant]="variant" [disabled]="disabled" [required]="required"></ae-textarea>
        <ae-textarea size="base" label="Base Textarea" placeholder="Base size textarea" id="base" [rows]="rows" [variant]="variant" [disabled]="disabled" [required]="required"></ae-textarea>
        <ae-textarea size="lg" label="Large Textarea" placeholder="Large size textarea" id="large" [rows]="rows" [variant]="variant" [disabled]="disabled" [required]="required"></ae-textarea>
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
    rows: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4 w-96">
        <ae-textarea variant="primary" label="Primary Textarea" placeholder="Primary variant" id="primary" [rows]="rows" [size]="size" [disabled]="disabled" [required]="required"></ae-textarea>
        <ae-textarea variant="secondary" label="Secondary Textarea" placeholder="Secondary variant" id="secondary" [rows]="rows" [size]="size" [disabled]="disabled" [required]="required"></ae-textarea>
      </div>
    `,
  }),
};

export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Please provide your feedback',
    required: true,
    id: 'required-feedback',
    rows: 4,
    size: 'base',
    variant: 'primary',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-96"><ae-textarea [label]="label" [placeholder]="placeholder" [required]="required" [id]="id" [rows]="rows" [size]="size" [variant]="variant" [disabled]="disabled" [error]="error" [helperText]="helperText"></ae-textarea></div>`,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
    id: 'disabled',
    rows: 4,
    size: 'base',
    variant: 'primary',
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-96"><ae-textarea [label]="label" [placeholder]="placeholder" [disabled]="disabled" [id]="id" [rows]="rows" [size]="size" [variant]="variant" [required]="required" [error]="error" [helperText]="helperText"></ae-textarea></div>`,
  }),
};

export const RowHeights: Story = {
  argTypes: {
    rows: { table: { disable: true } },
  },
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4 w-96">
        <ae-textarea label="Short Textarea (2 rows)" placeholder="Short textarea" id="short" [rows]="2" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required"></ae-textarea>
        <ae-textarea label="Medium Textarea (4 rows)" placeholder="Medium textarea" id="medium" [rows]="4" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required"></ae-textarea>
        <ae-textarea label="Tall Textarea (8 rows)" placeholder="Tall textarea" id="tall" [rows]="8" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required"></ae-textarea>
      </div>
    `,
  }),
};

export const WithValidation: Story = {
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: true,
    rows: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-96">
        <ae-textarea
          label="Validated Textarea"
          placeholder="Enter at least 10 characters"
          id="validated"
          [rows]="rows"
          [size]="size"
          [variant]="variant"
          [disabled]="disabled"
          [required]="required"
        ></ae-textarea>
        <div class="mt-4">
          <p class="text-sm text-gray-500">This textarea validates that:</p>
          <ul class="list-disc list-inside text-sm text-gray-500 ml-2">
            <li>The field is required</li>
            <li>The content is at least 10 characters long</li>
          </ul>
        </div>
      </div>
    `,
  }),
};
