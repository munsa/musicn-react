import React from 'react';
import './AuthDropdown.css';
import {Button, Dropdown} from 'react-bootstrap';

const AuthDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-custom-components" className='login-button'>
        Login
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AuthDropdown;