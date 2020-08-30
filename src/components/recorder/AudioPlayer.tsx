import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

const AudioPlayer = ({amplitudes, playing, onPlayCallback, frameDuration, beatDuration, minLapse, maxLapse}) => {
  const [beats, setBeats] = useState([]);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (playing) {
      play();
    } else {
      stop();
    }
  }, [playing]);

  const addBeat = (amplitude) => {
    const id = uuidv4();
    const beat = {
      amplitude: amplitude,
      id: id
    }
    beats.push(beat);

    return beat;
  }

  const deleteBeat = (idBeat) => {
    setBeats(beats.filter(beat => beat.id !== idBeat));
  }

  const stop = () => {
    setBeats([]);
  }

  const play = () => {
    const currentBeat = addBeat(amplitudes[0]);
    simulateBeatFrame(currentBeat, 0);

    const beatLapse = Math.random() * (maxLapse - minLapse) + minLapse; // Lapse between beats (ms)
    setTimeout(() => {
      if (playing) {
        play();
      }
    }, beatLapse);
  }

  const simulateBeatFrame = (beat, frameCounter) => {
    const beatFrames = beatDuration / frameDuration; // Number of frames in one beat

    frameCounter++;

    let increase = (Math.PI / beatFrames) * frameCounter;
    let amplitude = Math.abs(100 * Math.sin(increase) + 0.01);
    beat.amplitude = amplitude / 2;

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

    if (ctx && beats.length > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      beats.forEach(b => {
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
      <div>{'beat0 amplitude: ' + beats[0]?.amplitude.toString()}</div>
      <div>{'beat0 id: ' + beats[0]?.id.toString()}</div>
      <div>{'beat1 amplitude: ' + beats[1]?.amplitude.toString()}</div>
      <div>{'beat1 id: ' + beats[1]?.id.toString()}</div>
      <div>{'beat2 amplitude: ' + beats[2]?.amplitude.toString()}</div>
      <div>{'beat2 id: ' + beats[2]?.id.toString()}</div>
      <div>{'beat3 amplitude: ' + beats[3]?.amplitude.toString()}</div>
      <div>{'beat3 id: ' + beats[3]?.id.toString()}</div>

      <div className='audio-player' onClick={() => onPlayCallback()}>
        <div>{'playing: ' + playing}</div>
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
  frameDuration: 50,  // Timeout between frame iterations (ms)
  beatDuration: 2000, // Duration of each beat (ms)
  minLapse: 2001,
  maxLapse: 2002
};

AudioPlayer.propTypes = {
  onPlayCallback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playing: state.recording.playing
})

export default connect(mapStateToProps)(AudioPlayer);
