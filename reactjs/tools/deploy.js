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
"use strict";

const path = require('path');
const {uploadLargeFile, uploadFile, uploadDir, start, stop} = require('./utils/command');
const config = require('../src/config');

const target = process.argv.includes('--prod') ? config.deploy.prod : config.deploy.uat;

console.log(`###deploy server ${target.server}`);

function deploy() {
  return Promise.resolve()
    .then(() => {
      return uploadLargeFile(`${target.server}/upload`, target.jar, `${target.cwd}/bootstrap-upload.jar`);
    })
    .then(() => {
      return stop(target)
    })
    .then(() => {
      return start(target)
    })
    .catch(err => {
      console.log(err);
    })
}

function copy() {
  return Promise.resolve()
    .then(() => {
      // deploy static files
      let local = path.resolve(__dirname, '../build/assets/');
      let remove = `${target.cwd}/assets/`;
      console.log(`put directory ${local} -> ${remove}`);

      return uploadDir(`${target.server}/upload`, local, remove);
    })
    .then(successful => {
      console.log('copy done!');
    }).catch((error) => {
      console.log(error);
    });
}

function configScript() {
  return Promise.resolve()
    .then(() => {
      // deploy static files
      let local = path.resolve(__dirname, '../../spring-boot-demo/config/context');
      let remove = `${target.cwd}/config/context/`;
      console.log(`put directory ${local} -> ${remove}`);

      return uploadDir(`${target.server}/upload`, local, remove);
    })
    .then(successful => {
      console.log('copy done!');
    }).catch((error) => {
      console.log(error);
    });
}

module.exports = {
  deploy: deploy,
  copy: copy,
  config: configScript,
}
;
