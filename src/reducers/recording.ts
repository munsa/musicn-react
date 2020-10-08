import {ActionRecordingType} from '../actions/type-enum';

const initialCurrent = {
  dataFrequencyAmplitudes: [],
  playing: false,
  result: null,
  loading: false,
  transientId: null
}

export const initialState = {
  current: initialCurrent,
  all: []
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ActionRecordingType.START_RECORDING:
      return {
        ...state,
        current: {
          ...initialCurrent,
          transientId: payload,
          playing: true
        }
      }
    case ActionRecordingType.GET_RECORDING_RESULT_SUCCESS:
      return {
        ...state,
        current: {
          ...initialCurrent,
          result: payload,
          playing: false
        }
      }
    case ActionRecordingType.CLOSE_RECORDING_RESULT_MODAL:
      return {
        ...state,
        current: initialCurrent
      }
    case ActionRecordingType.GET_ALL_RECORDINGS:
      return {
        ...state,
        all: payload,
      }
    case ActionRecordingType.STOP_PLAYER:
      return {
        ...state,
        current: {
          ...state.current,
          recordingFrequencyData: [],
          loading: true,
          playing: false,
        }
      }
  }
  return state;
}
