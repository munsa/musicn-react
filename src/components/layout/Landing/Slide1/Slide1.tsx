import React from 'react';
import './Slide1.css';
import {Col, Row} from 'react-bootstrap';
import Girl2 from '../../../../shared/assets/image/girl2.png';

const Slide1 = () => {
  return (
    <Row className='landing-item-container'>
      <Col md={{span: 2, order: 1}} xs={{span: 12, order: 2}}>
        <img
          className='landing-item-image left'
          src={Girl2}
          alt="First girl"
        />
      </Col>
      <Col md={{span: 10, order: 2}} xs={{span: 12, order: 1}}>
        <div className='landing-item-text'>
          <h3>Find new music</h3>
          <p>Start recording when you hear something you like. Let us catch the tune.</p>
        </div>
      </Col>
    </Row>
  );
};

export default Slide1;