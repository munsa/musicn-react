import React, {Fragment} from 'react';
import './GeneralModals.css';
import WelcomeModal from './WelcomeModal/WelcomeModal';
import ErrorModal from './ErrorModal/ErrorModal';

const GeneralModals = () => {
  return (
    <Fragment>
      <WelcomeModal/>
      <ErrorModal/>
    </Fragment>
  )
}

export default GeneralModals;