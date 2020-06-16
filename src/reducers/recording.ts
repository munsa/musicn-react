import { RecordingType } from '../actions/type-enum';

export const initialState = {
  recordingResult: null,
  loading: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RecordingType.SEND_RECORDING:
      return {
        ...state,
        recordingResult: null,
        loading: true
      }
    case RecordingType.GET_RECORDING:
      return {
        ...state,
        recordingResult: payload,
        loading: false
      }
    case RecordingType.REMOVE_RECORDING:
      return initialState
  }
  return state;
}
