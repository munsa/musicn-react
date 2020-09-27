import React, {useState} from 'react';
import './Landing.css';
import CityNightImage from '../../../shared/assets/image/city_night1920.png';
import {Carousel} from 'react-bootstrap';
import LandingSlide from './LandingSlide/LandingSlide';
import Slide1 from './LandingSlide/Slide1/Slide1';
import Slide2 from './LandingSlide/Slide2/Slide2';
import Slide3 from './LandingSlide/Slide3/Slide3';
import Slide4 from './LandingSlide/Slide4/Slide4';

const Landing = ({slideDuration}) => {
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);

  const handleSelect = (selectedIndex) => {
    setPreviousIndex(index);
    setIndex(selectedIndex);
    console.log('previousIndex: ' + previousIndex + ', index: ' + selectedIndex);
  };

  const getStarted = () => {
    console.log('get started!');
  }

  return (
    <div className='landing-container'>
      <img className={'landing-city-image'} src={CityNightImage}/>
      <Carousel activeIndex={index}
                onSelect={handleSelect}
                className='landing-carousel'
                slide={false}
                interval={slideDuration}
                pause={false}
                keyboard={true}
                indicators={true}
                controls={true}>
        <Carousel.Item>
          <LandingSlide Slide={Slide1}
                        active={index === 0}
                        getStartedCallback={() => getStarted()}
                        slideDuration={slideDuration}/>
        </Carousel.Item>
        <Carousel.Item>
          <LandingSlide Slide={Slide2}
                        active={index === 1}
                        getStartedCallback={() => getStarted()}
                        slideDuration={slideDuration}/>
        </Carousel.Item>
        <Carousel.Item>
          <LandingSlide Slide={Slide3}
                        active={index === 2}
                        getStartedCallback={() => getStarted()}
                        slideDuration={slideDuration}/>
        </Carousel.Item>
        <Carousel.Item>
          <LandingSlide Slide={Slide4}
                        active={index === 3}
                        getStartedCallback={() => getStarted()}
                        slideDuration={slideDuration}/>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

Landing.defaultProps = {
  slideDuration: 7000
}

export default Landing;