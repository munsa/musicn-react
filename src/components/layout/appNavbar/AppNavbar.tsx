import React, {Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {logout} from '../../../actions/auth';
import {toggleDevelopmentMode} from '../../../actions/development-mode';
import './AppNavbar.css';
import AudioRecorder from '../../recorder/AudioRecorder';

const AppNavbar = ({auth: {loading, isAuthenticated, user}, developmentMode, logout, toggleDevelopmentMode}) => {
  const history = useHistory();

  const onDevelopmentModeChange = event => {
    toggleDevelopmentMode(!developmentMode);
  }

  const onProfileClick = () => {
    history.push('/profile/' + user.username);
  }

  const onHomeClick = () => {
    history.push('/');
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="rgba(0,0,0,0.0)" variant="light">
      <div className='container-md'>
      <Navbar.Brand href='#!' onClick={onHomeClick}>MUSICN</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {developmentMode &&
          <Navbar.Text>
            <i className='fa fa-bug' title='Logout'/> Developer Mode
          </Navbar.Text>
          }
        </Nav>
        <Nav>
          {!loading && isAuthenticated && user &&
          <Fragment>
            <Link to={'/profile/' + user.username}
                  className='avatar'>
              <img
                src={user.avatar}
                alt='User Avatar'
                className='rounded-circle'
                width='26'
                height='26'
              />
            </Link>
            <NavDropdown title={user.username}
                         id="nav-dropdown">
              <NavDropdown.Item onClick={onProfileClick}>MyProfile</NavDropdown.Item>
              <NavDropdown.Item onClick={onDevelopmentModeChange}>
                {developmentMode ? 'User Mode' : 'Developer Mode'}
              </NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="#!" onClick={logout}>
                <i className='fa fa-sign-out' title='Logout'/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Fragment>
          }
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  developmentMode: PropTypes.bool,
  toggleDevelopmentMode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  developmentMode: state.developmentMode
});

export default connect(
  mapStateToProps,
  {logout, toggleDevelopmentMode}
)(AppNavbar);
