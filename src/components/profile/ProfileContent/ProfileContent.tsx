import React from 'react';
import './ProfileContent.css';
import SongTable from '../../song/SongTable';
import RecordingMap from '../../map/RecordingMap';

const ProfileContent = ({profile}) => {
  return (
    <div className='profile-content-container'>
      <div className='profile-map'>
        <RecordingMap recordingList={profile.recordings} useFitBounds={true}/>
      </div>
      <SongTable songs={profile.recordings}/>
    </div>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
