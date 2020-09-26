import React, {useEffect, useState} from 'react';
import './Slide1.css';
import {Col, Row} from 'react-bootstrap';
import Girl2 from '../../../../shared/assets/image/girl2.png';
import classList from '../../../../shared/utils/classList';

const Slide1 = ({active}) => {
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
      <Col xl={{span: 2, order: 1}} xs={{span: 12, order: 2}}>
        <img
          className={classList('landing-item-image left', (fadeIn && 'animateImageIn'), (fadeOut && 'animateImageOut'))}
          src={Girl2}
          alt="First girl"
        />
      </Col>
      <Col xl={{span: 10, order: 2}} xs={{span: 12, order: 1}}>
        <div className={classList('landing-item-text right', (fadeIn && 'animateTextIn'), (fadeOut && 'animateTextOut'))}>
          <h3>Find new tunes</h3>
          <p>Press the friendly moon when you hear something you like. Let us catch the tune.</p>
        </div>
      </Col>
    </Row>
  );
};

export default Slide1;