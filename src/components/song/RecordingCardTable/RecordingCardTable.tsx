import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import RecordingCard from '../RecordingCard/RecordingCard';
import './RecordingCardTable.css';

const RecordingCardTable = ({recordingList}) => {
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

RecordingCardTable.propTypes = {
  recordingList: PropTypes.array.isRequired
};

export default RecordingCardTable;
