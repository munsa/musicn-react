import React, {Fragment} from 'react';
import './FormControlFeedback.css';
import {FormControl} from 'react-bootstrap';

const FormControlFeedback = ({type, feedback}) => {

  return (
    <Fragment>
      {feedback && feedback != '' && feedback != ' ' &&
      <FormControl.Feedback type={type}>
        {feedback}
      </FormControl.Feedback>
      }
    </Fragment>
  );
};

FormControlFeedback.defaultProps = {
  type: 'invalid',
  feedback: ''
}

export default FormControlFeedback;