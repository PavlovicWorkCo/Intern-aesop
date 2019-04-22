// import PropTypes from 'prop-types';
import React from 'react';
import decorativePicture from '../../assets/decoration-pic.jpg';
import contentProduct from '../../assets/Content-product.png';
import headerPic from '../../assets/Header-pic.jpg';
import './Content.scss';

const Content = () => (
  <div className="Content">
    <div src={headerPic} alt="" className="Header-picture" />
    <div className="Product-section">
      <div className="Product-picture-container">
        <img alt="" className="Decoration-picture" src={contentProduct} />
      </div>
      <div className="Product-container">
        <h5>Gentle Facial Cleansing Milk</h5>
        <h2>The skin at ease</h2>
        <p>
          Offering an exceptionally mild yet thorough cleanse,
           Gentle Facial Cleansing Milk removes surface impurities without stripping moisture,
           making it especially beneficial for dry or sensitive skin.
        </p>
        <button type="button" className="Find-store-button">
          Explore Gentle Facial Cleansing Milk
          <span className="Right-arrow" />
        </button>
      </div>
    </div>
    <div className="Store-locator-section">
      <div className="Store-locator-container">
        <h5>Visit</h5>
        <h2>Store Locator</h2>
        <p>
          In each store, trained consultants will be pleased to host you,
           and to assist with gift selections.
        </p>
        <button type="button" className="Find-store-button">
          Find a nearby store
          <span className="Right-arrow" />
        </button>
      </div>
      <div className="Decoration-picture-container">
        <img alt="" className="Decoration-picture" src={decorativePicture} />
      </div>
    </div>
    <div className="Quote-section">
      <h2 className="Quote">‘Every day a little life, a blank to be inscribed with gentle thoughts.’</h2>
      <p>Samuel Rogers</p>
    </div>
  </div>
);

Content.defaultProps = {
};

Content.propTypes = {
};

export default Content;
