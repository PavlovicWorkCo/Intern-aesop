import React from 'react';
import PropTypes from 'prop-types';
import FakeLink from '../FakeLink/FakeLink';

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
    const { menuIsActive } = this.props;
    if (menuIsActive) {
      this.setActiveMenuBarOption(menuBarOption);
    }
  }

  handleFakeLinkClick(menuBarOption) {
    const { menuIsActive } = this.props;
    if (menuIsActive) return;
    this.setActiveMenuBarOption(menuBarOption);
  }

  handleFakeLinkMouseLeave() {
    const { menuIsActive } = this.props;
    if (menuIsActive) return;
    this.setActiveMenuBarOption(null);
  }

  renderMenuBarOptions() {
    const { activeMenuBarOption } = this.state;
    const menuBarOptionsArray = ['Shop', 'Read', 'Visit', 'Search'];
    const menuBarOptions = menuBarOptionsArray.map((menuBarOption) => {
      const activeClass = menuBarOption === activeMenuBarOption ? 'Active' : '';
      return (
        <FakeLink
          text={menuBarOption}
          className={`Link-test ${activeClass}`}
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
    return (
      <div>{this.renderMenuBarOptions()}</div>
    );
  }
}


MenuBar.defaultProps = {
  menuIsActive: false,
};

MenuBar.propTypes = {
  menuIsActive: PropTypes.bool,
};

export default MenuBar;
