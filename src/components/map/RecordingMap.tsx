import React, {Fragment, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import './RecordingMap.css';
import RecordingMarker from './marker/RecordingMarker';
import {mapStyleTheme} from '../../shared/theme/custom-google-maps'
import CurrentPositionMarker from './marker/CustomaMarker/CurrentPositionMarker';



const RecordingMap = ({currentPosition, user, recordingList, center, zoom, useFitBounds}) => {
  const [openedRecording, setOpenedRecording] = useState(undefined);
  const mapRef = useRef(null);
  useEffect(() => {
    if(useFitBounds && hasGeolocationRecordings(recordingList)) {
      fitBounds(mapRef.current);
    }
  }, [recordingList]);

  const mapLoadedHandler = map => {
    mapRef.current = map;
  };

  const hasGeolocationRecordings = recordings => {
    if(recordings && recordings.length > 0)
    for (let i = 0; i < recordings.length; i++) {
      if (recordings[i] && recordings[i].geolocation != null) {
        return true;
      }
    }
    return false;
  }

  const fitBounds = map => {
    // @ts-ignore
    const bounds = new window.google.maps.LatLngBounds();
    recordingList.map(r => {
      if(r?.geolocation) {
        // @ts-ignore
        const latLng = new window.google.maps.LatLng(r.geolocation.lat, r.geolocation.lng);
        bounds.extend(latLng);
      }
    });
    map.fitBounds(bounds);
  };

  const onBoundsChanged = () => {
    console.log('bounds changed');
  }

  const onMarkerClickCallback = (r) => {
    setOpenedRecording(r)
  }

  return (
    <Fragment>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
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
          onBoundsChanged={onBoundsChanged}
        >
          {recordingList.map((r, j) => (
            r?.geolocation &&
            <RecordingMarker
              key={j}
              openedRecordingId={openedRecording?._id}
              recording={r}
              onMarkerClickCallback={onMarkerClickCallback}
            />
          ))}
          { currentPosition &&
            <CurrentPositionMarker user={user} position={currentPosition}/>
          }
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

RecordingMap.defaultProps = {
  center: {
    lat: 41.38879,
    lng: 2.15899
  },
  zoom: 2,
  useFitBounds: false
};

const mapStateToProps = state => ({
  currentPosition: state.geolocation.currentPosition,
  user: state.auth.user
});

export default connect(mapStateToProps)(RecordingMap);