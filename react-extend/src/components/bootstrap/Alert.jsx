/*
 * Copyright (c) 2015, Inspireso and/or its affiliates. All rights reserved.
 */

'use strict';

var React = require('react');

module.exports = class Alert extends React.Component {
  constructor() {
    super();
  }

  closeable() {
    if (this.props.closeable) {
      return (
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
      )
    } else {
      return "";
    }
  }

  render() {
    let closeButton = this.closeable();
    if (this.props.message)
      return (
        <div className="alert alert-warning alert-dismissible" role="alert">
          {closeButton}
          {this.props.message}
        </div>

      );
    else {
      return <div/>
    }

  }
}
;
