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
const {Link} = require('react-router');
const {initState, extend} = require('react-extend');
const api = require('../../data/webapi');

const Toast = require('../../components/Toast');
const Alert = require('../../components/bootstrap/Alert');
const {formGroup} = require('../../components/bootstrap/Forms');
const fields = [
  {
    id: 'name',
    name: '用户名',
    attrs: {required: true},
    value: function (object) {
      return object['name'];
    }
  }
  ,
  {
    id: 'sex',
    name: '性别',
    attrs: {required: true},
    value: function (object) {
      return object['sex'];
    }
  }
  ,
  {
    id: 'tel',
    name: '电话',
    attrs: {required: true},
    value: function (object) {
      return object['tel'];
    }
  }
  , {
    id: 'address',
    name: '地址',
    value: function (object) {
      return object['address'];
    }
  }
];

module.exports = class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState({
      fields: fields
    });
  }

  componentDidMount() {
    api.user.find(this.props.params.id)
      .then((user) => {
        this.update(user);
      });
  }

  render() {
    if (!this.state.ready) {
      return Toast.showLoading();
    }

    let fieldSet = this.state.fields.map(field => {
      return formGroup(field, this.state.user);
    });

    return (
      <div>
        {this.title()}
        <hr/>
        <Alert message={this.state.message} closedable="true"/>
        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <input type="hidden" ref="id" value={this.props.params.id}/>
          {fieldSet}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-primary" type="submit">保存</button>
              <Link to={`/manage/user`} className="btn btn-default">返回</Link>
            </div>
          </div>
        </form>
      </div>
    )

  }

  title() {
    return (
      <h3>用户编辑</h3>
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = {
      id: this.refs.id.value
      , name: this.refs.name.value
      , sex: this.refs.sex.value
      , tel: this.refs.tel.value
      , address: this.refs.address.value
    };

    api.user.save(data)
      .then(response => {
        if (response.message) {
          this.state.update(this, {
            message: response.message
          });
        } else {
          this.update(this.state.user);
        }
      });
  }

  update(user) {
    var data = {
      user: user,
      message: null
    };
    this.state.update(this, data);
  }
}
;
