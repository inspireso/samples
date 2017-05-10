/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
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
