import React, {useEffect, useState} from 'react';
import {InfoWindow, Marker} from '@react-google-maps/api';
import MarkerIcon from '../../../shared/assets/icon/marker.svg';
import {getArtistsString} from '../../../shared/utils/StringUtils';
import './RecordingMarker.css';

declare let google: any;

const RecordingMarker = ({openedRecordingId, recording, onMarkerClickCallback}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    closeInfoWindowById();
  }, [openedRecordingId]);

  const onMarkerClick = () => {
    openMarker();
    onMarkerClickCallback(recording);
  }

  const openMarker = () => {
    setIsOpen(true);
  }

  const closeMarker = () => {
    setIsOpen(false);
  }

  const closeInfoWindowById = () => {
    if(openedRecordingId !== recording._id) {
      closeMarker();
    }
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
        icon={{
          url:MarkerIcon,
          scaledSize: new google.maps.Size(37.2,53.2)
        }}
        onClick={onMarkerClick}
        position={{
          lat: Number(recording.geolocation.lat),
          lng: Number(recording.geolocation.lng)
        }}
      >
        {isOpen &&
        <InfoWindow
          onCloseClick={closeMarker}
          // @ts-ignore
          visible={true}
          options={{closeBoxURL: '', enableEventPropagation: true}}
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