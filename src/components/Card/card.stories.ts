import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardComponent, CardGroupComponent, type CardVariant, type CardSize } from './card.component';
import { IconDirective } from '../Icon/icon.directive';

const sampleNewsImage = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?&w=600&h=338&dpr=2&q=80';
const sampleCreativeImage = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?&w=600&h=800&dpr=2&q=80';
const sampleMediaLogo = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?&w=600&h=338&dpr=2&q=80';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CardComponent, CardGroupComponent, IconDirective],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'news', 'service', 'creative'] as CardVariant[],
      description: 'The visual type and layout of the card',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'] as CardSize[],
      description: 'The sizing scale of the card',
    },
    bordered: {
      control: 'boolean',
      description: 'Apply outer border to the card (.card-bordered)',
    },
    glow: {
      control: 'boolean',
      description: 'Apply interactive elevation hover glow (.card-glow)',
    },
    title: {
      control: 'text',
      description: 'Card title heading',
    },
    description: {
      control: 'text',
      description: 'Card body description',
    },
    linkText: {
      control: 'text',
      description: 'Action link text',
    },
    linkHref: {
      control: 'text',
      description: 'Action link URL',
    },
    imageSrc: {
      control: 'text',
      description: 'Optional card image URL',
    },
    imageAlt: {
      control: 'text',
      description: 'Image alt text for accessibility',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
  args: {
    variant: 'default',
    size: 'base',
    bordered: true,
    glow: true,
    title: 'The title of the card',
    description: 'The description of a card, and this may be variable based on the device or width of the viewport.',
    linkText: 'View details',
    linkHref: '#',
    imageSrc: '',
    imageAlt: 'Card image',
    className: '',
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      imageSrc: args.imageSrc || undefined,
      linkText: args.linkText || undefined,
      linkHref: args.linkHref || undefined,
    },
    template: `
      <div class="p-6 max-w-sm">
        <ae-card
          [variant]="variant"
          [size]="size"
          [bordered]="bordered"
          [glow]="glow"
          [title]="title"
          [description]="description"
          [imageSrc]="imageSrc"
          [imageAlt]="imageAlt"
          [linkText]="linkText"
          [linkHref]="linkHref"
          [className]="className"
        >
          <svg aeIcon name="file-text" [size]="36" class="text-primary-600 -scale-y-100 mb-4"></svg>
        </ae-card>
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
      <div class="space-y-8 p-6 max-w-4xl">
        <div>
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">Small (.card-sm)</span>
          <div class="max-w-xs">
            <ae-card
              size="sm"
              [bordered]="true"
              title="Small Card"
              description="Compact card padding and typography for mobile screens or dense grids."
              linkText="View details"
            ></ae-card>
          </div>
        </div>

        <div>
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">Base (.card-base / default)</span>
          <div class="max-w-sm">
            <ae-card
              size="base"
              [bordered]="true"
              title="Base Card"
              description="Standard card with regular padding, typography, and corner radius."
              linkText="View details"
            ></ae-card>
          </div>
        </div>

        <div>
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">Large (.card-lg)</span>
          <div class="max-w-md">
            <ae-card
              size="lg"
              [bordered]="true"
              title="Large Card"
              description="Prominent card with expanded padding and h4 typography for hero containers."
              linkText="View details"
            ></ae-card>
          </div>
        </div>
      </div>
    `,
  }),
};

export const MediaCard: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      sampleMediaLogo,
    },
    template: `
      <div class="p-6 max-w-md">
        <ae-card
          [bordered]="true"
          [glow]="true"
          [imageSrc]="sampleMediaLogo"
          title="The UAE Hackathon"
          description="This initiative will create an opportunity for hundreds of young people to use open data as a tool for innovation and to boost economic growth."
          linkText="View details"
        ></ae-card>
      </div>
    `,
  }),
};

export const NewsMediaCard: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      sampleNewsImage,
    },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-4xl">
        <!-- Without Border -->
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase mb-3">Without Border</h4>
          <ae-card
            variant="news"
            [imageSrc]="sampleNewsImage"
            title="TDRA empowers youth for a sustainable future through Digital Skills Forum"
            description="In alignment with the UAE government visionary theme for 2023, Today for Tomorrow, the forum epitomized TDRA dedication."
            linkText="View details"
          >
            <div card-meta class="custom-divide custom-divide-sm flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
              <span>11th Jun 2026</span>
              <span class="text-primary-600 font-medium">Press release</span>
            </div>
          </ae-card>
        </div>

        <!-- With Border & Glow -->
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase mb-3">With Border & Glow</h4>
          <ae-card
            variant="news"
            [bordered]="true"
            [glow]="true"
            [imageSrc]="sampleNewsImage"
            title="TDRA empowers youth for a sustainable future through Digital Skills Forum"
            description="In alignment with the UAE government visionary theme for 2023, Today for Tomorrow, the forum epitomized TDRA dedication."
            linkText="View details"
          >
            <div card-meta class="custom-divide custom-divide-sm flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
              <span>11th Jun 2026</span>
              <span class="text-primary-600 font-medium">Press release</span>
            </div>
          </ae-card>
        </div>
      </div>
    `,
  }),
};

export const ServiceCard: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-md">
        <ae-card
          variant="service"
          [bordered]="true"
          [glow]="true"
          title="Issuance of a vehicle registration"
          description="Through this service, you may register a vehicle, the license for the vehicle and the number plate issued to the driver."
          linkText="Start service"
        >
          <button card-action type="button" class="text-primary-600 hover:text-primary-700" title="Bookmark service">
            <svg aeIcon name="plus" [size]="24"></svg>
          </button>
        </ae-card>
      </div>
    `,
  }),
};

export const CreativeCard: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      sampleCreativeImage,
    },
    template: `
      <div class="p-6 max-w-sm">
        <ae-card
          variant="creative"
          [imageSrc]="sampleCreativeImage"
          title="Empowering women in tech and science"
        ></ae-card>
      </div>
    `,
  }),
};

export const StackedCardGroup: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-4xl">
        <h4 class="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Stacked Statistics Cards</h4>
        <ae-card-group [stacked]="true">
          <div>
            <div class="text-3xl font-extrabold text-primary-600">98.5%</div>
            <div class="text-sm font-semibold text-aeblack-900 mt-1">Customer Happiness</div>
            <p class="text-xs text-aeblack-500 mt-2">Measured across all federal digital touchpoints in 2026.</p>
          </div>

          <div>
            <div class="text-3xl font-extrabold text-primary-600">1.2M+</div>
            <div class="text-sm font-semibold text-aeblack-900 mt-1">Active Digital IDs</div>
            <p class="text-xs text-aeblack-500 mt-2">Verified citizen and resident UAE Pass profiles.</p>
          </div>

          <div>
            <div class="text-3xl font-extrabold text-primary-600">&lt; 2 min</div>
            <div class="text-sm font-semibold text-aeblack-900 mt-1">Average Service Time</div>
            <p class="text-xs text-aeblack-500 mt-2">Instantaneous end-to-end automated processing.</p>
          </div>
        </ae-card-group>
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
      <div class="space-y-8 p-6 max-w-4xl">
        <div dir="ltr" class="border border-gray-200 rounded-xl p-4">
          <div class="text-xs font-bold text-gray-500 uppercase mb-4">LTR Service Card</div>
          <div class="max-w-md">
            <ae-card
              variant="service"
              [bordered]="true"
              [glow]="true"
              title="Issuance of a vehicle registration"
              description="Through this service, you may register a vehicle, the license for the vehicle and the number plate."
              linkText="Start service"
            ></ae-card>
          </div>
        </div>

        <div dir="rtl" class="border border-primary-200 bg-primary-50/10 rounded-xl p-4">
          <div class="text-xs font-bold text-primary-700 uppercase mb-4">تخطيط من اليمين إلى اليسار (RTL)</div>
          <div class="max-w-md">
            <ae-card
              variant="service"
              [bordered]="true"
              [glow]="true"
              title="إصدار شهادة براءة ذمة"
              description="من خلال هذه الخدمة يمكن للأفراد والشركات والمؤسسات التجارية طلب إصدار شهادة براءة ذمة من المخالفات المرورية."
              linkText="ابدأ الخدمة"
            ></ae-card>
          </div>
        </div>
      </div>
    `,
  }),
};
