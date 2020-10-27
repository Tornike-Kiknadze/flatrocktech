import { last } from "lodash";
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

function DeleteModal(props) {
  const handleClick = () => {
    props.deleteUser(props.currentUser);
    props.toggle();
  };
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered>
      <ModalHeader toggle={props.toggle}> </ModalHeader>
      <ModalBody>
        <div className="delete-user">
          <p>
            {" "}
            {props.currentUser.name} {props.currentUser.lastName}{" "}
          </p>
          <p>{props.currentUser.status ? "Active" : "Inactive"} User</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => handleClick()} color="primary">
          delete
        </Button>{" "}
        {/*     <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
}

export default DeleteModal;
