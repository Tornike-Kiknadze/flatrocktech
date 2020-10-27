import { last } from "lodash";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

function ModalContent(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [nameDisable, setnameDisable] = useState(false);
  let { setNewUser } = props;

  const submit = (firstName, lastName, email, role) => {
    if (firstName.length < 1) {
      alert("Type Your Firstname");
      return;
    } else if (lastName.length < 1) {
      alert("Type Your Last Name");
      return;
    } else if (email.length < 1) {
      alert("Type Your email");
      return;
    }
    if (isEmail(email) === false) {
      return;
    } else {
      let newUser = {
        name: firstName,
        status: false,
        lastName,
        email,
        admin: role === "admin" ? true : false,
        id: uuidv4(),
      };

      setNewUser(newUser);

      setFirstName("");

      setRole("");

      setLastName("");

      setEmail("");
      props.toggle();
    }
  };

  const setName = (e) => {
    setFirstName(e.target.value);
  };
  const changeRole = (e) => {
    setRole(e.target.value);
  };
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  function isEmail(val) {
    let regEmail = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!regEmail.test(val)) {
      alert("invalid email");
      return false;
    }
    return true;
  }
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered>
      <ModalHeader toggle={props.toggle}> </ModalHeader>
      <ModalBody>
        <div>
          <h2>Invite New User</h2>{" "}
          <form>
            <div className="first-inputs">
              <input
                type="text"
                placeholder="First Name "
                required
                value={firstName}
                onChange={(e) => setName(e)}
              />
              <input
                disabled={nameDisable}
                type="text"
                placeholder="Last Name "
                value={lastName}
                onChange={(e) => changeLastName(e)}
              />
            </div>
            <input
              type="text"
              placeholder="Email"
              className="second-input"
              value={email}
              onChange={(e) => changeEmail(e)}
            />
            <select
              placeholder="Role"
              className="select-input"
              value={role}
              onChange={(e) => changeRole(e)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>{" "}
          </form>
        </div>{" "}
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => submit(firstName, lastName, email, role)}
          color="primary"
          type="submit"
        >
          Send Invitation
        </Button>{" "}
        {/*     <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button> */}
      </ModalFooter>{" "}
    </Modal>
  );
}

export default ModalContent;
