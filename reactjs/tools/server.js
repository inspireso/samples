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

//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const config = require('../src/config');

module.exports = new Promise((resolve, reject) => {
  // Add the client which connects to our middleware
  // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
  // useful if you run your app from another point like django
  var hotMiddlewareScript = ['react-hot-loader/patch', 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true'];

  if (typeof webpackConfig.entry === 'object' && !Array.isArray(webpackConfig.entry)) {
    Object.keys(webpackConfig.entry).forEach(function (key) {
      webpackConfig.entry[key] = hotMiddlewareScript.concat(webpackConfig.entry[key]);
    });
  } else {
    webpackConfig.entry = hotMiddlewareScript.concat(webpackConfig.entry);
  }
  const compiler = webpack(webpackConfig);

  // Node.js middleware that compiles application in watch mode with HMR support
  // http://webpack.github.io/docs/webpack-dev-middleware.html
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: webpackConfig.stats,
  });

  const bs = require('browser-sync').create();
  const bsOpts = {
    port: config.port,
    open: false,

    //静态文件的目录
    files: ['build/assets/templates', 'build/assets/static'], // watch files
    //静态文件路由
    serveStatic: [
      {
        route: '/images',     // remote path
        dir: 'build/assets/static/images'  // local path
      }
    ],
    //代理其他动态请求到其他服务器。
    proxy: {
      target: config.proxy,
      ws: true,
      proxyReq: [
        function (proxyReq, originalReq, res) {
          console.log(`PROXY: ${proxyReq.path}`);
          proxyReq.setHeader('Host', originalReq.headers.host);
        }
      ]
    },
    middleware: [
      function (req, res, next) {
        console.log(req.url);
        next();
      },
      webpackDevMiddleware,
      require('webpack-hot-middleware')(compiler)
    ],

    // logLevel: "debug"
  };

  let count = 0;

  compiler.plugin('done', stats => {
    // Launch Browsersync after the initial bundling is complete
    // For more information visit https://browsersync.io/docs/options

    if (++count === 1) {
      bs.init(bsOpts, resolve);
    }
  });

  return compiler;
})
;

