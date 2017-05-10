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
// Copy ./index.html into the /public folder
// -----------------------------------------------------------------------------
const ejs = require('ejs');
const ncp = require('ncp');
const fs = require('./utils/fs');
const webpackConfig = require('./webpack.config');
const config = require('../src/config');

module.exports = Promise.resolve()
  .then(() => fs.readFile('./build/assets.json'))
  .then((content) => JSON.parse(content))
  .then(assets => {
    return Promise.all(
      Object.keys(webpackConfig.entry).map(function (key) {
        const opts = {filename: `./src/content/${key}.ejs`};
        const template = fs.readFileSync(opts.filename);
        const render = ejs.compile(template, opts);
        const output = render({debug: webpackConfig.debug, bundle: assets[key], config});
        return fs.writeFile(`./build/assets/templates/${key}.ftl`, output);
      })
    )
  })
;
