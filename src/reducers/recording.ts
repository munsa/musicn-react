import {ActionRecordingType} from '../actions/type-enum';

export const initialState = {
  recordingResult: null,
  loading: false,
  error: {}
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ActionRecordingType.SEND_RECORDING:
      return {
        ...state,
        recordingResult: null,
        loading: true
      }
    case ActionRecordingType.GET_RECORDING:
      return {
        ...state,
        recordingResult: payload,
        loading: false
      }
    case ActionRecordingType.REMOVE_RECORDING:
      return initialState
  }
  return state;
}
