import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../shared/theme/bootstrap-custom.css';
import AudioRecorder from '../recorder/AudioRecorder';
import AppNavbar from './appNavbar/AppNavbar';
import AlertModal from './alertModal/AlertModal';
import Routes from '../routing/Routes';
import Footer from './Footer/Footer';
import './Layout.css';

const App = ({auth: {loading, isAuthenticated, user}}) => {
  return (
    <div className='app'>

      <AudioRecorder recorderMode={!loading && isAuthenticated && user}/>
      <AlertModal/>
      <div className='app-header'>

        <AppNavbar/>
      </div>
      <div className='app-content'>
        <Route component={Routes}/>
      </div>
      {!loading && isAuthenticated &&
      <div className='app-footer'>
        <Footer/>
      </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  developmentMode: state.developmentMode
});

export default connect(mapStateToProps)(App);
