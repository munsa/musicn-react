import React from 'react';
import './Slide3.css';
import {Button, Col, Row} from 'react-bootstrap';
import Girl1 from '../../../../../shared/assets/image/girl1.png';
import classList from '../../../../../shared/utils/classList';

const Slide3 = ({getStartedCallback}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 3, order: 1}} xs={{span: 12, order: 2}}>
        <img className={classList('landing-item-image left')}
             src={Girl1}
             alt="First girl"
        />
      </Col>
      <Col xl={{span: 9, order: 2}} xs={{span: 12, order: 1}}>
        <div
          className={classList('landing-item-text right')}>
          <h3>New in town?</h3>
          <p>Discover the bars in the city that play the music you like.</p>
          <Button variant='secondary' onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
    </Row>
  );
};

export default Slide3;