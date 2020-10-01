import React, {useEffect, useState} from 'react';
import './AuthDropdownRegister.css';
import {Button, Form, InputGroup} from 'react-bootstrap';
import PubSub from 'pubsub-js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import {setFormValidationMessages} from '../../../../../shared/utils/validation';
import FormControlFeedback from '../../../../../shared/lib/Form/FormControlFeedback/FormControlFeedback';

export const EVENT_SHOW_REGISTER_ERRORS = 'EVENT_SHOW_REGISTER_ERRORS';

const AuthDropdownRegister = ({handleModeChange, handleSubmit}) => {
  const formInitialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };
  const formErrorsInitialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
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

  const {username, email, password, passwordConfirmation} = formData;

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

    //if not valid:
    event.preventDefault();
    event.stopPropagation();
    //else
    handleSubmit(event);

  };

  const validateForm = (form) => {
    let valid: boolean;

    valid = form.checkValidity();
    setFormValidationMessages(form);

    // Validate passwords
    if (form.passwordControl.validationMessage) {
      setFormData({...formData, passwordConfirmation: ''});
    } else {
      if (passwordConfirmation !== '' && passwordConfirmation !== password) {
        form.passwordConfirmationControl.setCustomValidity('Passwords don\'t match');
        setFormData({...formData, passwordConfirmation: ''});
      }
    }

    setErrors({
      username: form.usernameControl.validationMessage,
      email: form.emailControl.validationMessage,
      password: form.passwordControl.validationMessage,
      passwordConfirmation: form.passwordConfirmationControl.validationMessage
    });

    setValidated(true);

    return valid;
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
        <Form.Group controlId="emailControl">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="emailPrepend"><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="email"
                          placeholder="Email"
                          aria-describedby="emailPrepend"
                          name='email'
                          value={email}
                          onChange={onChange}
                          required
            />
            <FormControlFeedback feedback={errors.email}/>
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
        <Form.Group controlId="passwordConfirmationControl">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="passwordConfirmationPrepend"><FontAwesomeIcon icon={faKey}/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="password"
                          placeholder="Confirm password"
                          aria-describedby="passwordConfirmationPrepend"
                          name='passwordConfirmation'
                          value={passwordConfirmation}
                          onChange={onChange}
                          required
            />
            <FormControlFeedback feedback={errors.passwordConfirmation}/>
          </InputGroup>
        </Form.Group>
        <Button variant='primary'
                type="submit"
                className='auth-dropdown-submit-button'>
          Sign up
        </Button>
        <div className='mt-1'>
          Already have an account? <a href='#' onClick={onModeChange}>Log in</a>
        </div>
      </Form>
    </div>
  );
};

export default AuthDropdownRegister;