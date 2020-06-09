import { GeolocationType } from '../actions/type-enum';

export const initialState = {
  latitude: null,
  longitude: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GeolocationType.GET_GEOLOCATION:
      return {
        latitude: payload.latitude,
        longitude: payload.longitude
      }
    case GeolocationType.GEOLOCATION_ERROR:
      return initialState
  }
  return state;
}
