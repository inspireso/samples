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
var extend = require('../../core').extend;

module.exports = class MessageBox extends React.Component {

  constructor() {
    super();
    this.state = {
      show: true
    }
  }

  render() {
    var cancel = null;
    if (this.state.show)
      return (
        <div ref="root">
          <div className="weui-mask"></div>
          <div className="weui-dialog">
            <div className="weui-dialog__hd"><strong
              className="weui-dialog__title">{this.props.title}</strong>
            </div>
            <div className="weui-dialog__bd">{this.props.message}</div>
            {this.buttons()}
          </div>
        </div>
      );
    else {
      return <div/>;
    }
  }

  buttons() {
    if (this.props.cancel) {
      return (
        <div className="weui-dialog__ft">
          <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default"
             onClick={this.handleOkClick.bind(this)}>确定</a>
          <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary"
             onClick={this.handleCancelClick.bind(this)}>取消</a>
        </div>
      );
    } else {
      return (
        <div className="weui-dialog__ft">
          <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary"
             onClick={this.handleOkClick.bind(this)}>确定</a>
        </div>
      );

    }
  }

  handleOkClick(e) {
    this.setState({show: false});
    this.props.onClosed(extend({result: "ok"}, e));
  }

  handleCancelClick(e) {
    this.setState({show: false});
    this.props.onClosed(extend({result: "cancel", e}));
  }

  close() {
    $(this.refs.root).hide();
  }
}
;
