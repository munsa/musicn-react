import React from 'react';
import './LoadingPage.css';
import WildTunes from '../../../shared/assets/image/wildtunes/logo/logo-white.svg';

const LoadingPage = () => {
  return(
    <div className='loading-page'>
      <img src={WildTunes} className='loading-page-logo'/>
    </div>
  )

};

export default LoadingPage;