import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import RecordingMap from '../../map/RecordingMap';
import {getAllRecordingGeolocations, getTop10FromGenre} from '../../../actions/recording'
import PropTypes from 'prop-types';
import './Home.css';
import Header from './header/Header';
import MusicCarousel from '../../profile/MusicCarousel/MusicCarousel';

const Home = ({allRecordings, getAllRecordingGeolocations, getTop10FromGenre, currentPosition}) => {
  useEffect(() => {
    if (allRecordings.length === 0) {
      getAllRecordingGeolocations();
      getTop10FromGenre('Hip Hop');
    }
  }, []);

  return (
    <div>
      <Header/>
      <div className='home-body'>
        <div className='container-md mt-5'>
          <MusicCarousel recordings={allRecordings}/>
          <div className='home-recording-map'>
            <div className='map-border'>
              <RecordingMap recordingList={allRecordings} center={currentPosition ? currentPosition : undefined} zoom={currentPosition ? 16 : undefined}/>
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
  getAllRecordingGeolocations: PropTypes.func.isRequired,
  allRecordings: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {getAllRecordingGeolocations, getTop10FromGenre})(Home);
