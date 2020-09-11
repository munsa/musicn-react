import React from 'react';
import './Footer.css';
import {Col, Row} from 'react-bootstrap';
import WildTunes from '../../../shared/assets/image/wildtunes/logo/wildtunes_logo_small_white.svg';

const Footer = () => {
  return (
    <div className='footer'>
      <Row className='footer-content'>
        <Col xs={2} className='footer-brand'>
          <img src={WildTunes} className='footer-brand-logo'/>
        </Col>
        <Col xs={8} className='footer-message'>
            <i className='fa fa-wrench' title='Construction'/> WildTunes is in a development stage. This is a demo.
        </Col>
        <Col xs={2} className='footer-github'>
          <a href='https://github.com/munsa' target="_blank" rel="noopener noreferrer">
            <i className='fa fa-github' title='Github'/>
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
