import { ProfileType } from '../actions/type-enum';

const initialState = {
  profile: null,
  repos: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ProfileType.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case ProfileType.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
  }
}