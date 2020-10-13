import api from '../shared/utils/api';
import {ActionAuthType, RootType} from './type-enum';
import setAuthToken from '../shared/utils/setAuthToken';
import PubSub from 'pubsub-js';
import {EVENT_SHOW_REGISTER_ERRORS} from '../components/layout/appNavbar/AuthDropdown/AuthDropdownRegister/AuthDropdownRegister';
import {EVENT_SHOW_LOGIN_ERRORS} from '../components/layout/appNavbar/AuthDropdown/AuthDropdownLogin/AuthDropdownLogin';
import {EVENT_OPEN_WELCOME_MODAL} from '../components/layout/GeneralModals/WelcomeModal/WelcomeModal';

// Load User
export const loadUser = (isFirstLogin = false) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await api.get('/auth/user');

    if (isFirstLogin) {
      PubSub.publish(EVENT_OPEN_WELCOME_MODAL, res.data);
    }

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
export const register = ({username, email, password, history}) => async dispatch => {
  const body = JSON.stringify({username, email, password});

  try {
    dispatch({type: ActionAuthType.AUTH_LOADING});

    const res = await api.post('/auth/register', body);

    dispatch({
      type: ActionAuthType.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser(true));

    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      PubSub.publish(EVENT_SHOW_REGISTER_ERRORS, errors);
    }
    dispatch({type: ActionAuthType.REGISTER_FAIL});
  }
};

// Login User
export const login = (username, password) => async dispatch => {
  const body = JSON.stringify({username, password});

  try {
    dispatch({type: ActionAuthType.AUTH_LOADING});

    const res = await api.post('/auth/login', body);

    dispatch({
      type: ActionAuthType.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      PubSub.publish(EVENT_SHOW_LOGIN_ERRORS, errors);
    }
    dispatch({type: ActionAuthType.LOGIN_FAIL});
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({type: ActionAuthType.LOGOUT});
  dispatch({type: RootType.DESTROY_SESSION})
};
