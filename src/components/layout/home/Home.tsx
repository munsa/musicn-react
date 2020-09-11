import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import RecordingMap from '../../map/RecordingMap';
import {getAllRecordings} from '../../../actions/recording'
import PropTypes from 'prop-types';
import './Home.css';
import Header from './header/Header';
import SpotifyLogo from '../../../shared/assets/image/spotify/Spotify_Logo_RGB_White.png';
import {Button} from 'react-bootstrap';

const Home = ({allRecordings, getAllRecordings, currentPosition}) => {
  useEffect(() => {
    if (allRecordings.length === 0) {
      getAllRecordings();
    }
  }, [getAllRecordings]);

  const test = () => {
    console.log('test');
  }

  return (
    <div>
      <Header/>
      <div className='home-body'>
        <div className='container-md mt-5'>
          <Button onClick={()=>test()}>
            Join
          </Button>
          <div className='home-recording-map'>
            <div className='map-border'>
              <RecordingMap recordingList={allRecordings} center={currentPosition} zoom={16}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  allRecordings: state.recording.all,
  currentPosition: state.geolocation.currentPosition
});

Home.propTypes = {
  getAllRecordings: PropTypes.func.isRequired,
  allRecordings: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {getAllRecordings})(Home);
