import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import AudioRecorder from '../recorder/AudioRecorder';
import RecordingsMap from '../map/RecordingsMap.js';
import {getAllRecordings} from '../../actions/recording'
import PropTypes from 'prop-types';

const Home = ({allRecordings, getAllRecordings}) => {
  useEffect(() => {
    if (allRecordings.length === 0) {
      getAllRecordings();
    }
  }, [getAllRecordings]);

  return (
    <div>
      <RecordingsMap
        recordingList={allRecordings}
      />
      <AudioRecorder/>
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
