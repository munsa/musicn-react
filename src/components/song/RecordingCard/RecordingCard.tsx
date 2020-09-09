import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import Button from 'react-bootstrap/Button';

const RecordingCard = ({recording}) => {
  return (
    <Card className='recording-card'>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{recording.acrCloud?.track?.name}</Card.Title>
        <Card.Text>
          {getArtistsString(recording.acrCloud?.artists)}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
};

RecordingCard.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCard;
