import React from 'react';
import './ProfileContent.css';
import RecordingCardTable from '../../song/RecordingCardTable/RecordingCardTable';
import {Container} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfileRecordings} from '../../../actions/profile';

const ProfileContent = ({profile, recordingsLoading, getProfileRecordings}) => {
  const onLoadMoreCallback = () => {
    getProfileRecordings(profile);
  }

  return (
    <Container className='profile-content-container'>
      <RecordingCardTable recordings={profile.recordings}
                          recordingsLoading={recordingsLoading}
                          maxRecordingsCount={profile.maxRecordingsCount}
                          onLoadMoreCallback={() => onLoadMoreCallback()}/>
      {profile.recordings.length === 0 && !recordingsLoading && (
        profile.isLoggedUser ?
          <div>
            You don't have Tunes yet. Start exploring!
          </div>
          :
          <div>
            This user doesn't have Tunes.
          </div>
      )}
      {/* !profile.isLoggedUser && profile.recordings.length === 0 && !recordingsLoading &&
        <NoRecordingsCard isLoggedUser={isLoggedUser}/>
      */}
    </Container>
  )
};

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired,
  recordingsLoading: PropTypes.bool,
  isLoggedUser: PropTypes.bool
};

export default connect(null, {getProfileRecordings})(ProfileContent);
