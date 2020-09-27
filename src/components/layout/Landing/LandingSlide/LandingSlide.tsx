import React, {Fragment, useEffect, useState} from 'react';
import './LandingSlide.css';

const LandingSlide = ({Slide, active, getStartedCallback, slideDuration}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [timeoutId, setTimeoutId] = useState(undefined);
  useEffect(() => {
    if(active) {
      setFadeIn(true);
      setFadeOut(false);
      const id = setTimeout(() => {
        setFadeOut(true);
        setFadeIn(false);
      }, slideDuration - 500);
      setTimeoutId(id);
    } else {
      clearTimeout(timeoutId);
    }


  }, [active]);

  return (
    <Fragment>
      <Slide getStartedCallback={getStartedCallback} fadeIn={fadeIn} fadeOut={fadeOut}/>
    </Fragment>

  );
};

export default LandingSlide;