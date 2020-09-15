import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import './NoRecordingsCard.css';
import NoRecordingsImage from '../../../assets/image/not-found-image.svg'

const NoRecordingsCard = ({isLoggedUser}) => {

  return (
    <Card className='no-recording-card'>
      <Row>
        <Col xs={4}>
          <img src={NoRecordingsImage} className='no-recording-image'/>
        </Col>
        <Col xs={8}>
          {isLoggedUser ?
            <>
              <p className='no-recording-title'>
                You don't have any Wild Tune yet.
              </p>
              <p className='no-recording-text'>
                Press the happy moon when you hear a song you like and let us catch it!
              </p>
            </>
            :
            <p className='no-recording-title'>
              This user doesn't have any Wild Tune
            </p>
          }
        </Col>
      </Row>
    </Card>
  );
};

export default NoRecordingsCard;