import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './RecordingResultModal.css';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {ActionRecordingType} from '../../../../actions/type-enum';
import PropTypes from 'prop-types';
import RecordingCard from '../../../song/RecordingCard/RecordingCard';
import classList from '../../../../shared/utils/classList';

const RecordingResultModal = ({recording, recordingFound, removeRecording}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [typedText, setTypedText] = React.useState('');
  const [animationFinished, setAnimationFinished] = React.useState(false);
  useEffect(() => {
    if (recordingFound) {
      showModal();
    }
  }, [recordingFound]);

  const showModal = () => {
    setIsOpen(true);
    typeText(0, '');
  };

  const hideModal = () => {
    setIsOpen(false);
    removeRecording();
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
        <div className={classList('result-modal-appeared-container', animationFinished ? 'fadeOut':'')}>
          <div className='result-modal-animation'
               key={typedText}>{typedText}</div>
        </div>
      </ModalBody>
    </Modal>
  );
};

RecordingResultModal.propTypes = {
  recording: PropTypes.object,
  recordingFound: PropTypes.bool,
  removeRecording: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recording: state.recording.result,
  recordingFound: state.recording.found,
});

const mapDispatchToProps = dispatch => ({
  removeRecording: () => dispatch({type: ActionRecordingType.CLOSE_RECORDING_RESULT_MODAL})
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordingResultModal);
