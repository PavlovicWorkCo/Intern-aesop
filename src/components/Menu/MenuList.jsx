import React from 'react';
import PropTypes from 'prop-types';
import FakeLink from '../FakeLink/FakeLink';

class MenuList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const {
      menuItemsArray, className, visibleMenuName, menuName, setSubMenu,
    } = this.props;
    const isVisibleClass = visibleMenuName === menuName ? 'Visible' : '';
    const menuItems = menuItemsArray.map((menuItem, index) => {
      const listSlideClass = isVisibleClass ? `Slide-in-${index}` : '';
      return (
        <li className={`Menu-list-item ${listSlideClass}`}>
          <FakeLink onMouseEnter={() => setSubMenu(menuItem)} text={menuItem} className="Menu-fake-link" />
        </li>
      );
    });
    return (
      <ul className={`${className} ${isVisibleClass}`}>
        {menuItems}
      </ul>
    );
  }
}

MenuList.defaultProps = {
  menuItemsArray: null,
  className: 'Menu-list',
  visibleMenuName: null,
  menuName: null,
  setSubMenu: null,
};

MenuList.propTypes = {
  menuItemsArray: PropTypes.string,
  className: PropTypes.string,
  visibleMenuName: PropTypes.string,
  menuName: PropTypes.string,
  setSubMenu: PropTypes.func,
};

export default MenuList;
