import axios from 'axios';
import { connect } from 'react-redux';
import store from '../../store';
import { ActionAuthType } from '../../actions/type-enum';
import { setAlert } from '../../actions/alert';

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
      store.dispatch({ type: ActionAuthType.LOGOUT });
    } else if (err.response.data?.hasOwnProperty('alert')) {
      // handle rest of the errors -> show error message
      store.dispatch(setAlert(err.response.data.alert));
    }
    return Promise.reject(err);
  }
);

export default connect(null, {setAlert})(api);
