import { ActionRecordingType } from './type-enum';
import api from "../shared/utils/api";

export const sendRecording = (audioBlob) => async dispatch => {
  try {
    dispatch({
      type: ActionRecordingType.SEND_RECORDING
    });

    const formData = new FormData();
    formData.append('audio', audioBlob, 'blob');

    const config = { headers : { 'Content-Type': 'multipart/form-data' }};
    const res = await api.post('/recording', formData, config);

    dispatch({
      type: ActionRecordingType.GET_RECORDING,
      payload: res.data
    });

    if( res.data?._id ) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const body = {
          geolocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        };
        await api.put(`/recording/addGeolocation/${res.data._id}`, body);
      });
    }

  } catch (err) {
    console.log(err.message);
  }
};
