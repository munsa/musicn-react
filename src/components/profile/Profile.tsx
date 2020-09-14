import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {getProfileByUsername} from '../../actions/profile';
import PropTypes from 'prop-types';
import ProfileContent from './ProfileContent/ProfileContent';
import ProfileHeader from './ProfileHeader/ProfileHeader';

const Profile = ({getProfileByUsername, profile, recordingsLoading, auth, match}) => {
  useEffect(() => {
    getProfileByUsername(match.params.username);
  }, [getProfileByUsername, match.params.username]);

  const isLoggedUser = () => {
    return auth.user._id === profile.user._id;
  }

  return profile && profile.user && auth.user && (
    <Fragment>
      <ProfileHeader profile={profile}
                     isLoggedUser={isLoggedUser()}/>
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
  profile: state.profile.profile,
  recordingsLoading: state.profile.recordingsLoading,
  auth: state.auth
})

export default connect(mapStateToProps, {getProfileByUsername})(Profile);
