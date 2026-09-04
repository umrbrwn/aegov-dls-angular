import type { Meta, StoryObj } from '@storybook/angular';
import { BlockquoteComponent } from './blockquote.component';

const meta: Meta<BlockquoteComponent> = {
  title: 'Components/Blockquote',
  component: BlockquoteComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['soft', 'solid'],
    },
    author: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<BlockquoteComponent>;

export const Default: Story = {
  args: {
    tone: 'soft',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-blockquote [tone]="tone">
        "The future belongs to those who can imagine it, design it, and execute it. It isn't something you await, but rather create."
      </ae-blockquote>
    `,
  }),
};

export const WithAuthor: Story = {
  args: {
    author: 'Sheikh Mohammed bin Rashid Al Maktoum',
    tone: 'soft',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-blockquote [author]="author" [tone]="tone">
        "The future belongs to those who can imagine it, design it, and execute it. It isn't something you await, but rather create."
      </ae-blockquote>
    `,
  }),
};

export const Solid: Story = {
  args: {
    author: 'Sheikh Mohammed bin Rashid Al Maktoum',
    tone: 'solid',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-blockquote [author]="author" [tone]="tone">
        "The future belongs to those who can imagine it, design it, and execute it. It isn't something you await, but rather create."
      </ae-blockquote>
    `,
  }),
};

export const ShortQuote: Story = {
  args: {
    author: 'Sheikh Zayed bin Sultan Al Nahyan',
    tone: 'soft',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-blockquote [author]="author" [tone]="tone">
        "Future generations will be living in a world that is very different from that to which we are accustomed."
      </ae-blockquote>
    `,
  }),
};
