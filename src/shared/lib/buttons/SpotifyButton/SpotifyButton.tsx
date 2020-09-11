import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './SpotifyButton.css'
import SpotifyLogo from '../../../assets/image/spotify/logo/png/Spotify_Logo_RGB_White.png'

const SpotifyButton = ({onClickCallback}) => {
  return (
    <div className='spotify-button'>
      <Button>
        <img src={SpotifyLogo} className='spotify-button-logo'/>
      </Button>
    </div>
  )
};

SpotifyButton.propTypes = {
  onClickCallback: PropTypes.func
};

export default SpotifyButton;
