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

const React = require('react');
const {initState, extend} = require('react-extend');
const api = require('../../data/webapi');

const Toast = require('../../components/Toast');
const UserList = require('./UserList');
const Header = require('./Header');


module.exports = class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState();
  }

  componentDidMount() {
    this.search({
      page: 0,
      size: 50
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.state.update(this, {list: nextProps.location.state});
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.location.state != null;
  // }

  render() {
    if (!this.state.ready) {
      return Toast.showLoading();
    }

    var list = this.state.list && this.state.list.length > 0 ?
      <UserList list={this.state.list} onDelete={this.delete.bind(this)}/> : <div/>
    return (
      <div className="container-fluid">
        <Header onSearch={this.search.bind(this)}
                list={this.state.list}
                query={this.props.location.query}/>
        {list}
      </div>
    );

  }

  search(query) {
    var q = query
      ? extend({}, this.props.location.query, query)
      : this.props.location.query;

    api.user.findAll(q)
      .then(response => {
        this.state.update(this, {list: response});
        // this.setState({list :response});
        // this.context.router.replace({
        //   pathname: this.props.location.pathname,
        //   query: q,
        //   state: response
        // });
      });
  }

  delete(response) {
    this.search();
  }
}
;
