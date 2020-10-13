import React from 'react';
import {Marker} from '@react-google-maps/api';
import './CurrentPositionMarker.css';

declare let google: any;

const CurrentPositionMarker = ({user, position}) => {

  const svgPathMarker = () => {
    return 'M 367.9 329.76 c -4.62 5.3 -9.78 10.1 -15.9 13.65 v 22.94 c 66.52 9.34 112 28.05 112 49.65 c 0 30.93 -93.12 56 -208 56 S 48 446.93 48 416 c 0 -21.6 45.48 -40.3 112 -49.65 v -22.94 c -6.12 -3.55 -11.28 -8.35 -15.9 -13.65 C 58.87 345.34 0 378.05 0 416 c 0 53.02 114.62 96 256 96 s 256 -42.98 256 -96 c 0 -37.95 -58.87 -70.66 -144.1 -86.24 Z M 256 128 c 35.35 0 64 -28.65 64 -64 S 291.35 0 256 0 s -64 28.65 -64 64 s 28.65 64 64 64 Z m -64 192 v 96 c 0 17.67 14.33 32 32 32 h 64 c 17.67 0 32 -14.33 32 -32 v -96 c 17.67 0 32 -14.33 32 -32 v -96 c 0 -26.51 -21.49 -48 -48 -48 h -11.8 c -11.07 5.03 -23.26 8 -36.2 8 s -25.13 -2.97 -36.2 -8 H 208 c -26.51 0 -48 21.49 -48 48 v 96 c 0 17.67 14.33 32 32 32 Z'
  }

  return (
    <Marker
      icon={{
        path: svgPathMarker(),
        scale: 0.1,
        fillColor: '#' + user.avatarColor,
        fillOpacity: 0.5,
        strokeWeight: 1,
        strokeColor: '#000000',
        strokeOpacity: 1,
        anchor: new google.maps.Point(256, 450),
      }}
      position={{
        lat: Number(position.lat),
        lng: Number(position.lng)
      }}
      zIndex={1000}
    >
    </Marker>
  );
}

export default CurrentPositionMarker;