import {ActionGeolocationType} from './type-enum';

export const getCurrentGeolocationPosition = () => dispatch => {
  const geolocationSuccess = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    dispatch({
      type: ActionGeolocationType.GET_CURRENT_POSITION,
      payload: currentPosition
    });
    console.log('New position:\nlat(' + position.coords.latitude + ')\nlng(' + position.coords.longitude + ')')
  }

  const geolocationError = err => {
    console.log('Geolocation error: ' + err.message);
    // Do nothing
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 4000,
    maximumAge: 0
  };

  navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, options);
};

