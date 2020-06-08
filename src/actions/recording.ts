import {RecordingType} from './type-enum';
import api from "../utils/api";

export const sendRecording = (audioBlob) => async dispatch => {
  try {
    dispatch({
      type: RecordingType.SEND_RECORDING
    });

    const config = { headers : { 'Content-Type': 'multipart/form-data' }};
    const res = await api.post('/recording', audioBlob, config);

    dispatch({
      type: RecordingType.RECORDING_RESULT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: RecordingType.RECORDING_RESULT_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status }
    });
    console.log(errors);
  }
};
