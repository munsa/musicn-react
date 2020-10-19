import React from 'react';
import './Slide2.css';
import {Button, Col, Row} from 'react-bootstrap';
import Boy2 from '../../../../shared/assets/image/boy2.png';

const Slide2 = ({getStartedCallback}) => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 9, order: 1}} xs={{span: 12, order: 1}}>
        <div
          className='landing-item-text left'>
          <h3>Explore music near you</h3>
          <p>Find on the map what other users listen around you.</p>
          <Button variant='secondary' onClick={getStartedCallback}>JOIN</Button>
        </div>
      </Col>
      <Col xl={{span: 3, order: 2}} xs={{span: 12, order: 2}}>
        <img className='landing-item-image right'
             src={Boy2}
             alt="First boy"
        />
      </Col>
      {/*
        <div className='markers-container'>
          <img src={Marker} className='landing-Marker m1'/>
          <img src={Marker} className='landing-Marker m2'/>
          <img src={Marker} className='landing-Marker m3'/>
          <img src={Marker} className='landing-Marker m4'/>
          <img src={Marker} className='landing-Marker m5'/>
          <img src={Marker} className='landing-Marker m6'/>
        </div>
        */}
    </Row>
  );
};

export default Slide2;