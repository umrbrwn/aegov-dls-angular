import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonDirective, type AegovButtonVariant, type AegovButtonColor, type AegovButtonSize } from './button.directive';
import { IconDirective } from '../Icon/icon.directive';

export interface ButtonStoryArgs {
  variant?: AegovButtonVariant;
  color?: AegovButtonColor;
  size?: AegovButtonSize;
  disabled?: boolean;
  isIcon?: boolean;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  href?: string;
}

const meta: Meta<ButtonStoryArgs> = {
  title: 'Components/Button',
  decorators: [
    moduleMetadata({
      imports: [ButtonDirective, IconDirective],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'link'],
      description: 'Button visual variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button color palette',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg'],
      description: 'Button size',
    },
    isIcon: {
      control: 'boolean',
      description: 'Whether the button is an icon-only button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    href: {
      control: 'text',
      description: 'Optional URL to render as an anchor link',
    },
    label: {
      control: 'text',
      description: 'Button text label',
    },
  },
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'base',
    disabled: false,
    isIcon: false,
    type: 'button',
    href: '',
    label: 'Button',
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      @if (href) {
        <a
          aeButton
          [href]="href"
          [variant]="variant"
          [color]="color"
          [size]="size"
          [isIcon]="isIcon"
          [disabled]="disabled"
        >
          @if (isIcon) {
            <svg aeIcon name="magnifying-glass"></svg>
          } @else {
            {{ label }}
          }
        </a>
      } @else {
        <button
          aeButton
          [type]="type"
          [variant]="variant"
          [color]="color"
          [size]="size"
          [isIcon]="isIcon"
          [disabled]="disabled"
        >
          @if (isIcon) {
            <svg aeIcon name="magnifying-glass"></svg>
          } @else {
            {{ label }}
          }
        </button>
      }
    `,
  }),
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <button aeButton variant="solid" color="primary" size="base">Solid button</button>
        <button aeButton variant="outline" color="primary" size="base">Outline button</button>
        <button aeButton variant="soft" color="primary" size="base">Soft button</button>
        <button aeButton variant="link" color="primary" size="base">Link button</button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <button aeButton size="lg">Large button</button>
        <button aeButton size="base">Base button</button>
        <button aeButton size="sm">Small button</button>
        <button aeButton size="xs">Extra small button</button>
      </div>
    `,
  }),
};

export const OutlineSizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <button aeButton variant="outline" size="lg">Large button</button>
        <button aeButton variant="outline" size="base">Base button</button>
        <button aeButton variant="outline" size="sm">Small button</button>
        <button aeButton variant="outline" size="xs">Extra small button</button>
      </div>
    `,
  }),
};

export const SoftSizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <button aeButton variant="soft" size="lg">Large button</button>
        <button aeButton variant="soft" size="base">Base button</button>
        <button aeButton variant="soft" size="sm">Small button</button>
        <button aeButton variant="soft" size="xs">Extra small button</button>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <button aeButton size="base">
          <svg aeIcon name="user" [size]="18"></svg>
          <span>My account</span>
        </button>
        <button aeButton size="base" variant="outline">
          <span>Register</span>
          <svg aeIcon name="arrow-right" [size]="18"></svg>
        </button>
        <button aeButton size="base" variant="soft">
          <svg aeIcon name="user" [size]="18"></svg>
          <span>Login now</span>
          <svg aeIcon name="caret-right" [size]="16"></svg>
        </button>
      </div>
    `,
  }),
};

export const IconOnly: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button aeButton [isIcon]="true" size="lg" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="20"></svg>
          </button>
          <button aeButton [isIcon]="true" size="base" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="18"></svg>
          </button>
          <button aeButton [isIcon]="true" size="sm" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="16"></svg>
          </button>
          <button aeButton [isIcon]="true" size="xs" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="14"></svg>
          </button>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button aeButton variant="outline" [isIcon]="true" size="lg" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="20"></svg>
          </button>
          <button aeButton variant="outline" [isIcon]="true" size="base" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="18"></svg>
          </button>
          <button aeButton variant="outline" [isIcon]="true" size="sm" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="16"></svg>
          </button>
          <button aeButton variant="outline" [isIcon]="true" size="xs" aria-label="Search">
            <svg aeIcon name="magnifying-glass" [size]="14"></svg>
          </button>
        </div>
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
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <button aeButton color="secondary" variant="solid">Solid button</button>
        <button aeButton color="secondary" variant="outline">Outline button</button>
        <button aeButton color="secondary" variant="soft">Soft button</button>
        <button aeButton color="secondary" variant="link">Link button</button>
      </div>
    `,
  }),
};
