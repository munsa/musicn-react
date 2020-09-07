import { ActionRecordingType } from './type-enum';
import api from "../shared/utils/api";

export const sendRecording = (audioBlob, geolocation) => async dispatch => {
  try {
    dispatch({
      type: ActionRecordingType.SEND_RECORDING
    });

    const formData = new FormData();
    formData.append('audio', audioBlob, 'blob');

    const config = { headers : { 'Content-Type': 'multipart/form-data' }};
    const res = await api.post('/recording/identify', formData, config);

    dispatch({
      type: ActionRecordingType.GET_RECORDING,
      payload: res.data
    });

    if( res.data?._id ) {
      await api.put(`/recording/addGeolocation/${res.data._id}`, geolocation);
    }

  } catch (err) {
    console.log(err.message);
  }
};

export const getAllRecordings = () => async dispatch => {
  const res = await api.get('/recording/all');
  dispatch({
    type: ActionRecordingType.GET_ALL_RECORDINGS,
    payload: res.data
  });
}

export const setRecordingData = (dataFrequencyAmplitudes) => async dispatch => {
  dispatch({
    type: ActionRecordingType.SET_RECORDING_DATA,
    payload: dataFrequencyAmplitudes
  });
}

export const stopPlayer = () => async dispatch => {
  dispatch({
    type: ActionRecordingType.STOP_PLAYER
  });
}
