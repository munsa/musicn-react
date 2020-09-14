import api from '../shared/utils/api';
import {ActionProfileType} from './type-enum';

export const getProfileByUsername = username => async dispatch => {
  try {
    // Get profile only with the user information lo load quick the profile
    const profileRes = await api.get(`/profile/${username}`);

    dispatch({
      type: ActionProfileType.GET_PROFILE_USER,
      payload:
        {
          user: profileRes.data,
          recordings: []
        }
    });

    // Load the profile recordings afterwards
    if (profileRes.data?._id) {
      const recordingRes = await api.get(`/recording/${profileRes.data?._id}`);

      dispatch({
        type: ActionProfileType.GET_PROFILE_RECORDINGS,
        payload:
          {
            user: profileRes.data,
            recordings: recordingRes.data
          }
      });
    }
  } catch (err) {
    dispatch({
      type: ActionProfileType.PROFILE_ERROR,
      payload: {msg: err.response?.statusText, status: err.response.status}
    });
  }
};
