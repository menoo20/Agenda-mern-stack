import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./style/model.scss"
import { connect } from "react-redux";

const Popping = ({open, handleClick, event})=> {
      return (
        <Modal show={open} onHide={handleClick}>
          <Modal.Header closeButton>
            <Modal.Title>{event.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{event.desc? event.desc: "No Dsecriptions Yet"}</Modal.Body>
          <Modal.Footer>
            <p>
              <span className="small text-muted">from: {event.start}</span>
              <span className="small text-muted">to: {event.end}</span>
            </p>
            <Button variant="primary" onClick={handleClick}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
  }

  function mapStateToProps({event}){
     return {
       event
     }
  }
  
  export default connect(mapStateToProps)(Popping)