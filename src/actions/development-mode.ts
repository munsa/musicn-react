import {DevelopmentModeType} from './type-enum';

export const toggleDevelopmentMode = enabled => dispatch => {
  if(enabled) {
    dispatch({
      type: DevelopmentModeType.ENABLE_DEVELOPMENT_MODE
    });
  } else {
    dispatch({
      type: DevelopmentModeType.DISABLE_DEVELOPMENT_MODE
    });
  }
};

