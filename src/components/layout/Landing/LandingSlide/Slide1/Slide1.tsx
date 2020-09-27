import React, {useEffect} from 'react';
import './Slide1.css';
import {Button, Col, Row} from 'react-bootstrap';
import Girl2 from '../../../../../shared/assets/image/girl2.png';
import classList from '../../../../../shared/utils/classList';

const Slide1 = ({getStartedCallback, animation}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 2, order: 1}} xs={{span: 12, order: 2}}>
        <img
          className={classList('landing-item-image left', animation)}
          src={Girl2}
          alt="First girl"
        />
      </Col>
      <Col xl={{span: 10, order: 2}} xs={{span: 12, order: 1}}>
        <div
          className={classList('landing-item-text right', animation)}>
          <h3>Find new tunes</h3>
          <p>Press the friendly moon when you hear something you like and start catching tunes.</p>
          <Button onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
    </Row>
  );
};

export default Slide1;