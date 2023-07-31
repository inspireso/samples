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

var React = require('react');

module.exports = class Alert extends React.Component {
  constructor() {
    super();
  }

  closeable() {
    if (this.props.closeable) {
      return (
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
      )
    } else {
      return "";
    }
  }

  render() {
    let closeButton = this.closeable();
    if (this.props.message)
      return (
        <div className="alert alert-warning alert-dismissible" role="alert">
          {closeButton}
          {this.props.message}
        </div>

      );
    else {
      return <div/>
    }

  }
}
;
