const path = require('path');
const { merge } = require('webpack-merge');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      // {
      //   test: /.s?css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     { loader: 'css-loader', options: { sourceMap: true } },
      //   ],
      // },
    ],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),
    new FixStyleOnlyEntriesPlugin()
  ],
});
