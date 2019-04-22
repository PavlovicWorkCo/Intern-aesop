import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import FocusTrap from 'focus-trap-react';
import MenuBar from '../MenuBar/MenuBar';
import MenuList from './MenuList';
import SubMenu from './SubMenu';
import SubMenuDetails from './SubMenuDetails';
import FakeLink from '../FakeLink/FakeLink';
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
    const { menuIsActive, visibleMenuName, subMenuName } = this.state;
    const { windowSize } = this.props;
    if (prevState.menuIsActive !== menuIsActive) {
      if (menuIsActive) {
        document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
      } else {
        document.getElementsByTagName('BODY')[0].style.overflow = 'visible';
      }
    }

    if (prevProps.windowSize !== windowSize) {
      this.closeMenu();
    }
    if ((prevState.visibleMenuName && prevState.visibleMenuName !== visibleMenuName)
    || (prevState.subMenuName && prevState.subMenuName !== subMenuName)) {
      this.handleSubMenuMouseLeave();
    }
  }

  setSubMenu(name) {
    this.setState({
      subMenuName: name,
    },
    () => {
      document.querySelector('.Sub-menu.Active a').focus();
    });
  }

  handleMenuBarBackButton() {
    const { subMenuName, visibleMenuName } = this.state;
    if (subMenuName) {
      this.setState({
        subMenuName: null,
      });
      return;
    }
    if (visibleMenuName && visibleMenuName !== 'Toggle-menu') {
      this.setState({
        visibleMenuName: 'Toggle-menu',
      });
      return;
    }
    this.setState({
      visibleMenuName: null,
      menuIsActive: null,
    });
  }

  handleOutsideOfMenuClick() {
    const { menuIsActive } = this.state;
    if (menuIsActive) {
      this.setState({
        visibleMenuName: null,
        subMenuName: null,
        subMenuDetailsVisible: false,
      });
    }
    this.setState({
      menuIsActive: false,
    });
  }

  handleSubMenuMouseLeave() {
    this.setState({
      subMenuDetailsVisible: false,
    });
  }

  closeMenu() {
    this.setState({
      menuIsActive: false,
      subMenuName: null,
      subMenuDetailsVisible: false,
      visibleMenuName: null,
    });
  }

  openMenu() {
    const { menuIsActive } = this.state;
    if (menuIsActive) return;
    this.setState({
      menuIsActive: true,
    });
  }

  showMenuList(listName) {
    const { menuIsActive, visibleMenuName } = this.state;
    if (listName === 'Toggle-menu' && menuIsActive) {
      this.closeMenu();
      return;
    }
    this.setState({
      visibleMenuName: listName,
      subMenuName: null,
    },
    () => {
      if (visibleMenuName === 'Toggle-menu') {
        document.querySelector('.Test-menu.Open-menu .Menu-list.Visible a').focus();
      }
    });
  }

  showSubMenuDetails() {
    const { windowSize } = this.props;
    if (windowSize === 'small') return;
    this.setState({
      subMenuDetailsVisible: true,
    });
  }

  render() {
    const {
      menuIsActive, visibleMenuName, subMenuName, subMenuDetailsVisible,
    } = this.state;
    const { windowSize } = this.props;
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
          <OutsideClickHandler onOutsideClick={() => this.handleOutsideOfMenuClick()}>
            <MenuBar
              menuIsActive={menuIsActive}
              openMenu={() => this.openMenu()}
              showMenuList={listName => this.showMenuList(listName)}
              handleCloseMenuClick={() => this.closeMenu()}
              windowSize={windowSize}
              handleBackButton={() => this.handleMenuBarBackButton()}
            />
            <div onMouseEnter={() => this.handleSubMenuMouseLeave()} className={`Test-menu ${openMenuClass}`}>
              <MenuList
                menuName="Toggle-menu"
                menuItemsArray={['Shop', 'Read']}
                visibleMenuName={visibleMenuName}
                setSubMenu={name => this.showMenuList(name)}
                menuIsActive={menuIsActive}
                windowSize={windowSize}
                subMenuName={subMenuName}
              />
              <MenuList
                menuName="Shop"
                menuItemsArray={['Skin', 'Hair', 'Body', 'Fragrance', 'Home', 'Kits & Travel', 'Gifts']}
                visibleMenuName={visibleMenuName}
                setSubMenu={name => this.setSubMenu(name)}
                menuIsActive={menuIsActive}
                windowSize={windowSize}
                subMenuName={subMenuName}
              />
              <MenuList
                menuName="Read"
                menuItemsArray={['About', 'Philosophy', 'The Ledger', 'The Fabulist', 'Taxonomy of design']}
                visibleMenuName={visibleMenuName}
                setSubMenu={name => this.setSubMenu(name)}
                menuIsActive={menuIsActive}
                windowSize={windowSize}
                subMenuName={subMenuName}
              />
            </div>
            {
              menuIsActive && (
                <SubMenu
                  subMenuArray={subMenuArray}
                  handleSubMenuMouseEnter={() => this.showSubMenuDetails()}
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
}

Menu.defaultProps = {
  windowSize: null,
};

Menu.propTypes = {
  windowSize: PropTypes.string,
};

export default Menu;
