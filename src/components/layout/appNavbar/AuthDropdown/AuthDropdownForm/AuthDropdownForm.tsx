import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './AuthDropdownForm.css';
import {Link} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

export const MODE_LOGIN = 'mode_login';
export const MODE_REGISTER = 'mode_register';

const AuthDropdownForm = ({mode, handleModeChange, handleSubmit}) => {
  const formInitialState = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  };
  const [formData, setFormData] = useState(formInitialState);

  const {username, email, password, passwordRepeat} = formData;

  const onModeChange = (e) => {
    handleModeChange(e);
    cleanForm();
  }

  const cleanForm = () => {
    setFormData(formInitialState);
  }

  const onChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  return (
    <div className='auth-dropdown-form-container'>
      {mode === MODE_LOGIN &&
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Control type="username"
                        placeholder="Username / Email"
                        name='username'
                        value={username}
                        onChange={onChange}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control type="password"
                        placeholder="Password"
                        name='password'
                        value={password}
                        onChange={onChange}/>
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
      }
      {mode === MODE_REGISTER &&
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Control type="username"
                        placeholder="Username / Email"
                        name='username'
                        value={username}
                        onChange={onChange}/>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Control type="email"
                        placeholder="Email"
                        name='email'
                        value={email}
                        onChange={onChange}
                        />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control type="password"
                        placeholder="Password"
                        name='password'
                        value={password}
                        onChange={onChange}/>
        </Form.Group>
        <Form.Group controlId="passwordRepeat">
          <Form.Control type="password"
                        placeholder="Repeat password"
                        name='passwordRepeat'
                        value={passwordRepeat}
                        onChange={onChange}/>
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
      }
    </div>
  );
};

AuthDropdownForm.propTypes = {
  mode: PropTypes.oneOf([MODE_LOGIN, MODE_REGISTER])
}

AuthDropdownForm.defaultProps = {
  mode: MODE_LOGIN
}

export default AuthDropdownForm;