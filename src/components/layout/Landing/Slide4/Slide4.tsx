import React from 'react';
import './Slide4.css';
import {Col, Row} from 'react-bootstrap';
import Boy1 from '../../../../shared/assets/image/boy1.png';

const Slide4 = () => {
  return (
    <Row className='landing-item-container'>
      <Col md={{span: 10, order: 1}} xs={{span: 12, order: 1}}>
        <div className='landing-item-text'>
          <h3>You liked the music last night at the club?</h3>
          <p>Find the club on the map. Maybe other users caught some tunes.</p>
        </div>
      </Col>
      <Col md={{span: 2, order: 2}} xs={{span: 12, order: 2}}>
        <img
          className='landing-item-image right'
          src={Boy1}
          alt="First boy"
        />
      </Col>
    </Row>
  );
};

export default Slide4;