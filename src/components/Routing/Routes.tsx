import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Home from '../layout/Home/Home';
import Profile from '../Profile/Profile';
import PrivateRoute from './/PrivateRoute';
import Landing from '../Layout/Landing/Landing';

const Routes = ({isAuthenticated, loading}) => {
  return (
    <Fragment>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <section style={{height: '100%'}}>
        <Switch>
          {!isAuthenticated && !loading &&
          <Route excact path='/' component={Landing}/>
          }
          {isAuthenticated && !loading &&
          <PrivateRoute exact path='/' component={Home}/>
          }
          <PrivateRoute exact path="/profile/:username" component={Profile}/>
        </Switch>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(Routes);
