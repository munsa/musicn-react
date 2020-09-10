import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import './RecordingCard.css'
import RecordImage from '../../../shared/assets/image/record_400.png'

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
    </Card>
  )
};

RecordingCard.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCard;
