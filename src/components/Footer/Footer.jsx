import PropTypes from 'prop-types';
import React from 'react';
import FooterLinkList from './FooterLinkList';
import './Footer.scss';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputFocused: false,
      emailInput: null,
    };
  }

  handleInputFocus(boolValue) {
    this.setState({
      inputFocused: boolValue,
    });
  }

  handleEmailInputChange(e) {
    this.setState({
      emailInput: e.target.value,
    });
  }

  render() {
    const { inputFocused, emailInput } = this.state;
    const { windowSize } = this.props;
    const labelClass = inputFocused || emailInput ? 'Above-input' : '';
    return (
      <React.Fragment>
        <div className="Footer-container">
          <div className="Email-form">
            <p className="Subscribe-info">
              I would like to receive communications about Aesop products, services,
               stores, events and matters of cultural interest.
            </p>
            <label htmlFor="email" className="Label">
              <input
                id="email"
                type="text"
                className="Input"
                onFocus={() => this.handleInputFocus(true)}
                onBlur={() => this.handleInputFocus(false)}
                onChange={e => this.handleEmailInputChange(e)}
              />
              <p className={`Label-text ${labelClass}`}>Email address</p>
            </label>
          </div>
          <div className="Link-lists-container">
            <FooterLinkList
              listName="Contact Us"
              linkListArray={['Contact us', 'Delivery and returns', 'Terms and conditions', 'FAQs', 'Track your order']}
              windowSize={windowSize}
            />
            <FooterLinkList
              listName="About"
              linkListArray={['Our story', 'Careers', 'Press', 'Corporate gifts', 'Facial appointments']}
              windowSize={windowSize}
            />
            <FooterLinkList
              listName="Social"
              linkListArray={['Instagram', 'Twitter', 'LinkedIn']}
              windowSize={windowSize}
            />
          </div>
        </div>
        <div className="Bottom-footer">
          <p>© Aesop</p>
          <p>
            <span className="Country">France</span>
            <span className="Language">EN</span>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

Footer.defaultProps = {
  windowSize: null,
};

Footer.propTypes = {
  windowSize: PropTypes.string,
};

export default Footer;
