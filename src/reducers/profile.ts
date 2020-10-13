import {ActionProfileType} from '../actions/type-enum';

const initialState = {
  currentProfile: {
    user: null,
    allGeolocations: [],
    recordings: [],
    maxRecordingsCount: 0,
    isLoggedUser: false
  },
  recordingsLoading: false
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ActionProfileType.GET_PROFILE_USER:
      return {
        currentProfile: payload,
        recordingsLoading: true
      };
    case ActionProfileType.GET_PROFILE_RECORDINGS:
      return {
        currentProfile: payload,
        recordingsLoading: false
      };
    case ActionProfileType.ACTIVATE_RECORDINGS_LOADER:
      return {
        ...state,
        recordingsLoading: true
      };
    case ActionProfileType.ADD_NEW_RECORDING_TO_PROFILE:
      return {
        ...state,
        currentProfile: {
          ...state.currentProfile,
          recordings: [payload, ...state.currentProfile.recordings.slice(0, state.currentProfile.recordings.length-1)]
        }
      };
    case ActionProfileType.CLEAR_PROFILE:
      return initialState;
    case ActionProfileType.PROFILE_ERROR:
      return initialState;
  }
  return state;
}