import { Component } from '@angular/core';
import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import './storybook.css';

@Component({
  standalone: true,
  template: '',
})
class StorybookDummyRouteComponent {}

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([
          { path: '**', component: StorybookDummyRouteComponent },
        ]),
      ],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f7f7f7' },
        { name: 'dark', value: '#1b1d21' },
      ],
    },
  },
};

export default preview;
