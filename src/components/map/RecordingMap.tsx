import React, {useEffect, useState, Fragment} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import {GOOGLE_MAPS_API_KEY, mapStyleTheme} from '../../shared/config/googleMapsConfig';
import './RecordingMap.css';
import RecordingMarker from './marker/RecordingMarker';

const RecordingMap = ({recordingList, center, zoom}) => {
  const [openedRecording, setOpenedRecording] = useState(undefined);
  useEffect(() => {
    }, [recordingList]
  );

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
    lat: 40.46366700000001,
    lng: -3.7492199999999998
  },
  zoom: 16
};

export default RecordingMap;