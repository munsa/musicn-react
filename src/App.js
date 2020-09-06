import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Routes from './components/routing/Routes';
import AppNavbar from './components/layout/appNavbar/AppNavbar';
import AlertModal from './components/layout/alertModal/AlertModal';
import './shared/theme/bootstrap-custom.css';
// Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './shared/utils/setAuthToken';
import AudioRecorder from "./components/recorder/AudioRecorder";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <AudioRecorder/>
          <div className='container-md'>
            <AppNavbar/>
          </div>
          <AlertModal/>
          <Switch>
            <Route component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
