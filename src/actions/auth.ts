import api from '../utils/api';
import { AuthType } from './type-enum';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { AlertTypeConst } from '../constants/constant'

// Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await api.get('/auth');

    dispatch({
      type: AuthType.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AuthType.AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ username, email, password }) => async dispatch => {
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await api.post('/users', body);

    dispatch({
      type: AuthType.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert({ type: AlertTypeConst.ERROR, msg: error.msg })));
    }
    dispatch({ type: AuthType.REGISTER_FAIL });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: AuthType.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert({ type: AlertTypeConst.ERROR, msg: error.msg })));
    }
    dispatch({ type: AuthType.LOGIN_FAIL });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: AuthType.LOGOUT });
};
