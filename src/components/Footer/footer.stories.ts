import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  FooterComponent,
  FooterTopComponent,
  FooterBottomComponent,
  FooterNavComponent,
  FooterContactComponent,
  FooterCopyrightComponent,
  FooterSocialComponent,
  type FooterCategory,
  type FooterSocialLink
} from './footer.component';

const ministryCategories: FooterCategory[] = [
  {
    title: 'The Ministry',
    links: [
      { label: 'About the ministry', href: '#about' },
      { label: 'About the minister', href: '#minister' },
      { label: 'The UAE charter for Future Services', href: '#charter' },
      { label: 'Customer happiness charter', href: '#happiness' },
      { label: 'Awards', href: '#awards' },
      { label: 'Careers', href: '#careers' },
      { label: 'Procurement', href: '#procurement' },
    ],
  },
  {
    title: 'Using the website',
    links: [
      { label: 'Sitemap', href: '#sitemap' },
      { label: 'Disclaimer', href: '#disclaimer' },
      { label: 'Privacy policy', href: '#privacy' },
      { label: 'Terms and conditions', href: '#terms' },
      { label: 'Accessibility', href: '#accessibility' },
      { label: 'Digital participation policy', href: '#participation' },
    ],
  },
  {
    title: 'Information and support',
    links: [
      { label: 'Services catalogue', href: '#catalogue' },
      { label: 'Media centre', href: '#media' },
      { label: 'Contact us', href: '#contact' },
      { label: 'FAQ’s', href: '#faqs' },
      { label: 'Feedback and complaints', href: '#feedback' },
    ],
  },
  {
    title: 'References',
    links: [
      { label: 'Regulations', href: '#regulations' },
      { label: 'Media kit', href: '#mediakit' },
      { label: 'Abbreviations and glossary', href: '#glossary' },
    ],
  },
];

const arabicCategories: FooterCategory[] = [
  {
    title: 'عن الوزارة',
    links: [
      { label: 'عن الوزارة', href: '#about' },
      { label: 'عن الوزير', href: '#minister' },
      { label: 'ميثاق الإمارات للخدمات المستقبلية', href: '#charter' },
      { label: 'ميثاق سعادة المتعاملين', href: '#happiness' },
      { label: 'الجوائز', href: '#awards' },
      { label: 'الوظائف', href: '#careers' },
      { label: 'المشتريات', href: '#procurement' },
    ],
  },
  {
    title: 'استخدام الموقع',
    links: [
      { label: 'خريطة الموقع', href: '#sitemap' },
      { label: 'إخلاء المسؤولية', href: '#disclaimer' },
      { label: 'سياسة الخصوصية', href: '#privacy' },
      { label: 'الشروط والأحكام', href: '#terms' },
      { label: 'سهولة الوصول', href: '#accessibility' },
      { label: 'سياسة المشاركة الرقمية', href: '#participation' },
    ],
  },
  {
    title: 'المعلومات والدعم',
    links: [
      { label: 'دليل الخدمات', href: '#catalogue' },
      { label: 'المركز الإعلامي', href: '#media' },
      { label: 'اتصل بنا', href: '#contact' },
      { label: 'الأسئلة الشائعة', href: '#faqs' },
      { label: 'الآراء والملاحظات والشكاوى', href: '#feedback' },
    ],
  },
  {
    title: 'المراجع',
    links: [
      { label: 'التشريعات واللوائح', href: '#regulations' },
      { label: 'الملف الصحفي', href: '#mediakit' },
      { label: 'المصطلحات والمفردات', href: '#glossary' },
    ],
  },
];

const officialSocialLinks: FooterSocialLink[] = [
  { platform: 'facebook', href: 'https://facebook.com' },
  { platform: 'instagram', href: 'https://instagram.com' },
  { platform: 'linkedin', href: 'https://linkedin.com' },
  { platform: 'twitter', href: 'https://twitter.com' },
  { platform: 'youtube', href: 'https://youtube.com' },
];

const meta: Meta<FooterComponent> = {
  title: 'Components/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        FooterComponent,
        FooterTopComponent,
        FooterBottomComponent,
        FooterNavComponent,
        FooterContactComponent,
        FooterCopyrightComponent,
        FooterSocialComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<FooterComponent>;

/**
 * Standard Declarative Footer matching strict AEGov specifications:
 * - Dynamic copyright year (auto changes each year)
 * - 171 Tawasul & entity toll-free contact layout
 * - Mobile responsive accordion
 * - Official social media channels
 */
export const Default: Story = {
  args: {
    categories: ministryCategories,
    entityName: 'Ministry of Human Resources & Emiratisation',
    tollFreeLabel: 'Toll free:',
    tollFreeNumber: '800 12',
    tollFreeHref: 'tel:80012',
    socialLabel: 'Follow us on:',
    socialLinks: officialSocialLinks,
    lastUpdated: '24/04/2026 at 15:45',
  },
  render: (args) => ({
    props: args,
    template: `
      <ae-footer
        [categories]="categories"
        [entityName]="entityName"
        [tollFreeLabel]="tollFreeLabel"
        [tollFreeNumber]="tollFreeNumber"
        [tollFreeHref]="tollFreeHref"
        [socialLabel]="socialLabel"
        [socialLinks]="socialLinks"
        [lastUpdated]="lastUpdated"
      ></ae-footer>
    `,
  }),
};

/**
 * Composable Sub-Components usage with strict AEGov subcomponent slots
 */
export const ComposableComposition: Story = {
  render: () => ({
    props: {
      categories: ministryCategories,
      socialLinks: officialSocialLinks,
    },
    template: `
      <ae-footer>
        <ae-footer-top>
          <ae-footer-nav [categories]="categories"></ae-footer-nav>
          <ae-footer-contact
            tawasulHref="https://171.ae"
            number171="171"
            number171Href="tel:171"
            landlineNumber="04-7771777"
            landlineHref="tel:047771777"
            tollFreeLabel="Toll free:"
            tollFreeNumber="800 12"
            tollFreeHref="tel:80012"
          ></ae-footer-contact>
        </ae-footer-top>

        <ae-footer-bottom>
          <ae-footer-copyright
            entityName="Ministry of Human Resources & Emiratisation"
            lastUpdated="24/04/2026 at 15:45"
          ></ae-footer-copyright>
          <ae-footer-social label="Follow us on:" [links]="socialLinks"></ae-footer-social>
        </ae-footer-bottom>
      </ae-footer>
    `,
  }),
};

/**
 * Full Arabic (RTL) localization strictly formatted according to AEGov design system
 */
export const RtlArabic: Story = {
  render: () => ({
    props: {
      categories: arabicCategories,
      socialLinks: officialSocialLinks,
    },
    template: `
      <div dir="rtl">
        <ae-footer
          [categories]="categories"
          entityName="وزارة الموارد البشرية والتوطين"
          allRightsReservedText="جميع الحقوق محفوظة."
          tollFreeLabel="الرقم المجاني:"
          tollFreeNumber="800 12"
          tollFreeHref="tel:80012"
          socialLabel="تابعنا على:"
          [socialLinks]="socialLinks"
          lastUpdatedPrefix="آخر تحديث في"
          lastUpdated="24/04/2026 الساعة 15:45"
        ></ae-footer>
      </div>
    `,
  }),
};
