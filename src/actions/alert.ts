import { v4 as uuidv4 } from 'uuid';
import { AlertType } from './type-enum';

export const setAlert = (alert) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: AlertType.SET_ALERT,
    payload: { msg: alert.msg, type: alert.type, id }
  });

  setTimeout(
    () => dispatch({ type: AlertType.REMOVE_ALERT, payload: id }),
    6000
  );
};
