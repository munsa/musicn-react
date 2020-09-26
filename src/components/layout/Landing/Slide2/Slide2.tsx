import React, {useEffect, useState} from 'react';
import './Slide2.css';
import {Col, Row} from 'react-bootstrap';
import Boy2 from '../../../../shared/assets/image/boy2.png';
import classList from '../../../../shared/utils/classList';

const Slide2 = ({active}) => {
  const [activeBefore, setActiveBefore] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    if (!activeBefore && active) {
      setFadeIn(true);
      setFadeOut(false);
    } else if (activeBefore && !active) {
      setFadeOut(true);
      setFadeIn(false);
    }
    setActiveBefore(active);
  }, [active]);

  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 10, order: 1}} xs={{span: 12, order: 1}}>
        <div className='landing-item-text left'>
          <h3>Explore music near you</h3>
          <p>Find on the map what other users listen around you.</p>
        </div>
      </Col>
      <Col xl={{span: 2, order: 2}} xs={{span: 12, order: 2}}>
        <img
          className={classList('landing-item-image right', (fadeIn && 'animateImageIn'), (fadeOut && 'animateImageOut'))}
          src={Boy2}
          alt="First boy"
        />
      </Col>
    </Row>
  );
};

export default Slide2;