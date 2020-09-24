import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import {ActionRecordingType} from "../../../../actions/type-enum";
import PropTypes from "prop-types";
import RecordingCard from '../../../song/RecordingCard/RecordingCard';

const RecordingResultModal = ({recording, removeRecording}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    if (recording && recording.found) {
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

  return recording.result && (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader closeButton={true}>
        <div className='text-right'>FOUND!</div>
      </ModalHeader>
      <ModalBody>
        <RecordingCard recording={recording}/>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-primary btn-lg btn-block' onClick={hideModal}>
          Done
        </button>
      </ModalFooter>
    </Modal>
  );
};

RecordingResultModal.propTypes = {
  recording: PropTypes.object.isRequired,
  removeRecording: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recording: state.recording
});

const mapDispatchToProps = dispatch => ({
  removeRecording: () => dispatch({type: ActionRecordingType.CLOSE_RECORDING_RESULT_MODAL})
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordingResultModal);
