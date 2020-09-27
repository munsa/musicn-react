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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getStarted = () => {
    console.log('get started!');
  }

  /**
   * Controls are disabled because the Carousel component doesnt stop the timer if you change the slide.
   * ie: If the interval is 5000 and the active slide is 1.
   * If you move to the next slide at the moment 3000, slide 2 will only show for 2000ms.
   * This makes very unpredictable when to initiate the fade out and causes errors.
   * TODO: Make a custom Carousel
   */
  return (
    <div className='landing-container'>
      <img className={'landing-city-image'} src={CityNightImage}/>
      <Carousel activeIndex={index}
                onSelect={handleSelect}
                className='landing-carousel'
                slide={false}
                interval={slideDuration}
                pause={false}
                controls={false}
                indicators={false}
                keyboard={false}>
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