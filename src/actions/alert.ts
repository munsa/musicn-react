import { v4 as uuidv4 } from 'uuid';
import { ActionAlertType } from './type-enum';

export const setAlert = (alert) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: ActionAlertType.SET_ALERT,
    payload: { msg: alert.msg, type: alert.type, id }
  });

  setTimeout(
    () => dispatch({ type: ActionAlertType.REMOVE_ALERT, payload: id }),
    100000
  );
};

export const removeAlert = (id) => dispatch => {
  dispatch({
    type: ActionAlertType.REMOVE_ALERT,
    payload: id
  });
};
