import React, {useEffect, useRef, useState} from 'react';
import './Landing.css';
import PubSub from 'pubsub-js';
import CityNightImage from '../../../shared/assets/image/city_night1920.png';
import LandingSlide from './LandingSlide/LandingSlide';
import Slide1 from './LandingSlide/Slide1/Slide1';
import Slide2 from './LandingSlide/Slide2/Slide2';
import Slide3 from './LandingSlide/Slide3/Slide3';
import Slide4 from './LandingSlide/Slide4/Slide4';
import {EVENT_SHOW_AUTH_DROPDOWN} from '../appNavbar/AuthDropdown/AuthDropdown';

const Landing = ({slideDuration}) => {
  const [index, setIndex] = useState(-1);
  const timeoutId = useRef(null);
  useEffect(() => {
    nextSlide(0);
    return () => {
      clearTimeout(timeoutId.current);
    }
  }, [])

  const getStarted = () => {
    PubSub.publish(EVENT_SHOW_AUTH_DROPDOWN, true);
  }

  const nextSlide = (index) => {
    let timer: NodeJS.Timeout;
    setIndex(index)
    timer = setTimeout(() => {
      const i = index < 3 ? index + 1 : 0;
      nextSlide(i);
    }, slideDuration);
    timeoutId.current = timer;
  }

  /**
   * TODO: Improve custom carousel with arrows for next and previous slides + bottom controls
   */
  return (
    <div className='landing-container' key={index}>
      <img className={'landing-city-image'} src={CityNightImage} alt='Background city'/>
      {index === 0 &&
      <LandingSlide Slide={Slide1}
                    active={index === 0}
                    getStartedCallback={() => getStarted()}
                    slideDuration={slideDuration}/>
      }
      {index === 1 &&
      <LandingSlide Slide={Slide2}
                    active={index === 1}
                    getStartedCallback={() => getStarted()}
                    slideDuration={slideDuration}/>
      }
      {index === 2 &&
      <LandingSlide Slide={Slide3}
                    active={index === 2}
                    getStartedCallback={() => getStarted()}
                    slideDuration={slideDuration}/>
      }
      {index === 3 &&
      <LandingSlide Slide={Slide4}
                    active={index === 3}
                    getStartedCallback={() => getStarted()}
                    slideDuration={slideDuration}/>
      }
    </div>
  )
}

Landing.defaultProps = {
  slideDuration: 7000
}

export default Landing;