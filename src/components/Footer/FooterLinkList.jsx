/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import AnimateHeight from 'react-animate-height';
import FakeLink from '../FakeLink/FakeLink';

class FooterLinkList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
    };
  }

  handleDropdownClick() {
    const { dropdownActive } = this.state;
    this.setState({
      dropdownActive: !dropdownActive,
    })
  }

  render() {
    const { linkListArray, listName, windowSize } = this.props;
    const { dropdownActive } = this.state;
    const linkList = linkListArray.map(linkItem => <FakeLink key={linkItem} className="Link" text={linkItem} />);
    const height = windowSize === 'small' && !dropdownActive ? 1 : 'auto';
    const arrowActiveClass = windowSize === 'small' && dropdownActive ? 'Active' : '';
    return (
      <div className="Link-list">
        {windowSize === 'small' ? (
          <React.Fragment>
            <button className="List-name Button" onClick={() => this.handleDropdownClick()}> {listName} <span className={`Arrow ${arrowActiveClass}`}/> </button>
            <AnimateHeight
              duration={200}
              height={height}
              animateOpacity
              easing="linear"
            >
              <div className="Link-list-items">
                {linkList}
              </div>
            </AnimateHeight>
          </React.Fragment>
        ) :
      (
        <React.Fragment>
          <p className="List-name">
            {listName}
          </p>
          <div className="Link-list">
            {linkList}
          </div>
        </React.Fragment>
      )}

      </div>
    );
  }
}

FooterLinkList.defaultProps = {
  listName: null,
  linkListArray: null,
  windowSize: null,
};

FooterLinkList.propTypes = {
  listName: PropTypes.string,
  linkListArray: PropTypes.array,
  windowSize: PropTypes.string,
};

export default FooterLinkList;
