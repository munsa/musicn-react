import React, {useEffect} from 'react';
import './RecordingNotFoundModal.css';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import SadGif from '../../../../shared/assets/gif/kawaii-sad.gif';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

export const EVENT_SHOW_RESULT_NOT_FOUND_MODAL = 'EVENT_SHOW_RESULT_NOT_FOUND_MODAL';

const RecordingNotFoundModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_SHOW_RESULT_NOT_FOUND_MODAL, () => {
      showModal();
    });
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
           centered>
      <ModalHeader closeButton={true}>
        <div className='not-found-modal-image'>
          <img className='sad-gif' alt='Album Cover' src={SadGif}/>
        </div>
      </ModalHeader>
      <ModalBody className='not-found-modal-body'>

        <div className='not-found-modal-content'>
          <h3>This is awkward</h3>
          <div className='mt-4'>We couldn't find the song...</div>
          <div>but...</div>
          <div className='mb-4'>Hey! Try again and we maybe have better luck.</div>
        </div>
      </ModalBody>
    </Modal>
  );
};

RecordingNotFoundModal.propTypes = {
  removeRecording: PropTypes.func
}

export default RecordingNotFoundModal;
