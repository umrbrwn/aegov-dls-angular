import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { TextareaDirective } from './textarea.directive';
import { FormControlDirective } from '../Input/input.directive';
import { FormsModule } from '@angular/forms';

export interface TextareaStoryArgs {
  label?: string;
  placeholder?: string;
  rows?: number;
  size?: 'sm' | 'base' | 'lg';
  variant?: 'primary' | 'secondary';
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
}

const meta: Meta<TextareaStoryArgs> = {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TextareaDirective, FormControlDirective, FormsModule],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    rows: 4,
    size: 'base',
    variant: 'primary',
    error: '',
    helperText: 'Provide detailed information about your inquiry.',
    disabled: false,
    required: false,
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    size: { control: 'select', options: ['sm', 'base', 'lg'] },
    variant: { control: 'select', options: ['primary', 'secondary'] },
    error: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<TextareaStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-96 p-6">
        <div aeFormControl [size]="size" [variant]="variant" [error]="!!error">
          @if (label) {
            <label for="sample-textarea">
              {{ label }}
              @if (required) {
                <span class="text-aered-600 ms-0.5">*</span>
              }
            </label>
          }
          <div class="form-control-input">
            <textarea
              aeTextarea
              id="sample-textarea"
              [rows]="rows"
              [placeholder]="placeholder"
              [disabled]="disabled"
              [required]="required"
            ></textarea>
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

export const ErrorState: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="w-96 p-6">
        <div aeFormControl [error]="true">
          <label for="err-desc">Description <span class="text-aered-600">*</span></label>
          <div class="form-control-input">
            <textarea aeTextarea id="err-desc" rows="4">Invalid text input</textarea>
          </div>
          <p class="error-message">We encountered a problem with your field.</p>
        </div>
      </div>
    `,
  }),
};
