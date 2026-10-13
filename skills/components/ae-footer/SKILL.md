---
name: ae-footer
description: Use when creating or configuring an AEGov footer with aegov-dls-angular.
---

# ae-footer

Import:
`FooterComponent`, `FooterNavComponent`, `FooterContactComponent`, `FooterTopComponent`, `FooterBottomComponent`, `FooterCopyrightComponent`, `FooterSocialComponent`, `FooterLink`, `FooterCategory`, `FooterSocialLink`, `FooterSocialPlatform`, `DEFAULT_TAWASUL_LOGO` from `aegov-dls-angular`

Selector: `ae-footer`

Inputs:
categories: FooterCategory[] # [{ title: string, links: [{ label: string, href?: string, target?: string }] }]
entityName: string
year: number | string
allRightsReservedText: string = 'All rights reserved.'
lastUpdated: string
lastUpdatedPrefix: string = 'Last updated on'
tawasulLogoSrc: string = DEFAULT_TAWASUL_LOGO
tawasulLogoAlt: string = 'tawasul'
tawasulHref: string = ''
number171: string = '171'
number171Href: string = 'tel:171'
landlineNumber: string = '04-7771777'
landlineHref: string = 'tel:047771777'
tollFreeLabel: string = 'Toll free:'
tollFreeNumber: string = '800 12'
tollFreeHref: string = 'tel:80012'
socialLabel: string = 'Follow us on:'
socialLinks: FooterSocialLink[]

Related:
`ae-footer-top`, `ae-footer-bottom`, `ae-footer-nav`, `ae-footer-contact`, `ae-footer-copyright`, `ae-footer-social`

Example:
```html
<ae-footer
  entityName="Ministry of Finance"
  [categories]="footerCategories"
  [socialLinks]="socialLinks"
  lastUpdated="15/09/2026 at 10:00"
></ae-footer>
```
