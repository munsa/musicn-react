import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './RecordingNotFoundModal.css';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {ActionRecordingType} from '../../../../actions/type-enum';
import SadGif from '../../../../shared/assets/gif/kawaii-sad.gif';
import PropTypes from 'prop-types';

const RecordingNotFoundModal = ({recording, removeRecording}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    if (recording && recording.found === false) {
      showModal();
    }
  }, [recording]);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    removeRecording();
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
  recording: PropTypes.object.isRequired,
  removeRecording: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recording: state.recording,
});

const mapDispatchToProps = dispatch => ({
  removeRecording: () => dispatch({type: ActionRecordingType.CLOSE_RECORDING_RESULT_MODAL})
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordingNotFoundModal);
