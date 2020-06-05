import api from '../utils/api';
import {ProfileType} from './type-enum';

export const getProfileByUsername = username => async dispatch => {
  try {
    const res = await api.get(`/profile/${username}`);

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
