import { RecordingType } from './type-enum';
import api from "../utils/api";
import { loadUser } from './auth';

export const sendRecording = (audioBlob) => async dispatch => {
  try {
    dispatch({
      type: RecordingType.SEND_RECORDING
    });

    const formData = new FormData();
    formData.append('audio', audioBlob, 'blob');

    const config = { headers : { 'Content-Type': 'multipart/form-data' }};
    const res = await api.post('/recording', formData, config);

    dispatch({
      type: RecordingType.GET_RECORDING,
      payload: res.data
    });

    if( res.data?.id ) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const body = {
          geolocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        };
        await api.put(`/recording/addGeolocation/${res.data.id}`, body);
      });
    }

  } catch (err) {
    console.log(err.message);
  }
};
