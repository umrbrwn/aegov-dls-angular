import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ModalComponent, type ModalSize, type ModalPlacement, type ModalVariant } from './modal.component';
import { ModalService } from './modal.service';
import { ButtonDirective } from '../Button/button.directive';
import { IconDirective } from '../Icon/icon.directive';

interface ModalStoryArgs {
  isOpen?: boolean;
  title?: string;
  bodyText?: string;
  size?: ModalSize;
  variant?: ModalVariant;
  placement?: ModalPlacement;
  backdrop?: 'dynamic' | 'static';
  showBackdrop?: boolean;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
}

const meta: Meta<ModalStoryArgs> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ModalComponent, ButtonDirective, IconDirective],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the open/closed visibility state of the modal dialog',
    },
    title: {
      control: 'text',
      description: 'Modal header title text',
    },
    bodyText: {
      control: 'text',
      description: 'Modal body description text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '4xl', 'full'] as ModalSize[],
      description: 'Maximum width container sizing scale',
    },
    variant: {
      control: 'select',
      options: ['default', 'serious'] as ModalVariant[],
      description: 'Visual theme variant (serious adds alert styling)',
    },
    placement: {
      control: 'select',
      options: [
        'center',
        'top-left',
        'top-center',
        'top-right',
        'center-left',
        'center-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ] as ModalPlacement[],
      description: 'Viewport alignment position of the dialog',
    },
    backdrop: {
      control: 'select',
      options: ['dynamic', 'static'],
      description: 'Backdrop behavior (dynamic closes on click)',
    },
    showBackdrop: {
      control: 'boolean',
      description: 'Whether to render the darkened backdrop overlay',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Displays standard top-right close icon button',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing ESC key closes the modal',
    },
    confirmLabel: {
      control: 'text',
      description: 'Primary action button label',
    },
    cancelLabel: {
      control: 'text',
      description: 'Secondary cancellation button label',
    },
    className: {
      control: 'text',
      description: 'Additional custom CSS classes',
    },
  },
  args: {
    isOpen: false,
    title: 'Hello',
    bodyText: 'To close the modal, you can use any of the following methods:',
    size: 'lg',
    variant: 'default',
    placement: 'center',
    backdrop: 'dynamic',
    showBackdrop: true,
    showCloseButton: true,
    closeOnEscape: true,
    confirmLabel: 'Close',
    cancelLabel: '',
    className: '',
  },
};

export default meta;
type Story = StoryObj<ModalStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 min-h-[500px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          [isOpen]="isOpen"
          [title]="title"
          [size]="size"
          [variant]="variant"
          [placement]="placement"
          [backdrop]="backdrop"
          [showBackdrop]="showBackdrop"
          [showCloseButton]="showCloseButton"
          [closeOnEscape]="closeOnEscape"
          [className]="className"
        >
          <!-- Trigger Button -->
          <button trigger type="button" class="aegov-btn">
            Open Modal
          </button>

          <!-- Modal Body Content -->
          <div>
            <p class="text-base text-aeblack-700 mb-4">{{ bodyText }}</p>
            <ul class="list-decimal ps-4 space-y-3 text-sm text-aeblack-600 mb-6">
              <li>Press the "ESC" key on your keyboard.</li>
              <li>Click the close button or button below.</li>
              <li>Click outside the modal backdrop.</li>
            </ul>
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-aeblack-100">
              @if (cancelLabel) {
                <button
                  type="button"
                  class="aegov-btn btn-outline"
                  (click)="modal.closeModal()"
                >
                  {{ cancelLabel }}
                </button>
              }
              @if (confirmLabel) {
                <button
                  type="button"
                  class="aegov-btn"
                  (click)="modal.closeModal()"
                >
                  {{ confirmLabel }}
                </button>
              }
            </div>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const LanguageSelectionModal: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[500px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-lang"
          [isOpen]="true"
          size="sm"
          [showCloseButton]="true"
        >
          <button trigger type="button" class="aegov-btn">
            Choose Language
          </button>

          <h2 id="modal-lang-title" class="sr-only">Language Selection</h2>
          <div class="lang-header">
            <a href="#" class="lang-primary">English</a>
            <span class="lang-primary-divider"></span>
            <a href="#" class="lang-primary font-notokufi">عربي</a>
          </div>
          <div class="lang-other px-3 md:px-4 xl:px-5">
            <div class="px-3 md:px-4 xl:px-5">
              <p class="lang-other-title">Other languages</p>
              <ul class="divide-y divide-aeblack-100/10">
                <li><a href="#" class="lang-other-link">French</a></li>
                <li><a href="#" class="lang-other-link">Spanish</a></li>
                <li><a href="#" class="lang-other-link">German</a></li>
                <li><a href="#" class="lang-other-link">Portuguese</a></li>
                <li><a href="#" class="lang-other-link">Russian</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-6 md:mt-8 lg:mt-10 xl:mt-12">
            <p class="lang-bottom-text">
              The list of “Other languages” listed above use Google Translate to create an automated translation of content for the purpose of display. Accuracy of automated content translation is not guaranteed.
            </p>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const GoldStarRatingModal: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[500px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-gold-star"
          [isOpen]="true"
          size="sm"
          [showCloseButton]="true"
        >
          <button trigger class="inline-block">
            <img class="inline-block w-10 md:w-12 lg:w-16 xl:w-20 2xl:w-24" src="https://designsystem.gov.ae/img/global-star.png" alt="Gold Star Rating" width="90" height="90">
          </button>

          <h2 id="modal-gold-star-title" class="sr-only">Gold Star Rating Information</h2>
          <div class="text-center">
            <img class="inline-block w-28 md:w-32 lg:w-36 xl:w-40 2xl:w-44 mb-4 xl:mb-6" src="https://designsystem.gov.ae/img/global-star.png" alt="Gold Star Rating" width="180" height="180">
          </div>
          <div class="text-center">
            <p class="text-base text-aeblack-800 font-normal mb-0">
              The Federal Authority for Identity, Citizenship, Customs & Port Security was awarded a <a href="#" class="text-aegold-600 font-bold no-underline">4 star rating</a> by the Global Star Rating System for Services on 14/04/2022
            </p>
            <a href="#" class="aegov-btn mt-6 md:mt-7 xl:mt-8">Learn more</a>
          </div>
          <div class="text-center mt-4 md:mt-5 xl:mt-6">
            <a href="#" class="text-xs font-light truncate max-w-full no-underline">http://portal.gsr.ae/verify</a>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const CustomerPulseModal: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[500px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-customer-pulse"
          [isOpen]="true"
          size="4xl"
          [showCloseButton]="true"
        >
          <button trigger type="button" class="border border-2 border-primary-200 rounded-full p-2 hover:bg-primary-50">
            <svg width="40" height="40" class="w-10 h-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M165.939 129C162.318 129 159.383 131.935 159.383 135.556C159.383 139.178 162.318 142.112 165.939 142.112C169.561 142.112 172.495 139.178 172.495 135.556C172.495 131.935 169.561 129 165.939 129Z" fill="#6C4527" />
              <path d="M243.626 264.025C243.626 260.404 240.691 257.469 237.07 257.469C233.448 257.469 230.514 260.404 230.514 264.025C230.514 267.646 233.448 270.581 237.07 270.581C240.691 270.581 243.626 267.646 243.626 264.025Z" fill="#6C4527" />
              <path d="M271.889 207.457C268.268 207.457 265.333 210.392 265.333 214.013C265.333 217.635 268.268 220.569 271.889 220.569C275.511 220.569 278.445 217.635 278.445 214.013C278.445 210.392 275.511 207.457 271.889 207.457Z" fill="#6C4527" />
              <path d="M189.271 188.275H200.787C207.137 188.275 212.304 183.108 212.304 176.758V150.282C212.304 143.931 207.137 138.765 200.787 138.765C194.437 138.765 189.271 143.931 189.271 150.282V188.275ZM274.3 270.812H269.941C258.428 270.812 249.061 261.446 249.061 249.932V227.838C249.061 221.487 243.895 216.32 237.544 216.32H236.299C229.948 216.32 224.781 221.487 224.781 227.838V249.932C224.781 261.446 215.415 270.812 203.901 270.812H200.787C189.273 270.812 179.908 261.446 179.908 249.932V197.638H179.3C172.949 197.638 167.783 202.804 167.783 209.155V249.932C167.783 261.446 158.416 270.812 146.903 270.812H123.605C112.092 270.812 102.725 261.446 102.725 249.932V227.838C102.725 221.487 97.5587 216.32 91.208 216.32H22.6813C20.096 216.32 18 214.225 18 211.639C18 209.054 20.096 206.958 22.6813 206.958H91.208C102.721 206.958 112.088 216.324 112.088 227.838V249.932C112.088 256.283 117.255 261.45 123.605 261.45H146.903C153.253 261.45 158.42 256.283 158.42 249.932V209.155C158.42 197.642 167.787 188.275 179.3 188.275H179.908V150.282C179.908 138.768 189.273 129.402 200.787 129.402C212.301 129.402 221.668 138.768 221.668 150.282V176.758C221.668 188.272 212.301 197.638 200.787 197.638H189.271V249.932C189.271 256.283 194.437 261.45 200.787 261.45H203.901C210.252 261.45 215.419 256.283 215.419 249.932V227.838C215.419 216.324 224.785 206.958 236.299 206.958H237.544C249.057 206.958 258.424 216.324 258.424 227.838V249.932C258.424 256.283 263.591 261.45 269.941 261.45H274.3C280.651 261.45 285.817 256.283 285.817 249.932V227.838C285.817 216.324 295.184 206.958 306.697 206.958H377.565C380.152 206.958 382.248 209.054 382.248 211.639C382.248 214.225 380.152 216.32 377.565 216.32H306.697C300.347 216.32 295.18 221.487 295.18 227.838V249.932C295.18 261.446 285.815 270.812 274.3 270.812Z" fill="#B68A35" />
            </svg>
          </button>

          <h2 id="modal-customer-pulse-title" class="sr-only">Customer Pulse</h2>
          <img src="https://designsystem.gov.ae/img/customer-pulse-ss.png" alt="customer pulse" class="block w-full">
        </ae-modal>
      </div>
    `,
  }),
};

export const SingleAction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[450px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-single-action"
          [isOpen]="true"
          size="sm"
          [showCloseButton]="true"
        >
          <button trigger type="button" class="aegov-btn">
            Single Action
          </button>

          <div>
            <div class="bg-aegreen-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <svg aeIcon name="check" [size]="28" class="text-aegreen-600"></svg>
            </div>
            <div class="mt-3 text-center sm:mt-6">
              <h3 class="text-lg font-bold text-aeblack-900" id="modal-single-action-title">Payment successful</h3>
              <div class="mt-4">
                <p class="text-base text-aeblack-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
              </div>
            </div>
          </div>
          <div class="mt-6 md:mt-7 xl:mt-8">
            <button type="button" class="aegov-btn btn-block" (click)="modal.closeModal()">Button</button>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const SingleActionNoIcon: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[400px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-single-action-no-icon"
          [isOpen]="true"
          size="sm"
          [showCloseButton]="true"
        >
          <button trigger type="button" class="aegov-btn">
            Single Action
          </button>

          <div>
            <div class="text-center">
              <h3 class="text-lg font-bold text-aeblack-900" id="modal-single-action-no-icon-title">Payment successful</h3>
              <div class="mt-4">
                <p class="text-base text-aeblack-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
              </div>
            </div>
          </div>
          <div class="mt-6 md:mt-7 xl:mt-8">
            <button type="button" class="aegov-btn btn-block" (click)="modal.closeModal()">Button</button>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const MultipleActions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[450px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-mutiple-action"
          [isOpen]="true"
          size="sm"
          [showCloseButton]="true"
        >
          <button trigger type="button" class="aegov-btn">
            Action Buttons
          </button>

          <div>
            <div class="text-center">
              <h3 class="text-lg font-bold text-aeblack-900" id="modal-multiple-action-title">Payment successful</h3>
              <div class="mt-4">
                <p class="text-base text-aeblack-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
              </div>
            </div>
          </div>
          <div class="mt-6 md:mt-7 xl:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button type="button" class="aegov-btn w-full sm:w-auto sm:col-start-2" (click)="modal.closeModal()">Button</button>
            <button type="button" class="aegov-btn btn-soft mt-3 sm:mt-0 w-full sm:w-auto sm:col-start-1" (click)="modal.closeModal()">Button</button>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const SimpleAlert: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[450px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-simple-alert"
          [isOpen]="true"
          size="md"
        >
          <button trigger type="button" class="aegov-btn">
            Simple Alert
          </button>

          <div>
            <div class="sm:flex sm:items-start">
              <div class="bg-primary-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0">
                <svg aeIcon name="warning" [size]="28" class="text-primary-600"></svg>
              </div>
              <div class="mt-4 text-center sm:ms-8 sm:mt-0 sm:text-left">
                <h3 class="text-lg font-bold text-aeblack-950" id="modal-simple-alert-title">Deactivate account</h3>
                <div class="mt-4">
                  <p class="text-base font-normal text-aeblack-500 mb-0">Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-7 xl:mt-8 sm:flex sm:flex-row-reverse sm:gap-3">
              <button type="button" class="aegov-btn w-full sm:w-auto" (click)="modal.closeModal()">Confirm</button>
              <button type="button" class="aegov-btn btn-soft mt-3 sm:mt-0 w-full sm:w-auto" (click)="modal.closeModal()">Cancel</button>
            </div>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const PlacementBottomRight: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[500px]">
        <ae-modal
          #modal="aeModal"
          id="modal-simple-alert-placement"
          [isOpen]="true"
          backdrop="static"
          placement="bottom-right"
          size="2xl"
          wrapperBgClass="bg-primary-50"
        >
          <button trigger type="button" class="aegov-btn">
            Placement Modal
          </button>

          <div>
            <div class="sm:flex sm:items-start">
              <div class="bg-primary-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0">
                <svg aeIcon name="shield-check" [size]="28" class="text-primary-600"></svg>
              </div>
              <div class="mt-3 text-center sm:ms-8 sm:mt-0 sm:text-left">
                <h3 class="text-lg font-bold text-primary-800" id="modal-simple-alert-placement-title">Deactivate account</h3>
                <div class="mt-4 text-base font-normal text-primary-600">
                  <p>Are you sure you want to deactivate your account? Our site enables scripts (e.g. cookies) that are able to read, store, and write information on your browser and device. The information processed by this script includes data relating to you, which may include personal identifiers.</p>
                  <p class="mb-0">We use this information for various purposes - e.g. to deliver content, maintain security, enable user choice, improve our sites, and for marketing purposes. You may choose to accept or deny using our website accordingly. Learn more by visiting our Privacy Policy.</p>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-7 xl:mt-8 sm:flex sm:flex-row-reverse sm:gap-3">
              <button type="button" class="aegov-btn btn-primary w-full sm:w-auto" (click)="modal.closeModal()">Allow all and accept</button>
              <button type="button" class="aegov-btn btn-primary btn-outline mt-3 sm:mt-0 w-full sm:w-auto" (click)="modal.closeModal()">Deny and quit</button>
            </div>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const ScrollableContent: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[550px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-scroll"
          [isOpen]="true"
          backdrop="static"
          size="2xl"
          wrapperBgClass="bg-whitely-100"
        >
          <button trigger type="button" class="aegov-btn">
            Scrollable Content
          </button>

          <div>
            <div class="sm:flex sm:items-start">
              <div class="bg-primary-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0">
                <svg aeIcon name="file-text" [size]="28" class="text-primary-700"></svg>
              </div>
              <div class="mt-3 text-center sm:ms-8 sm:mt-0 sm:text-left">
                <div>
                  <h3 class="text-lg font-bold text-aeblack-800" id="modal-scroll-title">Our terms and conditions have been updated</h3>
                  <div class="mt-6 text-base font-normal text-aeblack-800 max-h-80 sm:max-h-48 md:max-h-[450px] overflow-auto">
                    <p>There has been an update to our terms and conditions, and in order to proceed, you must be aware of the following changes:</p>
                    <ul class="list-disc space-y-8 mb-14">
                      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non posuere odio. Etiam mattis porta commodo. Nulla sagittis congue mi id vehicula.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non posuere odio. Etiam mattis porta commodo. Nulla sagittis congue mi id vehicula.</li>
                    </ul>
                    <p>Further to these changes, we have also received updates about changes in third-party software used to manage this portal. Information regarding changes in the terms and conditions of third-party software use is as follows:</p>
                    <ul class="list-disc space-y-8 mb-14">
                      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non posuere odio. Etiam mattis porta commodo. Nulla sagittis congue mi id vehicula.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non posuere odio. Etiam mattis porta commodo. Nulla sagittis congue mi id vehicula.</li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non posuere odio. Etiam mattis porta commodo. Nulla sagittis congue mi id vehicula.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-7 xl:mt-8 sm:flex sm:flex-row-reverse sm:gap-3">
              <button type="button" class="aegov-btn btn-primary w-full sm:w-auto" (click)="modal.closeModal()">I have understood these updates</button>
            </div>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const ConfirmationStandard: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[450px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-confirm-standard"
          [isOpen]="true"
          size="xl"
        >
          <button trigger type="button" class="aegov-btn">
            Confirm Standard
          </button>

          <div>
            <div class="sm:flex sm:items-start">
              <div class="bg-aegreen-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0">
                <svg aeIcon name="check-circle" [size]="28" class="text-aegreen-600"></svg>
              </div>
              <div class="mt-4 text-center sm:ms-8 sm:mt-0 sm:text-left">
                <h3 class="text-lg font-bold text-aeblack-950" id="modal-confirm-standard-title">Are you sure you want to submit this application?</h3>
                <div class="mt-4">
                  <p class="text-base font-normal text-aeblack-800 mb-0">You are about to submit the application to process a medical fitness examination at the Nadd Al Sheeba Medical Centre, Dubai. Are you sure you want to proceed?</p>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-7 xl:mt-8 sm:flex items-center">
              <div class="aegov-check-item sm:pl-20 mb-4 sm:mb-0 justify-center sm:justify-start">
                <input id="modal-standard-checkbox" type="checkbox" value="0">
                <label for="modal-standard-checkbox" class="text-aeblack-400">Don’t show me this message again</label>
              </div>
              <div class="sm:flex sm:flex-row-reverse sm:gap-3 sm:ml-auto">
                <button type="button" class="aegov-btn w-full sm:w-auto" (click)="modal.closeModal()">Confirm</button>
                <button type="button" class="aegov-btn btn-soft mt-3 sm:mt-0 w-full sm:w-auto" (click)="modal.closeModal()">Cancel</button>
              </div>
            </div>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const ConfirmationStandardRTL: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[450px] flex items-center justify-center" dir="rtl" lang="ar">
        <ae-modal
          #modal="aeModal"
          id="modal-confirm-standard-rtl"
          [isOpen]="true"
          size="xl"
        >
          <button trigger type="button" class="aegov-btn font-notokufi">
            تأكيد قياسي
          </button>

          <div class="font-notokufi">
            <div class="sm:flex sm:items-start">
              <div class="bg-aegreen-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0">
                <svg aeIcon name="check-circle" [size]="28" class="text-aegreen-600"></svg>
              </div>
              <div class="mt-4 text-center sm:ms-8 sm:mt-0 sm:text-right">
                <h3 class="text-lg font-bold text-aeblack-950" id="modal-confirm-standard-rtl-title">هل أنت متأكد من رغبتك في إرسال هذا الطلب؟</h3>
                <div class="mt-4">
                  <p class="text-base font-normal text-aeblack-800 mb-0">أنت على وشك إرسال طلب لمعالجة فحص اللياقة الطبية في مركز ند الشبا الصحي، دبي. هل أنت متأكد من رغبتك في المتابعة؟</p>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-7 xl:mt-8 sm:flex items-center">
              <div class="aegov-check-item sm:pr-20 mb-4 sm:mb-0 justify-center sm:justify-start">
                <input id="modal-standard-checkbox-rtl" type="checkbox" value="0">
                <label for="modal-standard-checkbox-rtl" class="text-aeblack-400">عدم إظهار هذه الرسالة مرة أخرى</label>
              </div>
              <div class="sm:flex sm:flex-row-reverse sm:gap-3 sm:mr-auto sm:ml-0">
                <button type="button" class="aegov-btn w-full sm:w-auto" (click)="modal.closeModal()">تأكيد</button>
                <button type="button" class="aegov-btn btn-soft mt-3 sm:mt-0 w-full sm:w-auto" (click)="modal.closeModal()">إلغاء</button>
              </div>
            </div>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

export const ConfirmationSerious: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div class="p-8 min-h-[450px] flex items-center justify-center">
        <ae-modal
          #modal="aeModal"
          id="modal-confirm-serious"
          [isOpen]="true"
          size="2xl"
          variant="serious"
          className='modal-serious'
        >
          <button trigger type="button" class="aegov-btn">
            Serious
          </button>

          <div>
            <div class="sm:flex sm:items-start">
              <div class="bg-aered-100 mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0">
                <svg aeIcon name="warning" [size]="28" class="text-aered-600"></svg>
              </div>
              <div class="mt-4 text-center sm:ms-8 sm:mt-0 sm:text-left">
                <h3 class="text-lg font-bold text-aeblack-950" id="modal-confirm-serious-title">Deactivate account</h3>
                <div class="mt-4">
                  <p class="text-base font-normal text-aeblack-800 mb-0">Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p>
                </div>
              </div>
            </div>
            <div class="mt-6 md:mt-7 xl:mt-8 sm:flex items-center">
              <div class="aegov-check-item sm:pl-20 mb-4 sm:mb-0 justify-center sm:justify-start">
                <input id="modal-serious-checkbox" type="checkbox" value="0">
                <label for="modal-serious-checkbox" class="text-aeblack-400">Don’t show me this message again</label>
              </div>
              <div class="sm:flex sm:flex-row-reverse sm:gap-3 sm:ml-auto">
                <button type="button" class="aegov-btn w-full sm:w-auto" (click)="modal.closeModal()">Deactivate my account</button>
                <button type="button" class="aegov-btn btn-link mt-3 sm:mt-0 w-full sm:w-auto" (click)="modal.closeModal()">Cancel</button>
              </div>
            </div>
          </div>
        </ae-modal>
      </div>
    `,
  }),
};

@Component({
  selector: 'ae-modal-service-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 flex flex-col items-center gap-6">
      <div class="text-center space-y-1">
        <h3 class="text-xl font-bold text-aeblack-950">ModalService General Mounting Service</h3>
        <p class="text-sm text-aeblack-600">
          Dynamically mount modals with custom body, icon, and any number of action buttons (1, 2, 3, 4+).
        </p>
      </div>

      <div class="flex flex-wrap gap-4 justify-center">
        <!-- 2 Buttons: Yes / No Prompt -->
        <button type="button" class="aegov-btn" (click)="openYesNoPrompt()">
          2 Buttons: Yes / No Prompt
        </button>

        <!-- 1 Button: Alert -->
        <button type="button" class="aegov-btn btn-secondary" (click)="openSingleButtonAlert()">
          1 Button: Alert Dialog
        </button>

        <!-- 3 Buttons: Save / Discard / Cancel (No ESC) -->
        <button type="button" class="aegov-btn btn-soft" (click)="openThreeButtons()">
          3 Buttons: Save / Discard (No ESC)
        </button>


        <!-- RTL Arabic Dialog -->
        <button type="button" class="aegov-btn btn-outline font-notokufi" (click)="openRtlPrompt()">
          حوار برمجي (RTL)
        </button>

        <!-- Custom Template -->
        <button type="button" class="aegov-btn btn-soft" (click)="openCustomTemplate(myTpl)">
          Template Modal
        </button>
      </div>

      @if (lastResult) {
        <div class="p-4 rounded-lg bg-whitely-100 border border-aeblack-200 text-sm text-aeblack-800 max-w-lg w-full text-center">
          <span class="font-semibold text-primary-700">Modal Output:</span> {{ lastResult }}
        </div>
      }

      <ng-template #myTpl let-data let-modalRef="modalRef">
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-aeblack-900">Custom Programmatic Template</h3>
          <p class="text-sm text-aeblack-600 leading-relaxed">
            Data passed to modal: <strong class="text-aeblack-900">{{ data?.userName }}</strong> ({{ data?.role }})
          </p>
          <div class="flex justify-end gap-3 pt-4 border-t border-aeblack-100">
            <button type="button" class="aegov-btn btn-soft" (click)="modalRef.dismiss()">
              Dismiss
            </button>
            <button type="button" class="aegov-btn" (click)="modalRef.close('Approved and verified')">
              Approve
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class ModalServiceDemoComponent {
  private readonly modalService = inject(ModalService);
  lastResult = '';

  /**
   * 2 Buttons (Standard Yes / No Prompt)
   */
  openYesNoPrompt(): void {
    const ref = this.modalService.open({
      title: 'Submit Application?',
      body:
        'You are about to submit the application to process a medical fitness examination at the Nadd Al Sheeba Medical Centre, Dubai. Are you sure you want to proceed?',
      icon: 'check-circle',
      actions: [
        {
          label: 'Yes, Submit',
          variant: 'primary',
          value: 'yes',
        },
        {
          label: 'No, Cancel',
          variant: 'soft',
          value: 'no',
        },
      ],
    });

    ref.afterClosed().subscribe((res) => {
      this.lastResult = `Yes/No prompt response: "${res ?? 'Dismissed'}"`;
    });
  }

  /**
   * 1 Button (Single action acknowledgment / alert)
   */
  openSingleButtonAlert(): void {
    const ref = this.modalService.open({
      title: 'Payment Successful',
      body:
        'Your transaction has been processed successfully. A confirmation receipt has been sent to your registered email address.',
      icon: 'check-circle',
      actions: [
        {
          label: 'Acknowledge',
          variant: 'primary',
          value: 'acknowledged',
        },
      ],
    });

    ref.afterClosed().subscribe((res) => {
      this.lastResult = `Alert dialog: "${res ?? 'Dismissed'}"`;
    });
  }

  /**
   * 3 Buttons (Save / Discard / Cancel) - Modal that does NOT close on ESC or backdrop click
   */
  openThreeButtons(): void {
    const ref = this.modalService.open({
      title: 'Unsaved Changes',
      body: 'You have unsaved changes in this form. Would you like to save them before exiting? <br/><span class="text-xs text-aeblack-500 font-medium mt-2 block">(Note: This modal has closeOnEscape disabled and static backdrop).</span>',
      icon: 'warning',
      size: 'md',
      closeOnEscape: false,
      backdrop: 'static',
      actions: [
        {
          label: 'Save Changes',
          variant: 'primary',
          value: 'save',
        },
        {
          label: 'Discard',
          variant: 'soft',
          value: 'discard',
        },
        {
          label: 'Cancel',
          variant: 'link',
          value: 'cancel',
        },
      ],
    });

    ref.afterClosed().subscribe((res) => {
      this.lastResult = `3-button dialog result: "${res ?? 'Dismissed'}"`;
    });
  }


  /**
   * RTL Dialog (Arabic)
   */
  openRtlPrompt(): void {
    const ref = this.modalService.open({
      title: 'هل أنت متأكد من رغبتك في إرسال هذا الطلب؟',
      body: 'أنت على وشك إرسال طلب لمعالجة فحص اللياقة الطبية في مركز ند الشبا الصحي، دبي. هل أنت متأكد من رغبتك في المتابعة؟',
      dir: 'rtl',
      icon: 'check-circle',
      actions: [
        {
          label: 'تأكيد وإرسال',
          variant: 'primary',
          value: 'confirmed',
        },
        {
          label: 'حفظ كمسودة',
          variant: 'soft',
          value: 'draft',
        },
        {
          label: 'إلغاء',
          variant: 'link',
          value: 'cancel',
        },
      ],
    });

    ref.afterClosed().subscribe((res) => {
      this.lastResult = `RTL Arabic dialog result: "${res ?? 'Dismissed'}"`;
    });
  }

  /**
   * Custom Template
   */
  openCustomTemplate(tpl: TemplateRef<any>): void {
    const ref = this.modalService.open(tpl, {
      title: 'Template Dialog',
      size: 'md',
      showCloseButton: true,
      data: { userName: 'Muhammad', role: 'Software Engineer' },
    });

    ref.afterClosed().subscribe((res) => {
      this.lastResult = `Template dialog closed: ${res ? JSON.stringify(res) : 'Dismissed without result'}`;
    });
  }
}

export const ProgrammaticServiceUsage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    moduleMetadata: {
      imports: [ModalServiceDemoComponent],
    },
    template: `
      <ae-modal-service-demo></ae-modal-service-demo>
    `,
  }),
};



