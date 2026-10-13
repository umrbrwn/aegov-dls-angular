import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BlockquoteDirective, type BlockquoteVariant } from './blockquote.directive';
import { IconDirective } from '../Icon/icon.directive';

const sampleQuote =
  'The confidence of our wise leadership serves as motivation for more sincere and sustained action directed to serve our cherished homeland, which reflects a renewed incentive to continue with progress and advancement under the wise leadership of His Highness Sheikh Mohamed bin Zayed Al Nahyan, UAE President, and His Highness Sheikh Mohammed bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of Dubai and their Highnesses, Members of the Supreme Council and Rulers of the Emirates.';

const sampleArabicQuote =
  'ولا بد أن تشكل ثقة القيادة الكريمة للدولة دافعاً للمزيد من العمل المتواصل المخلص لخدمة وطننا الغالي، وهي حافز متجدد لمزيد من العطاء والعمل، لمواصلة مسيرة التقدم والرقي في ظل القيادة الرشيدة لصاحب السمو الشيخ محمد بن زايد آل نهيان رئيس الدولة حفظه الله، وأخوه صاحب السمو الشيخ محمد بن راشد آل مكتوم نائب رئيس الدولة، رئيس مجلس الوزراء حاكم دبي رعاه الله واخوانهم أصحاب السمو أعضاء المجلس الأعلى حكام الإمارات.';

export interface BlockquoteStoryArgs {
  variant?: BlockquoteVariant;
  colored?: boolean;
  quote?: string;
  author?: string;
  authorTitle?: string;
  cite?: string;
}

const meta: Meta<BlockquoteStoryArgs> = {
  title: 'Components/Blockquote',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BlockquoteDirective, IconDirective],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'colored'] as BlockquoteVariant[],
      description: 'The visual variation style of the blockquote',
    },
    colored: {
      control: 'boolean',
      description: 'Apply colored background with thick left border (.quote-colored)',
    },
    quote: {
      control: 'text',
      description: 'The quoted body text',
    },
    author: {
      control: 'text',
      description: 'Name of the credited author',
    },
    authorTitle: {
      control: 'text',
      description: 'Designation or title of the author',
    },
    cite: {
      control: 'text',
      description: 'URL or reference source of the quote',
    },
  },
  args: {
    variant: 'default',
    colored: false,
    quote: sampleQuote,
    author: 'AbdulRahman Bin Mohammed Al Owais',
    authorTitle: 'Minister of Health & Prevention',
    cite: 'https://mohap.gov.ae/en/about-us/minister-message',
  },
};

export default meta;
type Story = StoryObj<BlockquoteStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-6 max-w-4xl">
        <blockquote
          aeBlockquote
          [variant]="variant"
          [colored]="colored"
          [attr.cite]="cite"
        >
          @if (!colored) {
            <svg aeIcon name="quotes" class="quote-icon -scale-x-100 rtl:scale-x-100" [size]="48"></svg>
          }
          <p>{{ quote }}</p>
          @if (author || authorTitle) {
            <div class="quote-footer">
              @if (author) {
                <div class="quote-author">{{ author }}</div>
              }
              @if (authorTitle) {
                <div class="quote-cite">{{ authorTitle }}</div>
              }
            </div>
          }
        </blockquote>
      </div>
    `,
  }),
};

export const Colored: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-6 max-w-4xl">
        <blockquote aeBlockquote variant="colored">
          <p>${sampleQuote}</p>
          <div class="quote-footer">
            <div class="quote-author">AbdulRahman Bin Mohammed Al Owais</div>
            <div class="quote-cite">Minister of Health & Prevention</div>
          </div>
        </blockquote>
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
      <div class="space-y-8 p-6 max-w-4xl" dir="rtl">
        <blockquote aeBlockquote variant="colored">
          <p>${sampleArabicQuote}</p>
          <div class="quote-footer">
            <div class="quote-author">عبد الرحمن بن محمد العويس</div>
            <div class="quote-cite">وزير الصحة ووقاية المجتمع</div>
          </div>
        </blockquote>
      </div>
    `,
  }),
};
