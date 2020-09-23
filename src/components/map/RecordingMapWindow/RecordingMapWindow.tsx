import React from 'react';
import './RecordingMapWindow.css';
import RecordingCardSmall from '../../song/RecordingCardSmall/RecordingCardSmall';

const RecordingMapWindow = ({recording}) => {
  return (
    <div className='recording-map-window-container'>
      <RecordingCardSmall recording={recording}/>
    </div>
  );
};

export default RecordingMapWindow;