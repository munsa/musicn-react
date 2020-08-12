import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import AudioRecorder from '../../recorder/AudioRecorder';
import RecordingMap from '../../map/RecordingMap';
import {getAllRecordings} from '../../../actions/recording'
import PropTypes from 'prop-types';
import './Home.css';
import Header from './header/Header';

const Home = ({allRecordings, getAllRecordings}) => {
  useEffect(() => {
    if (allRecordings.length === 0) {
      getAllRecordings();
    }
  }, [getAllRecordings]);

  return (
    <div>
      <Header/>
      <div className='home-body'>
        <div className='container'>
          <div className='home-recording-map'>
            <RecordingMap recordingList={allRecordings}/>
          </div>
          <AudioRecorder/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  allRecordings: state.recording.all
});

Home.propTypes = {
  getAllRecordings: PropTypes.func.isRequired,
  allRecordings: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {getAllRecordings})(Home);
