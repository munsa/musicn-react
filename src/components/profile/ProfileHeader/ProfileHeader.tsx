import React from 'react';
import './ProfileHeader.css';
import RecordingMap from '../../map/RecordingMap';
import {Col, Row} from 'react-bootstrap';
import ProfileUserInformation from '../ProfileUserInformation/ProfileUserInformation';

const ProfileHeader = ({profile, isLoggedUser}) => {

  const hasGeolocationRecordings = recordings => {
    for (let i = 0; i < recordings.length; i++) {
      if (recordings[i].geolocation != null) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className='profile-header-container'>
      <Row>
        <Col xs={12} md={3}>
          <ProfileUserInformation profile={profile}
                                  isLoggedUser={isLoggedUser}/>
        </Col>
        <Col xs={12} md={9}>
          <div className='profile-map'>
            <RecordingMap recordingList={profile.recordings}
                          useFitBounds={hasGeolocationRecordings(profile.recordings)}/>
          </div>
        </Col>
      </Row>
    </div>
  )
};

ProfileHeader.propTypes = {};


export default ProfileHeader;
