var React = require('react');
var {addClass, removeClass} = require('../../core');

module.exports = class SearchBar extends React.Component {

  static propTypes = {
    onSearch: React.PropTypes.func
  };

  render() {
    return (
      <div ref="searchBar" className="weui-search-bar weui-search-bar_focusing">
        <form className="weui-search-bar__form">
          <div className="weui-search-bar__box">
            <i className="weui-icon-search"/>
            <input required ref="searchInput" type="search" className="weui-search-bar__input"
                   placeholder="搜索"
                   onInput={this.handleInput.bind(this)}
            />
            <a href="javascript:" className="weui-icon-clear" ref="search_clear"
               onClick={this.handleCancelClick.bind(this)}/>
          </div>
          <label htmlFor="search_input" className="weui-search-bar__label" ref="searchText">
            <i className="weui-icon-search"></i>
            <span>搜索</span>
          </label>
        </form>
        {/*<a href="javascript:" className="weui_search_cancel"*/}
        {/*onClick={this.handleCancelClick.bind(this)}>取消</a>*/}
        {this.props.children}
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.onSearch) {
      this.props.onSearch(this.refs.searchInput.value);
    }
  }

  handleInput(e) {
    if (this.props.onSearch) {
      this.props.onSearch(this.refs.searchInput.value);
    }
  }

  handleInputFocus(e) {
    addClass(this.refs.searchBar, 'weui-search-bar_focusing');
  }

  handleInputBlur(e) {
    removeClass(this.refs.searchBar, 'weui-search-bar_focusing');
  }

  handleCancelClick(e) {
    this.refs.searchInput.value = "";
    if (this.props.onSearch) {
      this.props.onSearch("");
    }
  }
}
;
