import axios from 'axios';
import {ProfileType} from './type-enum';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.post('/api/profile/me');

    dispatch({
      type: ProfileType.GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ProfileType.PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status }
    });
  }
};
