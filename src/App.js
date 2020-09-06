import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Layout from './components/layout/Layout';
import './shared/theme/bootstrap-custom.css';
// Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './shared/utils/setAuthToken';

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
        <Layout/>
      </Router>
    </Provider>
  );
};

export default App;
