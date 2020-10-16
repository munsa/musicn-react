import React, {useEffect} from 'react';
import './ErrorModal.css';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import SadGif from '../../../../shared/assets/gif/kawaii-sad.gif';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

export const EVENT_OPEN_ERROR_MODAL = 'EVENT_OPEN_ERROR_MODAL';

const ErrorModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_OPEN_ERROR_MODAL, ((name) => {
      showModal();
    }));
    return () => {
      PubSub.unsubscribe(token);
    }
  }, []);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen}
           onHide={hideModal}
           dialogClassName='error-modal'
           centered>
      <ModalHeader closeButton={true}>
        <div>
          <img className='sad-gif' alt='Album Cover' src={SadGif}/>
        </div>
      </ModalHeader>
      <ModalBody className='error-modal-body'>

        <div className='error-modal-content'>
          <h3>Something went wrong...</h3>
          <p className='mt-4'>This is awkward</p>
          <p className='mb-4'>I am going to fire the intern and fix this myself.</p>
        </div>
      </ModalBody>
    </Modal>
  );
};

ErrorModal.propTypes = {
  removeRecording: PropTypes.func
}

export default ErrorModal;
