import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './AuthDropdownLogin.css';
import {Button, Form, InputGroup} from 'react-bootstrap';
import {EVENT_SHOW_AUTH_DROPDOWN} from '../AuthDropdown';
import PubSub from 'pubsub-js';

const AuthDropdownLogin = ({handleModeChange, handleSubmit}) => {
  const formInitialState = {
    username: '',
    password: ''
  };
  const [formData, setFormData] = useState(formInitialState);
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_SHOW_AUTH_DROPDOWN, showBackendErrors);
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
    setFormData({...formData, [event.target.name]: event.target.value});
  }


  const onSubmit = (event) => {
    const form = event.currentTarget;
    const valid = validateForm(form);

    event.preventDefault();
    event.stopPropagation();

    if(valid) {
      handleSubmit(event);
    }
  };

  const validateForm = (form): boolean => {
    let valid: boolean = true;

    // Custom validity

    // Check validity
    if (form.checkValidity() === false) {
      valid = false;
    } else {
      valid = valid && true;
    }

    setValidated(true);

    return valid;
  }

  const showBackendErrors = () => {

  }

  return (
    <div className='auth-dropdown-form-container'>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group controlId="username">
          <Form.Control type="username"
                        placeholder="Username / Email"
                        name='username'
                        value={username}
                        onChange={onChange}
                        required/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control type="password"
                        placeholder="Password"
                        name='password'
                        value={password}
                        onChange={onChange}
                        required/>
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