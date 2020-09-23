import React, {useEffect} from 'react';
import './RecordingMapWindow.css';
import RecordingCard from '../../song/RecordingCard/RecordingCard';

const RecordingMapWindow = ({recording}) => {
  useEffect(() => {
    console.log(recording);
  }, recording);
  return(
    <div className='recording-map-window-container'>
      <RecordingCard recording={recording}/>
    </div>
  );
};

export default RecordingMapWindow;