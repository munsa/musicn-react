import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {MDBContainer, MDBModal, MDBModalBody} from "mdbreact";
import './AlertModal.css';
import {AlertType} from '../../../shared/constants/constants';
import classList from '../../../shared/utils/classList';
import {removeAlert} from '../../../actions/alert';
import PropTypes from "prop-types";

const AlertModal = ({alerts, removeAlert}) => {
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
    <MDBContainer className='alert-modal-content'>
      <MDBModal className='alert-modal' position="top" backdrop={false} frame isOpen={isOpen} toggle={toggle}
                inline={false} noClickableBodyWithoutBackdrop={false} overflowScroll={true}>
        <MDBModalBody>
          {alerts.map((a, j) => (
            <div key={j} className={classList('alert-element',
              a.type === AlertType.SUCCESS && 'alert-success',
              a.type === AlertType.WARNING && 'alert-warning',
              a.type === AlertType.ERROR && 'alert-error'
            )}>
              <i className={classList('fa', 'alert-icon',
                a.type === AlertType.SUCCESS && 'fa-smile-o',
                a.type === AlertType.WARNING && 'fa-meh-o',
                a.type === AlertType.ERROR && 'fa-frown-o'
              )}/>
              <div className='alert-message'>
                {a.msg}
              </div>
              <a onClick={() => removeAlert(a.id)}>
                <i className={classList('fa', 'fa-times', 'close-modal-button')}/>
              </a>
            </div>
          ))}
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

AlertModal.propTypes = {
  alerts: PropTypes.array,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, {removeAlert})(AlertModal);
