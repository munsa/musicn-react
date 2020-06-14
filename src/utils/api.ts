import axios from 'axios';
import store from '../store';
import { AuthType } from '../actions/type-enum';
import { setAlert } from '../actions/alert'
import { AlertType } from '../constants/constant'

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
      // handle rest of the errors -> show error message
      let alertType = null;
      if(err.response.status >= 200 && err.response.status < 300) {
        alertType = AlertType.SUCCESS;
      } else if(err.response.status >= 400 && err.response.status < 500) {
        alertType = AlertType.WARNING;
      } else if(err.response.status >= 500 && err.response.status < 600) {
        alertType = AlertType.DANGER;
      } else {
        alertType = AlertType.DANGER;
      }
      setAlert(err.response.body, alertType);
    }
    return Promise.reject(err);
  }
);

export default api;
