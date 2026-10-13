import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BadgeDirective, type BadgeVariant, type BadgeTone, type BadgeSize } from './badge.directive';
import { IconDirective } from '../Icon/icon.directive';

export interface BadgeStoryArgs {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  label?: string;
  href?: string;
  className?: string;
}

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BadgeDirective, IconDirective],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'error', 'success', 'warning'] as BadgeVariant[],
      description: 'The semantic color type of the badge',
    },
    tone: {
      control: 'select',
      options: ['soft', 'solid'] as BadgeTone[],
      description: 'The visual tone/contrast level of the badge',
    },
    size: {
      control: 'select',
      options: ['base', 'lg'] as BadgeSize[],
      description: 'The sizing scale of the badge',
    },
    label: {
      control: 'text',
      description: 'Text label inside the badge',
    },
    href: {
      control: 'text',
      description: 'Anchor link destination URL',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
  args: {
    variant: 'default',
    tone: 'soft',
    size: 'base',
    label: 'Badge Default',
    href: '',
    className: '',
  },
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex items-center justify-center">
        @if (href) {
          <a
            aeBadge
            [href]="href"
            [variant]="variant"
            [tone]="tone"
            [size]="size"
            [class]="className"
          >
            {{ label }}
          </a>
        } @else {
          <span
            aeBadge
            [variant]="variant"
            [tone]="tone"
            [size]="size"
            [class]="className"
          >
            {{ label }}
          </span>
        }
      </div>
    `,
  }),
};

export const SoftVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-4 p-6">
        <span aeBadge variant="default">Badge Default</span>
        <span aeBadge variant="info">Badge Info</span>
        <span aeBadge variant="error">Badge Error</span>
        <span aeBadge variant="success">Badge Success</span>
        <span aeBadge variant="warning">Badge Warning</span>
      </div>
    `,
  }),
};

export const SolidVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-4 p-6">
        <span aeBadge variant="default" tone="solid">Badge Default</span>
        <span aeBadge variant="info" tone="solid">Badge Info</span>
        <span aeBadge variant="error" tone="solid">Badge Error</span>
        <span aeBadge variant="success" tone="solid">Badge Success</span>
        <span aeBadge variant="warning" tone="solid">Badge Warning</span>
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
      <div class="space-y-6 p-6">
        <div>
          <span class="text-xs font-semibold text-aeblack-500 uppercase tracking-wider block mb-3">Base Size (.badge-base / default)</span>
          <div class="flex flex-wrap items-center gap-4">
            <span aeBadge size="base" variant="default">Badge default (base)</span>
            <span aeBadge size="base" variant="info">Info</span>
            <span aeBadge size="base" variant="success">Success</span>
            <span aeBadge size="base" variant="warning">Warning</span>
            <span aeBadge size="base" variant="error">Error</span>
          </div>
        </div>

        <div>
          <span class="text-xs font-semibold text-aeblack-500 uppercase tracking-wider block mb-3">Large Size (.badge-lg)</span>
          <div class="flex flex-wrap items-center gap-4">
            <span aeBadge size="lg" variant="default">Badge large (lg)</span>
            <span aeBadge size="lg" variant="info">Info</span>
            <span aeBadge size="lg" variant="success">Success</span>
            <span aeBadge size="lg" variant="warning">Warning</span>
            <span aeBadge size="lg" variant="error">Error</span>
          </div>
        </div>
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
      <div class="space-y-6 p-6">
        <div>
          <span class="text-xs font-semibold text-aeblack-500 uppercase tracking-wider block mb-3">Soft with Icons</span>
          <div class="flex flex-wrap items-center gap-4">
            <span aeBadge variant="default">
              <svg aeIcon name="sun" [size]="16" class="badge-icon"></svg>
              <span>Default</span>
            </span>
            <span aeBadge variant="info">
              <svg aeIcon name="info" [size]="16" class="badge-icon"></svg>
              <span>Info</span>
            </span>
            <span aeBadge variant="error">
              <svg aeIcon name="warning-circle" [size]="16" class="badge-icon"></svg>
              <span>Error</span>
            </span>
            <span aeBadge variant="success">
              <svg aeIcon name="check-circle" [size]="16" class="badge-icon"></svg>
              <span>Success</span>
            </span>
            <span aeBadge variant="warning">
              <svg aeIcon name="warning" [size]="16" class="badge-icon"></svg>
              <span>Warning</span>
            </span>
          </div>
        </div>

        <div>
          <span class="text-xs font-semibold text-aeblack-500 uppercase tracking-wider block mb-3">Solid with Icons</span>
          <div class="flex flex-wrap items-center gap-4">
            <span aeBadge variant="default" tone="solid">
              <svg aeIcon name="sun" [size]="16" class="badge-icon"></svg>
              <span>Default</span>
            </span>
            <span aeBadge variant="info" tone="solid">
              <svg aeIcon name="info" [size]="16" class="badge-icon"></svg>
              <span>Info</span>
            </span>
            <span aeBadge variant="error" tone="solid">
              <svg aeIcon name="warning-circle" [size]="16" class="badge-icon"></svg>
              <span>Error</span>
            </span>
            <span aeBadge variant="success" tone="solid">
              <svg aeIcon name="check-circle" [size]="16" class="badge-icon"></svg>
              <span>Success</span>
            </span>
            <span aeBadge variant="warning" tone="solid">
              <svg aeIcon name="warning" [size]="16" class="badge-icon"></svg>
              <span>Warning</span>
            </span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const InteractiveLinkBadges: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-4 p-6">
        <a aeBadge href="#" variant="default">Link Badge</a>
        <a aeBadge href="#" variant="info">
          <svg aeIcon name="info" [size]="16" class="badge-icon"></svg>
          <span>Documentation</span>
        </a>
        <a aeBadge href="#" variant="success">
          <svg aeIcon name="check-circle" [size]="16" class="badge-icon"></svg>
          <span>Verified</span>
        </a>
        <a aeBadge href="#" variant="warning" tone="solid">Action Required</a>
      </div>
    `,
  }),
};
