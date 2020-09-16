import {ActionProfileType, ActionRecordingType} from './type-enum';
import api from "../shared/utils/api";

export const sendRecording = (audioBlob, geolocation) => async (dispatch, getState) => {
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

    // Add recording to profile if the logged user profile is open
    // @ts-ignore
    if (getState().profile.currentUserProfile.isLoggedUser) {
      dispatch({
        type: ActionProfileType.ADD_NEW_RECORDING_TO_PROFILE,
        payload: res.data
      });
    }

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
