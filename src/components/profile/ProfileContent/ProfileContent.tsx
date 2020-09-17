import React from 'react';
import {connect} from 'react-redux';
import './ProfileContent.css';
import PropTypes from 'prop-types'
import RecordingCardTable from '../../song/RecordingCardTable/RecordingCardTable';
import {Container} from 'react-bootstrap';
import NoRecordingsCard from '../../../shared/lib/InformationCards/NoRecordingsCard/NoRecordingsCard';
import {getProfileRecordings} from '../../../actions/profile'

const ProfileContent = ({profile, recordingsLoading, isLoggedUser, getProfileRecordings}) => {
  const onLoadMoreCallback = () => {
    getProfileRecordings(profile);
  }

  return (
    <Container className='profile-content-container'>
      <RecordingCardTable recordings={profile.recordings}
                          recordingsLoading={recordingsLoading}
                          maxRecordingsCount={profile.maxRecordingsCount}
                          onLoadMoreCallback={() => onLoadMoreCallback()}/>
      {!profile.isLoggedUser && profile.recordings.length === 0 && !recordingsLoading &&
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

export default connect(null, {getProfileRecordings})(ProfileContent);
