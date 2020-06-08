import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AudioPlayer from './AudioPlayer';
import RecorderSuccessResultModal from './RecordingResultModal';
import devModeResult from './devModeResult.json';
import {sendRecording} from "../../actions/recording";
import PropTypes from "prop-types";
declare let MediaRecorder: any;

const AudioRecorder = ({sendRecording, recordingResult, developmentMode}) => {
  const [audioChunks, setAudioChunks] = React.useState([]);
  const [circles, setCircles] = React.useState(undefined);

  const handleRecorder = async () => {
    if(developmentMode) {
      let blob = await fetch("./static/media/dev-mode-sample.wav").then(r => r.blob());
      sendRecording(blob);
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
        }, 3000);
      });
    }
  };

  const dataAvailableHandler = (event, analyser) => {
    audioChunks.push(event.data);

    // Get frequency values
    const bufferLength = 6;
    const amplitudeArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(amplitudeArray);

    // Construct circle objects
    const c = [];
    const colours = [
      '#581845',
      '#900C3F',
      '#C70039',
      '#FF5733',
      '#FFC300',
      '#DAF7A6'
    ];
    for (let i = 0; i < bufferLength; i++) {
      let circle = {
        colour: colours[i],
        radius: amplitudeArray[i]
      };
      c.push(circle);
    }
    setCircles(c);
  }

  const processRecording = async (stream, audioContext) => {
      console.log('Stop recording');

      // Reset circles
      setCircles(undefined);

      // Stop audio tracks and context
      stream.getAudioTracks().forEach(track => {
        track.stop();
      });
      audioContext.close();

      // Create Audio Blob and send to server
      const audioBlob = new Blob(audioChunks, {type: 'audio/x-wav'});
      sendRecording(audioBlob);
  }

  return (
    <div>

      <AudioPlayer circles={circles} onPlayCallback={handleRecorder} />
      <RecorderSuccessResultModal result={recordingResult}/>
    </div>
  );
};

AudioRecorder.propTypes = {
  sendRecording: PropTypes.func.isRequired,
  recordingResult: PropTypes.object
};

const mapStateToProps = state => ({
  recording: state.recording,
  developmentMode: state.developmentMode
});

export default connect(mapStateToProps, {sendRecording})(AudioRecorder);
