import { ActionAlertType } from '../actions/type-enum';

export const initialState: any[] = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ActionAlertType.SET_ALERT:
      return [...state, payload];
    case ActionAlertType.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
  }
  return state;
}
