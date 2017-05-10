/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

'use strict';

var jquery = require('jquery');

var fetch = function (url, options) {
  var defer = $.ajax(url, options)
    .then(function (response) {
        if (response.exception) {
          return $.Deferred().reject(response);
        }
        return response;
      }, function (response) {
        return $.Deferred().reject(response);
      }
    );

  return defer.fail(function (response) {
    console.log(response.message);

    if (response.status === 302) {
      window.location.href = response.location;
      return;

    } else if (response.status === 401 || response.status === 403) {
      alert('ACCESS DENIED: You are not authorized');

    } else if (response.status === 412) {
      alert('DENIED: Unable to update');
    }
  });
};

module.exports = fetch;
