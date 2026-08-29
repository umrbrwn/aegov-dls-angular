import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    alt: 'Colm Tuite',
    fallback: 'CT',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    },
    variant: {
      control: 'radio',
      options: ['square', 'rounded-sm'],
    },
    status: {
      control: 'radio',
      options: ['none', 'online', 'offline'],
    },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {
  args: {
    size: 'base',
    variant: 'square',
    status: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-avatar
        [src]="src"
        [alt]="alt"
        [fallback]="fallback"
        [size]="size"
        [variant]="variant"
        [status]="status"
      ></ae-avatar>
    `,
  }),
};

export const Rounded: Story = {
  args: {
    size: 'base',
    variant: 'rounded-sm',
    status: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-avatar
        [src]="src"
        [alt]="alt"
        [fallback]="fallback"
        [size]="size"
        [variant]="variant"
        [status]="status"
      ></ae-avatar>
    `,
  }),
};

export const WithStatus: Story = {
  args: {
    size: 'base',
    variant: 'rounded-sm',
    status: 'online',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-avatar
        [src]="src"
        [alt]="alt"
        [fallback]="fallback"
        [size]="size"
        [variant]="variant"
        [status]="status"
      ></ae-avatar>
    `,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    variant: 'square',
    status: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center gap-4">
        <ae-avatar [src]="src" [alt]="alt" [fallback]="fallback" [variant]="variant" [status]="status" size="xs"></ae-avatar>
        <ae-avatar [src]="src" [alt]="alt" [fallback]="fallback" [variant]="variant" [status]="status" size="sm"></ae-avatar>
        <ae-avatar [src]="src" [alt]="alt" [fallback]="fallback" [variant]="variant" [status]="status" size="base"></ae-avatar>
        <ae-avatar [src]="src" [alt]="alt" [fallback]="fallback" [variant]="variant" [status]="status" size="lg"></ae-avatar>
        <ae-avatar [src]="src" [alt]="alt" [fallback]="fallback" [variant]="variant" [status]="status" size="xl"></ae-avatar>
        <ae-avatar [src]="src" [alt]="alt" [fallback]="fallback" [variant]="variant" [status]="status" size="2xl"></ae-avatar>
        <ae-avatar [src]="src" [alt]="alt" [fallback]="fallback" [variant]="variant" [status]="status" size="3xl"></ae-avatar>
      </div>
    `,
  }),
};

export const Fallback: Story = {
  args: {
    src: undefined,
    fallback: 'CT',
    size: 'base',
    variant: 'square',
    status: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-avatar
        [src]="src"
        [alt]="alt"
        [fallback]="fallback"
        [size]="size"
        [variant]="variant"
        [status]="status"
      ></ae-avatar>
    `,
  }),
};
