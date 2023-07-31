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

