import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './RecordingResultSuccessModal.css';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import PropTypes from 'prop-types';
import RecordingCard from '../../../song/RecordingCard/RecordingCard';
import PubSub from 'pubsub-js';

export const EVENT_SHOW_RESULT_SUCCESS_MODAL = 'EVENT_SHOW_RESULT_SUCCESS_MODAL';

const RecordingResultSuccessModal = ({recording}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [typedText, setTypedText] = React.useState('');
  const [animationFinished, setAnimationFinished] = React.useState(false);
  useEffect(() => {
    let token = PubSub.subscribe(EVENT_SHOW_RESULT_SUCCESS_MODAL, () => {
      showModal();
    });
    return () => {
      PubSub.unsubscribe(token);
    }
  }, []);

  const showModal = () => {
    setIsOpen(true);
    //setAnimationFinished(false);
    //typeText(0, '');
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const typeText = (i, textWritten) => {
    const text = 'A WILDTUNE APPEARED!';
    if (i < text.length) {
      textWritten = textWritten + text.charAt(i);
      setTypedText(textWritten);
      i++;
      setTimeout(() => {
        typeText(i, textWritten)
      }, 70);
    } else {
      setAnimationFinished(true);
    }
  }

  return recording && (
    <Modal show={isOpen}
           onHide={hideModal}
           dialogClassName='result-modal'
           centered>
      <ModalHeader closeButton={true}/>
      <ModalBody>
        <RecordingCard recording={recording}/>
        {/*
        <div className={classList('result-modal-appeared-container', animationFinished ? 'fadeOut' : '')}>
          <div className='result-modal-animation'
               key={typedText}>{typedText}</div>
        </div>
        */}
      </ModalBody>
    </Modal>
  );
};

RecordingResultSuccessModal.propTypes = {
  recording: PropTypes.object
}

const mapStateToProps = state => ({
  recording: state.recording.current.result,
});

export default connect(mapStateToProps)(RecordingResultSuccessModal);
