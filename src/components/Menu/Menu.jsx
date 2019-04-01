import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import MenuBar from '../MenuBar/MenuBar';
import MenuList from './MenuList';
import SubMenu from './SubMenu';
import './Menu.scss';

class Menu extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      menuIsActive: false,
      visibleMenuName: null,
      subMenuName: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { menuIsActive } = this.state;
    if (prevState.menuIsActive !== menuIsActive) {
      if (menuIsActive) {
        document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
      } else {
        document.getElementsByTagName('BODY')[0].style.overflow = 'visible';
      }
    }
  }

  setSubMenu(name) {
    this.setState({
      subMenuName: name,
    });
  }

  handleOutsideOfMenuClick() {
    const { menuIsActive } = this.state;
    if (menuIsActive) {
      this.setState({
        visibleMenuName: null,
        subMenuName: null,
      });
    }
    this.setState({
      menuIsActive: false,
    });
  }

  openMenu() {
    this.setState({
      menuIsActive: true,
    });
  }

  showMenuList(listName) {
    this.setState({
      visibleMenuName: listName,
      subMenuName: null,
    });
  }

  render() {
    const { menuIsActive, visibleMenuName, subMenuName } = this.state;
    const openMenuClass = menuIsActive ? 'Open-menu' : '';
    const menuClickBlockerActive = menuIsActive ? 'Active' : '';
    const subMenuArray = subMenuName ? [] : null;
    if (subMenuName) {
      for (let i = 0; i < 8; i += 1) {
        subMenuArray.push(`${subMenuName}${i}`);
      }
    }
    return (
      <React.Fragment>
        <OutsideClickHandler onOutsideClick={() => this.handleOutsideOfMenuClick()}>
          <MenuBar
            menuIsActive={menuIsActive}
            openMenu={() => this.openMenu()}
            showMenuList={listName => this.showMenuList(listName)}
          />
          <div className={`Test-menu ${openMenuClass}`}>
            <MenuList
              menuName="Shop"
              menuItemsArray={['Skin', 'Hair', 'Body', 'Fragrance', 'Home', 'Kits & Travel', 'Gifts']}
              visibleMenuName={visibleMenuName}
              setSubMenu={name => this.setSubMenu(name)}
            />
            <MenuList
              menuName="Read"
              menuItemsArray={['About', 'Philosophy', 'The Ledger', 'The Fabulist', 'Taxonomy of design']}
              visibleMenuName={visibleMenuName}
              setSubMenu={name => this.setSubMenu(name)}
            />
          </div>
          <SubMenu subMenuArray={subMenuArray} />
        </OutsideClickHandler>
        <div className={`Menu-click-blocker ${menuClickBlockerActive}`} />
      </React.Fragment>
    );
  }
}

export default Menu;
