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

var React = require("react");
var PropTypes = require('prop-types');
var $ = require("jquery");
require("fullcalendar");
require("fullcalendar/dist/locale-all.js");
require("fullcalendar/dist/fullcalendar.css");

var style = {
  width: '100%',
  height: '100%'
};

module.exports = class Calendar extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired
  };

  componentDidMount() {
    $(this.refs.calendar).fullCalendar(this.props.options);
  }

  // componentWillUnmount() {
  // var div = $(this.refs.calendar);
  // }

  render() {

    return (
      <div ref='calendar' style={style}/>
    );
  }
}
;
