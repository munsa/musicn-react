import React, {useState} from 'react';
import {InfoWindow, Marker} from '@react-google-maps/api';
import MarkerIcon from '../../../assets/icon/icons8-marker-crop.png';
import {getArtistsString} from '../../../shared/utils/StringUtils';
import './RecordingMarker.css';

const RecordingMarker = ({recording}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onMarkerOpen = () => {
    setIsOpen(true);
  }

  const onMarkerClose = () => {
    setIsOpen(false);
  }

  const Source = source => {
    return (
      <div>
        <div className='track-label'>{source.source.track?.name}</div>
        <div className='artists-label'>{getArtistsString(source.source.artists)}</div>
      </div>
    )
  }

  return (
    <Marker
      onClick={onMarkerOpen}
      position={{
        lat: Number(recording.geolocation.latitude),
        lng: Number(recording.geolocation.longitude)
      }}
      icon={MarkerIcon}
    >
      {isOpen &&
      <InfoWindow
        onCloseClick={onMarkerClose}
        // @ts-ignore
        visible={true}
        options={{closeBoxURL: ``, enableEventPropagation: true}}
      >
        <div className='info-box-container'>
          {recording.spotify ?
            <Source source={recording.spotify}/>
            : (recording.deezer ?
              <Source source={recording.deezer}/>
              : (recording.acrCloud ?
                <Source source={recording.acrCloud}/>
                : ''))}
        </div>
      </InfoWindow>
      }
    </Marker>
  );
}

RecordingMarker.defaultProps = {
  text: 'Song'
};

export default RecordingMarker;