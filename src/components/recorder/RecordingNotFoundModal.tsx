import React, {useEffect, forwardRef} from 'react';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import {RecordingType} from "../../actions/type-enum";

const RecordingNotFoundModal = ({recording, removeRecording}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    if (recording && recording.recordingResult && !recording.recordingResult.success) {
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

  return recording.recordingResult ? (
    <Modal show={isOpen} onHide={hideModal} size={'sm'}>
      <ModalHeader closeButton={true}>
        <div className='text-right'>Song not found :(</div>
      </ModalHeader>
      <ModalBody>
        <div>
          Sorry, seems we couldn't find the song you are listening to. You can try again and hopefully we will have better luck.
        </div>
      </ModalBody>
    </Modal>
  ) : '';
};

const mapStateToProps = state => ({
  recording: state.recording
});

const mapDispatchToProps = dispatch => ({
  removeRecording: () => dispatch({ type: RecordingType.REMOVE_RECORDING })
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordingNotFoundModal);
