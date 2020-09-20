import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import RecordingMap from '../../map/RecordingMap';
import {getAllRecordings} from '../../../actions/recording'
import PropTypes from 'prop-types';
import './Home.css';
import Header from './header/Header';

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
  getAllRecordings: PropTypes.func.isRequired,
  allRecordings: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {getAllRecordings})(Home);
