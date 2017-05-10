/*
 * Copyright (c) 2023, inspireso.org
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const cfg = require('../src/config');

const isDebug = global.DEBUG === false ? false : process.argv.includes('--debug');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const useHMR = !!global.HMR; // Hot Module Replacement (HMR)
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: useHMR,
  plugins: [
    ...pkg.babel.plugins,
    ...isDebug ? [] : [
      , 'transform-react-constant-elements'
      // , 'transform-react-inline-elements'
    ]
  ]
});

// Webpack configuration (main.js => public/assets/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

    // The base directory for resolving the entry option
    context: path.resolve(__dirname, '../src'),

    // The entry point for the bundle
    entry: cfg.entry,

    // Options affecting the output of the compilation
    output: {
      path: path.resolve(__dirname, '../build/assets/static'),
      publicPath: '/',
      filename: isDebug ? 'js/[name].js?[hash]' : 'js/[name].[hash].js',
      chunkFilename: 'js/[hash]/[id].js',
    },

    // Switch loaders to debug or release mode
    debug: isDebug,

    // Developer tool to enhance debugging, source maps
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: isDebug ? 'source-map' : false,

    // What information should be printed to the console
    stats: {
      assets: true,
      colors: true,
      reasons: isVerbose,
      version: isVerbose,
      timings: true,
      chunks: true,
      hash: isVerbose,
      chunkModules: isVerbose,
      cached: isVerbose,
      cachedAssets: isVerbose,
      chunkOrigins: true
    },

    // The list of plugins for Webpack compiler
    plugins: [
      // Define free variables
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDebug ? 'development' : 'production')
        },
        __DEV__: isDebug,
      }),

      // Emit a JSON file with assets paths
      // https://github.com/sporto/assets-webpack-plugin#options
      new AssetsPlugin({
        path: path.resolve(__dirname, '../build'),
        filename: 'assets.json',
        prettyPrint: true,
      }),

      // Assign the module and chunk ids by occurrence count
      // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
      // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      new webpack.optimize.OccurrenceOrderPlugin(),

      new HtmlWebpackPlugin({
        title: cfg.title,
        filename: 'manage.html',
        template: path.resolve(__dirname, '../src/content/manage.html')
      }),

      //https://webpack.github.io/docs/stylesheets.html
      new ExtractTextPlugin(isDebug ? 'css/[name].css?[hash]' : 'css/[name].[hash].css', {
        allChunks: false
      })

    ],

    // Options affecting the normal modules
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, '../src'),
          ],
          loader: `babel-loader?${JSON.stringify(babelConfig)}`,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', [
            `css-loader?${JSON.stringify({
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: false,
              localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
            })}`,
          ]),
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.txt$/,
          loader: 'raw-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          query: {
            name: isDebug ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
            limit: 10000,
          },
        },
        {
          test: /\.(eot|ttf|wav|svg|woff|woff2|mp3)$/,
          loader: 'file-loader',
          query: {
            name: isDebug ? '[path][name].[ext]?[hash]' : 'fonts/[hash].[ext]',
          },
        },
        {
          test: /\.md$/,
          loader: path.resolve(__dirname, './utils/markdown-loader.js'),
        },
      ],
    }
    ,

    resolve: {
      root: path.resolve(__dirname, '../src'),
      modulesDirectories: ['node_modules'],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    }
    ,

    externals: {
      "jquery": "jQuery"
    }
    ,
  }
;

// Optimize the bundle in release (production) mode
if (!isDebug) {
  // Search for equal or similar files and deduplicate them in the output
  // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
  config.plugins.push(new webpack.optimize.DedupePlugin());

  // Minimize all JavaScript output of chunks
  // https://github.com/mishoo/UglifyJS2#compressor-options
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {comments: false},
    compress: {screw_ie8: true, warnings: isVerbose}
  }));

  // A plugin for a more aggressive chunk merging strategy
  // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;
