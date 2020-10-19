import React, {Fragment, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import AudioPlayer from './audioPlayer/AudioPlayer';
import RecordingResultModal, {EVENT_SHOW_RESULT_SUCCESS_MODAL} from './ResultModals/RecordingResultSuccessModal/RecordingResultSuccessModal';
import RecordingNotFoundModal from './ResultModals/RecordingNotFoundModal/RecordingNotFoundModal';
import {sendSample, startRecording} from '../../actions/recording';
import {getCurrentGeolocationPosition} from '../../actions/geolocation';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

declare let MediaRecorder: any;

const AudioRecorder = ({startRecording, sendSample, developmentMode, currentPosition, getCurrentGeolocationPosition, recorderMode, sampleDuration, maxSamples}) => {
  const [audioChunks, setAudioChunks] = useState([]);
  const [amplitudes, setAmplitudes] = useState(new Uint8Array());
  const timeoutId = useRef(null);
  const stream = useRef(null);
  const audioContext = useRef(null);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_SHOW_RESULT_SUCCESS_MODAL, () => {
      stopRecording()
    });
    return () => {
      PubSub.unsubscribe(token);
    }
  }, [])

  const handleRecorder = async () => {
    // @ts-ignore
    if (!window.MediaRecorder) {
      alert('WildTunes recorder is not available in your browser.');
    } else {
      getCurrentGeolocationPosition();
      if (developmentMode) {
        let blob = await fetch('./static/media/dev-mode-sample.wav').then(r => r.blob());
        sendSample(blob, currentPosition);
      } else {
        const constraints = {
          audio: {
            noiseSuppression: false,
            echoCancellation: false
          }
        }
        navigator.mediaDevices.getUserMedia(constraints).then(s => {
          stream.current = s;
          let mediaRecorder = new MediaRecorder(stream.current);
          setAudioChunks([]);

          // Initialize audio context
          audioContext.current = new AudioContext();
          const source = audioContext.current.createMediaStreamSource(stream.current);
          const analyser = audioContext.current.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);

          // Start recording
          mediaRecorder.start(50);

          // Data available event
          mediaRecorder.addEventListener('dataavailable', event => dataAvailableHandler(event, analyser));

          // Stop recording event
          mediaRecorder.addEventListener('stop', () => stopRecording());

          // Start recording
          startRecording();
          recordSample(maxSamples, mediaRecorder);
        });
      }
    }
  };

  const recordSample = (samplesLeft, mediaRecorder) => {
    if (samplesLeft > 0) {
      timeoutId.current = setTimeout((samplesLeft, mediaRecorder) => {
        sendSample(audioChunks, currentPosition, samplesLeft === 1);
        recordSample(samplesLeft - 1, mediaRecorder);
      }, sampleDuration, samplesLeft, mediaRecorder);;
    } else {
      mediaRecorder.stop();
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

  const stopRecording = () => {
    // Stop Timeout
    clearTimeout(timeoutId.current);

    // Stop audio tracks and context
    stream.current.getAudioTracks().forEach(track => {
      track.stop();
    });
    if(audioContext.current.state !== 'closed') {
      audioContext.current.close();
    }
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
  sendSample: PropTypes.func,
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
