import {ActionDevelopmentModeType} from './type-enum';

export const toggleDevelopmentMode = enabled => dispatch => {
  if(enabled) {
    dispatch({
      type: ActionDevelopmentModeType.ENABLE_DEVELOPMENT_MODE
    });
  } else {
    dispatch({
      type: ActionDevelopmentModeType.DISABLE_DEVELOPMENT_MODE
    });
  }
};

