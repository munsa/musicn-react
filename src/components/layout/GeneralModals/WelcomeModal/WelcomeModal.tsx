import React, {useEffect, useState} from 'react';
import './WelcomeModal.css';
import PubSub from 'pubsub-js';
import ModalBody from 'react-bootstrap/ModalBody';
import Modal from 'react-bootstrap/Modal';
import ProfileUserInformation from '../../../profile/ProfileUserInformation/ProfileUserInformation';
import WildTunes from '../../../../shared/assets/image/wildtunes/logo/wildtunes_logo_orange.svg';
import {Carousel} from 'react-bootstrap';
import RecordingCard from '../../../song/RecordingCard/RecordingCard';
import AudioPlayer from '../../../recorder/audioPlayer/AudioPlayer';

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

  const tuneExample = {
    acrCloud: {artists: [{name: 'AQUA'}], track: {name: 'Barbie Girl'}},
    spotify: {
      track: {id: '6Y74r48BWnJs1LKnnKPec2'},
      api: {album: {images: [{url: 'https://i.pinimg.com/564x/72/f5/82/72f582988b89efae9cfc221179863c0d.jpg'}]}}
    },
    deezer: {track: {id: '1115044'}}
  };

  return (user &&
    <Modal activeIndex={index}
           show={isOpen}
           onHide={hideModal}
           dialogClassName='welcome-modal'
           indicators={false}
           backdrop="static"
           interval={null}
           centered
    >
      <ModalBody>
        <div className='moon'>
          <AudioPlayer amplitudes={[]}/>
        </div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <div className='welcome-modal-carousel-item'>
              <div className='welcome-modal-title'>
                Welcome to
              </div>
              <img src={WildTunes} className='welcome-modal-logo'/>
              <div className='mt-5'>
                <ProfileUserInformation profile={{user}}/>
              </div>
              <div className='text-blue mt-5'>
                We have given you a new identity. We hope you like it.
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='welcome-modal-carousel-item'>


              <p className='text-orange'>
                Hey! I am your new friend. Yes, I am a moon... and sometimes a sun.
              </p>
              <p className='text-blue'>
                I will help you to identify the songs you are listening to.
              </p>
              <p className='text-orange'>
                You can always find me chilling on top of the page.
              </p>
              <p className='text-blue'>
                Don't be scared to navigate through the website while I try to guess the song. I won't pause.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='welcome-modal-carousel-item'>
              <RecordingCard recording={tuneExample}/>
              <p className='text-orange mt-3'>
                This is how a Tune looks like. Please, let's not speak about our music taste.
              </p>
              <p className='text-blue'>
                Hover or click over the image to access to the source buttons.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='welcome-modal-carousel-item'>
              <p className='text-orange'>
                Scroll down the home page to explore the trending tunes and the map.
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </ModalBody>
    </Modal>
  )
}

export default WelcomeModal;