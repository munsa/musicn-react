import React from 'react';
import './Slide4.css';
import {Button, Col, Row} from 'react-bootstrap';
import Boy1 from '../../../../shared/assets/image/boy1.png';

const Slide4 = ({getStartedCallback}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 9, order: 1}} xs={{span: 12, order: 1}}>
        <div
          className='landing-item-text left'>
          <h3>You enjoyed the music last night?</h3>
          <p>Search the club on the map. Maybe other users caught some tunes.</p>
          <Button variant='secondary' onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
      <Col xl={{span: 3, order: 2}} xs={{span: 12, order: 2}}>
        <img className='landing-item-image right'
             src={Boy1}
             alt="First boy"
        />
      </Col>
    </Row>
  );
};

export default Slide4;