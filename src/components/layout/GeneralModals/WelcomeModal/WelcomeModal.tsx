import React, {useEffect, useState} from 'react';
import './WelcomeModal.css';
import PubSub from 'pubsub-js';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import Modal from 'react-bootstrap/Modal';
import ProfileUserInformation from '../../../profile/ProfileUserInformation/ProfileUserInformation';
import WildTunes from '../../../../shared/assets/image/wildtunes/logo/wildtunes_logo_orange.svg';

export const EVENT_OPEN_WELCOME_MODAL = 'EVENT_OPEN_WELCOME_MODAL';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_OPEN_WELCOME_MODAL, ((name, user) => {
      setUser(user);
      showModal()
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

  return (user &&
    <Modal show={isOpen}
           onHide={hideModal}
           dialogClassName='welcome-modal'
           backdrop="static"
           centered>
      <ModalHeader/>
      <ModalBody>
        <h3 className='welcome-modal-title'>
          Welcome to
        </h3>
        <img src={WildTunes} className='welcome-modal-logo'/>
        <div className='mt-5'>
          <ProfileUserInformation profile={{user}}/>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default WelcomeModal;