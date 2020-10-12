import React, {useEffect, useState} from 'react';
import './WelcomeModal.css';
import PubSub from 'pubsub-js';
import ModalBody from 'react-bootstrap/ModalBody';
import Modal from 'react-bootstrap/Modal';
import ProfileUserInformation from '../../../profile/ProfileUserInformation/ProfileUserInformation';
import WildTunes from '../../../../shared/assets/image/wildtunes/logo/wildtunes_logo_orange.svg';
import {Carousel} from 'react-bootstrap';

export const EVENT_OPEN_WELCOME_MODAL = 'EVENT_OPEN_WELCOME_MODAL';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
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

  const handleSelect = (selectedIndex, e) => {
    if (!(index === 3 && selectedIndex === 0) &&
      !(index === 0 && selectedIndex === 3)) {
      setPreviousIndex(index);
      setIndex(selectedIndex);
    }

  };

  return (user &&
    <Modal activeIndex={index}
           show={isOpen}
           onHide={hideModal}
           dialogClassName='welcome-modal'
           indicators={false}
           backdrop="static"
           centered
    >
      <ModalBody>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <div className='welcome-modal-title'>
              Welcome to
            </div>
            <img src={WildTunes} className='welcome-modal-logo'/>
            <div className='mt-5'>
              <ProfileUserInformation profile={{user}}/>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            TEST slide 2
          </Carousel.Item>
          <Carousel.Item>
            TEST slide 3
          </Carousel.Item>
          <Carousel.Item>
            TEST slide 4
          </Carousel.Item>
        </Carousel>
      </ModalBody>
    </Modal>
  )
}

export default WelcomeModal;