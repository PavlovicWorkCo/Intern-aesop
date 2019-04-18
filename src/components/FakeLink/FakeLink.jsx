import PropTypes from 'prop-types';
import React from 'react';

const FakeLink = ({
  text, className, href, onClick, onMouseEnter, onMouseLeave, tabIndex,
}) => (
  <a
    onClick={onClick}
    href={href}
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    tabIndex={tabIndex}
  >
    <span>
      {text}
    </span>
  </a>
);

FakeLink.defaultProps = {
  text: 'Test-link',
  className: 'Link-test',
  href: '#',
  onClick: null,
  onMouseEnter: null,
  onMouseLeave: null,
  tabIndex: null,
};

FakeLink.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default FakeLink;
