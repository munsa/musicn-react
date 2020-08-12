import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Home from '../layout/home/Home';
import Profile from '../profile/Profile';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <Fragment>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <PrivateRoute exact path='/' component={Home}/>
      <section className="container">
        <Switch>
          <PrivateRoute exact path="/profile/:username" component={Profile}/>
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
