/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 */

/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const config = {
    context: path.resolve(__dirname, './src'),

    entry: {
      demo1: 'demo1/index.js'
    },

    // Options affecting the output of the compilation
    output: {
      path: path.resolve(__dirname, './build/assets'),
      filename: 'js/[name].js?[hash]',
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
          use: ['style-loader', 'css-loader']
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

      // new HtmlWebpackPlugin(),

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
