import { type Meta, type StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { InputComponent } from './input.component';
import { IconComponent } from '../Icon/icon.component';
import { DropdownComponent } from '../Dropdown/dropdown.component';
import { provideAeIcons } from '../Icon/icon-registry.service';

const demoIcons: Record<string, string> = {
  'envelope-simple': '<path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM208,192H48V64H208V192Zm-7.79-114.72-72.21,54.16-72.21-54.16a8,8,0,0,0-9.58,12.78l77,57.75a8,8,0,0,0,9.58,0l77-57.75a8,8,0,0,0-9.58-12.78Z"/>',
  'phone': '<path d="M222.37,158.46l-47.11-21.11a16,16,0,0,0-15.71,2.53L136.21,158A132.88,132.88,0,0,1,98,119.79l18.12-23.34A16,16,0,0,0,118.65,80.74L97.54,33.63A16,16,0,0,0,82.8,24H48A24,24,0,0,0,24,48,200,200,0,0,0,224,248a24,24,0,0,0,24-24V173.2A16,16,0,0,0,222.37,158.46ZM232,224a8,8,0,0,1-8,8A184.21,184.21,0,0,1,40,48a8,8,0,0,1,8-8H82.8a.49.49,0,0,1,.45.29L104.36,87.4a.5.5,0,0,1-.08.49L83.85,114.47a8,8,0,0,0-.46,9.26,148.66,148.66,0,0,0,54.88,54.88,8,8,0,0,0,9.26-.46l26.58-20.43a.5.5,0,0,1,.49-.08l47.11,21.11a.49.49,0,0,1,.29.45V224Z"/>'
};

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAeIcons(demoIcons)
      ]
    }),
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
    icon: {
      control: 'text',
      description: 'Phosphor icon name to render inside the input',
    },
    iconPosition: {
      control: 'select',
      options: ['prefix', 'suffix'],
      description: 'Position of the custom icon',
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
    template: `<ae-input [label]="label" [placeholder]="placeholder" [id]="id" [size]="size" [variant]="variant" [type]="type" [disabled]="disabled" [required]="required" [helperText]="helperText" [error]="error" [icon]="icon" [iconPosition]="iconPosition"></ae-input>`,
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
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col space-y-4 w-80">
        <ae-input
          type="search"
          placeholder="Search..."
          icon="magnifying-glass"
          [size]="size"
          [variant]="variant"
          [disabled]="disabled"
          [required]="required"
        ></ae-input>
        <ae-input
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon="envelope-simple"
          [size]="size"
          [variant]="variant"
          [disabled]="disabled"
          [required]="required"
        ></ae-input>
        <ae-input
          label="Website"
          type="url"
          placeholder="https://example.com"
          icon="globe"
          iconPosition="suffix"
          [size]="size"
          [variant]="variant"
          [disabled]="disabled"
          [required]="required"
        ></ae-input>
        <ae-input
          label="Phone"
          type="tel"
          placeholder="50 123 4567"
          [size]="size"
          [variant]="variant"
          [disabled]="disabled"
          [required]="required"
        >
          <ae-icon prefix name="phone" [size]="size === 'sm' ? 16 : size === 'lg' ? 24 : 20" className="text-gray-400"></ae-icon>
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
                <ae-icon name="caret-down" [size]="14" className="text-aegold-700"></ae-icon>
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
                <ae-icon name="caret-down" [size]="14" className="text-aegold-700"></ae-icon>
              </div>
            </ae-dropdown>
          </div>
        </ae-input>
      </div>
    `,
  }),
};
