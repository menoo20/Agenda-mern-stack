import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./style/model.scss"

const Popping = ({open, handleClick})=> {
      return (
        <Modal show={open} onHide={handleClick}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClick}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
  }
  
  export default Popping;