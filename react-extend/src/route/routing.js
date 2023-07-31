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

var routing = function (route) {
  var router = {
    path: route.path,
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require(route.component))
      })
    }
  };
  if (route.children) {
    var childRoutes = route.children.map(child => routing(child));
    router.getChildRoutes = function (location, cb) {
      require.ensure([], function (require) {
        cb(null, childRoutes)
      })
    }
  }
  return router;
};

module.exports = function (routes) {
  return routes.map(route=> routing(route));
};
