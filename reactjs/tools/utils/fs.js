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
const fs = require('fs');
const path = require('path');
const mkdirp = require("mkdirp");
const scanDirectory = require('sb-scandir');

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', err => err ? reject(err) : resolve(file));
});

const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => err ? reject(err) : resolve(data));
});


const makeDir = (name) => new Promise((resolve, reject) => {
  mkdirp(name, err => err ? reject(err) : resolve(name));
});

const copyFile = (source, target) => Promise.resolve(makeDir(path.dirname(target)))
  .then(() => {
    return new Promise((resolve, reject) => {
      var options = {};
      var rd = fs.createReadStream(source, options);
      rd.on('error', rejectCleanup);
      var wr = fs.createWriteStream(target, options);
      wr.on('error', rejectCleanup);
      wr.on("close", finish);
      // wr.on('finish', finish);
      function rejectCleanup(err) {
        rd.destroy();
        wr.end();
        reject(err);
      }

      function finish() {
        console.log(`${source} -> ${target}`);
        resolve();
      }

      rd.pipe(wr);
    });
  })

const copyDir = (source, target, filter) => {
  return Promise.resolve(scanDirectory(source, true))
    .then((paths) => {
      return Promise.all(
        paths
          .filter(item => {
            if (filter) {
              return filter(item);
            } else {
              return true;
            }
          })
          .map(item => {
            return path.relative(source, item);
          })
      );
    })
    .then((files) => {
      return Promise.all(
        files.map(file => {
          const sourceFile = path.join(source, file);
          const targetFile = path.join(target, file);

          return copyFile(sourceFile, targetFile);
        })
      );
    });
};

module.exports = {
  readFile: readFile,
  readFileSync: function (file) {
    return fs.readFileSync(file, 'utf8')
  },
  writeFile: writeFile,
  makeDir: makeDir,
  copyFile: copyFile,
  copyDir: copyDir
}
;
