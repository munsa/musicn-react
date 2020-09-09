import React from 'react';
import './ProfileContent.css';
import MusicCarousel from '../MusicCarousel/MusicCarousel';
import SongTable from '../../song/SongTable';

const ProfileContent = ({profile}) => {
  return (
    <div className='profile-content-container'>
      <div>
        <MusicCarousel recordings={profile.recordings}/>
      </div>
      <div>
        <SongTable songs={profile.recordings}/>
      </div>
    </div>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
