import {GeolocationType} from './type-enum';

export const getGeolocation = () => dispatch => {
  try {
    const geo_success = position => {
      dispatch({
        type: GeolocationType.GET_GEOLOCATION,
        payload: position.coords
      });
    }

    const geo_error = err => {
      dispatch({
        type: GeolocationType.GEOLOCATION_ERROR,
        payload: err
      });
    }

    let geo_options = {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 27000
    };

    const getGeolocation = () => {
      navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    }

    window.setInterval(getGeolocation, 500, 'Parameter 1', 'Parameter 2');


  } catch (err) {
    dispatch({
      type: GeolocationType.GEOLOCATION_ERROR,
      payload: err
    });
  }
};
