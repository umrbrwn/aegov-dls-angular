import type { Preview } from '@storybook/angular';
import '../src/styles/tailwind.css';

const preview: Preview = {
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
