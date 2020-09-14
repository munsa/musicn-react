import React from 'react';
import './ProfileContent.css';
import RecordingCardMap from '../../song/RecordingCardMap/RecordingCardMap';
import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

const ProfileContent = ({profile, recordingsLoading}) => {
  return (
    <Container className='profile-content-container'>
      {recordingsLoading ?
        <div className='loader-container'>
          <FontAwesomeIcon icon={faSpinner} className='fa-spin'/>
        </div>
        :
        <RecordingCardMap recordingList={profile.recordings}/>
      }
    </Container>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
