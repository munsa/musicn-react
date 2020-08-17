import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const AudioPlayer = ({dataFrequencyAmplitudes, playing, onPlayCallback}) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if(playing) {
      iterate();
    }
  }, [playing]);

  let frameNumber = 0;

  const iterate = () => {
    const frameDuration = 50; // Timeout between frame iterations (ms)
    const beatDuration = 2000; // Duration of each beat (ms)
    const beatIterations = (beatDuration * 2) / frameDuration; // Number of iterations in one beat

    setTimeout(() => {
      let increase = (Math.PI * 2 / beatIterations) * frameNumber;

      let amplitude = Math.abs(100 * Math.sin(increase) + 0.01);
      console.log(frameNumber + ': ' + amplitude);

      draw(amplitude);

      frameNumber++;

      iterate();
    }, frameDuration);
  }

  // Draw circles
  const draw = (amplitude) => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');

    if(ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.beginPath();

      ctx.arc(75, 75, amplitude, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  return (
    <div className='audio-player' onClick={() => onPlayCallback()}>
      {'AQUI: '}
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
  );
};

AudioPlayer.defaultProps = {
  circles: [
    {colour: '#581845', radius: 50},
    {colour: '#900C3F', radius: 60},
    {colour: '#C70039', radius: 70},
    {colour: '#FF5733', radius: 80},
    {colour: '#FFC300', radius: 90},
    {colour: '#DAF7A6', radius: 100}
  ]
};

AudioPlayer.propTypes = {
  circles: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      radius: PropTypes.number
    })
  ),
  onPlayCallback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dataFrequencyAmplitudes: state.recording.dataFrequencyAmplitudes,
  playing: state.recording.playing
})

export default connect(mapStateToProps)(AudioPlayer);
