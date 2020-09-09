import React from 'react';
import './ProfileContent.css';
import MusicCarousel from '../MusicCarousel/MusicCarousel';
import SongTable from '../../song/SongTable';
import RecordingCardMap from '../../song/RecordingCardMap/RecordingCardMap';

const ProfileContent = ({profile}) => {
  return (
    <div className='profile-content-container'>
      {/*
      <div>
        User songs
        <MusicCarousel recordings={profile.recordings}/>
      </div>
      <div>
        <SongTable songs={profile.recordings}/>
      </div>
      */}
      <div>
        <RecordingCardMap recordingList={profile.recordings}/>
      </div>
    </div>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
