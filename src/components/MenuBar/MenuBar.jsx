import React from 'react';
import PropTypes from 'prop-types';
import FakeLink from '../FakeLink/FakeLink';
import './MenuBar.scss';
import arrowPicture from '../../assets/left-arrow.svg';

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
    const { menuIsActive, showMenuList, windowSize } = this.props;
    if (windowSize === 'small') return;
    if (menuIsActive) {
      this.setActiveMenuBarOption(menuBarOption);
    }
    showMenuList(menuBarOption);
  }

  handleFakeLinkClick(menuBarOption) {
    const { openMenu, showMenuList } = this.props;
    this.setActiveMenuBarOption(menuBarOption);
    showMenuList(menuBarOption);
    openMenu();
  }

  handleFakeLinkMouseLeave() {
    const { menuIsActive, windowSize } = this.props;
    if (windowSize === 'small') return;
    if (menuIsActive) return;
    this.setActiveMenuBarOption(null);
  }

  renderMenuBarOptions() {
    const { activeMenuBarOption } = this.state;
    const { handleCloseMenuClick, menuIsActive } = this.props;
    const menuBarOptionsArray = ['Shop', 'Read'];
    const closeButtonVisibleClass = menuIsActive ? 'Visible' : '';
    const menuBarOptions = menuBarOptionsArray.map((menuBarOption) => {
      const activeClass = menuBarOption === activeMenuBarOption && menuIsActive ? 'Active' : '';
      return (
        <FakeLink
          text={menuBarOption}
          className={`Menu-link ${activeClass}`}
          onClick={() => this.handleFakeLinkClick(menuBarOption)}
          onMouseEnter={() => this.handleFakeLinkMouseEnter(menuBarOption)}
          onMouseLeave={() => this.handleFakeLinkMouseLeave()}
          key={menuBarOption}
        />
      );
    });
    return (
      <div className="Menu-bar-left">
        <div className="Menu-bar-options">
          {menuBarOptions}
        </div>
        <button type="button" tabIndex={menuIsActive ? 0 : -1} className={`Close-menu ${closeButtonVisibleClass}`} onClick={handleCloseMenuClick} />
      </div>
    );
  }

  render() {
    const { className, menuIsActive, windowSize, handleBackButton } = this.props;
    const toggleMenuActive = menuIsActive ? 'Active' : '';
    return (
      <div className={className}>
        {windowSize === 'small' && (
          <button
            onClick={() => handleBackButton()}
            type="button"
            className={`Menu-back-button ${toggleMenuActive}`}
          ><img src={arrowPicture} /> </button>
        )}
        {windowSize !== 'small' && this.renderMenuBarOptions()}
        <div>
          <FakeLink tabIndex={menuIsActive ? -1 : 0} text="Login" className="Menu-link Login-button" />
          <button
            className={`Toggle-menu ${toggleMenuActive}`}
            type="button" onClick={() => this.handleFakeLinkClick('Toggle-menu')}
          />
        </div>
      </div>
    );
  }
}


MenuBar.defaultProps = {
  menuIsActive: false,
  openMenu: null,
  showMenuList: null,
  className: 'Menu-bar',
  handleCloseMenuClick: null,
  windowSize: null,
  handleBackButton: null,
};

MenuBar.propTypes = {
  menuIsActive: PropTypes.bool,
  openMenu: PropTypes.func,
  showMenuList: PropTypes.func,
  className: PropTypes.string,
  handleCloseMenuClick: PropTypes.func,
  windowSize: PropTypes.string,
  handleBackButton: PropTypes.func,
};

export default MenuBar;
