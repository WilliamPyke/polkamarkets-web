const CopyPlugin = require('copy-webpack-plugin');
const cracoPluginStyleResourcesLoader = require('craco-plugin-style-resources-loader');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: cracoPluginStyleResourcesLoader,
      options: {
        hoistUseStatements: true,
        patterns: [
          path.join(__dirname, './src/styles/utils/*.scss'),
          path.join(__dirname, './src/styles/abstracts/variables/_colors.scss'),
          path.join(__dirname, './src/styles/abstracts/variables/*.scss'),
          path.join(__dirname, './src/styles/abstracts/mixins/*.scss'),
          path.join(__dirname, './src/styles/abstracts/functions/*.scss'),
          path.join(
            __dirname,
            './src/styles/abstracts/variables/layout/*.scss'
          ),
          path.join(__dirname, './src/styles/abstracts/variables/pages/*.scss'),
          path.join(
            __dirname,
            './src/styles/abstracts/variables/components/*.scss'
          ),
          path.join(__dirname, './src/styles/themes/*.scss')
        ],
        styleType: 'scss'
      }
    }
  ],
  babel: {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-logical-assignment-operators',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-numeric-separator'
    ]
  },
  webpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'public/manifest.json',
            to: 'manifest.json',
            transform(content) {
              return content
                .toString()
                .replace(
                  /%REACT_APP_MANIFEST_SHORT_NAME%/g,
                  m => process.env[m.slice(1, m.length - 1)] || 'Polkamarkets'
                )
                .replace(
                  /%REACT_APP_MANIFEST_NAME%/g,
                  m => process.env[m.slice(1, m.length - 1)] || 'Polkamarkets'
                );
            }
          }
        ]
      })
    ]
  }
};
