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
import Moon from '../../../../shared/assets/image/moon.png';

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
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <div className='welcome-modal-carousel-item'>
              <svg>
                <path d="M0,76.22C0,34.13,34.13,0,76.22,0s76.22,34.13,76.22,76.22c0,79.68-76.22,162.22-76.22,162.22S0,155.91,0,76.22 z"/>
                <circle className="st1" cx="76.22" cy="72.66" r="43.96"/>
              </svg>

              <div className='welcome-modal-title'>
                Welcome to
              </div>
              <img src={WildTunes} className='welcome-modal-logo'/>
              <div className='mt-5'>
                <ProfileUserInformation profile={{user}}/>
              </div>
              <p className='text-orange mt-5'>
                I have given you a new identity. I hope you like it.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img className='moon' src={Moon}/>
            <div className='welcome-modal-carousel-item mt-3'>
              <p className='text-blue'>
                By the way, I am your new friend. Yes... I am a moon...
              </p>
              <p className='text-blue'>
                I will help you to identify songs.
              </p>
              <p className='text-blue'>
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
                This is how a Tune looks like. Let's not speak about my music taste...
              </p>
              <p className='text-orange'>
                Click or hover over the cover image to access to the source links.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='welcome-modal-carousel-item'>
              <p className='text-blue'>
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