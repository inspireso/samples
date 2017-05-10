/*
 * Copyright (c) 2015, Inspireso and/or its affiliates. All rights reserved.
 */

'use strict';

var React = require('react');
var $ = require('jquery');

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
    title: React.PropTypes.string.isRequired
    , cancel: React.PropTypes.string
    , confirm: React.PropTypes.string
    , onHidden: React.PropTypes.func
    , onCancel: React.PropTypes.func
    , onConfirm: React.PropTypes.func
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
