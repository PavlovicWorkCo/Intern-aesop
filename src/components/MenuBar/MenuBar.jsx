import React from 'react';
import PropTypes from 'prop-types';
import FakeLink from '../FakeLink/FakeLink';
import './MenuBar.scss';

class MenuBar extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      activeMenuBarOption: null,
    };
  }

  setActiveMenuBarOption(value) {
    this.setState({
      activeMenuBarOption: value,
    });
  }

  handleFakeLinkMouseEnter(menuBarOption) {
    const { menuIsActive, showMenuList } = this.props;
    if (menuIsActive) {
      this.setActiveMenuBarOption(menuBarOption);
    }
    showMenuList(menuBarOption);
  }

  handleFakeLinkClick(menuBarOption) {
    const { menuIsActive, openMenu } = this.props;
    if (menuIsActive) return;
    this.setActiveMenuBarOption(menuBarOption);
    openMenu();
  }

  handleFakeLinkMouseLeave() {
    const { menuIsActive } = this.props;
    if (menuIsActive) return;
    this.setActiveMenuBarOption(null);
  }

  renderMenuBarOptions() {
    const { activeMenuBarOption } = this.state;
    const { menuIsActive } = this.props;
    const menuBarOptionsArray = ['Shop', 'Read'];
    const menuBarOptions = menuBarOptionsArray.map((menuBarOption) => {
      const activeClass = menuBarOption === activeMenuBarOption && menuIsActive ? 'Active' : '';
      return (
        <FakeLink
          text={menuBarOption}
          className={`Menu-link ${activeClass}`}
          onClick={() => this.handleFakeLinkClick(menuBarOption)}
          onMouseEnter={() => this.handleFakeLinkMouseEnter(menuBarOption)}
          onMouseLeave={() => this.handleFakeLinkMouseLeave()}
        />
      );
    });
    return (
      menuBarOptions
    );
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>{this.renderMenuBarOptions()}</div>
    );
  }
}


MenuBar.defaultProps = {
  menuIsActive: false,
  openMenu: null,
  showMenuList: null,
  className: 'Menu-bar',
};

MenuBar.propTypes = {
  menuIsActive: PropTypes.bool,
  openMenu: PropTypes.func,
  showMenuList: PropTypes.func,
  className: PropTypes.string,
};

export default MenuBar;
