import React from 'react';
import './Loader.css';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Loader = () => {

  return (
    <div className='loader-container'>
      <FontAwesomeIcon icon={faCircleNotch} className='loader fa-spin fa-3x'/>
    </div>
  );
};

export default Loader;