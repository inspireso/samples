/*
 * Copyright (c) 2015, Inspireso and/or its affiliates. All rights reserved.
 */

'use strict';

var React = require("react");

class Loading extends React.Component {

  render() {
    return (
      <div>
        <div className="weui-mask_transparent"></div>
        <div className="weui-toast">
          <i className="weui-loading weui-icon_toast"></i>
          <p className="weui-toast__content">{this.props.content}</p>
        </div>
      </div>
    )

  }
}

class Content extends React.Component {
  render() {
    return (
      <div>
        <div className="weui-mask_transparent"></div>
        <div className="weui-toast">
          <i className="weui-icon-success-no-circle weui-icon_toast"></i>
          <p className="weui-toast__content">{this.props.content}</p>
        </div>
      </div>
    )
  }
}

module.exports = {
  showLoading: function (content = '数据加载中') {
    return (
      <Loading content={content}/>
    )
  },
  showContent: function (content) {
    if (content)
      return (
        <Content content={content}/>
      );
    else {
      return <div/>
    }
  }
};
