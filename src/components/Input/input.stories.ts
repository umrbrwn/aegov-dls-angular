import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { InputComponent } from './input.component';
import { IconComponent } from '../../icons/icon.component';
import { DropdownComponent } from '../Dropdown/dropdown.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [InputComponent, IconComponent, DropdownComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'base',
    variant: 'primary',
    type: 'text',
    disabled: false,
    required: false,
    placeholder: 'Enter text...',
    label: 'Label',
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
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
type Story = StoryObj<InputComponent>;

export const Basic: Story = {
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name',
    id: 'firstName',
    size: 'base',
    variant: 'primary',
    type: 'text',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-input [label]="label" [placeholder]="placeholder" [id]="id" [size]="size" [variant]="variant" [type]="type" [disabled]="disabled" [required]="required" [helperText]="helperText" [error]="error"></ae-input>`,
  }),
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email with anyone else.',
    id: 'email',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-input [label]="label" [type]="type" [placeholder]="placeholder" [helperText]="helperText" [id]="id" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required"></ae-input>`,
  }),
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'This username is already taken',
    id: 'username',
    size: 'base',
    variant: 'primary',
    type: 'text',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-input [label]="label" [placeholder]="placeholder" [error]="error" [id]="id" [size]="size" [variant]="variant" [type]="type" [disabled]="disabled" [required]="required"></ae-input>`,
  }),
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    id: 'password',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-input [label]="label" [type]="type" [placeholder]="placeholder" [id]="id" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required"></ae-input>`,
  }),
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    id: 'search',
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-input [type]="type" [placeholder]="placeholder" [id]="id" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required"></ae-input>`,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    type: 'text',
    disabled: false,
    required: false,
    placeholder: 'Enter text',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4">
        <ae-input size="sm" label="Small Input" [placeholder]="placeholder" id="small" [variant]="variant" [type]="type" [disabled]="disabled" [required]="required"></ae-input>
        <ae-input size="base" label="Base Input" [placeholder]="placeholder" id="base" [variant]="variant" [type]="type" [disabled]="disabled" [required]="required"></ae-input>
        <ae-input size="lg" label="Large Input" [placeholder]="placeholder" id="large" [variant]="variant" [type]="type" [disabled]="disabled" [required]="required"></ae-input>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    placeholder: 'Enter info...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4">
        <ae-input label="Email" type="email" [placeholder]="placeholder" id="email-prefix" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required">
          <ae-icon prefix name="envelope-simple" [size]="size === 'sm' ? 16 : size === 'lg' ? 24 : 20" class="text-gray-400"></ae-icon>
        </ae-input>
        <ae-input label="Username" [placeholder]="placeholder" id="username-prefix" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required">
          <ae-icon prefix name="user" [size]="size === 'sm' ? 16 : size === 'lg' ? 24 : 20" class="text-gray-400"></ae-icon>
        </ae-input>
        <ae-input label="Phone" type="text" [placeholder]="placeholder" id="phone-prefix" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required">
          <ae-icon prefix name="phone" [size]="size === 'sm' ? 16 : size === 'lg' ? 24 : 20" class="text-gray-400"></ae-icon>
        </ae-input>
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
    type: 'text',
    disabled: false,
    required: false,
    placeholder: 'Enter text...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4">
        <ae-input variant="primary" label="Primary Input" [placeholder]="placeholder" id="primary" [size]="size" [type]="type" [disabled]="disabled" [required]="required"></ae-input>
        <ae-input variant="secondary" label="Secondary Input" [placeholder]="placeholder" id="secondary" [size]="size" [type]="type" [disabled]="disabled" [required]="required"></ae-input>
      </div>
    `,
  }),
};

export const Required: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    id: 'required-email',
    size: 'base',
    variant: 'primary',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-input [label]="label" [type]="type" [placeholder]="placeholder" [required]="required" [id]="id" [size]="size" [variant]="variant" [disabled]="disabled"></ae-input>`,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    id: 'disabled',
    size: 'base',
    variant: 'primary',
    type: 'text',
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ae-input [label]="label" [placeholder]="placeholder" [disabled]="disabled" [id]="id" [size]="size" [variant]="variant" [type]="type" [required]="required"></ae-input>`,
  }),
};

export const WithDropdownPrefix: Story = {
  args: {
    size: 'base',
    variant: 'primary',
    disabled: false,
    required: false,
    label: 'Mobile number',
    placeholder: '50 123 4567',
    type: 'tel',
  },
  render: (args) => ({
    props: {
      ...args,
      countryCode: '+971',
      countryOptions: [
        {
          items: [
            { label: '+971 (UAE)', value: '+971' },
            { label: '+966 (KSA)', value: '+966' },
            { label: '+965 (KWT)', value: '+965' },
            { label: '+968 (OMN)', value: '+968' },
            { label: '+974 (QAT)', value: '+974' },
            { label: '+973 (BHR)', value: '+973' },
            { label: '+44 (UK)', value: '+44' },
            { label: '+1 (US)', value: '+1' },
          ],
        },
      ],
      onCountrySelect(val: string) {
        (this as any).countryCode = val;
      },
    },
    template: `
      <div class="w-80">
        <ae-input [label]="label" [placeholder]="placeholder" [type]="type" id="mobile-dropdown" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required">
          <div prefix class="flex items-center pe-3 me-1 border-e border-gray-200">
            <ae-dropdown
              [groups]="countryOptions"
              align="start"
              side="bottom"
              (select)="onCountrySelect($event)"
            >
              <div trigger class="flex items-center gap-1 cursor-pointer select-none py-1">
                <span class="text-primary-700 font-semibold text-sm">{{ countryCode }}</span>
                <ae-icon name="caret-down" [size]="14" class="text-aegold-700"></ae-icon>
              </div>
            </ae-dropdown>
          </div>
        </ae-input>
      </div>
    `,
  }),
};

export const ArabicRTL: Story = {
  args: {
    label: 'رقم الهاتف المتحرك',
    placeholder: '50 123 4567',
    id: 'mobile-ar',
    size: 'base',
    variant: 'primary',
    type: 'tel',
    disabled: false,
    required: true,
    helperText: 'يرجى إدخال رقم هاتف إماراتي صالح',
  },
  render: (args) => ({
    props: {
      ...args,
      countryCode: '+971',
      countryOptions: [
        {
          items: [
            { label: '+971 (الإمارات)', value: '+971' },
            { label: '+966 (السعودية)', value: '+966' },
            { label: '+965 (الكويت)', value: '+965' },
            { label: '+968 (عمان)', value: '+968' },
          ],
        },
      ],
      onCountrySelect(val: string) {
        (this as any).countryCode = val;
      },
    },
    template: `
      <div dir="rtl" class="w-80">
        <ae-input [label]="label" [placeholder]="placeholder" [type]="type" [id]="id" [size]="size" [variant]="variant" [disabled]="disabled" [required]="required" [helperText]="helperText" [error]="error">
          <div prefix class="flex items-center pe-3 me-1 border-e border-gray-200">
            <ae-dropdown
              [groups]="countryOptions"
              align="start"
              side="bottom"
              (select)="onCountrySelect($event)"
            >
              <div trigger class="flex items-center gap-1 cursor-pointer select-none py-1">
                <span class="text-primary-700 font-semibold text-sm">{{ countryCode }}</span>
                <ae-icon name="caret-down" [size]="14" class="text-aegold-700"></ae-icon>
              </div>
            </ae-dropdown>
          </div>
        </ae-input>
      </div>
    `,
  }),
};
