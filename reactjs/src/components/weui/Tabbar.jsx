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

var React = require("react");
var Link = require("react-router").Link;

module.exports = class Tabbar extends React.Component {
  items() {
    return this.props.items.map((item, index) => {
      let path = item.path;
      return (
        <Link key={item.path}
              to={path.toLowerCase()}
              activeClassName="weui-bar__item_on"
              className="weui-tabbar__item">
          <img src={item.img} alt={item.alt} className="weui-tabbar__icon"/>
          <p className="weui-tabbar__label">{item.title}</p>
        </Link>
      );
    })
  }


  render() {
    var items = this.items();
    return (
      <div className="weui-tabbar">
        {items}
      </div>
    )
  }

};




