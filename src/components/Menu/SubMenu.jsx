import PropTypes from 'prop-types';
import React from 'react';
import FakeLink from '../FakeLink/FakeLink';

const SubMenu = ({
  subMenuArray, handleSubMenuMouseEnter, menuIsActive,
}) => {
  const subMenuLinks = subMenuArray
    ? subMenuArray.map((subMenuItem, index) => (
      <li key={subMenuItem} className={`Sub-menu-item Slide-in-${index}`}>
        <FakeLink text={subMenuItem} onMouseEnter={handleSubMenuMouseEnter} onClick={handleSubMenuMouseEnter} className="Sub-menu-link" />
      </li>
    )) : null;
  const subMenuVisibleClass = subMenuLinks && menuIsActive ? 'Visible' : '';
  return (
    <div className={`Sub-menu ${subMenuVisibleClass}`}>
      <ul className="Sub-menu-list">
        {subMenuLinks}
      </ul>
    </div>
  );
};

SubMenu.defaultProps = {
  subMenuArray: null,
  handleSubMenuMouseEnter: null,
  menuIsActive: null,
};

SubMenu.propTypes = {
  subMenuArray: PropTypes.array,
  handleSubMenuMouseEnter: PropTypes.func,
  menuIsActive: PropTypes.bool,
};

export default SubMenu;
