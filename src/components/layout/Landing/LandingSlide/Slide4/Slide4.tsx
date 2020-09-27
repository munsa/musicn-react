import React from 'react';
import './Slide4.css';
import {Button, Col, Row} from 'react-bootstrap';
import Boy1 from '../../../../../shared/assets/image/boy1.png';
import classList from '../../../../../shared/utils/classList';

const Slide4 = ({getStartedCallback, animation}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 10, order: 1}} xs={{span: 12, order: 1}}>
        <div
          className={classList('landing-item-text left', animation)}>
          <h3>You liked the music last night?</h3>
          <p>Search the club on the map. Maybe other users caught some tunes.</p>
          <Button onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
      <Col xl={{span: 2, order: 2}} xs={{span: 12, order: 2}}>
        <img
          className={classList('landing-item-image right', animation)}
          src={Boy1}
          alt="First boy"
        />
      </Col>
    </Row>
  );
};

export default Slide4;