/*
 * Copyright (c) 2015, Inspireso and/or its affiliates. All rights reserved.
 */

var React = require('react');
var Link = require('react-router').Link;

class Navbar extends React.Component {

  items() {
    return this.props.items.map((item, index) => {
      let path = item.path;
      return (
        <li key={path}
            className={this.props.location.pathname == path.toLowerCase() ? "active" : ""}>
          <Link to={path.toLowerCase()}>{item.title}</Link>
        </li>
      );
    })
  }


  render() {
    let items = this.items();
    return (
      <nav className="navbar navbar-default navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle collapsed" type="button" data-toggle="collapse"
                    data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href={this.props.home || "/"} className="navbar-brand">
              {this.props.brand}
            </a>
          </div>
          <div id="bs-navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {items}
            </ul>
            {this.props.children}
          </div>
        </div>
      </nav>
    )
  }
}

module.exports = Navbar;
