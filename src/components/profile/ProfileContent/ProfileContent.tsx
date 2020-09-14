import React from 'react';
import './ProfileContent.css';
import RecordingCardMap from '../../song/RecordingCardMap/RecordingCardMap';
import {Container} from 'react-bootstrap';
import Spinner from '../../../shared/lib/Spinners/Spinner';

const ProfileContent = ({profile, recordingsLoading}) => {
  return (
    <Container className='profile-content-container'>
      {recordingsLoading ?
        <Spinner/>
        :
        (profile.recordings.length === 0 && true ?
            <div>
              No results
            </div>
            :
            <RecordingCardMap recordingList={profile.recordings}/>
        )
      }
    </Container>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
