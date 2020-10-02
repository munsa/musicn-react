import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './AuthDropdownLogin.css';
import {Button, Form, InputGroup} from 'react-bootstrap';
import {EVENT_SHOW_AUTH_DROPDOWN} from '../AuthDropdown';
import PubSub from 'pubsub-js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import FormControlFeedback from '../../../../../shared/lib/Form/FormControlFeedback/FormControlFeedback';
import {setFormValidationMessages} from '../../../../../shared/utils/validation';

export const EVENT_SHOW_LOGIN_ERRORS = 'EVENT_SHOW_LOGIN_ERRORS';

const formInitialState = {
  username: 'munsa',
  password: 'clapas08'
};
const formErrorsInitialState = {
  username: '',
  password: ''
};

const AuthDropdownLogin = ({handleModeChange, handleSubmit}) => {
  const [formData, setFormData] = useState(formInitialState);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState(formErrorsInitialState);
  const formRef = useRef(null);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_SHOW_LOGIN_ERRORS, ((name, errors) => {
      errors.forEach(e => {
        formRef.current[e.param].setCustomValidity(e.msg);
      });

      setFormData({...formData, password: ''});
      setErrorMessages(formRef.current);
    }));
    return () => {
      PubSub.unsubscribe(token);
    }
  }, []);

  const {username, password} = formData;

  const onModeChange = (e) => {
    handleModeChange(e);
    cleanForm();
  }

  const cleanForm = () => {
    setFormData(formInitialState);
    setValidated(false);
  }

  const onChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value.trim()});
    setErrors({...errors, [event.target.name]: ''});
    setValidated(false);
  }

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    validateForm(form);

    if(form.checkValidity()) {
      handleSubmit(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const validateForm = (form) => {
    setFormValidationMessages(form);
    setErrorMessages(form);
    setValidated(true);
  }

  const setErrorMessages = (form) => {
    setErrors({
      username: form.usernameControl.validationMessage,
      password: form.passwordControl.validationMessage
    });
  }

  return (
    <div className='auth-dropdown-form-container'>
      <Form noValidate validated={validated} onSubmit={onSubmit} ref={formRef}>
        <Form.Group controlId="usernameControl">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="usernamePrepend"><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="username"
                          placeholder="Username"
                          aria-describedby="usernamePrepend"
                          name='username'
                          value={username}
                          onChange={onChange}
                          required
            />
            <FormControlFeedback feedback={errors.username}/>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="passwordControl">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="passwordPrepend"><FontAwesomeIcon icon={faKey}/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="password"
                          placeholder="Password"
                          aria-describedby="passwordPrepend"
                          name='password'
                          value={password}
                          onChange={onChange}
                          required
            />
            <FormControlFeedback feedback={errors.password}/>
          </InputGroup>
        </Form.Group>
        <Button variant='primary'
                type="submit"
                className='auth-dropdown-submit-button'>
          Log in
        </Button>
        <div className='mt-1'>
          Are you new around here? <a href='#' onClick={onModeChange}>Sign up</a>
        </div>
      </Form>
    </div>
  );
};

AuthDropdownLogin.propTypes = {
  handleModeChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default AuthDropdownLogin;