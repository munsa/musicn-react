import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../shared/theme/bootstrap-custom.css';
import AudioRecorder from '../recorder/AudioRecorder';
import AppNavbar from './appNavbar/AppNavbar';
import AlertModal from './alertModal/AlertModal';
import Routes from '../routing/Routes';

const App = ({auth: {loading, isAuthenticated, user}}) => {
  return (
    <Fragment>
      {!loading && isAuthenticated && user &&
      <AudioRecorder/>
      }
      <AppNavbar/>
      <AlertModal/>
      <Switch>
        <Route component={Routes}/>
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  developmentMode: state.developmentMode
});

export default connect(mapStateToProps)(App);
