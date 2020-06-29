import {ActionAuthType} from '../actions/type-enum';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ActionAuthType.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case ActionAuthType.REGISTER_SUCCESS:
    case ActionAuthType.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ActionAuthType.AUTH_ERROR:
    case ActionAuthType.REGISTER_FAIL:
    case ActionAuthType.LOGIN_FAIL:
    case ActionAuthType.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
