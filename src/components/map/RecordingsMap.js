import React, {useEffect} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {GOOGLE_MAPS_API_KEY, mapStyleTheme} from '../../shared/config/googleMapsConfig';
import MarkerIcon from '../../assets/icon/icons8-marker-crop.png';

const RecordingsMap = ({recordingList, center, zoom}) => {
  useEffect(() => {
    }, [recordingList]
  );

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return (
    <div style={{height: '400px', width: '100%'}}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{ styles: mapStyleTheme }}
          center={center}
          zoom={zoom}
        >
          {recordingList.map((r, j) => (
            r.geolocation &&
            <Marker
              key={j}
              onLoad={onLoad}
              position={{lat: Number(r.geolocation.latitude), lng: Number(r.geolocation.longitude)}}
              icon={MarkerIcon}
            />
          ))}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

RecordingsMap.defaultProps = {
  center: {
    lat: 40.46366700000001,
    lng: -3.7492199999999998
  },
  zoom: 16
};

export default RecordingsMap;