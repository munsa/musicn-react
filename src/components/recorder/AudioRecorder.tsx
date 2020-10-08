import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import AudioPlayer from './audioPlayer/AudioPlayer';
import RecordingResultModal from './ResultModals/RecordingResultSuccessModal/RecordingResultSuccessModal';
import RecordingNotFoundModal from "./ResultModals/RecordingNotFoundModal/RecordingNotFoundModal";
import {sendSample, startRecording} from '../../actions/recording';
import {getCurrentGeolocationPosition} from '../../actions/geolocation';
import PropTypes from "prop-types";

declare let MediaRecorder: any;

const AudioRecorder = ({setRecordingData, startRecording, sendSample, developmentMode, currentPosition, getCurrentGeolocationPosition, recorderMode, sampleDuration, maxSamples}) => {
  const [audioChunks, setAudioChunks] = useState([]);
  const [amplitudes, setAmplitudes] = useState(new Uint8Array());

  const handleRecorder = async () => {
    getCurrentGeolocationPosition();
    if (developmentMode) {
      let blob = await fetch("./static/media/dev-mode-sample.wav").then(r => r.blob());
      sendSample(blob, currentPosition);
    } else {
      const constraints = {
        audio: {
          noiseSuppression: false,
          echoCancellation: false
        }
      }
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
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

        // Data available event
        mediaRecorder.addEventListener('dataavailable', event => dataAvailableHandler(event, analyser));

        // Stop recording event
        mediaRecorder.addEventListener('stop', () => stopRecording(stream, audioContext));

        // Start recording
        startRecording();
        recordSample(maxSamples, mediaRecorder);
      });
    }
  };

  const recordSample = (samplesLeft, mediaRecorder) => {
    if(samplesLeft > 0) {
      setTimeout((samplesLeft, mediaRecorder) => {
          console.log('sampleNumber: ' + samplesLeft);
          sendSample(audioChunks, currentPosition, samplesLeft === 1);
          recordSample(samplesLeft - 1, mediaRecorder);
      }, sampleDuration, samplesLeft, mediaRecorder)
    }
  }

  const dataAvailableHandler = (event, analyser) => {
    // Push data
    audioChunks.push(event.data);

    // Get frequency values
    const bufferLength = 6;
    const audioFrequencies = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(audioFrequencies);
    setAmplitudes(audioFrequencies);
  }

  const stopRecording = async (stream, audioContext) => {
    // Stop audio tracks and context
    console.log('here')
    stream.getAudioTracks().forEach(track => {
      track.stop();
    });
    audioContext.close();
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
  developmentMode: PropTypes.bool,
  sampleDuration: PropTypes.number,
  maxSamples: PropTypes.number
};

AudioRecorder.defaultProps = {
  sampleDuration: 2000,
  maxSamples: 10
}

const mapStateToProps = state => ({
  developmentMode: state.developmentMode,
  currentPosition: state.geolocation.currentPosition
});

export default connect(mapStateToProps, {startRecording, sendSample, getCurrentGeolocationPosition})(AudioRecorder);
