import {ActionGeolocationType} from '../actions/type-enum';

export const initialState = {
  currentPosition: null
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ActionGeolocationType.GET_CURRENT_POSITION:
      return {
        currentPosition: payload
      };
  }
  return state;
}
