import PropTypes from 'prop-types';
import React from 'react';
import exampleProductPicture from '../../assets/Aesop-Skin-In-Two-Minds-Facial-Cleanser-100mL-Large-782x796px.png';


const SubMenuDetails = ({
  isVisible, visibleMenuName,
}) => {
  const subMenuDetailVisibleClass = !isVisible ? 'Inactive' : 'Active';
  return (
    <div className={`Sub-menu-detail ${subMenuDetailVisibleClass}`}>
      {visibleMenuName === 'Shop' ? <img className={`Product-picture ${subMenuDetailVisibleClass}`} src={exampleProductPicture} alt="product description" /> : <div> description </div>}
    </div>
  );
};

SubMenuDetails.defaultProps = {
  visibleMenuName: null,
  isVisible: null,
};

SubMenuDetails.propTypes = {
  visibleMenuName: PropTypes.string,
  isVisible: PropTypes.string,
};

export default SubMenuDetails;
