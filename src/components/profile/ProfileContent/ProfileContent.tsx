import React from 'react';
import './ProfileContent.css';
import PropTypes from 'prop-types'
import RecordingCardTable from '../../song/RecordingCardTable/RecordingCardTable';
import {Container} from 'react-bootstrap';
import NoRecordingsCard from '../../../shared/lib/InformationCards/NoRecordingsCard/NoRecordingsCard';

const ProfileContent = ({profile, recordingsLoading, isLoggedUser}) => {
  return (
    <Container className='profile-content-container'>
      <RecordingCardTable recordingList={profile.recordings}
                          recordingsLoading={recordingsLoading}/>
      {!isLoggedUser && profile.recordings.length === 0 && true &&
          <NoRecordingsCard isLoggedUser={isLoggedUser}/>
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
