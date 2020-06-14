import axios from 'axios';
import store from '../store';
import { AuthType, AlertType } from '../actions/type-enum';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
 **/
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.msg === 'Token is not valid') {
      // handle token not valid -> logout
      store.dispatch({ type: AuthType.LOGOUT });
    } else {
      // handle rest of the errors -> show error popup
      //store.dispatch({ type: AlertType.SET_ALERT, payload: err.response.body });
    }
    return Promise.reject(err);
  }
);

export default api;
