import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import './RecordingCard.css'
import RecordImage from '../../../shared/assets/image/record_400.png'
import SourceButton from '../../../shared/lib/buttons/SourceButton/SourceButton';
import {Source} from '../../../shared/constants/constants';

const openSourceTrackURL = (source: string, trackId:string) => {
  let url: string;
  if(source === Source.SPOTIFY) {
    url = 'https://open.spotify.com/track/' + trackId;
  } else if (source === Source.DEEZER) {
    url = 'https://www.deezer.com/track/' + trackId;
  }
  let win = window.open(url, '_blank');
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
            <SourceButton source={Source.SPOTIFY} onClickCallback={() => openSourceTrackURL(Source.SPOTIFY, recording.spotify.track.id)}/>
          </div>
          }
          {recording.deezer?.track?.id != null &&
          <div className='p-2'>
            <SourceButton source={Source.DEEZER} onClickCallback={() => openSourceTrackURL(Source.DEEZER, recording.deezer.track.id)}/>
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
