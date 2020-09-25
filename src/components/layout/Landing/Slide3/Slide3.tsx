import React from 'react';
import './Slide3.css';
import {Col, Row} from 'react-bootstrap';
import Girl1 from '../../../../shared/assets/image/girl1.png';

const Slide3 = () => {
  return (
    <Row className='landing-item-container'>
      <Col md={{span: 2, order: 1}} xs={{span: 12, order: 2}}>
        <img
          className='landing-item-image left'
          src={Girl1}
          alt="First girl"
        />
      </Col>
      <Col md={{span: 10, order: 2}} xs={{span: 12, order: 1}}>
        <div className='landing-item-text'>
          <h3>New in town?</h3>
          <p>Find what places in the city play the music you like.</p>
        </div>
      </Col>
    </Row>
  );
};

export default Slide3;