import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputDirective, FormControlDirective, type InputSize, type InputVariant } from './input.directive';
import { IconDirective } from '../Icon/icon.directive';
import { FormsModule } from '@angular/forms';

export interface InputStoryArgs {
  type?: string;
  size?: InputSize;
  variant?: InputVariant;
  label?: string;
  placeholder?: string;
  value?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const meta: Meta<InputStoryArgs> = {
  title: 'Components/Input',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [InputDirective, FormControlDirective, IconDirective, FormsModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search'],
      description: 'HTML input type attribute',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'] as InputSize[],
      description: 'The sizing scale of the form control',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'] as InputVariant[],
      description: 'Color styling of focus ring and borders',
    },
    label: {
      control: 'text',
      description: 'Primary text label above input',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder hint text',
    },
    value: {
      control: 'text',
      description: 'Controlled input string value',
    },
    helperText: {
      control: 'text',
      description: 'Helper description text below the input',
    },
    error: {
      control: 'text',
      description: 'Error message text that triggers error styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user input interaction',
    },
    required: {
      control: 'boolean',
      description: 'Indicates mandatory field requirement',
    },
  },
  args: {
    type: 'text',
    size: 'base',
    variant: 'primary',
    label: 'Standard Input',
    placeholder: 'Enter your details...',
    value: '',
    helperText: 'We will never share your personal information.',
    error: '',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<InputStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-6 max-w-md">
        <div aeFormControl [size]="size" [variant]="variant" [error]="!!error">
          @if (label) {
            <label for="sample-input">
              {{ label }}
              @if (required) {
                <span class="text-aered-600 ms-0.5">*</span>
              }
            </label>
          }
          <div class="form-control-input">
            <input
              aeInput
              id="sample-input"
              [type]="type"
              [placeholder]="placeholder"
              [value]="value"
              [disabled]="disabled"
              [required]="required"
            />
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

export const WithIconsAndPrefix: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-6 p-6 max-w-md">
        <div aeFormControl>
          <label for="search-inp">Search Portal</label>
          <div class="form-control-input">
            <span class="control-prefix">
              <svg aeIcon name="magnifying-glass" [size]="20" class="w-5 h-5"></svg>
            </span>
            <input aeInput id="search-inp" type="search" placeholder="Search for federal services..." />
          </div>
        </div>

        <div aeFormControl>
          <label for="email-inp">Official Email</label>
          <div class="form-control-input">
            <span class="control-prefix">
              <svg aeIcon name="user" [size]="20" class="w-5 h-5"></svg>
            </span>
            <input aeInput id="email-inp" type="email" placeholder="user@ministry.gov.ae" />
          </div>
        </div>

        <div aeFormControl>
          <label for="domain-inp">Website Domain</label>
          <div class="form-control-input">
            <span class="control-prefix"><span>https://</span></span>
            <input aeInput id="domain-inp" type="text" placeholder="entity" />
            <span class="control-suffix"><span>.gov.ae</span></span>
          </div>
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
      <div class="p-6 max-w-md">
        <div aeFormControl [error]="true">
          <label for="err-email">Email Address <span class="text-aered-600">*</span></label>
          <div class="form-control-input">
            <input aeInput id="err-email" type="email" value="invalid-email-format" />
          </div>
          <p class="error-message">Please enter a valid official email address.</p>
        </div>
      </div>
    `,
  }),
};
