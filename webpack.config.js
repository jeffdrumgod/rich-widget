const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'rich-widget-content': './src/rich-widget-content.js',
    'rich-widget': './src/rich-widget.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(css$|s[ac]ss$)/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  stats: {
    colors: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      excludeChunks: ['rich-widget-content'],
      xhtml: true,
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/iframe.html',
      filename: 'iframe.html',
      excludeChunks: ['rich-widget'],
      xhtml: true,
      hash: true,
    }),
  ],
};
