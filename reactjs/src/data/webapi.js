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

const {fetch} = require('react-extend');

const build = function (path) {
  return path;
};

const user = {
  url: function (...path) {
    return build(path && path.length ? '/user/' + path.join("/") : '/user');
  },

  findAll: function (query) {
    let url = this.url();
    return fetch(url, {
      method: "GET",
      data: query
    });

  },

  find: function (id) {
    let url = this.url(id);
    return fetch(url, {
      method: "GET"
    });

  },

  save: function (data) {
    let url = this.url();
    return fetch(url, {
      type: "POST",
      data: JSON.stringify(entity),
      contentType: 'application/json;charset=UTF-8',
    });
  },

  delete: function (id) {
    let url = this.url(id);
    return fetch(url, {
      type: "DELETE"
    });
  }

};


module.exports = {
  user: user
};
