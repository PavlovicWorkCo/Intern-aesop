import PropTypes from 'prop-types';
import React from 'react';

const FakeLink = ({
  text, className, href, onClick,
}) => (
  <a onClick={onClick} href={href} className={className}>
    <span>
      {text}
    </span>
  </a>
);

FakeLink.defaultProps = {
  text: null,
  className: null,
  href: null,
  onClick: null,
};

FakeLink.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.string,
};

export default FakeLink;
