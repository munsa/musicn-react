import React, {useState} from 'react';
import {connect} from 'react-redux';
import './AuthDropdown.css';
import AuthDropdownForm, {MODE_LOGIN, MODE_REGISTER} from './AuthDropdownForm/AuthDropdownForm';
import {Dropdown} from 'react-bootstrap';
import {login, register} from '../../../../actions/auth';

const AuthDropdown = ({login, register}) => {
  const [mode, setMode] = useState(MODE_LOGIN);

  const onModeChange = (e) => {
    if (mode === MODE_LOGIN) {
      setMode(MODE_REGISTER);
    } else if (mode === MODE_REGISTER) {
      setMode(MODE_LOGIN);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(mode === MODE_LOGIN) {
      login(e.target.username.value, e.target.password.value);
    } else if (mode === MODE_REGISTER) {
      register(e.target.username.value, e.target.email.value, e.target.password.value)
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-custom-components" className='login-button'>
        Log in
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <AuthDropdownForm mode={mode} handleModeChange={onModeChange} handleSubmit={handleSubmit}/>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(null, {login, register})(AuthDropdown);