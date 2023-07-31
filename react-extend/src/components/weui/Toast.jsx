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
