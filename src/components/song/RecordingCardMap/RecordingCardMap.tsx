import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import RecordingCard from '../RecordingCard/RecordingCard';
import './RecordingCardMap.css';

const RecordingCardMap = ({recordingList}) => {
  return (
    <div className='recording-card-map-container'>
      <Row>
        {recordingList.map((r, i) => (
          <Col key={i} xs={6} md={3} className='recording-map-column'>
            <RecordingCard recording={r}/>
          </Col>
        ))}
      </Row>
    </div>
  )
};

RecordingCardMap.propTypes = {
  recordingList: PropTypes.array.isRequired
};

export default RecordingCardMap;
