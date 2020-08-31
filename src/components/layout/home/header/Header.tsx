import React from 'react';
import './Header.css';
import CityImage from '../../../../shared/assets/image/city1920topspace.png';

const Header = () => {
  return (
    <div className='header-container'>
      <img className='city-image' src={CityImage}/>
    </div>
  );
}

export default Header;