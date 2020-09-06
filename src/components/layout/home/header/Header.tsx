import React from 'react';
import './Header.css';
import CityImage from '../../../../shared/assets/image/city1920topspace.png';

const Header = () => {
  return (
    <div className='header-container'>
      <img className='city-image' src={CityImage}/>
      <div className='header-jumbotron'>
        Click on the happy sun and start discovering all the music you like!
      </div>
    </div>
  );
}

export default Header;