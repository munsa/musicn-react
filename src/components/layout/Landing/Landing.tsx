import React, {useEffect, useState} from 'react';
import './Landing.css';
import CityNightImage from '../../../shared/assets/image/city_night1920.png';
import {Carousel} from 'react-bootstrap';
import Slide1 from './Slide1/Slide1';
import Slide2 from './Slide2/Slide2';
import Slide3 from './Slide3/Slide3';
import Slide4 from './Slide4/Slide4';

const Landing = ({slideDuration}) => {
  const [index, setIndex] = useState(0);

  // fake active state that sets to false 50ms (animation duration) before the carousel active state
  const [activeSlide1, setActiveSlide1] = useState(false);
  const [activeSlide2, setActiveSlide2] = useState(false);
  const [activeSlide3, setActiveSlide3] = useState(false);
  const [activeSlide4, setActiveSlide4] = useState(false);
  useEffect(() => {
    onSlid();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const onSlid = () => {
    if (index === 0) {
      setActiveSlide1(true);
    } else if (index === 1) {
      setActiveSlide2(true);
    } else if (index === 2) {
      setActiveSlide3(true);
    } else if (index === 3) {
      setActiveSlide4(true);
    }
    setTimeout(() => {
      if (index === 0) {
        setActiveSlide1(false);
      } else if (index === 1) {
        setActiveSlide2(false);
      } else if (index === 2) {
        setActiveSlide3(false);
      } else if (index === 3) {
        setActiveSlide4(false);
      }
    }, slideDuration - 500)
  }

  const getStarted = () => {
    console.log('get started!');
  }

  return (
    <div className='landing-container'>
      <img className={'landing-city-image'} src={CityNightImage}/>
      <Carousel activeIndex={index}
                onSelect={handleSelect}
                onSlid={() => onSlid()}
                className='landing-carousel'
                slide={false}
                interval={slideDuration}
                pause={false}
                keyboard={false}
                indicators={true}
                controls={false}>
        <Carousel.Item>
          <Slide1 active={activeSlide1} getStartedCallback={() => getStarted()}/>
        </Carousel.Item>
        <Carousel.Item>
          <Slide2 active={activeSlide2} getStartedCallback={() => getStarted()}/>
        </Carousel.Item>
        <Carousel.Item>
          <Slide3 active={activeSlide3} getStartedCallback={() => getStarted()}/>
        </Carousel.Item>
        <Carousel.Item>
          <Slide4 active={activeSlide4} getStartedCallback={() => getStarted()}/>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

Landing.defaultProps = {
  slideDuration: 7000
}

export default Landing;