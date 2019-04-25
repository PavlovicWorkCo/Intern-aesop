import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FakeLink from '../FakeLink/FakeLink';
import arrowPicture from '../../assets/left-arrow.svg';
import './MenuBar.scss';

export default function MenuBarHook({
  windowSize, className, menuIsActive,
  handleBackButton, showMenuList, openMenu, handleCloseMenuClick,
}) {
  const [activeMenuBarOption, setActiveMenuBarOption] = useState(null);

  function handleFakeLinkMouseEnter(menuBarOption) {
    if (windowSize === 'small') return;
    if (menuIsActive) {
      setActiveMenuBarOption(menuBarOption);
    }
    showMenuList(menuBarOption);
  }

  function handleFakeLinkClick(menuBarOption) {
    setActiveMenuBarOption(menuBarOption);
    showMenuList(menuBarOption);
    openMenu();
  }

  function handleFakeLinkMouseLeave() {
    if (windowSize === 'small') return;
    if (menuIsActive) return;
    setActiveMenuBarOption(null);
  }

  function renderMenuBarOptions() {
    const menuBarOptionsArray = ['Shop', 'Read'];
    const closeButtonVisibleClass = menuIsActive ? 'Visible' : '';
    const menuBarOptions = menuBarOptionsArray.map((menuBarOption) => {
      const activeClass = menuBarOption === activeMenuBarOption && menuIsActive ? 'Active' : '';
      return (
        <FakeLink
          text={menuBarOption}
          className={`Menu-link ${activeClass}`}
          onClick={() => handleFakeLinkClick(menuBarOption)}
          onMouseEnter={() => handleFakeLinkMouseEnter(menuBarOption)}
          onMouseLeave={() => handleFakeLinkMouseLeave()}
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

  const toggleMenuActive = menuIsActive ? 'Active' : '';
  return (
    <div className={className}>
      {windowSize === 'small' && (
        <button
          onClick={() => handleBackButton()}
          type="button"
          className={`Menu-back-button ${toggleMenuActive}`}
        >
          <img alt="left arrow" src={arrowPicture} />
        </button>
      )}
      {windowSize !== 'small' && renderMenuBarOptions()}
      <div>
        <FakeLink tabIndex={menuIsActive ? -1 : 0} text="Login" className="Menu-link Login-button" />
        <button
          className={`Toggle-menu ${toggleMenuActive}`}
          type="button"
          onClick={() => handleFakeLinkClick('Toggle-menu')}
        />
      </div>
    </div>
  );
}

MenuBarHook.defaultProps = {
  menuIsActive: false,
  openMenu: null,
  showMenuList: null,
  className: 'Menu-bar',
  handleCloseMenuClick: null,
  windowSize: null,
  handleBackButton: null,
};

MenuBarHook.propTypes = {
  menuIsActive: PropTypes.bool,
  openMenu: PropTypes.func,
  showMenuList: PropTypes.func,
  className: PropTypes.string,
  handleCloseMenuClick: PropTypes.func,
  windowSize: PropTypes.string,
  handleBackButton: PropTypes.func,
};
