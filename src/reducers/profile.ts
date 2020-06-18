import { ActionProfileType } from '../actions/type-enum';

const initialState = {
  profile: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionProfileType.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case ActionProfileType.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
  }
  return state;
}