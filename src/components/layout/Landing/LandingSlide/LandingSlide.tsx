import React, {useEffect, useState} from 'react';
import './LandingSlide.css';

const LandingSlide = ({Slide, active, getStartedCallback, slideDuration}) => {
  return (
    <Slide getStartedCallback={getStartedCallback}/>
  );
};

export default LandingSlide;