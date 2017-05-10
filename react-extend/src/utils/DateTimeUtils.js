/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
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
