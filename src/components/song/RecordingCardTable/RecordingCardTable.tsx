import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import RecordingCard from '../RecordingCard/RecordingCard';
import './RecordingCardTable.css';
import LoadMoreButton from '../../../shared/lib/Button/LoadMoreButton/LoadMoreButton';
import Spinner from '../../../shared/lib/Spinner/Spinner';

const RecordingCardTable = ({recordingList, recordingsLoading}) => {
  return (
    <div className='recording-card-map-container'>
      <Row>
        {recordingList.map((r, i) => (
          <Col key={i} xs={6} md={3} className='recording-map-column'>
            <RecordingCard recording={r}/>
          </Col>
        ))}
      </Row>
      {recordingsLoading ?
        <Spinner/>
        :
        <LoadMoreButton/>
      }
    </div>
  )
};

RecordingCardTable.propTypes = {
  recordingList: PropTypes.array.isRequired
};

export default RecordingCardTable;
