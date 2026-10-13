import { type Meta, type StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { HyperlinkDirective, type HyperlinkVariant } from './hyperlink.directive';
import { IconDirective } from '../Icon/icon.directive';
import { provideAeIcons } from '../Icon/icon-registry.service';

const demoIcons: Record<string, string> = {
  'chat-circle-dots': '<path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"/>',
  'sparkle': '<path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"/>',
  'download-simple': '<path d="M216,144v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v48H200V144a8,8,0,0,1,16,0Zm-93.66,13.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V32a8,8,0,0,0-16,0v100.69L93.66,106.34A8,8,0,0,0,82.34,117.66Z"/>',
  'arrow-right': '<path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>',
};

export interface HyperlinkStoryArgs {
  label?: string;
  href?: string;
  variant?: HyperlinkVariant;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const meta: Meta<HyperlinkStoryArgs> = {
  title: 'Components/Hyperlink',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAeIcons(demoIcons)],
    }),
    moduleMetadata({
      imports: [HyperlinkDirective, IconDirective],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'The visible text of the hyperlink',
    },
    href: {
      control: 'text',
      description: 'Destination URL (anchor href)',
    },
    variant: {
      control: 'select',
      options: ['default', 'cta', 'soft', 'secondary', 'secondary-soft', 'btn-outline', 'btn-soft'],
      description: 'Visual style variation',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color theme of the link',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the link',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
  args: {
    label: 'Standard hyperlink',
    href: '#',
    variant: 'default',
    color: 'primary',
    disabled: false,
    className: '',
  },
};

export default meta;
type Story = StoryObj<HyperlinkStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 text-base">
        <p class="leading-relaxed text-aeblack-800">
          For more comprehensive guidelines and official regulatory updates, please visit our
          <a
            aeHyperlink
            [href]="href"
            [variant]="variant"
            [color]="color"
            [disabled]="disabled"
            [class]="className"
          >{{ label }}</a>
          portal for immediate assistance.
        </p>
      </div>
    `,
  }),
};

export const BlockCtaLink: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 flex flex-col space-y-4">
        <a aeHyperlink variant="cta" href="#">
          <span>Apply for Digital Visa Services</span>
          <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
        </a>

        <a aeHyperlink variant="cta" href="#">
          <svg aeIcon name="download-simple" [size]="20" class="me-2 link-icon"></svg>
          <span>Download Compliance Guidebook</span>
          <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
        </a>
      </div>
    `,
  }),
};

export const SoftButtonLink: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 flex flex-col space-y-4">
        <a aeHyperlink variant="soft" href="#">
          <span>Explore Open Data Catalog</span>
          <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
        </a>

        <a aeHyperlink variant="secondary-soft" href="#">
          <svg aeIcon name="chat-circle-dots" [size]="20" class="me-2 link-icon"></svg>
          <span>Customer Happiness Survey</span>
          <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
        </a>
      </div>
    `,
  }),
};

export const SecondaryBlockLink: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 max-w-sm space-y-4">
        <a aeHyperlink variant="secondary" href="#">
          <span>Ministry of Economy Laws</span>
          <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
        </a>
      </div>
    `,
  }),
};

export const StyleAsButton: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 flex flex-wrap gap-4 items-center">
        <a aeHyperlink variant="btn-outline" href="#">
          <span>Outline Link Button</span>
          <svg aeIcon name="arrow-right" [size]="16" class="ms-2"></svg>
        </a>

        <a aeHyperlink variant="btn-soft" href="#">
          <span>Soft Link Button</span>
          <svg aeIcon name="arrow-right" [size]="16" class="ms-2"></svg>
        </a>

        <a aeHyperlink variant="btn-outline" color="secondary" href="#">
          <span>Secondary Outline</span>
          <svg aeIcon name="arrow-right" [size]="16" class="ms-2"></svg>
        </a>
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
      <div class="p-8 space-y-6 max-w-md" dir="rtl">
        <p class="text-base text-aeblack-800 leading-relaxed">
          لمزيد من التفاصيل يرجى الاطلاع على
          <a aeHyperlink href="#">الدليل الإرشادي الموحد</a>
          الخاص بالخدمات الرقمية.
        </p>

        <div class="space-y-3">
          <a aeHyperlink variant="cta" href="#">
            <span>التقديم على الإقامة الذهبية</span>
            <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
          </a>

          <a aeHyperlink variant="soft" href="#">
            <svg aeIcon name="sparkle" [size]="20" class="me-2 link-icon"></svg>
            <span>استعراض الخدمات الاتحادية</span>
            <svg aeIcon name="arrow-right" [size]="20" class="ms-2 rtl:-scale-x-100 link-icon"></svg>
          </a>
        </div>
      </div>
    `,
  }),
};
