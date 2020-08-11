import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {logout} from '../../../actions/auth';
import {toggleDevelopmentMode} from '../../../actions/development-mode';
import './AppNavbar.css';

const AppNavbar = ({auth: {loading, isAuthenticated, user}, developmentMode, logout, toggleDevelopmentMode}) => {
  const onDevelopmentModeChange = event => {
    toggleDevelopmentMode(!developmentMode);
  }

  const navbarLinks = (
    <div>
      <ul className='nav navbar-nav navbar-right'>
        {user ?
          (<li className='nav-item dropdown'>
            <Link to={'/profile/' + user.username}>
              <img
                src={
                  !loading && isAuthenticated ? user.avatar : ''
                }
                alt='User Avatar'
                className='rounded-circle'
                width='30'
                height='30'
              />
              {user.username}
            </Link>
          </li>) : ''}
        <li className='nav-item dropdown'>
          <a onClick={logout} href='#!' className='nav-link'>
            <i className='fa fa-sign-out' title='Logout'/>
          </a>
        </li>
      </ul>
    </div>
  );

  const test = (
    !loading && isAuthenticated &&
    <Fragment>
      <div className="custom-control custom-switch" data-toggle="tooltip" data-placement="bottom"
           title="Development mode">
        <input type="checkbox" className="custom-control-input" id="developmentModeSwitch" checked={developmentMode}
               onChange={onDevelopmentModeChange}/>
        <label className="custom-control-label" htmlFor="developmentModeSwitch"> </label>
      </div>
      {navbarLinks}
    </Fragment>
  );

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" >
      <Navbar.Brand href="/">MUSICN</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
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
                         id="collasible-nav-dropdown">
              <NavDropdown.Item href={'/profile/' + user.username}>My Profile</NavDropdown.Item>
              <NavDropdown.Item>
                <div>
                  <div>Developer Mode</div>
                  <div className="custom-control custom-switch" data-toggle="tooltip" data-placement="bottom"
                       title="Development mode">
                    <input type="checkbox" className="custom-control-input" id="developmentModeSwitch"
                           checked={developmentMode} onChange={onDevelopmentModeChange}/>
                    <label className="custom-control-label" htmlFor="developmentModeSwitch"> </label>
                  </div>
                </div>
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
