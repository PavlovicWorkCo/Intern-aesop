import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import FocusTrap from 'focus-trap-react';
import SubMenu from './SubMenu';
import MenuList from './MenuList';
import SubMenuDetails from './SubMenuDetails';
import FakeLink from '../FakeLink/FakeLink';
import MenuBarHook from '../MenuBar/MenuBarHook';
import './Menu.scss';
/* eslint-disable react/prop-types */

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
      document.querySelector('.Sub-menu.Active a').focus();
    }
  }, [subMenuName]);

  useEffect(() => {
    if (menuItemsArray.includes(visibleMenuName) && subMenuName === null && windowSize === 'small') {
      document.querySelector('.Test-menu.Open-menu .Menu-list.Visible a').focus();
    }
  }, [visibleMenuName]);

  useEffect(() => {
    setMenuIsActive(false);
    setSubMenuName(null);
    setSubMenuDetailsVisible(false);
    setVisibleMenuName(null);
  }, [windowSize]);

  function setSubMenu(name) {
    setSubMenuName(name);
    if (name === subMenuName) document.querySelector('.Sub-menu.Active a').focus();
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
    setVisibleMenuName(null);
    setMenuIsActive(null);
    document.querySelector('.Menu-bar button.Toggle-menu').focus();
  }

  function handleOutsideOfMenuClick() {
    if (menuIsActive) {
      setVisibleMenuName(null);
      setSubMenuName(null);
      setSubMenuDetailsVisible(false);
    }
    setMenuIsActive(false);
  }

  function handleSubMenuMouseLeave() {
    setSubMenuDetailsVisible(false);
  }

  function closeMenu() {
    setMenuIsActive(false);
    setSubMenuName(null);
    setSubMenuDetailsVisible(false);
    setVisibleMenuName(null);
    if (windowSize === 'small') {
      document.querySelector('.Menu-bar button.Toggle-menu').focus();
    } else {
      document.querySelector('.Menu-bar .Menu-bar-options a').focus();
    }
  }

  function openMenu() {
    if (menuIsActive) return;
    setMenuIsActive(true);
  }

  function showMenuList(listName) {
    if (listName === 'Toggle-menu' && menuIsActive) {
      closeMenu();
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
            handleCloseMenuClick={() => closeMenu()}
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
