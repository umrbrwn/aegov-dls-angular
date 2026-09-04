import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { CardComponent, CardLinkComponent, CardStackComponent } from './card.component';
import { IconComponent } from '../Icon/icon.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [CardComponent, CardLinkComponent, CardStackComponent, IconComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  subcomponents: {
    CardLink: CardLinkComponent as any,
    CardStack: CardStackComponent as any,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    bordered: {
      control: 'boolean',
    },
    glow: {
      control: 'boolean',
    },
  },
  args: {
    size: 'base',
    bordered: true,
    glow: false,
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    size: 'base',
    bordered: true,
    glow: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-card [size]="size" [bordered]="bordered" [glow]="glow">
        <ae-icon name="note" [size]="size === 'sm' ? 28 : size === 'lg' ? 56 : 40" class="text-primary-500"></ae-icon>
        <h5 [class]="size === 'sm' ? 'text-h6 font-extrabold' : size === 'lg' ? 'text-h4 font-extrabold' : 'text-h5 font-extrabold'">
          The title of the card
        </h5>
        <p>The description of a card, and this may be variable based on the device or width of the viewport.</p>
        <ae-card-link href="#">View details</ae-card-link>
      </ae-card>
    `,
  }),
};

export const NewsCard: Story = {
  args: {
    size: 'base',
    bordered: true,
    glow: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-card variant="news" [size]="size" [bordered]="bordered" [glow]="glow">
        <a href="#">
          <img 
            src="https://placehold.co/800x400/png" 
            alt="News" 
            class="w-full h-auto rounded-xl"
          />
        </a>
        <div [class]="size === 'sm' ? 'py-4 space-y-4' : size === 'lg' ? 'py-7 space-y-7' : 'py-6 space-y-6'">
          <div class="flex flex-wrap gap-3 text-sm text-gray-600">
            <span>11th Jun 2023</span>
            <a href="#" class="hover:text-primary-600">Press release</a>
          </div>
          <h5 [class]="size === 'sm' ? 'text-h6 font-extrabold line-clamp-3' : size === 'lg' ? 'text-h4 font-extrabold line-clamp-3' : 'text-h5 font-extrabold line-clamp-3'">
            TDRA empowers youth for a sustainable future through "Digital Skills Forum"
          </h5>
          <p class="line-clamp-3">
            In alignment with the UAE government's visionary theme for 2023, "Today for Tomorrow," 
            the forum epitomized TDRA's dedication to fostering the next generation of leaders.
          </p>
          <ae-card-link href="#">View details</ae-card-link>
        </div>
      </ae-card>
    `,
  }),
};

export const ServiceCard: Story = {
  args: {
    size: 'base',
    bordered: true,
    glow: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-card variant="service" [size]="size" [bordered]="bordered" [glow]="glow">
        <h5 [class]="size === 'sm' ? 'text-h6 font-extrabold' : size === 'lg' ? 'text-h4 font-extrabold' : 'text-h5 font-extrabold'">
          <a href="#" class="text-gray-800 hover:text-primary-800">
            Issuance of a vehicle registration
          </a>
        </h5>
        <p>
          Through this service, you may register a vehicle, the license for the vehicle 
          and the number plate issued to the driver.
        </p>
        <div class="flex items-center justify-between gap-4">
          <ae-card-link href="#">Start service</ae-card-link>
          <button class="text-primary-600 hover:text-primary-500 cursor-pointer">
            <ae-icon name="bookmark" [size]="size === 'sm' ? 24 : size === 'lg' ? 40 : 32"></ae-icon>
          </button>
        </div>
      </ae-card>
    `,
  }),
};

export const CreativeCard: Story = {
  args: {
    size: 'base',
    bordered: false,
    glow: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-card variant="creative" [size]="size" [bordered]="bordered" [glow]="glow">
        <img 
          src="https://placehold.co/800x600/png" 
          alt="Creative" 
          [class]="size === 'sm' ? 'w-full h-96 object-cover' : size === 'lg' ? 'w-full h-160 object-cover' : 'w-full h-134 object-cover'"
        />
        <div [class]="size === 'sm' ? 'absolute inset-x-0 bottom-0 z-10 p-4' : size === 'lg' ? 'absolute inset-x-0 bottom-0 z-10 p-9' : 'absolute inset-x-0 bottom-0 z-10 p-7'">
          <h2 [class]="size === 'sm' ? 'text-[1.75rem] leading-[1.15] font-extrabold text-white' : size === 'lg' ? 'text-[3rem] leading-[1.15] font-extrabold text-white' : 'text-[2.5rem] leading-[1.15] font-extrabold text-white'">
            Empowering women in tech and science
          </h2>
        </div>
      </ae-card>
    `,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <ae-card size="sm" [bordered]="bordered" [glow]="glow">
          <ae-icon name="note" [size]="28" class="text-primary-500"></ae-icon>
          <h6 class="text-h6 font-extrabold">Small Card</h6>
          <p>A small sized card with compact content.</p>
          <ae-card-link href="#">View details</ae-card-link>
        </ae-card>
        
        <ae-card size="base" [bordered]="bordered" [glow]="glow">
          <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
          <h5 class="text-h5 font-extrabold">Base Card</h5>
          <p>A base sized card with standard content.</p>
          <ae-card-link href="#">View details</ae-card-link>
        </ae-card>
        
        <ae-card size="lg" [bordered]="bordered" [glow]="glow">
          <ae-icon name="note" [size]="56" class="text-primary-500"></ae-icon>
          <h4 class="text-h4 font-extrabold">Large Card</h4>
          <p>A large sized card with expanded content.</p>
          <ae-card-link href="#">View details</ae-card-link>
        </ae-card>
      </div>
    `,
  }),
};

export const StackedCards: Story = {
  argTypes: {
    size: { table: { disable: true } },
    bordered: { table: { disable: true } },
    glow: { table: { disable: true } },
  },
  render: () => ({
    template: `
      <div class="space-y-8">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Horizontal Stack (Collapsed)</h3>
          <ae-card-stack direction="horizontal" [collapsed]="true">
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 1</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 2</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 3</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
          </ae-card-stack>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Vertical Stack (Collapsed)</h3>
          <ae-card-stack direction="vertical" [collapsed]="true">
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 1</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 2</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 3</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
          </ae-card-stack>
        </div>
      </div>
    `,
  }),
};

export const ArabicHorizontalStack: Story = {
  argTypes: {
    size: { table: { disable: true } },
    bordered: { table: { disable: true } },
    glow: { table: { disable: true } },
  },
  render: () => ({
    template: `
      <div class="space-y-8" dir="rtl">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Horizontal Stack (Collapsed)</h3>
          <ae-card-stack direction="horizontal" [collapsed]="true">
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 1</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 2</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
            <ae-card class="bg-white" [bordered]="true">
              <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
              <h5 class="text-h5 font-extrabold">Card 3</h5>
              <p>A card in a collapsed stack.</p>
              <ae-card-link href="#">View details</ae-card-link>
            </ae-card>
          </ae-card-stack>
        </div>
      </div>
    `,
  }),
};

export const CardsWithGap: Story = {
  argTypes: {
    size: { table: { disable: true } },
    bordered: { table: { disable: true } },
    glow: { table: { disable: true } },
  },
  render: () => ({
    template: `
      <ae-card-stack direction="horizontal" [gap]="4">
        <ae-card class="bg-white" [bordered]="true">
          <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
          <h5 class="text-h5 font-extrabold">Card 1</h5>
          <p>A card with gap spacing.</p>
          <ae-card-link href="#">View details</ae-card-link>
        </ae-card>
        <ae-card class="bg-white" [bordered]="true">
          <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
          <h5 class="text-h5 font-extrabold">Card 2</h5>
          <p>A card with gap spacing.</p>
          <ae-card-link href="#">View details</ae-card-link>
        </ae-card>
        <ae-card class="bg-white" [bordered]="true">
          <ae-icon name="note" [size]="40" class="text-primary-500"></ae-icon>
          <h5 class="text-h5 font-extrabold">Card 3</h5>
          <p>A card with gap spacing.</p>
          <ae-card-link href="#">View details</ae-card-link>
        </ae-card>
      </ae-card-stack>
    `,
  }),
};

export const ImageOnLeft: Story = {
  args: {
    size: 'base',
    bordered: true,
    glow: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-card [size]="size" [bordered]="bordered" [glow]="glow" class="p-0">
        <div class="flex flex-col md:flex-row items-stretch gap-0">
          <div class="shrink-0 w-full md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
              alt="Plant growing on keyboard"
              class="object-cover w-full h-40 md:h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            />
          </div>
          <div [class]="size === 'sm' ? 'flex flex-col justify-center p-4 md:p-6 w-full' : size === 'lg' ? 'flex flex-col justify-center p-7 md:p-10 w-full' : 'flex flex-col justify-center p-6 md:p-8 w-full'">
            <span class="text-sm font-semibold text-gray-500 mb-2">What's new</span>
            <h3 [class]="size === 'sm' ? 'text-h5 font-extrabold mb-2' : size === 'lg' ? 'text-h3 font-extrabold mb-4' : 'text-h4 font-extrabold mb-3'">Sustainable by design</h3>
            <p [class]="size === 'sm' ? 'text-sm text-gray-700 mb-4' : size === 'lg' ? 'text-lg text-gray-700 mb-8' : 'text-base text-gray-700 mb-6'">Sustainable web design is the practice of designing and developing websites that have a low environmental impact.</p>
            <ae-card-link href="#" class="text-primary-700 font-semibold">Read More</ae-card-link>
          </div>
        </div>
      </ae-card>
    `,
  }),
};
