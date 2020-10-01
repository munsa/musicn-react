import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './AuthDropdownLogin.css';
import {Button, Form, InputGroup} from 'react-bootstrap';
import {EVENT_SHOW_AUTH_DROPDOWN} from '../AuthDropdown';
import PubSub from 'pubsub-js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import FormControlFeedback from '../../../../../shared/lib/Form/FormControlFeedback/FormControlFeedback';
import {setFormValidationMessages} from '../../../../../shared/utils/validation';
import {EVENT_SHOW_REGISTER_ERRORS} from '../AuthDropdownRegister/AuthDropdownRegister';

const AuthDropdownLogin = ({handleModeChange, handleSubmit}) => {
  const formInitialState = {
    username: '',
    password: ''
  };
  const formErrorsInitialState = {
    username: '',
    password: ''
  };
  const [formData, setFormData] = useState(formInitialState);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState(formErrorsInitialState);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_SHOW_REGISTER_ERRORS, (data => {
      console.log(data);
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

    setErrors({
      username: form.usernameControl.validationMessage,
      password: form.passwordControl.validationMessage
    });

    setValidated(true);
  }

  return (
    <div className='auth-dropdown-form-container'>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
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
                          minLength={3}
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
                          minLength={6}
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