import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {MDBContainer, MDBModal, MDBModalBody} from "mdbreact";

const AlertModal = ({alerts}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      showModal();
    } else {
      hideModal();
    }
  }, [alerts]);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <MDBContainer>
      <MDBModal position="top" backdrop={false} frame isOpen={isOpen} toggle={toggle} inline={false}
                noClickableBodyWithoutBackdrop={false} overflowScroll={false}>
        <MDBModalBody>
          <div style={{zIndex: 100, position: 'relative'}}>
            {alerts.map((a, j) => (
              <a key={j}>
                {j > 0 ? '/n' : ''}
                {a.msg}
              </a>
            ))}
          </div>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertModal);
