import React from 'react';
import './Slide2.css';
import {Col, Row} from 'react-bootstrap';
import Boy2 from '../../../../shared/assets/image/boy2.png';

const Slide2 = () => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 10, order: 1}} xs={{span: 12, order: 1}}>
        <div className='landing-item-text'>
          <h3>Explore music near you</h3>
          <p>Find on the map what other users listen around you.</p>
        </div>
      </Col>
      <Col xl={{span: 2, order: 2}} xs={{span: 12, order: 2}}>
        <img
          className='landing-item-image right'
          src={Boy2}
          alt="First boy"
        />
      </Col>
    </Row>
  );
};

export default Slide2;