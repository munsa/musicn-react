import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import {toggleDevelopmentMode} from '../../actions/development-mode';

const Navbar = ({auth: {loading, isAuthenticated, user}, developmentMode, logout, toggleDevelopmentMode}) => {
  const onDevelopmentModeChange = event => {
    toggleDevelopmentMode(!developmentMode);
  }

  const navbarLinks = (
    <div>
      <ul className='nav navbar-nav navbar-right'>
        { user ?
          (<li className='nav-item dropdown'>
          <Link to={'/' + user.username}>
            <img
              src={
                !loading && isAuthenticated ? user.avatar : ''
              }
              alt='User Avatar'
              className='rounded-circle'
              width='30'
              height='30'
            />
            { user.username }
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
  return (
    <nav className='navbar navbar-expand-lg navbar-dark'>
      <Link className='navbar-brand' to='/'>
        MUSICN
      </Link>
      <ul className='navbar-nav mr-auto'/>

      {!loading && isAuthenticated &&
      <Fragment>
        <div className="custom-control custom-switch" data-toggle="tooltip" data-placement="bottom"
             title="Development mode">
          <input type="checkbox" className="custom-control-input" id="developmentModeSwitch" checked={developmentMode}
                 onChange={onDevelopmentModeChange}/>
          <label className="custom-control-label" htmlFor="developmentModeSwitch"> </label>
        </div>
        {navbarLinks}
      </Fragment>
      }
    </nav>
  );
};

Navbar.proTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  developmentMode: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  developmentMode: state.developmentMode
});

export default connect(
  mapStateToProps,
  {logout, toggleDevelopmentMode}
)(Navbar);
