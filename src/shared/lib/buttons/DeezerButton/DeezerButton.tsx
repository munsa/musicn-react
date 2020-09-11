import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './DeezerButton.css'
import DeezerLogo from '../../../assets/image/deezer/svg/Deezer_Logo_RVB_MonoWhite.svg'

const DeezerButton = ({onClickCallback}) => {
  return (
    <div className='deezer-button'>
      <Button>
          <img src={DeezerLogo} className='deezer-button-logo' onClick={onClickCallback}/>
      </Button>
    </div>
  )
};

DeezerButton.propTypes = {
  onClickCallback: PropTypes.func
};

export default DeezerButton;
