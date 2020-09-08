import React, {Fragment, useEffect, useRef, useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {GOOGLE_MAPS_API_KEY, mapStyleTheme} from '../../shared/config/googleMapsConfig';
import './RecordingMap.css';
import RecordingMarker from './marker/RecordingMarker';

const RecordingMap = ({recordingList, center, zoom, useFitBounds}) => {
  const [openedRecording, setOpenedRecording] = useState(undefined);
  useEffect(() => {
    }, [recordingList]
  );

  const mapLoadedHandler = map => {
    if(useFitBounds) {
      fitBounds(map);
    }
  };

  const fitBounds = map => {
    // @ts-ignore
    const bounds = new window.google.maps.LatLngBounds();
    recordingList.map(r => {
      if(r.geolocation) {
        // @ts-ignore
        const latLng = new window.google.maps.LatLng(r.geolocation.lat, r.geolocation.lng);
        bounds.extend(latLng);
      }
    });
    map.fitBounds(bounds);
  };

  const onMarkerClickCallback = (r) => {
    setOpenedRecording(r)
  }

  return (
    <Fragment>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '100%'}}
          options={{
            styles: mapStyleTheme,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          center={center}
          zoom={zoom}
          onLoad={mapLoadedHandler}
        >
          {recordingList.map((r, j) => (
            r.geolocation &&
            <RecordingMarker
              key={j}
              openedRecordingId={openedRecording?._id}
              recording={r}
              onMarkerClickCallback={onMarkerClickCallback}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

RecordingMap.defaultProps = {
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 16,
  useFitBounds: false
};

export default RecordingMap;