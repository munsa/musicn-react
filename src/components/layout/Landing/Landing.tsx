import React, {useState} from 'react';
import './Landing.css';
import CityNightImage from '../../../shared/assets/image/city_night1920.png';
import CityDayImage from '../../../shared/assets/image/city1920.png';
import {Carousel} from 'react-bootstrap';
import Slide1 from './Slide1/Slide1';
import Slide2 from './Slide2/Slide2';
import Slide3 from './Slide3/Slide3';
import Slide4 from './Slide4/Slide4';

const Landing = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='landing-container'>
      <img className={'landing-city-image'} src={CityNightImage}/>
      <Carousel activeIndex={index}
                onSelect={handleSelect}
                className='landing-carousel'
                slide={false}
      interval={null}>
        <Carousel.Item>
          <Slide1/>
        </Carousel.Item>
        <Carousel.Item>
          <Slide2/>
        </Carousel.Item>
        <Carousel.Item>
          <Slide3/>
        </Carousel.Item>
        <Carousel.Item>
          <Slide4/>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Landing;