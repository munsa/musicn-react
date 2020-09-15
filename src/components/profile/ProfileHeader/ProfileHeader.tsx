import React from 'react';
import './ProfileHeader.css';
import RecordingMap from '../../map/RecordingMap';
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
      <div className='profile-user-info'>
        <ProfileUserInformation profile={profile}
                                isLoggedUser={isLoggedUser}/>
      </div>
      <div className='profile-map shadow'>
        <RecordingMap recordingList={profile.recordings}
                      useFitBounds={profile.recordings && hasGeolocationRecordings(profile.recordings)}/>
      </div>
    </div>
  )
};

ProfileHeader.propTypes = {};


export default ProfileHeader;
