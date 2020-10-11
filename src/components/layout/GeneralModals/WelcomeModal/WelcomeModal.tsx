import React, {useEffect} from 'react';
import './WelcomeModal.css';
import PubSub from 'pubsub-js';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import Modal from 'react-bootstrap/Modal';

export const EVENT_OPEN_WELCOME_MODAL = 'EVENT_OPEN_WELCOME_MODAL';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_OPEN_WELCOME_MODAL, ((name) => {
      showModal();
    }));
    return () => {
      PubSub.unsubscribe(token);
    }
  }, [])

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen}
           onHide={hideModal}
           dialogClassName='result-modal'
           centered>
      <ModalHeader closeButton={true}/>
      <ModalBody>
        Hello world
      </ModalBody>
    </Modal>
  )
}

export default WelcomeModal;