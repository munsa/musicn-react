import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import recording from './recording';
import developmentMode from './development-mode';
import profile from './profile';
import geolocation from './geolocation';

export default combineReducers({
  alert,
  auth,
  recording,
  developmentMode,
  profile,
  geolocation
});
