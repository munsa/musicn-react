import api from '../common/utils/api';
import {ActionProfileType} from './type-enum';

export const getProfileByUsername = username => async dispatch => {
  try {
    const res = await api.get(`/profile/${username}`);

    dispatch({
      type: ActionProfileType.GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ActionProfileType.PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status }
    });
  }
};
