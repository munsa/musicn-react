import React from 'react';
import './Slide1.css';
import {Col, Row} from 'react-bootstrap';
import Girl2 from '../../../../shared/assets/image/girl2.png';
import AudioPlayer from '../../../recorder/audioPlayer/AudioPlayer';

const Slide1 = () => {
  return (
    <Row className='landing-item-container'>
      <Col xl={{span: 2, order: 1}} xs={{span: 12, order: 2}}>
        <img
          className='landing-item-image left'
          src={Girl2}
          alt="First girl"
        />

      </Col>
      <Col xl={{span: 10, order: 2}} xs={{span: 12, order: 1}}>
        <div className='landing-item-text'>
          <h3>Find new tunes</h3>
          <p>Press the friendly moon when you hear something you like. Let us catch the tune.</p>
        </div>
      </Col>
    </Row>
  );
};

export default Slide1;