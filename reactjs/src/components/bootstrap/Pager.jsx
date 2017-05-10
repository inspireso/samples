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
var Link = require('react-router').Link;
var PropTypes = require('prop-types');

module.exports = class Pager extends React.Component {
  static propTypes = {
    refresh: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    links: PropTypes.object.isRequired
  };


  render() {
    let previousDisabled = this.props.links.prev ? null : 'disabled';
    let nextDisabled = this.props.links.next ? null : 'disabled';
    return (
      <div className="btn-group">
        <a className="btn btn-default" href="#" onClick={this.previousClick.bind(this)}
           disabled={previousDisabled}>
                    <span className="glyphicon glyphicon-menu-left" aria-hidden="true"
                          disabled={previousDisabled}></span>
        </a>
        <a className="btn btn-default" href="#" onClick={this.nextClick.bind(this)}
           disabled={nextDisabled}>
          <span className="glyphicon glyphicon-menu-right" aria-hidden="true"
                disabled={nextDisabled}></span>
        </a>
      </div>
    )
  }

  previousClick(event) {
    event.preventDefault();
    if (event.target.hasAttribute('disabled')) {
      return;
    }

    const page = this.props.page.number > 1 ? this.props.page.number : 1;
    const previousPage = page - 1;
    this.props.refresh(previousPage, this.props.page.size);
  }

  nextClick(event) {
    event.preventDefault();
    if (event.target.hasAttribute('disabled')) {
      return;
    }

    const page = this.props.page.number > 0 ? this.props.page.number : 0;
    const nextPage = page + 1;
    this.props.refresh(nextPage, this.props.page.size);
  }
}
;
