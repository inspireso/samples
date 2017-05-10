/*
 * Copyright (c) 2017 Inspireso and/or its affiliates.
 * Licensed under the MIT License.
 *
 */

'use strict';

var extend = require('jquery').extend;

function initState(options) {
  var stateManager = {
    ready: false,

    update: function (component, state, interval) {
      var newState = {};
      if (state && $.isArray(state) && state.length > 0) {
        for (var i = 0; i < state.length; i++) {
          newState = $.extend(newState, state[i])
        }
      } else {
        newState = extend(newState, state)
      }
      this.ready = true;

      var $this = this;
      if (interval) {
        setTimeout(() => {
          component.setState(extend($this, component.state, newState));
        }, interval)

      } else {
        component.setState(extend($this, component.state, newState));

      }

      return this;
    }
  };

  return extend(stateManager, options || {});
}


module.exports = initState;

