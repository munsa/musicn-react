import React from 'react';
import './ProfileHeader.css';
import RecordingMap from '../../map/RecordingMap';
import ProfileUserInformation from '../ProfileUserInformation/ProfileUserInformation';

const ProfileHeader = ({profile}) => {

  return (
    <div className='profile-header-container'>
      <div className='profile-user-info'>
        <ProfileUserInformation profile={profile}/>
      </div>
      <div className='profile-map shadow'>
        <RecordingMap recordingList={profile.allGeolocations}
                      useFitBounds={true}/>
      </div>
    </div>
  )
};

ProfileHeader.propTypes = {};


export default ProfileHeader;
