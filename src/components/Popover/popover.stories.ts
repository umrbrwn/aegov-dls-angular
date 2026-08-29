import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { PopoverComponent } from './popover.component';
import { ButtonComponent } from '../Button/button.component';
import { IconComponent } from '../../icons/icon.component';

const meta: Meta<PopoverComponent> = {
  title: 'Components/Popover',
  component: PopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, PopoverComponent, IconComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    trigger: 'click',
    side: 'bottom',
    align: 'center',
    isOpen: false,
  },
  argTypes: {
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
    side: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<PopoverComponent>;

export const Basic: Story = {
  args: {
    trigger: 'click',
    side: 'bottom',
    align: 'center',
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-popover [trigger]="trigger" [side]="side" [align]="align" [isOpen]="isOpen">
          <button trigger class="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs border border-gray-300 hover:bg-gray-50 cursor-pointer">
            <ae-icon name="list" [size]="16" class="mr-2"></ae-icon>
            Open Popover
          </button>
          <div class="flex flex-col gap-4">
            <h4 class="text-lg font-semibold text-gray-900">Popover Title</h4>
            <p class="text-sm text-gray-500">
              This is a description text that can contain any content you want to display in the popover
            </p>
            <div class="flex justify-end">
              <button class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 cursor-pointer">
                Action
              </button>
            </div>
          </div>
        </ae-popover>
      </div>
    `,
  }),
};

export const WithForm: Story = {
  args: {
    trigger: 'click',
    side: 'bottom',
    align: 'center',
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-popover [trigger]="trigger" [side]="side" [align]="align" [isOpen]="isOpen">
          <button trigger class="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs border border-gray-300 hover:bg-gray-50 cursor-pointer">
            <ae-icon name="list" [size]="16" class="mr-2"></ae-icon>
            Settings
          </button>
          <form class="flex flex-col gap-4 min-w-[240px]">
            <h4 class="text-lg font-semibold text-gray-900">Preferences</h4>
            <div class="space-y-4">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-hidden"
                  placeholder="Enter your name"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-hidden"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div class="flex justify-end gap-2">
              <button
                type="button"
                class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </ae-popover>
      </div>
    `,
  }),
};

export const Positions: Story = {
  argTypes: {
    side: { table: { disable: true } },
  },
  args: {
    trigger: 'click',
    align: 'center',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-24 flex gap-4 justify-center">
        <ae-popover side="top" [trigger]="trigger" [align]="align">
          <button trigger class="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 cursor-pointer">Top</button>
          <p class="text-sm text-gray-500">This popover appears on the top</p>
        </ae-popover>
        <ae-popover side="right" [trigger]="trigger" [align]="align">
          <button trigger class="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 cursor-pointer">Right</button>
          <p class="text-sm text-gray-500">This popover appears on the right</p>
        </ae-popover>
        <ae-popover side="bottom" [trigger]="trigger" [align]="align">
          <button trigger class="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 cursor-pointer">Bottom</button>
          <p class="text-sm text-gray-500">This popover appears on the bottom</p>
        </ae-popover>
        <ae-popover side="left" [trigger]="trigger" [align]="align">
          <button trigger class="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 cursor-pointer">Left</button>
          <p class="text-sm text-gray-500">This popover appears on the left</p>
        </ae-popover>
      </div>
    `,
  }),
};

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
    side: 'bottom',
    align: 'center',
    isOpen: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-20 flex justify-center">
        <ae-popover [trigger]="trigger" [side]="side" [align]="align" [isOpen]="isOpen">
          <button trigger class="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-primary-500 cursor-pointer">
            <ae-icon name="list" [size]="16" class="mr-2"></ae-icon>
            Hover Me
          </button>
          <div class="flex flex-col gap-4">
            <h4 class="text-lg font-semibold text-gray-900">Hover Popover</h4>
            <p class="text-sm text-gray-500">
              This popover appears when you hover over the trigger button.
            </p>
            <div class="flex justify-end">
              <button class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 cursor-pointer">
                Action
              </button>
            </div>
          </div>
        </ae-popover>
      </div>
    `,
  }),
};
