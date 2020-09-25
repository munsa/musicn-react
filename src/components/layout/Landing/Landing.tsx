import React from 'react';
import './Landing.css';
import classList from '../../../shared/utils/classList';
import CityDayImage from '../../../shared/assets/image/city1920.png';

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='landing-header-container'>
        <img className={classList('landing-city-image')} src={CityDayImage}/>
      </div>
    </div>
  )
}

export default Landing;