import api from '../shared/utils/api';
import { ActionAuthType } from './type-enum';
import { setAlert } from './alert';
import setAuthToken from '../shared/utils/setAuthToken';
import { AlertType } from '../shared/constants/constants'

// Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await api.get('/auth');

    dispatch({
      type: ActionAuthType.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ActionAuthType.AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ username, email, password }) => async dispatch => {
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await api.post('/users', body);

    dispatch({
      type: ActionAuthType.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert({ type: AlertType.ERROR, msg: error.msg })));
    }
    dispatch({ type: ActionAuthType.REGISTER_FAIL });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: ActionAuthType.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert({ type: AlertType.ERROR, msg: error.msg })));
    }
    dispatch({ type: ActionAuthType.LOGIN_FAIL });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: ActionAuthType.LOGOUT });
};
