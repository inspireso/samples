var React = require("react");
var Link = require("react-router").Link;

module.exports = class Nabbar extends React.Component {
  items() {
    return this.props.items.map((item, index) => {
      let path = item.path;
      return (
        <div key={item.path}
             to={path.toLowerCase()}
             activeClassName="weui-bar__item_on"
             className="weui-navbar__item">
          {item.title}
        </div>
      );
    })
  }


  render() {
    var items = this.items();
    return (
      <div className="weui-navbar">
        {items}
      </div>
    )
  }

};




