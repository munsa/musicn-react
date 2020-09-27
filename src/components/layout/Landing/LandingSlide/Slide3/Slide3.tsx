import React from 'react';
import './Slide3.css';
import {Button, Col, Row} from 'react-bootstrap';
import Girl1 from '../../../../../shared/assets/image/girl1.png';
import classList from '../../../../../shared/utils/classList';

const Slide3 = ({getStartedCallback, animation}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 2, order: 1}} xs={{span: 12, order: 2}}>
        <img
          className={classList('landing-item-image left', animation)}
          src={Girl1}
          alt="First girl"
        />
      </Col>
      <Col xl={{span: 10, order: 2}} xs={{span: 12, order: 1}}>
        <div
          className={classList('landing-item-text right', animation)}>
          <h3>New in town?</h3>
          <p>Discover the bars in the city that play the music you like.</p>
          <Button onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
    </Row>
  );
};

export default Slide3;