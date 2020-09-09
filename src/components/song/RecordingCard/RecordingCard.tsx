import React from 'react';
import PropTypes from 'prop-types';
import {Card, Col, Row} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import './RecordingCard.css'
import RecordImage from '../../../shared/assets/image/record_400.png'

const RecordingCard = ({recording}) => {
  return (
    <Card className='recording-card'>
      <Row>
        <Col>
          <img className='recording-card-image' src={RecordImage}/>
          <div className='recording-card-track recording-card-text'>
            {recording.acrCloud?.track?.name}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className='recording-card-text recording-card-artists'>
          {getArtistsString(recording.acrCloud?.artists)}
        </Col>
      </Row>
    </Card>
  )
};

RecordingCard.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCard;
