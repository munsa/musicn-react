import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {clearProfile, getProfileByUsername} from '../../actions/profile';
import PropTypes from 'prop-types';
import ProfileContent from './ProfileContent/ProfileContent';
import ProfileHeader from './ProfileHeader/ProfileHeader';

const Profile = ({getProfileByUsername, clearProfile, profile, recordingsLoading, auth, match}) => {
  useEffect(() => {
    return () => {
      clearProfile();
    }
  }, [])

  useEffect(() => {
    if(auth.user != null) {
      getProfileByUsername(match.params.username, auth.user._id);
    }
  }, [getProfileByUsername, match.params.username, auth.user]);

  return profile && profile.user && (
    <Fragment>
      <ProfileHeader profile={profile}/>
      <div className='mt-3'>
        <ProfileContent profile={profile} recordingsLoading={recordingsLoading}/>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.currentProfile,
  recordingsLoading: state.profile.recordingsLoading,
  auth: state.auth
})

export default connect(mapStateToProps, {getProfileByUsername, clearProfile})(Profile);
