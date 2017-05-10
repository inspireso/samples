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
const webpack = require('webpack');

var chars = 0;

function goToLineStart(nextMessage) {
  var str = "";
  for (; chars > nextMessage.length; chars--) {
    str += "\b \b";
  }
  chars = nextMessage.length;
  for (var i = 0; i < chars; i++) {
    str += "\b";
  }
  if (str) process.stderr.write(str);
}

module.exports =
  new webpack.ProgressPlugin(function (percentage, msg) {
    var state = msg;
    if (percentage < 1) {
      percentage = Math.floor(percentage * 100);
      msg = percentage + "% " + msg;
      if (percentage < 100) {
        msg = " " + msg;
      }
      if (percentage < 10) {
        msg = " " + msg;
      }
    }

    goToLineStart(msg);
    process.stderr.write(msg);
  });
