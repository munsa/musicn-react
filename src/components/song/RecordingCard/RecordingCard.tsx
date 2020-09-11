import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import './RecordingCard.css'
import RecordImage from '../../../shared/assets/image/record_400.png'
import SpotifyLogo from '../../../shared/assets/image/spotify/Spotify_Logo_RGB_White.png'

const RecordingCard = ({recording}) => {
  return (
    <Card className='recording-card'>
      <div>
        <img className='recording-card-image' src={RecordImage}/>
      </div>
      <div className='recording-card-content'>
        <div className='recording-card-track text-truncate'>
          {recording.acrCloud?.track?.name}
        </div>
        <div className='recording-card-artists text-truncate'>
          {getArtistsString(recording.acrCloud?.artists)}
        </div>
      </div>
      <div className='recording-card-buttons'>
        <div className='spotify-button'>
          <Button>
            <img src={SpotifyLogo} className='spotify-button-logo'/>
          </Button>
        </div>
      </div>
    </Card>
  )
};

RecordingCard.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCard;
