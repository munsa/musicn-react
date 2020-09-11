import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import './RecordingCard.css'
import RecordImage from '../../../shared/assets/image/record_400.png'
import SpotifyButton from '../../../shared/lib/buttons/SpotifyButton/SpotifyButton';
import DeezerButton from '../../../shared/lib/buttons/DeezerButton/DeezerButton';

const openSpotifyTrackLink = spotifyTrackId => {
  let win = window.open('https://open.spotify.com/track/' + spotifyTrackId, '_blank');
  win.focus();
}

const openDeezerTrackLink = deezerTrackId => {
  let win = window.open('https://www.deezer.com/track/' + deezerTrackId, '_blank');
  win.focus();
}

const RecordingCard = ({recording}) => {
  return (
    <Card className='recording-card'>
      <div className='recording-card-container'>
        <img className='recording-card-image' src={RecordImage}/>

        <div className='recording-card-content'>
          <div className='recording-card-track text-truncate'>
            {recording.acrCloud?.track?.name}
          </div>
          <div className='recording-card-artists text-truncate'>
            {getArtistsString(recording.acrCloud?.artists)}
          </div>
        </div>
      </div>
      <div className='recording-card-buttons mx-auto mx-2'>
        <div className='d-flex flex-wrap justify-content-center'>
          {recording.spotify?.track?.id != null &&
          <div className='p-2'>
            <SpotifyButton onClickCallback={() => openSpotifyTrackLink(recording.spotify.track.id)}/>
          </div>
          }
          {recording.deezer?.track?.id != null &&
          <div className='p-2'>
            <DeezerButton onClickCallback={() => openDeezerTrackLink(recording.deezer.track.id)}/>
          </div>
          }
        </div>
      </div>
    </Card>
  )
};

RecordingCard.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCard;
