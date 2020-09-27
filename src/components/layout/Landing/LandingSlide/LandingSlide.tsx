import React, {useEffect, useState} from 'react';
import './LandingSlide.css';

const LandingSlide = ({Slide, active, getStartedCallback, slideDuration}) => {
  const [animation, setAnimation] = useState('');
  const [timeoutId, setTimeoutId] = useState(undefined);
  useEffect(() => {
    if (active) {
      setAnimation('fade-in')
      const id = setTimeout(() => {
        setAnimation('fade-out');
      }, slideDuration - 500);
      setTimeoutId(id);
    } else {
      clearTimeout(timeoutId);
    }
  }, [active]);

  return (
    <Slide getStartedCallback={getStartedCallback} animation={animation}/>
  );
};

export default LandingSlide;