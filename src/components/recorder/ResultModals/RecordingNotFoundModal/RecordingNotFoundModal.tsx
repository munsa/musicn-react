import React, {useEffect} from 'react';
import './RecordingNotFoundModal.css';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
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
           centered
           dialogClassName='not-found-modal'>
      <ModalHeader closeButton={true}/>
      <ModalBody>
        <div className='not-found-modal-content'>
          <h3 className='text-404'>404 :(</h3>
          <h4 className='text-tune-not-found'>Tune Not Found</h4>
          <p>Let's try again!</p>
        </div>
      </ModalBody>
    </Modal>
  );
};

RecordingNotFoundModal.propTypes = {
  removeRecording: PropTypes.func
}

export default RecordingNotFoundModal;
