import React from 'react';
import './Footer.css';
import {Col, Row} from 'react-bootstrap';
import WildTunes from '../../../shared/assets/image/wildtunes/logo/wildtunes_logo_small_white.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWrench} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faNodeJs, faReact, faBootstrap, faAws} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-message'>
          <FontAwesomeIcon icon={faWrench}/> WildTunes is in construction. Click on the stack button to see the source code.
        </div>
        <div className='stack-button'>
          <a href='https://github.com/munsa' target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faNodeJs} className='animate-item first'/>
            <FontAwesomeIcon icon={faReact} className='animate-item second'/>
            <FontAwesomeIcon icon={faBootstrap} className='animate-item third'/>
            <FontAwesomeIcon icon={faGithub} className='animate-item fourth'/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
