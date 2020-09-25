import React, {useState} from 'react';
import './Landing.css';
import classList from '../../../shared/utils/classList';
import CityDayImage from '../../../shared/assets/image/city1920.png';
import {Carousel, Col, Row} from 'react-bootstrap';
import Girl1 from '../../../shared/assets/image/girl1.png';
import Girl2 from '../../../shared/assets/image/girl2.png';
import Boy1 from '../../../shared/assets/image/boy1.png';
import Boy2 from '../../../shared/assets/image/boy2.png';

const Landing = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='landing-container'>
      <div className='landing-header-container'>
        <img className={classList('landing-city-image')} src={CityDayImage}/>
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect} className='landing-carousel'>
        <Carousel.Item>
          <Row className='landing-item-container'>
            <Col md={{ span: 2, order: 1 }} xs={{ span: 12, order: 2 }}>
              <img
                className='landing-item-image left'
                src={Girl2}
                alt="First girl"
              />
            </Col>
            <Col md={{ span: 10, order: 2 }} xs={{ span: 12, order: 1 }}>
              <div className='landing-item-text'>
                <h3>Find new music</h3>
                <p>Start recording when you hear something you like. Let us catch the tune.</p>
              </div>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row className='landing-item-container'>
            <Col md={{ span: 10, order: 1 }} xs={{ span: 12, order: 1 }}>
              <div className='landing-item-text'>
                <h3>Explore music near you</h3>
                <p>Find what other users listen around you in the map.</p>
              </div>
            </Col>
            <Col md={{ span: 2, order: 2 }} xs={{ span: 12, order: 2 }}>
              <img
                className='landing-item-image right'
                src={Boy2}
                alt="First boy"
              />
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row className='landing-item-container'>
            <Col md={{ span: 2, order: 1 }} xs={{ span: 12, order: 2 }}>
              <img
                className='landing-item-image left'
                src={Girl1}
                alt="First girl"
              />
            </Col>
            <Col md={{ span: 10, order: 2 }} xs={{ span: 12, order: 1 }}>
              <div className='landing-item-text'>
                <h3>New in town?</h3>
                <p>Find what places in the city play the music you like.</p>
              </div>
            </Col>
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row className='landing-item-container'>
            <Col md={{ span: 10, order: 1 }} xs={{ span: 12, order: 1 }}>
              <div className='landing-item-text'>
                <h3>You liked the music last night at the club?</h3>
                <p>Find the club on the map. Maybe other users caught some tunes.</p>
              </div>
            </Col>
            <Col md={{ span: 2, order: 2 }} xs={{ span: 12, order: 2 }}>
              <img
                className='landing-item-image right'
                src={Boy1}
                alt="First boy"
              />
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Landing;