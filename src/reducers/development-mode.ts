import { DevelopmentModeType } from '../actions/type-enum';

export const initialState = false;

export default function(state = initialState, action) {
  const { type, payload, msg } = action;
  let hasType: boolean = false;
  switch (type) {
    case DevelopmentModeType.ENABLE_DEVELOPMENT_MODE:
      return true;
    case DevelopmentModeType.DISABLE_DEVELOPMENT_MODE:
      return false;
  }
  return state;
}
