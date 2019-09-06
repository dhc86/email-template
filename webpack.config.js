const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const { SCOPE = 'local' } = process.env;

module.exports = (env, argv) => {
  let copyFiles = [{ from: 'app/builder/assets', to: 'assets' }];
  // Remove this statement, it's only for demo website
  if (SCOPE === 'demo') {
    copyFiles = [...copyFiles, { from: '_redirects', to: '' }];
  }
  // Remove till this line
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? false : 'eval',
    entry: {
      polyfills: './app/builder/polyfills.js',
      ngjsEmailBuilder: './app/builder/index.js',
      main: './app/index.js'
    },
    output: {
      path: resolve(__dirname, 'dist'),
      library: 'ngjs-email-builder',
      libraryTarget: 'umd',
      filename: '[name].b.js'
    },
    devServer: {
      contentBase: resolve(__dirname, 'app/builder'),
      compress: true
    },
    externals: {
      angular: 'angular',
      tinymce: 'tinymce',
      'angular-ui-tinymce': 'angular-ui-tinymce',
      'angular-translate': 'angular-translate',
      'ngjs-email-builder': 'ngjs-email-builder'
    },
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({ sourceMap: false }),
        new OptimizeCSSAssetsPlugin()
      ],
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      concatenateModules: true,
      nodeEnv: env.production ? 'production' : 'development'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyJS: true,
            minifyCSS: true
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(less|css)$/,
          use: [
            !env.production ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ]
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        'process.env': {
          self: JSON.stringify(env.self),
          prod: JSON.stringify(env.production),
          scope: JSON.stringify(SCOPE)
        }
      }),
      new HtmlWebpackPlugin({
        template: './app/index.html'
        // excludeChunks: ['polyfills']
      }),
      new MiniCssExtractPlugin({
        filename: !env.production ? '[name].css' : '[name].[hash].css',
        chunkFilename: !env.production ? '[id].css' : '[id].[hash].css'
      }),
      new ScriptExtHtmlWebpackPlugin({
        defer: ['ngjsEmailBuilder', 'main']
      }),
      new CopyWebpackPlugin(copyFiles)
    ]
  };
};
