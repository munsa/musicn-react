import React from 'react';
import {connect} from 'react-redux'
import './Header.css';
import classList from '../../../../shared/utils/classList';
import CityDayImage from '../../../../shared/assets/image/city1920.png';
import CityNightImage from '../../../../shared/assets/image/city_night1920.png';

const Header = ({playing}) => {
  return (
    <div className='header-container'>
      <img className={classList('city-image', playing ? 'fadeIn':'fadeOut')} src={CityDayImage}/>
      <img className={classList('city-image', playing ? 'fadeOut':'fadeIn')} src={CityNightImage}/>
    </div>
  );
}

const mapStateToProps = state => ({
  playing: state.recording.playing
});

export default connect(mapStateToProps)(Header);