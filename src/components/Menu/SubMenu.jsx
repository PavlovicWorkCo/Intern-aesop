import PropTypes from 'prop-types';
import React from 'react';
import FakeLink from '../FakeLink/FakeLink';

const SubMenu = ({
  subMenuArray,
}) => {
  const subMenuLinks = subMenuArray
    ? subMenuArray.map((subMenuItem, index) => (
      <li key={subMenuItem} className={`Sub-menu-item Slide-in-${index}`}>
        <FakeLink text={subMenuItem} className="Sub-menu-link" />
      </li>
    )) : null;
  const subMenuVisibleClass = subMenuLinks ? 'Visible' : '';
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
};

SubMenu.propTypes = {
  subMenuArray: PropTypes.array,
};

export default SubMenu;
