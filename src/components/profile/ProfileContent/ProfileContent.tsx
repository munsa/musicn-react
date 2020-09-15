import React from 'react';
import {connect} from 'react-redux';
import './ProfileContent.css';
import PropTypes from 'prop-types'
import RecordingCardTable from '../../song/RecordingCardTable/RecordingCardTable';
import {Container} from 'react-bootstrap';
import NoRecordingsCard from '../../../shared/lib/InformationCards/NoRecordingsCard/NoRecordingsCard';
import {loadMoreProfileRecordings} from '../../../actions/profile'

const ProfileContent = ({profile, recordingsLoading, isLoggedUser, loadMoreProfileRecordings}) => {
  const onLoadMoreCallback = () => {
    loadMoreProfileRecordings(profile);
  }

  return (
    <Container className='profile-content-container'>
      <RecordingCardTable recordingList={profile.recordings}
                          recordingsLoading={recordingsLoading}
                          onLoadMoreCallback={() => onLoadMoreCallback()}/>
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

const mapStateToProps = state => ({
  profile: state.profile.profile,
  recordingsLoading: state.profile.recordingsLoading
})

export default connect(mapStateToProps, {loadMoreProfileRecordings})(ProfileContent);
