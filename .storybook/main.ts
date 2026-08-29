import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config) => {
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    // Specifically process tailwind.css with style-loader, css-loader and @tailwindcss/postcss
    // without interfering with Angular's internal TypeScript / component style rules
    config.module.rules.push({
      test: /tailwind\.css$/,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [
                require('@tailwindcss/postcss'),
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default config;
