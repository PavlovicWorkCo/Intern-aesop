import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import FocusTrap from 'focus-trap-react';
import SubMenu from './SubMenu';
import MenuList from './MenuList';
import SubMenuDetails from './SubMenuDetails';
import FakeLink from '../FakeLink/FakeLink';
import MenuBarHook from '../MenuBar/MenuBarHook';
import './Menu.scss';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function MenuHook({ windowSize }) {
  const menuItemsArray = ['Shop', 'Read'];

  const [menuIsActive, setMenuIsActive] = useState(null);
  useEffect(() => {
    if (menuIsActive) {
      document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('BODY')[0].style.overflow = 'visible';
    }
  }, [menuIsActive]);

  const [visibleMenuName, setVisibleMenuName] = useState(null);
  const [subMenuDetailsVisible, setSubMenuDetailsVisible] = useState(false);
  useEffect(() => {
    if (visibleMenuName) {
      setSubMenuDetailsVisible(false);
    }
  }, [visibleMenuName]);

  const [subMenuName, setSubMenuName] = useState(null);
  useEffect(() => {
    if (subMenuName) {
      setSubMenuDetailsVisible(false);
      if (document.activeElement.classList.contains('Menu-fake-link')) {
        document.querySelector('.Sub-menu.Active a').focus();
      }
    }
  }, [subMenuName]);
  useEffect(() => {
    if (menuItemsArray.includes(visibleMenuName) && subMenuName === null && windowSize === 'small') {
      document.querySelector('.Test-menu.Open-menu .Menu-list.Visible a').focus();
    }
  }, [visibleMenuName]);

  function closeMenu() {
    setMenuIsActive(false);
    setSubMenuName(null);
    setSubMenuDetailsVisible(false);
    setVisibleMenuName(null);
  }
  const prevWindowSize = usePrevious(windowSize);
  useEffect(() => {
    closeMenu();
    if (menuIsActive) {
      if (windowSize === 'small' && prevWindowSize) {
        document.querySelector('.Menu-bar button.Toggle-menu').focus();
      }
      if (windowSize === 'big' && prevWindowSize) {
        document.querySelector('.Menu-bar .Menu-bar-options a').focus();
      }
    }
  }, [windowSize]);

  function setSubMenu(name) {
    setSubMenuName(name);
    if (name === subMenuName) document.querySelector('.Sub-menu.Active a').focus();
  }

  function handleCloseMenu() {
    closeMenu();
    if (windowSize === 'small') {
      document.querySelector('.Menu-bar button.Toggle-menu').focus();
    } else {
      document.querySelector('.Menu-bar .Menu-bar-options a').focus();
    }
  }

  function handleMenuBarBackButton() {
    if (subMenuName) {
      setSubMenuName(null);
      return;
    }
    if (visibleMenuName && visibleMenuName !== 'Toggle-menu') {
      setVisibleMenuName('Toggle-menu');
      return;
    }
    handleCloseMenu();
  }

  function handleOutsideOfMenuClick() {
    if (menuIsActive) {
      setVisibleMenuName(null);
      setSubMenuName(null);
      setSubMenuDetailsVisible(false);
      setMenuIsActive(false);
    }
  }

  function handleSubMenuMouseLeave() {
    setSubMenuDetailsVisible(false);
  }

  function openMenu() {
    if (menuIsActive) return;
    setMenuIsActive(true);
  }

  function showMenuList(listName) {
    if (listName === 'Toggle-menu' && menuIsActive) {
      handleCloseMenu();
      document.querySelector('.Menu-bar button.Toggle-menu').focus();
      return;
    }
    setVisibleMenuName(listName);
    setSubMenuName(null);
  }

  function showSubMenuDetails() {
    if (windowSize === 'small') return;
    setSubMenuDetailsVisible(true);
  }

  const openMenuClass = !menuIsActive ? 'Closed-menu' : 'Open-menu';
  const menuClickBlockerActive = menuIsActive && windowSize !== 'small' ? 'Active' : '';
  const subMenuArray = subMenuName ? [] : null;
  if (subMenuName) {
    for (let i = 0; i < 8; i += 1) {
      subMenuArray.push(`${subMenuName}${i}`);
    }
  }

  return (
    <React.Fragment>
      <FocusTrap active={menuIsActive}>
        <OutsideClickHandler onOutsideClick={() => handleOutsideOfMenuClick()}>
          <MenuBarHook
            menuIsActive={menuIsActive}
            openMenu={() => openMenu()}
            showMenuList={listName => showMenuList(listName)}
            handleCloseMenuClick={() => handleCloseMenu()}
            windowSize={windowSize}
            handleBackButton={() => handleMenuBarBackButton()}
          />
          <div onMouseEnter={() => handleSubMenuMouseLeave()} className={`Test-menu ${openMenuClass}`}>
            <MenuList
              menuName="Toggle-menu"
              menuItemsArray={menuItemsArray}
              visibleMenuName={visibleMenuName}
              setSubMenu={name => showMenuList(name)}
              menuIsActive={menuIsActive}
              windowSize={windowSize}
              subMenuName={subMenuName}
            />
            <MenuList
              menuName="Shop"
              menuItemsArray={['Skin', 'Hair', 'Body', 'Fragrance', 'Home', 'Kits & Travel', 'Gifts']}
              visibleMenuName={visibleMenuName}
              setSubMenu={name => setSubMenu(name)}
              menuIsActive={menuIsActive}
              windowSize={windowSize}
              subMenuName={subMenuName}
            />
            <MenuList
              menuName="Read"
              menuItemsArray={['About', 'Philosophy', 'The Ledger', 'The Fabulist', 'Taxonomy of design']}
              visibleMenuName={visibleMenuName}
              setSubMenu={name => setSubMenu(name)}
              menuIsActive={menuIsActive}
              windowSize={windowSize}
              subMenuName={subMenuName}
            />
          </div>
          {
            menuIsActive && (
              <SubMenu
                subMenuArray={subMenuArray}
                handleSubMenuMouseEnter={() => showSubMenuDetails()}
                menuIsActive={menuIsActive}
              />
            )
          }
          { windowSize !== 'small' && subMenuName && (
            <SubMenuDetails
              visibleMenuName={visibleMenuName}
              isVisible={subMenuDetailsVisible}
            />
          )}
          { windowSize === 'small' && menuIsActive && (
            <FakeLink text="Login" className="Login-link Slide-in-2" />
          )}
        </OutsideClickHandler>
      </FocusTrap>
      {windowSize !== 'small' && (
        <div className={`Menu-click-blocker ${menuClickBlockerActive}`} />
      )}
    </React.Fragment>
  );
}

MenuHook.defaultProps = {
  windowSize: null,
};

MenuHook.propTypes = {
  windowSize: PropTypes.string,
};
