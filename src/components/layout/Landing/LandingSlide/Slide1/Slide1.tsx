import React from 'react';
import './Slide1.css';
import {Button, Col, Row} from 'react-bootstrap';
import Girl2 from '../../../../../shared/assets/image/girl2.png';
import classList from '../../../../../shared/utils/classList';

const Slide1 = ({getStartedCallback}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 3, order: 1}} xs={{span: 12, order: 2}}>
        <img className={classList('landing-item-image left')}
             src={Girl2}
             alt="First girl"
        />
      </Col>
      <Col xl={{span: 9, order: 2}} xs={{span: 12, order: 1}}>
        <div
          className={classList('landing-item-text right')}>
          <h3>Catch tunes</h3>
          <p>Press the friendly moon when you hear something you like and start catching tunes.</p>
          <Button variant='secondary' onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
    </Row>
  );
};

export default Slide1;