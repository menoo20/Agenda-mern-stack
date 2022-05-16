import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "../style/model.scss"
import { connect } from "react-redux";
import {Link} from "react-router-dom"


const Popping = ({open, handleClick, event})=> {
   
   const {id, describe, title, start, end} = event;

   const handleDelete = () => {
   
   }

   const handleUpdate = () => {
   
  }
    
   const modal = ()=>{
     return (
      <Modal show={open} onHide={handleClick}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{describe? describe: "No Dsecriptions Yet"}</Modal.Body>
          <Modal.Footer>
            <p>
              <span className="small text-muted">from: {start}</span>
              <span className="small text-muted">to: {end}</span>
            </p>
            <Button variant="warning" onClick={handleClick}>Close</Button>
            <Link to={`/event/${id}/update`}><Button variant="success" onClick={handleUpdate}>Update</Button></Link>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
     )
   }

   if(id){
     return modal()
   }else{
     <p>there is no modal to preview</p>
   }
   
  }

  function mapStateToProps({event}){
     return {
       event
     }
  }
  
  export default connect(mapStateToProps)(Popping)