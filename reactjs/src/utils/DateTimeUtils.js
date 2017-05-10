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

'use strict';

var DateFormat = require('dateformatjs').DateFormat;
var datetimeFormat = new DateFormat("yyyy-MM-dd HH:mm:ss");
var dateFormat = new DateFormat("yyyy-MM-dd");

module.exports = {
  datetimeFormat: datetimeFormat
  , dateFormat: dateFormat

  , formatDate: function (date) {
    if (!date) {
      return null;
    }
    if (typeof date === 'object') {
      return dateFormat.format(date);
    } else {
      return dateFormat.format(datetimeFormat.parse(date));
    }
  }
  , formatDateTime: function (date) {
    if (!date) {
      return null;
    }
    if (typeof date === 'object') {
      return datetimeFormat.format(date);
    } else {
      return datetimeFormat.format(dateFormat.parse(date));
    }
  }
  , today: function () {
    return dateFormat.format(new Date());
  }
  , afterDays: function (days) {
    var now = new Date();
    now.setDate(now.getDate() + days);
    return dateFormat.format(now);
  }
  , thisWeek: function () {
    var now = new Date();
    now.setDate(now.getDate() - now.getDay());
    return dateFormat.format(now);
  }
  , thisMonth: function () {
    var now = new Date();
    now.setDate(1);
    return dateFormat.format(now);
  }

};
