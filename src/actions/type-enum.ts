export enum RootType {
  DESTROY_SESSION='DESTROY_SESSION'
}

export enum ActionAlertType {
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT'
}

export enum ActionAuthType {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  USER_LOADED = 'USER_LOADED',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT = 'LOGOUT',
  LOGOUT_FAIL = 'LOGOUT_FAIL',
  AUTH_LOADING = 'AUTH_LOADING'
}

export enum ActionRecordingType {
  START_RECORDING = 'START_RECORDING',
  GET_RECORDING_RESULT_SUCCESS = 'GET_RECORDING_RESULT_SUCCESS',
  GET_ALL_RECORDINGS = 'GET_ALL_RECORDING',
  GET_TRENDING_LIST = 'GET_TRENDING_LIST',
  STOP_PLAYER = 'STOP_PLAYER',
  CLOSE_RECORDING_RESULT_MODAL = 'CLOSE_RECORDING_RESULT_MODAL'
}

export enum ActionDevelopmentModeType {
  ENABLE_DEVELOPMENT_MODE = 'ENABLE_DEVELOPMENT_MODE',
  DISABLE_DEVELOPMENT_MODE = 'DISABLE_DEVELOPMENT_MODE'
}

export enum ActionProfileType {
  GET_PROFILE_USER = 'GET_PROFILE_USER',
  GET_PROFILE_RECORDINGS = 'GET_PROFILE_RECORDINGS',
  ACTIVATE_RECORDINGS_LOADER = 'ACTIVATE_RECORDINGS_LOADER',
  ADD_NEW_RECORDING_TO_PROFILE = 'ADD_NEW_RECORDING_TO_PROFILE',
  CLEAR_PROFILE = 'CLEAR_PROFILE',
  PROFILE_ERROR = 'PROFILE_ERROR'
}

export enum ActionGeolocationType {
  GET_CURRENT_POSITION = 'GET_CURRENT_POSITION'
}