/*
 * Copyright (c) 2015, Inspireso and/or its affiliates. All rights reserved.
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
