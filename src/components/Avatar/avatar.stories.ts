import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AvatarComponent, type AvatarSize, type AvatarVariant, type AvatarStatus } from './avatar.component';

const sampleUserImage = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';
const sampleUserImage2 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=128&h=128&dpr=2&q=80';
const sampleUserImage3 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=128&h=128&dpr=2&q=80';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AvatarComponent],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as AvatarSize[],
      description: 'The size variation of the avatar',
    },
    variant: {
      control: 'select',
      options: ['square', 'rounded'] as AvatarVariant[],
      description: 'The shape style variation (squared or rounded)',
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline'] as AvatarStatus[],
      description: 'Status dot indicator state',
    },
    src: {
      control: 'text',
      description: 'Image URL source',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    noUser: {
      control: 'boolean',
      description: 'Display fallback no-user placeholder state',
    },
    indicatorClass: {
      control: 'text',
      description: 'Custom CSS classes for the status indicator',
    },
    statusLabel: {
      control: 'text',
      description: 'Accessible aria-label for status indicator dot',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
  args: {
    src: sampleUserImage,
    alt: 'Fatima Al Mansoori',
    size: 'base',
    variant: 'square',
    status: 'none',
    noUser: false,
    indicatorClass: '',
    statusLabel: '',
    className: '',
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      statusLabel: args.statusLabel || undefined,
    },
    template: `
      <div class="p-8 flex items-center justify-center">
        <ae-avatar
          [src]="src"
          [alt]="alt"
          [size]="size"
          [variant]="variant"
          [status]="status"
          [noUser]="noUser"
          [indicatorClass]="indicatorClass"
          [statusLabel]="statusLabel"
          [className]="className"
        ></ae-avatar>
      </div>
    `,
  }),
};

export const StyleVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      src: sampleUserImage,
    },
    template: `
      <div class="flex items-center gap-8 p-6">
        <div class="flex flex-col items-center gap-2">
          <ae-avatar [src]="src" variant="square" size="lg" alt="Squared Avatar"></ae-avatar>
          <span class="text-xs font-medium text-aeblack-600">Squared (Default)</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ae-avatar [src]="src" variant="rounded" size="lg" alt="Rounded Avatar"></ae-avatar>
          <span class="text-xs font-medium text-aeblack-600">Rounded (.avatar-rounded)</span>
        </div>
      </div>
    `,
  }),
};

export const SizeVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      src: sampleUserImage,
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as AvatarSize[],
    },
    template: `
      <div class="space-y-8 p-6">
        <div>
          <h3 class="text-sm font-semibold text-aeblack-700 uppercase tracking-wider mb-4">Squared Avatars</h3>
          <div class="flex flex-wrap items-end gap-6">
            @for (s of sizes; track s) {
              <div class="flex flex-col items-center gap-2">
                <ae-avatar [src]="src" [size]="s" variant="square" [alt]="s"></ae-avatar>
                <span class="text-xs text-aeblack-500 font-mono">{{ s }}</span>
              </div>
            }
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-aeblack-700 uppercase tracking-wider mb-4">Rounded Avatars</h3>
          <div class="flex flex-wrap items-end gap-6">
            @for (s of sizes; track s) {
              <div class="flex flex-col items-center gap-2">
                <ae-avatar [src]="src" [size]="s" variant="rounded" [alt]="s"></ae-avatar>
                <span class="text-xs text-aeblack-500 font-mono">{{ s }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithIndicator: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      src: sampleUserImage,
      sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as AvatarSize[],
    },
    template: `
      <div class="space-y-8 p-6">
        <div>
          <h3 class="text-sm font-semibold text-aeblack-700 uppercase tracking-wider mb-4">Status Indicators (Squared)</h3>
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [src]="src" size="lg" status="online" alt="Online User"></ae-avatar>
              <span class="text-xs text-aeblack-600">Online (.bg-aegreen-500)</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [src]="src" size="lg" status="offline" alt="Offline User"></ae-avatar>
              <span class="text-xs text-aeblack-600">Offline (.bg-aered-500)</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [src]="src" size="lg" indicatorClass="bg-camel-500 ring-whitely-50" alt="Away User"></ae-avatar>
              <span class="text-xs text-aeblack-600">Custom (Away)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-aeblack-700 uppercase tracking-wider mb-4">Status Indicators (Rounded)</h3>
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [src]="src" variant="rounded" size="lg" status="online" alt="Online User"></ae-avatar>
              <span class="text-xs text-aeblack-600">Online</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [src]="src" variant="rounded" size="lg" status="offline" alt="Offline User"></ae-avatar>
              <span class="text-xs text-aeblack-600">Offline</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-aeblack-700 uppercase tracking-wider mb-4">Indicators Across All Sizes</h3>
          <div class="flex flex-wrap items-end gap-6">
            @for (s of sizes; track s) {
              <div class="flex flex-col items-center gap-2">
                <ae-avatar [src]="src" [size]="s" variant="rounded" status="online" [alt]="s"></ae-avatar>
                <span class="text-xs text-aeblack-500 font-mono">{{ s }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    `,
  }),
};

export const PlaceholderNoUser: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="space-y-6 p-6">
        <div>
          <h3 class="text-sm font-semibold text-aeblack-700 uppercase tracking-wider mb-2">No-User Placeholder (.no-user)</h3>
          <p class="text-xs text-aeblack-500 mb-4">Automatically displays the official AEGov placeholder silhouette when no image is specified or on image error.</p>
          <div class="flex items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [noUser]="true" size="lg" alt="No User"></ae-avatar>
              <span class="text-xs text-aeblack-600">Squared Placeholder</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [noUser]="true" variant="rounded" size="lg" alt="No User"></ae-avatar>
              <span class="text-xs text-aeblack-600">Rounded Placeholder</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <ae-avatar [noUser]="true" variant="rounded" size="lg" status="online" alt="No User Online"></ae-avatar>
              <span class="text-xs text-aeblack-600">Placeholder + Online</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const UserListExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      users: [
        { name: 'Dr. Rashid Al Nuaimi', role: 'Medical Director', src: sampleUserImage3, status: 'online' as AvatarStatus },
        { name: 'Fatima Al Mansoori', role: 'Senior Consultant', src: sampleUserImage, status: 'online' as AvatarStatus },
        { name: 'Mariam Al Zaabi', role: 'Support Specialist', src: sampleUserImage2, status: 'offline' as AvatarStatus },
        { name: 'Guest User', role: 'Pending Verification', src: undefined, status: 'none' as AvatarStatus },
      ],
    },
    template: `
      <div class="max-w-md w-full p-6 bg-white rounded-2xl border border-aeblack-100 shadow-sm">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-aeblack-100">
          <h3 class="text-base font-semibold text-aeblack-900 m-0">Available Support Specialists</h3>
          <span class="text-xs text-aeblack-500 font-medium">4 team members</span>
        </div>

        <div class="space-y-1">
          @for (u of users; track u.name) {
            <div class="flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-aeblack-50 transition-colors">
              <div class="flex items-center gap-3 min-w-0">
                <ae-avatar [src]="u.src" [status]="u.status" variant="rounded" size="base" [alt]="u.name"></ae-avatar>
                <div class="min-w-0 flex flex-col justify-center">
                  <span class="text-sm font-semibold text-aeblack-900 truncate leading-snug">{{ u.name }}</span>
                  <span class="text-xs text-aeblack-500 truncate leading-tight">{{ u.role }}</span>
                </div>
              </div>

              @if (u.status === 'online') {
                <span class="text-xs text-aegreen-700 font-medium bg-aegreen-100 px-2.5 py-0.5 rounded-full shrink-0">Active</span>
              }
            </div>
          }
        </div>
      </div>
    `,
  }),
};
