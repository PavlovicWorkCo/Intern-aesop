import React from 'react';
import PropTypes from 'prop-types';
import FakeLink from '../FakeLink/FakeLink';

class MenuList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }
  handleMouseEnterMenuItem(menuItem) {
    const { windowSize, setSubMenu } = this.props;
    if (windowSize === 'small') return;
    setSubMenu(menuItem);
  }

  render() {
    const {
      menuItemsArray, className, visibleMenuName, menuName, setSubMenu,
      menuIsActive, windowSize, subMenuName,
    } = this.props;
    const isVisibleClass = visibleMenuName === menuName && menuIsActive && (windowSize !== 'small' || !subMenuName) ? 'Visible' : '';
    const menuItems = menuItemsArray.map((menuItem, index) => {
      const listSlideClass = isVisibleClass ? `Slide-in-${index}` : '';
      return (
        <li key={menuItem} className={`Menu-list-item ${listSlideClass}`}>
          <FakeLink
            onMouseEnter={() => this.handleMouseEnterMenuItem(menuItem)}
            onClick={() => setSubMenu(menuItem)}
            text={menuItem}
            className="Menu-fake-link"
          />
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
  menuIsActive: null,
  windowSize: null,
  subMenuName: null,
};

MenuList.propTypes = {
  menuItemsArray: PropTypes.array,
  className: PropTypes.string,
  visibleMenuName: PropTypes.string,
  menuName: PropTypes.string,
  setSubMenu: PropTypes.func,
  menuIsActive: PropTypes.bool,
  windowSize: PropTypes.string,
  subMenuName: PropTypes.string,
};

export default MenuList;
