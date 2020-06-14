import { AlertType } from '../actions/type-enum';

export const initialState: any[] = [];

export default function(state = initialState, action) {
  const { type, payload, msg } = action;
  let hasType: boolean = false;
  switch (type) {
    case AlertType.SET_ALERT:
      state.forEach(alert => {
        if (alert.msg === msg) {
          hasType = true;
          return;
        }
      });
      if (!hasType) {
        return [...state, payload];
      }
      break;
    case AlertType.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
  }
  return state;
}
