import React, {Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {logout} from '../../../actions/auth';
import {toggleDevelopmentMode} from '../../../actions/development-mode';
import './AppNavbar.css';
import WildTunes from '../../../shared/assets/image/wildtunes/logo/wildtunes_logo_orange.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBug} from '@fortawesome/free-solid-svg-icons';
import AuthDropdown from './AuthDropdown/AuthDropdown';

const AppNavbar = ({auth: {loading, isAuthenticated, user}, developmentMode, logout, toggleDevelopmentMode}) => {
  const history = useHistory();

  const onDevelopmentModeChange = () => {
    toggleDevelopmentMode(!developmentMode);
  }

  const onProfileClick = () => {
    history.push('/profile/' + user.username);
  }

  const onHomeClick = () => {
    history.push('/');
  }

  return (
    <Navbar collapseOnSelect expand={true} variant="light">
      <div className='container-md'>
        <Navbar.Brand href='#' onClick={onHomeClick}>
          <img src={WildTunes} className='brand-logo'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {developmentMode &&
            <div className='developer-mode-text'>
              <FontAwesomeIcon icon={faBug}/> Developer Mode
            </div>
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
                  <NavDropdown.Item onClick={onProfileClick}>My Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => onDevelopmentModeChange()}>
                    {developmentMode ? 'User Mode' : 'Developer Mode'}
                  </NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item href="" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Fragment>
            }
            { !isAuthenticated &&
              <div>
                <AuthDropdown/>
              </div>
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
