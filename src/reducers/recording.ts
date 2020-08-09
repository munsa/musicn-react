import {ActionRecordingType} from '../actions/type-enum';

export const initialState = {
  result: null,
  found: null,
  loading: false,
  all: []
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ActionRecordingType.SEND_RECORDING:
      return {
        ...state,
        result: null,
        found: null,
        loading: true
      }
    case ActionRecordingType.GET_RECORDING:
      return {
        ...state,
        result: payload,
        found: payload != null,
        loading: false
      }
    case ActionRecordingType.CLOSE_RECORDING_RESULT_MODAL:
      return initialState
    case ActionRecordingType.GET_ALL_RECORDINGS:
      return {
        ...state,
        all: payload,
      }
  }
  return state;
}
