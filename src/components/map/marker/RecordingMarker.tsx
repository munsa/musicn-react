import React from 'react';
import Marker from '../../../assets/icon/icons8-marker.png';


const RecordingMarker = (props) => {
  return (
    <div>
      {props.text}
      <img src={Marker} width={48} className="image"/>
      </div>
  );
}

RecordingMarker.defaultProps = {
  text: 'Song'
};

export default RecordingMarker;