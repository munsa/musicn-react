import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './SourceButton.css'
import SpotifyLogo from '../../../assets/image/spotify/logo/png/Spotify_Logo_RGB_White.png';
import DeezerLogo from '../../../assets/image/deezer/svg/Deezer_Logo_RVB_MonoWhite.svg'
import {Source} from '../../../constants/constants';

const SourceButton = ({source, onClickCallback}) => {
  return (
    <div className={source === Source.SPOTIFY ? 'spotify-button' : (source === Source.DEEZER ? 'deezer-button' : '')}>
      <Button>
        <img src={source === Source.SPOTIFY ? SpotifyLogo : (source === Source.DEEZER ? DeezerLogo : '')}
             className={source === Source.SPOTIFY ? 'spotify-button-logo' : (source === Source.DEEZER ? 'deezer-button-logo' : '')}
             onClick={onClickCallback}/>
      </Button>
    </div>
  )
};

SourceButton.propTypes = {
  source: PropTypes.oneOf([Source.SPOTIFY, Source.DEEZER]).isRequired,
  onClickCallback: PropTypes.func
};

export default SourceButton;
