import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './SourceButton.css'
import SpotifyLogo from '../../../assets/image/spotify/logo/png/Spotify_Logo_RGB_White.png';
import SpotifyIcon from '../../../assets/image/spotify/icon/png/Spotify_Icon_RGB_White.png';
import DeezerLogo from '../../../assets/image/deezer/svg/Deezer_Logo_RVB_MonoWhite.svg'
import DeezerIcon from '../../../assets/image/deezer/svg/EQ_White.svg'
import {Source, SourceIconSize} from '../../../constants/constants';

const SourceButton = ({source, iconSize, onClickCallback}) => {
  return (
    <div className={source === Source.SPOTIFY ? 'spotify-button' : (source === Source.DEEZER ? 'deezer-button' : '')}
         onClick={onClickCallback}>
      <Button>
        <img alt={source + 'button'}
             src={source === Source.SPOTIFY ?
               (iconSize === SourceIconSize.BIG ? SpotifyLogo : SpotifyIcon)
               :
               (iconSize === SourceIconSize.BIG ? DeezerLogo : DeezerIcon)}
             className={source === Source.SPOTIFY ? 'spotify-button-logo' : (source === Source.DEEZER ? 'deezer-button-logo' : '')}/>
      </Button>
    </div>
  )
};

SourceButton.defaultProps = {
  iconSize: SourceIconSize.BIG
};

SourceButton.propTypes = {
  source: PropTypes.oneOf([Source.SPOTIFY, Source.DEEZER]).isRequired,
  iconSize: PropTypes.string,
  onClickCallback: PropTypes.func
};

export default SourceButton;
