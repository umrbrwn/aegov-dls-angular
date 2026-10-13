import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { ToggleComponent, type ToggleVariant } from './toggle.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<ToggleComponent> = {
  title: 'Components/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ToggleComponent, FormsModule],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 'toggle-switch-demo',
    name: undefined,
    value: undefined,
    label: 'I agree with the terms and conditions',
    srOnlyLabel: '',
    variant: 'default',
    checked: true,
    withIcon: false,
    disabled: false,
    required: false,
    className: '',
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'HTML ID attribute',
    },
    name: {
      control: 'text',
      description: 'HTML name attribute',
    },
    value: {
      control: 'text',
      description: 'HTML value attribute',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'mode', 'secondary'] as ToggleVariant[],
      description: 'Defines the visual style of the toggle',
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state',
    },
    withIcon: {
      control: 'boolean',
      description: 'Displays a changing icon inside the toggle thumb',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    label: {
      control: 'text',
      description: 'Visible text label accompanying the toggle',
    },
    srOnlyLabel: {
      control: 'text',
      description: 'Screen reader only label when visible label is not used',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      id: args.id || undefined,
      name: args.name || undefined,
      value: args.value || undefined,
      label: args.label || undefined,
      srOnlyLabel: args.srOnlyLabel || undefined,
    },
    template: `
      <div class="p-6">
        <ae-toggle
          [id]="id"
          [name]="name"
          [value]="value"
          [variant]="variant"
          [checked]="checked"
          [withIcon]="withIcon"
          [disabled]="disabled"
          [required]="required"
          [label]="label"
          [srOnlyLabel]="srOnlyLabel"
          [className]="className"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const WithText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6">
        <ae-toggle
          id="toggle-switch-g4wd5"
          label="I agree with the terms and conditions"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const WithIconInside: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6">
        <ae-toggle
          id="toggle-switch-icon-fb28fv2"
          label="I agree with the terms and conditions"
          [withIcon]="true"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const SuccessColor: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 flex flex-col gap-4">
        <ae-toggle
          id="toggle-success-1"
          variant="success"
          [checked]="true"
          label="Enable notifications"
        ></ae-toggle>

        <ae-toggle
          id="toggle-success-2"
          variant="success"
          [checked]="false"
          label="Automatic updates"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const ModeToggle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 flex flex-col gap-4">
        <ae-toggle
          id="toggle-mode-1"
          variant="mode"
          [checked]="false"
          label="Switch to Dark Mode"
        ></ae-toggle>

        <ae-toggle
          id="toggle-mode-2"
          variant="mode"
          [checked]="true"
          label="Dark Mode Enabled"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const SecondaryColor: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 flex flex-col gap-4">
        <ae-toggle
          id="toggle-sec-1"
          variant="secondary"
          [checked]="true"
          label="Option 1 (Secondary)"
        ></ae-toggle>

        <ae-toggle
          id="toggle-sec-2"
          variant="secondary"
          [checked]="false"
          label="Option 2 (Secondary)"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const RequiredState: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 flex flex-col gap-4">
        <ae-toggle
          id="toggle-req-1"
          [required]="true"
          [checked]="false"
          label="I agree to the terms and privacy policy"
        ></ae-toggle>

        <ae-toggle
          id="toggle-req-2"
          variant="success"
          [required]="true"
          [checked]="true"
          label="Required Two-Factor Authentication"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const DisabledState: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 flex flex-col gap-4">
        <ae-toggle
          id="toggle-dis-1"
          [disabled]="true"
          [checked]="false"
          label="Disabled Unchecked Toggle"
        ></ae-toggle>

        <ae-toggle
          id="toggle-dis-2"
          [disabled]="true"
          [checked]="true"
          label="Disabled Checked Toggle"
        ></ae-toggle>

        <ae-toggle
          id="toggle-dis-3"
          variant="success"
          [disabled]="true"
          [checked]="true"
          label="Disabled Success Toggle"
        ></ae-toggle>
      </div>
    `,
  }),
};

export const RtlSupport: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 flex flex-col gap-4" dir="rtl">
        <ae-toggle
          id="toggle-rtl-1"
          [checked]="true"
          label="أوافق على الشروط والأحكام"
        ></ae-toggle>

        <ae-toggle
          id="toggle-rtl-2"
          variant="success"
          [checked]="true"
          [withIcon]="true"
          label="تمكين الإشعارات الفورية"
        ></ae-toggle>

        <ae-toggle
          id="toggle-rtl-3"
          variant="mode"
          [checked]="false"
          label="تفعيل الوضع الداكن"
        ></ae-toggle>
      </div>
    `,
  }),
};
