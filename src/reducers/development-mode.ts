import { ActionDevelopmentModeType } from '../actions/type-enum';

export const initialState = false;

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case ActionDevelopmentModeType.ENABLE_DEVELOPMENT_MODE:
      return true;
    case ActionDevelopmentModeType.DISABLE_DEVELOPMENT_MODE:
      return false;
  }
  return state;
}
