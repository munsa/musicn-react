import axios from 'axios';
import {connect} from 'react-redux';
import store from '../../store';
import {ActionAuthType} from '../../actions/type-enum';
import {setAlert} from '../../actions/alert';
import {AlertType} from '../constants/constants';
import PubSub from 'pubsub-js';
import {EVENT_OPEN_ERROR_MODAL} from '../../components/layout/GeneralModals/ErrorModal/ErrorModal';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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
    if (err.response?.data?.msg === 'Token is not valid') {
      // handle token not valid -> logout
      store.dispatch({type: ActionAuthType.LOGOUT});
    } else if (err.response.data?.hasOwnProperty('status') && err.response.data.status === 'error') {
      // handle rest of the errors -> show error message
      //if(process.env.NODE_ENV == 'production') {
      if(true) {
        PubSub.publish(EVENT_OPEN_ERROR_MODAL);
      } else {
        store.dispatch(setAlert({msg: err.response.data.message, type: AlertType.ERROR}));
      }

    }
    return Promise.reject(err);
  }
);

export default connect(null, {setAlert})(api);
