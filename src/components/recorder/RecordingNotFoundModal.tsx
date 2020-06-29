import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {ActionRecordingType} from '../../actions/type-enum';
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
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader closeButton={true}>
        <div className='text-right'>404 Song not found :(</div>
      </ModalHeader>
      <ModalBody>
        <div>
          Sorry, seems we couldn't find the song you are listening to.
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
