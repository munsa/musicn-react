import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import recording from './recording';
import developmentMode from './development-mode';
import profile from './profile';
import geolocation from './geolocation';
import {RootType} from '../actions/type-enum';

const appReducer = combineReducers({
  alert,
  auth,
  recording,
  developmentMode,
  profile,
  geolocation
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if(action.type === RootType.DESTROY_SESSION)
    state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
