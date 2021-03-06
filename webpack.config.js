const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const nodeEnv = process.env.NODE_ENV

const config = {
  mode: (nodeEnv === 'production' ? 'production' : 'development'),
  entry: {
    ba_slideshow: './assets/apps/ba_slideshow/index.js',
    ba_reports: './assets/apps/ba_reports/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'assets/apps/dist'),
  },
  devServer: {
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, 'assets/apps/dist'),
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      showErrors: true,
      chunks: ['ba_slideshow'],
      filename: 'ba_slideshow.twig',
      template: 'assets/apps/ba_slideshow/main.tpl',
      devServer: 'http://localhost:8080',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      showErrors: true,
      chunks: ['ba_reports'],
      filename: 'ba_reports.twig',
      template: 'assets/apps/ba_reports/main.tpl',
      devServer: 'http://localhost:8080',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, 'assets/apps/dist')
    })
  ]
}

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }

  console.log("[DEBUG] nodeEnv =", nodeEnv)
  console.log("[DEBUG] config.mode =", config.mode)

  return config;
}
