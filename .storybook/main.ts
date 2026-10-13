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

    // Process .storybook/storybook.css, etc. with style-loader, css-loader and @tailwindcss/postcss
    // without interfering with Angular's internal component inline styles (?ngResource)
    config.module.rules.push({
      test: /\.css$/,
      resourceQuery: { not: [/ngResource/] },
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            import: false,
          },
        },
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
