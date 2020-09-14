import React from 'react';
import './Spinner.css';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AppSpinner = () => {

  return (
    <div className='spinner-container'>
      <FontAwesomeIcon icon={faSpinner} className='fa-spin fa-3x'/>
    </div>
  );
};

export default AppSpinner;