import React from 'react';
import './Footer.css';
import {Col, NavDropdown, Row} from 'react-bootstrap';

const Footer = () => {
  return (
    <div className='footer'>
      <Row className='footer-content'>
        <Col xs={6} className='footer-brand'>
          MUSICN
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
