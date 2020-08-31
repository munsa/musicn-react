import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

/**
 * TODO: Refactor component.
 * It works for the moment but we could find another approach. Maybe SVG instead of canvas.
 * There are some problems that had to be solved with workarounds.
 * The recursive functions get the value of states an props when it first enters the function.
 * They don't get updated values.
 * It is solved using useRef as it always gets re updated values.
 * Create a totally independent component to publish the package in npm.
 */

const AudioPlayer = ({amplitudes, playing, onPlayCallback, frameDuration, beatDuration, minLapse, maxLapse, stoppedAmplitude, colorPlaying, colorStopped}) => {
  const canvasRef = useRef(null);
  const playingRef = useRef(false); // workaround, using ref as it is updated the whole time
  const beats = useRef([]);
  const amplitude = useRef(0);
  const beatFrames = beatDuration / frameDuration; // Number of frames in one beat

  useEffect(() => {
    console.log('HERE: ' + amplitudes[0]);
    amplitude.current = amplitudes[0];
  }, [amplitudes]);

  useEffect(() => {
    playingRef.current = playing;
    if (playing) {
      play();
    } else {
      stop();
    }
  }, [playing]);

  const addBeat = (maxAmplitude, color) => {
    console.log('New beat: ' + maxAmplitude);
    const id = uuidv4();
    const beat = {
      id: id,
      maxAmplitude: maxAmplitude,
      amplitude: 0,
      color: color
    }
    beats.current.push(beat);

    return beat;
  }

  const deleteBeat = (idBeat) => {
    beats.current = beats.current.filter(beat => beat.id !== idBeat);
  }

  const stop = () => {
    const currentBeat = addBeat(stoppedAmplitude, colorStopped);
    simulateBeatFrame(currentBeat, 0);
    draw();

    setTimeout(() => {
      if (!playingRef.current) {
        stop();
      }
    }, beatDuration);
  }

  const play = () => {
    const currentBeat = addBeat(amplitude.current, colorPlaying);
    simulateBeatFrame(currentBeat, 0);

    const beatLapse = Math.random() * (maxLapse - minLapse) + minLapse; // Lapse between beats (ms)
    setTimeout(() => {
      if (playingRef.current) {
        play();
      }
    }, beatLapse);
  }

  const calculateFrameAmplitude = (beat, frameCounter) => {
    let increase = (Math.PI / beatFrames) * frameCounter;
    let amplitude = Math.abs(beat.maxAmplitude * Math.sin(increase) + 0.01);
    return amplitude / 2;
  }

  const simulateBeatFrame = (beat, frameCounter) => {
    frameCounter++;

    beat.amplitude = calculateFrameAmplitude(beat, frameCounter);

    draw();

    setTimeout(() => {
      if (frameCounter < beatFrames) {
        simulateBeatFrame(beat, frameCounter);
      } else {
        deleteBeat(beat.id);
      }
    }, frameDuration);
  }

  const draw = () => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');

    if (ctx && beats.current.length > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      beats.current.forEach(b => {
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = b.color;
        ctx.beginPath();

        ctx.arc(75, 75, b.amplitude, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  };

  return (
    <div>
      <div className='audio-player' onClick={() => onPlayCallback()}>
        <div className='audio-player-button-container'>
          <button className='audio-player-invisible-button'/>
        </div>
        <div className='audio-player-button-container'>
          <i className='audio-player-button fa fa-2x fa-microphone'/>
        </div>

        <canvas
          className='audio-player-canvas'
          ref={canvasRef}
          width='150'
          height='150'
        />
      </div>
    </div>
  );
};

AudioPlayer.defaultProps = {
  frameDuration: 50,    // Timeout between frame iterations (ms)
  beatDuration: 2000,   // Duration of each beat (ms)
  minLapse: 1000,
  maxLapse: 1500,
  stoppedAmplitude: 20,  // Amplitude of the beat when the player is stopped
  colorPlaying: '#FF0000',
  colorStopped: '#0000FF'
};

AudioPlayer.propTypes = {
  onPlayCallback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playing: state.recording.playing
})

export default connect(mapStateToProps)(AudioPlayer);
