import {RecordingType} from './type-enum';
import api from "../utils/api";

export const sendRecording = (audioBlob) => async dispatch => {
  try {
    dispatch({
      type: RecordingType.SEND_RECORDING
    });

    const geolocation = {
      latitude: 784487343,
      longitude: 28983932
    }
    const formData = new FormData();
    formData.append('audio', audioBlob, 'blob');
    formData.append('geolocation', JSON.stringify(geolocation));

    const config = { headers : { 'Content-Type': 'multipart/form-data' }};
    const res = await api.post('/recording', formData, config);

    dispatch({
      type: RecordingType.RECORDING_RESULT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RecordingType.RECORDING_RESULT_FAIL,
      payload: {msg: err.response.statusText, status: err.response.status }
    });
  }
};
