import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getProfileByUsername} from '../../actions/profile';
import PropTypes from 'prop-types';

const Profile = ({ getProfileByUsername, profile, auth, match }) => {
  useEffect(() => {
    getProfileByUsername(match.params.username);
  }, [getProfileByUsername, match.params.username]);

  return (
    <div>
      USER PROFILE
      {match.params.username}

      {profile && auth.user._id === profile.user._id ? 'THIS IS THE LOGGED USER' : ''}
    </div>
  );
};

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getProfileByUsername })(Profile);
