import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './SourceButtonSmall.css'
import SpotifyLogo from '../../../assets/image/spotify/logo/png/Spotify_Logo_RGB_White.png';
import SpotifyIcon from '../../../assets/image/spotify/icon/png/Spotify_Icon_RGB_White.png';
import DeezerLogo from '../../../assets/image/deezer/svg/Deezer_Logo_RVB_MonoWhite.svg'
import DeezerIcon from '../../../assets/image/deezer/svg/EQ_White.svg'
import {Source, SourceIconSize} from '../../../constants/constants';

const SourceButtonSmall = ({source, onClickCallback}) => {
  return (
    <div className={source === Source.SPOTIFY ? 'spotify-button-small' : (source === Source.DEEZER ? 'deezer-button-small' : '')}
         onClick={onClickCallback}>
      <Button>
        <img alt={source + 'button'}
             src={source === Source.SPOTIFY ? SpotifyIcon : DeezerIcon}
             className={source === Source.SPOTIFY ? 'spotify-button-icon' : (source === Source.DEEZER ? 'deezer-button-icon' : '')}/>
      </Button>
    </div>
  )
};

SourceButtonSmall.defaultProps = {
  iconSize: SourceIconSize.BIG
};

SourceButtonSmall.propTypes = {
  source: PropTypes.oneOf([Source.SPOTIFY, Source.DEEZER]).isRequired,
  iconSize: PropTypes.string,
  onClickCallback: PropTypes.func
};

export default SourceButtonSmall;
