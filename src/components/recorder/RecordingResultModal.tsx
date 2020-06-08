import React, {useEffect, forwardRef} from 'react';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import {RecordingType} from "../../actions/type-enum";

const RecordingResultModal = ({recording, removeRecording}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    if (recording && recording.recordingResult && recording.recordingResult.status.code === 0) {
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

  const Source = ({source: {artists, track, album}}) => {
    return (
      <div>
        {/* Artists */}
        <div className='row'>
          <b className='col text-right'>Artists</b>
          <div className='col-9 text-left'>
            {artists.map((a, j) => (
              <a key={j}>
                {j > 0 && ', '}
                {a.name}
              </a>
            ))}
          </div>
        </div>
        {/* Track */}
        <div className='row'>
          <b className='col text-right'>Track</b>
          <div className='col-9 text-left'>{track.name}</div>
        </div>
        {/* Album */}
        <div className='row'>
          <b className='col text-right'>Album</b>
          <div className='col-9 text-left'>{album.name}</div>
        </div>
      </div>
    );
  };

  return recording.recordingResult && recording.recordingResult.metadata ? (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader closeButton={true}>
        <div className='text-right'>FOUND!</div>
      </ModalHeader>
      <ModalBody>
        <div>
          {recording.recordingResult.metadata.music.map((m, i) => (
            <div key={i}>
              {m.external_metadata.spotify &&
              <div>
                <h1>
                  <i className='fa fa-spotify'/> Spotify
                </h1>
                <Source source={m.external_metadata.spotify}/>
              </div>
              }

              {m.external_metadata.deezer &&
              <div>
                <hr/>
                <h1>Deezer</h1>
                <Source source={m.external_metadata.deezer}/>
              </div>
              }
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-primary btn-lg btn-block' onClick={hideModal}>
          Done
        </button>
      </ModalFooter>
    </Modal>
  ) : '';
};

const mapStateToProps = state => ({
  recording: state.recording
});

const mapDispatchToProps = dispatch => ({
  removeRecording: () => dispatch({ type: RecordingType.REMOVE_RECORDING })
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordingResultModal);
