import uuid from 'uuid';
import { AlertType } from './type-enum';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: AlertType.SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(
    () => dispatch({ type: AlertType.REMOVE_ALERT, payload: id }),
    6000
  );
};
