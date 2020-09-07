import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getProfileByUsername} from '../../actions/profile';
import PropTypes from 'prop-types';
import ProfileUserInformation from './ProfileUserInformation/ProfileUserInformation';
import SongTable from '../song/SongTable';
import {Col, Row} from 'react-bootstrap';

const Profile = ({getProfileByUsername, profile, auth, match}) => {
  useEffect(() => {
    getProfileByUsername(match.params.username);
  }, [getProfileByUsername, match.params.username]);

  return profile && (
    <div>
      <Row>
        <Col xs={12} md={3}>
          <ProfileUserInformation profile={profile}
                                  isLoggedUser={auth.user._id === profile.user._id}/>
        </Col>
        <Col xs={12} md={9}>
          <SongTable songs={profile.recordings}/>
        </Col>
      </Row>
    </div>
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
  auth: state.auth
})

export default connect(mapStateToProps, {getProfileByUsername})(Profile);
