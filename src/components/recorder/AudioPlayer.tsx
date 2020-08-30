import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

const AudioPlayer = ({amplitudes, playing, onPlayCallback, frameDuration, beatDuration, minLapse, maxLapse, stoppedAmplitude}) => {
  const canvasRef = useRef(null);
  const playingRef = useRef(false); // workaround, using ref as it is updated the whole time
  const beats = useRef([]);

  const beatFrames = beatDuration / frameDuration; // Number of frames in one beat

  useEffect(() => {
    playingRef.current = playing;
    if (playing) {
      play();
    } else {
      stop();
    }
  }, [playing]);

  const addBeat = (maxAmplitude) => {
    const id = uuidv4();
    const beat = {
      id: id,
      maxAmplitude: maxAmplitude,
      amplitude: 0
    }
    beats.current.push(beat);

    return beat;
  }

  const deleteBeat = (idBeat) => {
    beats.current = beats.current.filter(beat => beat.id !== idBeat);
  }

  const stop = () => {
    const currentBeat = addBeat(stoppedAmplitude);
    simulateBeatFrame(currentBeat, 0);
    draw();

    setTimeout(() => {
      if (!playingRef.current) {
        stop();
      }
    }, beatDuration);
  }

  const play = () => {
    const currentBeat = addBeat(amplitudes[0]);
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
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.beginPath();

        ctx.arc(75, 75, b.amplitude, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  };

  return (
    <div>
      <div>{'beat0 amplitude: ' + beats.current[0]?.amplitude.toString()}</div>
      <div>{'beat0 id: ' + beats.current[0]?.id.toString()}</div>
      <div>{'beat1 amplitude: ' + beats.current[1]?.amplitude.toString()}</div>
      <div>{'beat1 id: ' + beats.current[1]?.id.toString()}</div>
      <div>{'beat2 amplitude: ' + beats.current[2]?.amplitude.toString()}</div>
      <div>{'beat2 id: ' + beats.current[2]?.id.toString()}</div>
      <div>{'beat3 amplitude: ' + beats.current[3]?.amplitude.toString()}</div>
      <div>{'beat3 id: ' + beats.current[3]?.id.toString()}</div>

      <div className='audio-player' onClick={() => onPlayCallback()}>
        <div>{'playing: ' + playing}</div>
        <div>{'playingRef: ' + playingRef.current}</div>
        <div>{'a[0]: ' + amplitudes[0]}</div>
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
  minLapse: 2001,
  maxLapse: 2002,
  stoppedAmplitude: 20  // Amplitude of the beat when the player is stopped
};

AudioPlayer.propTypes = {
  onPlayCallback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playing: state.recording.playing
})

export default connect(mapStateToProps)(AudioPlayer);
