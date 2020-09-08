import React from 'react';
import './ProfileContent.css';
import SongTable from '../../song/SongTable';
import RecordingMap from '../../map/RecordingMap';

const ProfileContent = ({profile}) => {

  const hasGeolocationRecordings = recordings => {
    for(let i = 0; i < recordings.length; i++) {
      if(recordings[i].geolocation != null) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className='profile-content-container'>
      <div className='profile-map'>
        <RecordingMap recordingList={profile.recordings} useFitBounds={hasGeolocationRecordings(profile.recordings)}/>
      </div>
      <SongTable songs={profile.recordings}/>
    </div>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
