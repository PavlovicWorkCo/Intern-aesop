import PropTypes from 'prop-types';
import React from 'react';

const FakeLink = ({
  text, className, href, onClick, onMouseEnter, onMouseLeave,
}) => (
  <a
    onClick={onClick}
    href={href}
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
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
};

FakeLink.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default FakeLink;
