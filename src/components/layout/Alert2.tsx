import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBIcon, MDBRow } from 'mdbreact';

class ModalPage extends Component {
  state = {
    modal1: false
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  render() {
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(1)}>Launch MDBModal</MDBBtn>
        <MDBModal position="top" backdrop={false} frame isOpen={this.state.modal1} toggle={this.toggle(1)} inline={false}  noClickableBodyWithoutBackdrop={false} overflowScroll={false}>
          <MDBModalBody>
            <MDBRow className="justify-content-center align-items-center">
              <p className="pt-3 pr-2">We use cookies to improve your website experience</p>
              <MDBBtn color="primary" onClick={this.toggle(1)}>Learn more
                <MDBIcon icon="book" className="ml-1" />
              </MDBBtn>
              <MDBBtn color="primary" outline onClick={this.toggle(1)}>Ok, thanks</MDBBtn>
            </MDBRow>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;