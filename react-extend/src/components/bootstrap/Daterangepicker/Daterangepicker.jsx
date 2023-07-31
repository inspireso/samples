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
var $ = require("jquery");
var daterangepicker = require('bootstrap-daterangepicker');
require("./Daterangepicker.css");

var locale = {
  "format": "YYYY-MM-DD",
  "separator": " - ",
  "applyLabel": "确定",
  "cancelLabel": "取消",
  "fromLabel": "从",
  "toLabel": "到",
  "customRangeLabel": "Custom",
  "weekLabel": "周",
  "daysOfWeek": '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  "monthNames": '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  "firstDay": 1
};
var defaultOptions = {
  showDropdowns: true,
  singleDatePicker: true,
  locale: locale
};

module.exports = class DatePicker extends React.Component {

  static propTypes = {
    className: React.PropTypes.string
    , placeholder: React.PropTypes.string
  };

  componentDidMount() {
    $(this.refs.daterangepicker).daterangepicker($.extend({}, defaultOptions, this.props.options));
  }

  render() {
    return (
        <input ref="daterangepicker"
               className={this.props.className ? this.props.className : "form-control" }
               type="text"
               placeholder={this.props.placeholder}
               defaultValue={this.props.defaultValue}
        />
    );
  }

  getValue() {
    return this.refs.daterangepicker.value;
  }
}
;
