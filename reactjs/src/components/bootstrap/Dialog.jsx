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
var $ = require('jquery');
var PropTypes = require('prop-types');

class BootstrapButton extends React.Component {
  render() {
    return (
      <a {...this.props}
         href="javascript:;"
         role="button"
         className={(this.props.className || '') + ' btn'}/>
    );
  }
}

module.exports = class Dialog extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
    , cancel: PropTypes.string
    , confirm: PropTypes.string
    , onHidden: PropTypes.func
    , onCancel: PropTypes.func
    , onConfirm: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // When the component is added, turn it into a modal
    $(this.refs.root).modal({backdrop: 'static', keyboard: false, show: false});

    // Bootstrap's modal class exposes a few events for hooking into modal
    // functionality. Lets hook into one of them:
    $(this.refs.root).on('hidden.bs.modal', this.handleHidden);
  }

  componentWillUnmount() {
    $(this.refs.root).off('hidden.bs.modal', this.handleHidden);
  }


  render() {
    var confirmButton = null;
    var cancelButton = null;

    if (this.props.confirm) {
      confirmButton = (
        <BootstrapButton
          onClick={this.handleConfirm.bind(this)}
          className="btn-primary">
          {this.props.confirm}
        </BootstrapButton>
      );
    }
    if (this.props.cancel) {
      cancelButton = (
        <BootstrapButton onClick={this.handleCancel.bind(this)} className="btn-default">
          {this.props.cancel}
        </BootstrapButton>
      );
    }

    return (
      <div className="modal fade" ref="root">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.handleCancel.bind(this)}>
                &times;
              </button>
              <h3>{this.props.title}</h3>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {cancelButton}
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );

  }


  handleClose() {

  }

  handleCancel(e) {
    if (this.props.onCancel) {
      this.props.onCancel();
    } else {
      this.close();
    }
  }

  handleConfirm(e) {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  handleHidden(e) {
    if (this.props.onHidden) {
      this.props.onHidden();
    }
  }


  close() {
    $(this.refs.root).modal('hide');
  }

  open() {
    $(this.refs.root).modal('show');
  }
}
;
