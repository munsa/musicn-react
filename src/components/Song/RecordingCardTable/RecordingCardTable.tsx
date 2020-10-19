import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import RecordingCard from '../RecordingCard/RecordingCard';
import './RecordingCardTable.css';
import LoadMoreButton from '../../../shared/lib/Button/LoadMoreButton/LoadMoreButton';
import Spinner from '../../../shared/lib/Loaders/Spinner/Spinner';

const RecordingCardTable = ({recordings, recordingsLoading, maxRecordingsCount, onLoadMoreCallback}) => {

  return (
    <div className='recording-card-map-container'>
      <Row>
        {recordings.map((r, i) => (
          <Col key={i} xs={6} md={3} className='recording-map-column'>
            <RecordingCard recording={r}/>
          </Col>
        ))}
      </Row>
      {recordingsLoading &&
        <Spinner/>
      }

      {!recordingsLoading && maxRecordingsCount > recordings.length &&
        <LoadMoreButton onClickCallback={() => onLoadMoreCallback()}/>
      }
    </div>
  )
};

RecordingCardTable.propTypes = {
  recordings: PropTypes.array.isRequired
};

export default RecordingCardTable;
