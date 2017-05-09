/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 */

/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pkg = require('./package.json');

const config = {
    context: path.resolve(__dirname, './src'),

    entry: {
      demo2: 'demo2/index.js'
    },

    // Options affecting the output of the compilation
    output: {
      path: path.resolve(__dirname, './build/assets'),
      filename: 'js/[name]-[hash].js',
      chunkFilename: 'js/[hash]/[id].js'
    },

    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            name: 'images/[path][name].[ext]?[hash]',
            limit: 10000
          }
        }
      ]
    },

    plugins: [
      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true,
      //   output: {comments: false},
      //   compress: {screw_ie8: true, warnings: true}
      // }),
      new ExtractTextPlugin({
        filename: 'css/[name]-[hash].css',
        disable: false,
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        filename: 'demo2.html',
        template: path.resolve(__dirname, './demo2.html')
      })
    ],

    resolve: {
      modules: [
        "node_modules",
        path.resolve(__dirname, "./src")
      ],
      extensions: [".js", ".json", ".css"]
    },

    performance: {
      hints: "warning"
    }
  }
;

module.exports = config;
