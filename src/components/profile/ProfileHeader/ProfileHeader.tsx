import React from 'react';
import './ProfileHeader.css';
import SongTable from '../../song/SongTable';
import RecordingMap from '../../map/RecordingMap';
import MusicCarousel from '../MusicCarousel/MusicCarousel';
import {Col, Row} from 'react-bootstrap';
import ProfileUserInformation from '../ProfileUserInformation/ProfileUserInformation';
import ProfileContent from '../ProfileContent/ProfileContent';
import {getProfileByUsername} from '../../../actions/profile';

const ProfileHeader = ({profile, isLoggedUser}) => {

  const hasGeolocationRecordings = recordings => {
    for(let i = 0; i < recordings.length; i++) {
      if(recordings[i].geolocation != null) {
        return true;
      }
    }
    return false;
  }

  return (
    <Row>
      <Col xs={12} md={3}>
        <ProfileUserInformation profile={profile}
                                isLoggedUser={isLoggedUser}/>
      </Col>
      <Col xs={12} md={9}>
        <div className='profile-map'>
          <RecordingMap recordingList={profile.recordings} useFitBounds={hasGeolocationRecordings(profile.recordings)}/>
        </div>
      </Col>
    </Row>
  )
};

ProfileHeader.propTypes = {};


export default ProfileHeader;
