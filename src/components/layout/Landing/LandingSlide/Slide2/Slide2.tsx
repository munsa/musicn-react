import React from 'react';
import './Slide2.css';
import {Button, Col, Row} from 'react-bootstrap';
import Boy2 from '../../../../../shared/assets/image/boy2.png';
import classList from '../../../../../shared/utils/classList';

const Slide2 = ({getStartedCallback, animation}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 10, order: 1}} xs={{span: 12, order: 1}}>
        <div
          className={classList('landing-item-text left', animation)}>
          <h3>Explore music near you</h3>
          <p>Find on the map what other users listen around you.</p>
          <Button variant='secondary' onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
      <Col xl={{span: 2, order: 2}} xs={{span: 12, order: 2}}>
        <img className={classList('landing-item-image right', animation)}
             src={Boy2}
             alt="First boy"
        />
      </Col>
      {/*
        <div className='markers-container'>
          <img src={Marker} className='landing-marker m1'/>
          <img src={Marker} className='landing-marker m2'/>
          <img src={Marker} className='landing-marker m3'/>
          <img src={Marker} className='landing-marker m4'/>
          <img src={Marker} className='landing-marker m5'/>
          <img src={Marker} className='landing-marker m6'/>
        </div>
        */}
    </Row>
  );
};

export default Slide2;