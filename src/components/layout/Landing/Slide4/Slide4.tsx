import React from 'react';
import './Slide4.css';
import {Col, Row} from 'react-bootstrap';
import Boy1 from '../../../../shared/assets/image/boy1.png';

const Slide4 = () => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 10, order: 1}} xs={{span: 12, order: 1}}>
        <div className='landing-item-text left'>
          <h3>You liked the music at the club last night?</h3>
          <p>Search the club on the map. Maybe other users caught some tunes.</p>
        </div>
      </Col>
      <Col xl={{span: 2, order: 2}} xs={{span: 12, order: 2}}>
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