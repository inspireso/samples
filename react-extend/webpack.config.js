/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');


const config = {
    context: path.resolve(__dirname, './src'),

    entry: {
      index: path.resolve(__dirname, './index.js')
    },

    // Options affecting the output of the compilation
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'react-extends'
    },

    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
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
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        output: {comments: false},
        compress: {screw_ie8: true, warnings: true}
      }),
      new ExtractTextPlugin({
        filename: 'css/[name]-[hash].css',
        disable: false,
        allChunks: true
      }),
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
