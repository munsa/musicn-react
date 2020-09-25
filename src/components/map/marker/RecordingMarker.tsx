import React, {ReactDOM, useEffect, useRef, useState} from 'react';
import {InfoWindow, Marker, OverlayView} from '@react-google-maps/api';
import MarkerIcon from '../../../shared/assets/icon/marker.png';
import {getArtistsString} from '../../../shared/utils/StringUtils';
import './RecordingMarker.css';
import RecordingMapWindow from '../RecordingMapWindow/RecordingMapWindow';
import api from '../../../shared/utils/api';

declare let google: any;

const RecordingMarker = ({openedRecordingId, recording, onMarkerClickCallback}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullRecording, setFullRecording] = useState(null);
  useEffect(() => {
    closeInfoWindowById();
  }, [openedRecordingId]);

  const onMarkerClick = async () => {
    const res = await api.get(`/recording/${recording._id}`);
    setFullRecording(res.data);
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
    if (openedRecordingId !== recording._id) {
      closeMarker();
    }
  }

  const centerOverlayView = (width, height) => ({
    x: -(width / 2),
    y: -(height + 53.2),
  })

  return (
    <Marker
      icon={{
        url: MarkerIcon,
        scaledSize: new google.maps.Size(37.2, 53.2)
      }}
      onClick={onMarkerClick}
      position={{
        lat: Number(recording.geolocation.lat),
        lng: Number(recording.geolocation.lng)
      }}
    >
      {isOpen &&
        /*
      <OverlayView
        key={fullRecording}
        position={{
          lat: Number(recording.geolocation.lat),
          lng: Number(recording.geolocation.lng)
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={centerOverlayView}
      >
        <RecordingMapWindow recording={fullRecording}/>
      </OverlayView>
        */
        <InfoWindow
          onCloseClick={closeMarker}
          options={{closeBoxURL: '', enableEventPropagation: true}}
        >
            <RecordingMapWindow recording={fullRecording}/>
        </InfoWindow>
      }
    </Marker>
  );
}

RecordingMarker.defaultProps = {
  text: 'Song'
};

export default RecordingMarker;