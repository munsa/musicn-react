import React from 'react';
import './Footer.css';
import {Col, Row} from 'react-bootstrap';
import GeoTunes from '../../../shared/assets/image/logo-gt.png';

const Footer = () => {
  return (
    <div className='footer mt-5'>
      <Row className='footer-content'>
        <Col xs={6} className='footer-brand'>
          <img src={GeoTunes} className='footer-brand-logo'/>
        </Col>
        <Col xs={6} className='footer-github'>
          <a href='https://github.com/munsa' target="_blank" rel="noopener noreferrer">
              <i className='fa fa-github' title='Github'/>
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
