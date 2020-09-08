import React from 'react';
import './ProfileContent.css';
import SongTable from '../../song/SongTable';
import RecordingMap from '../../map/RecordingMap';

const ProfileContent = ({profile}) => {
  return (
    <div className='profile-content-container'>
      <RecordingMap recordingList={profile.recordings} useFitBounds={true}/>
      <SongTable songs={profile.recordings}/>
    </div>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
