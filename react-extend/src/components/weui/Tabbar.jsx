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




