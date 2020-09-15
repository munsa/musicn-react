import {ActionProfileType} from '../actions/type-enum';

const initialState = {
  profile: null,
  recordingsLoading: false
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ActionProfileType.GET_PROFILE_USER:
      return {
        profile: payload,
        recordingsLoading: true
      };
    case ActionProfileType.GET_PROFILE_RECORDINGS:
      return {
        profile: payload,
        recordingsLoading: false
      };
    case ActionProfileType.GET_MORE_PROFILE_RECORDINGS:
      return {
        ...state,
        recordingsLoading: true
      };
    case ActionProfileType.ADD_NEW_RECORDING_TO_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          recording: state.profile.recordings.unshift(payload)
        }
      };
    case ActionProfileType.PROFILE_ERROR:
      return initialState;
  }
  return state;
}