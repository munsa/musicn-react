import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import AudioPlayer from './audioPlayer/AudioPlayer';
import RecordingResultModal from './ResultModals/RecordingResultModal/RecordingResultModal';
import RecordingNotFoundModal from "./ResultModals/RecordingNotFoundModal/RecordingNotFoundModal";
import {sendRecording, setRecordingData, stopPlayer} from '../../actions/recording';
import {getCurrentGeolocationPosition} from '../../actions/geolocation';
import PropTypes from "prop-types";

declare let MediaRecorder: any;

const AudioRecorder = ({setRecordingData, stopPlayer, sendRecording, developmentMode, currentPosition, getCurrentGeolocationPosition, recorderMode}) => {
  const [audioChunks, setAudioChunks] = useState([]);
  const [amplitudes, setAmplitudes] = useState(new Uint8Array());

  const handleRecorder = async () => {
    getCurrentGeolocationPosition();
    if (developmentMode) {
      let blob = await fetch("./static/media/dev-mode-sample.wav").then(r => r.blob());
      sendRecording(blob, currentPosition);
    } else {
      navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        let mediaRecorder = new MediaRecorder(stream);
        setAudioChunks([]);

        // Initialize audio context
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        // Start recording
        mediaRecorder.start(10);
        console.log('Start recording');

        // Get data
        mediaRecorder.addEventListener('dataavailable', event => dataAvailableHandler(event, analyser));

        // Stop recording
        mediaRecorder.addEventListener('stop', () => processRecording(stream, audioContext));

        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);
      });
    }
  };

  const dataAvailableHandler = (event, analyser) => {
    // Push data
    audioChunks.push(event.data);

    // Get frequency values
    const bufferLength = 6;
    const audioFrequencies = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(audioFrequencies);
    setAmplitudes(audioFrequencies);
    setRecordingData(audioFrequencies[0]);
  }

  const processRecording = async (stream, audioContext) => {
    console.log('Stop recording');
    stopPlayer();

    // Stop audio tracks and context
    stream.getAudioTracks().forEach(track => {
      track.stop();
    });
    audioContext.close();

    // Create Audio Blob and send to server
    const audioBlob = new Blob(audioChunks, {type: 'audio/x-wav'});
    sendRecording(audioBlob, currentPosition);
  }

  return (
    <Fragment>
      <AudioPlayer amplitudes={amplitudes} onPlayCallback={handleRecorder} recorderMode={recorderMode}/>
      <RecordingResultModal/>
      <RecordingNotFoundModal/>
    </Fragment>
  );
};

AudioRecorder.propTypes = {
  sendRecording: PropTypes.func.isRequired,
  developmentMode: PropTypes.bool
};

const mapStateToProps = state => ({
  developmentMode: state.developmentMode,
  currentPosition: state.geolocation.currentPosition
});

export default connect(mapStateToProps, {setRecordingData, stopPlayer, sendRecording, getCurrentGeolocationPosition})(AudioRecorder);
