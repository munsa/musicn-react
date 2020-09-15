import React from 'react';
import './ProfileContent.css';
import PropTypes from 'prop-types'
import RecordingCardMap from '../../song/RecordingCardMap/RecordingCardMap';
import {Container} from 'react-bootstrap';
import Spinner from '../../../shared/lib/Spinner/Spinner';
import NoRecordingsCard from '../../../shared/lib/InformationCards/NoRecordingsCard/NoRecordingsCard';

const ProfileContent = ({profile, recordingsLoading, isLoggedUser}) => {
  return (
    <Container className='profile-content-container'>
      {recordingsLoading ?
        <Spinner/>
        :
        (profile.recordings.length === 0 && true ?
            <NoRecordingsCard isLoggedUser={isLoggedUser}/>
            :
            <RecordingCardMap recordingList={profile.recordings}/>
        )
      }
    </Container>
  )
};

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired,
  recordingsLoading: PropTypes.bool,
  isLoggedUser: PropTypes.bool
};

export default ProfileContent;
