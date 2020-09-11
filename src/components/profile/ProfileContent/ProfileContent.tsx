import React from 'react';
import './ProfileContent.css';
import MusicCarousel from '../MusicCarousel/MusicCarousel';
import SongTable from '../../song/SongTable';
import RecordingCardMap from '../../song/RecordingCardMap/RecordingCardMap';
import {Container} from 'react-bootstrap';

const ProfileContent = ({profile}) => {
  return (
    <Container className='profile-content-container'>
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
    </Container>
  )
};

ProfileContent.propTypes = {};


export default ProfileContent;
