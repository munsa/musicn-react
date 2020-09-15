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
      type: ActionProfileType.PROFILE_ERROR
    });
  }
};

export const loadMoreProfileRecordings = (profile) => async dispatch => {

  const idUser: number = profile.user._id;
  const count: number = profile.recordings.length;
  const last: Date = profile.recordings[0]._id;

  dispatch({
    type: ActionProfileType.GET_MORE_PROFILE_RECORDINGS
  });

  const res = await api.get(`/recording/getMore/${idUser}?count=${count}&last=${last}`);

  profile.recordings = profile.recordings.concat(res.data);

  dispatch({
    type: ActionProfileType.GET_PROFILE_RECORDINGS,
    payload: profile
  });
}