import api from '../shared/utils/api';
import {ActionProfileType} from './type-enum';

export const getProfileByUsername = (username, loggedUserId) => async dispatch => {
  try {
    // Get profile only with the user information lo load quick the profile
    const profileRes = await api.get(`/profile/${username}`);

    const isLoggedUser = profileRes.data._id === loggedUserId;

    const profile = {
      user: profileRes.data,
      recordings: [],
      maxCount: 0,
      isLoggedUser: isLoggedUser
    }

    dispatch({
      type: ActionProfileType.GET_PROFILE_USER,
      payload: profile
    });

    // Load the profile recordings afterwards
    if (profileRes.data?._id) {
      dispatch(getProfileRecordings(profile));
    }
  } catch (err) {
    dispatch({
      type: ActionProfileType.PROFILE_ERROR
    });
  }
};

export const getProfileRecordings = (profile) => async dispatch => {

  const idUser: number = profile.user._id;
  const count: number = profile.recordings.length;

  dispatch({
    type: ActionProfileType.ACTIVATE_RECORDINGS_LOADER
  });

  const res = await api.get(`/recording/${idUser}?count=${count}`);

  profile.recordings = profile.recordings.concat(res.data.recordings);
  profile.maxRecordingsCount = res.data.maxCount;

  dispatch({
    type: ActionProfileType.GET_PROFILE_RECORDINGS,
    payload: profile
  });
}