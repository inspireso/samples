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
// Clean up the output directory
//
const path = require('path');
const del = require('del');
const fs = require('./utils/fs');

module.exports = Promise.resolve()
  .then(()=>del(['build'], {dot: false}))
  .then(()=> {
    return Promise.all(
      ['./build/assets/templates', './build/assets/static/images'].map((path) => fs.makeDir(path))
    )
  })
  .then(()=> {
    const imagesSource = path.resolve(__dirname, '../src/content/images/');
    const imagesTarget = path.resolve(__dirname, '../build/assets/static/images/');
    return fs.copyDir(imagesSource, imagesTarget)
  });
