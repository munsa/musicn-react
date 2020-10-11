import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Home from '../layout/home/Home';
import Profile from '../profile/Profile';
import PrivateRoute from '../routing/PrivateRoute';
import Landing from '../layout/Landing/Landing';

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
