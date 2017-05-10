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
const scanDirectory = require('sb-scandir');
const mime = require('mime');
const needle = require('needle');
const spawn = require('child_process').spawn;

const uploadLargeFile = (server, localFile, remoteFile) => {
  return new Promise((resolve, reject) => {
      console.log(`${localFile} -> ${remoteFile}`);

      const logAndResolve = (resp) => {
        console.log(resp.body);

      };

      let cmd = spawn('curl.exe', [
        server,
        '-F', `target=${remoteFile}`,
        '-F', `file=@${localFile}`,
      ]);

      cmd.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });

      cmd.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        reject(data);
      });

      cmd.on('exit', function (code) {
        console.log('child process exited with code ' + code);
        resolve(code);
      });
    }
  );
};


const uploadFile = (server, localFile, remoteFile) => {
  return new Promise((resolve, reject) => {
      console.log(`${localFile} -> ${remoteFile}`);

      const logAndResolve = (resp) => {
        console.log(resp.body);
        resolve(resp);
      };

      let data = {
        target: remoteFile,
        file: {
          file: localFile,
          content_type: 'application/octet-stream' //mime.lookup(localFile)
        }
      };
      needle.post(
        server,
        data,
        {multipart: true},
        (err, resp) => err ? reject(err) : logAndResolve(resp));
    }
  );
};


const uploadDir = function (server, local, remote, filter) {
  return Promise.resolve(scanDirectory(local, true))
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
            return path.relative(local, item);
          })
      );
    })
    .then((files) => {
      return Promise.all(
        files.map(file => {
          const localFile = path.join(local, file);
          const remoteFile = path.join(remote, file);
          return uploadFile(server, localFile, remoteFile);
        })
      );
    })
    ;
};

const httpGet = (url, option) => {
  return new Promise((resolve, reject) => {
      needle.get(url, option, (err, resp) => err ? reject(err) : resolve(resp));
    }
  );
};

module.exports = {
  uploadLargeFile: uploadLargeFile,
  uploadFile: uploadFile,
  uploadDir: uploadDir,
  start: (target) => httpGet(`${target.server}/service/start/${target.name}`),
  stop: (target) => httpGet(`${target.server}/service/stop/${target.name}`)
}
;

