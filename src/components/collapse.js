import React, { useState } from "react";
import Checkbox from "./checkbox";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import arrow from "../assets/down.png";
const CollapseComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  if (props.admin) {
    return (
      <div className="permissions admin">
        {" "}
        <p>Super Admin</p>
        <Checkbox status={isChecked} collapse={true} />
      </div>
    );
  }

  const handleChekbox = () => {
    setChecked(!isChecked);
  };

  return (
    <div>
      <div
        color="primary"
        onClick={toggle}
        className="permissions"
        style={{ marginBottom: "1rem" }}
      >
        <img src={arrow} alt="" /> Permission Group
      </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <div>
              <div className="collapse-checkbox">
                {" "}
                <p>permission 11</p>{" "}
                <Checkbox status={isChecked} collapse={true} />
              </div>
              <div className="collapse-checkbox">
                {" "}
                <p>permission 12</p>{" "}
                <Checkbox status={isChecked} collapse={true} />
              </div>
              <div className="collapse-checkbox">
                {" "}
                <p>permission 13</p>{" "}
                <Checkbox status={isChecked} collapse={true} />
              </div>
              <div className="collapse-checkbox">
                {" "}
                <p>permission 14</p>{" "}
                <Checkbox status={isChecked} collapse={true} />
              </div>
              <div className="collapse-checkbox">
                {" "}
                <p>permission 15</p>{" "}
                <Checkbox status={isChecked} collapse={true} />
              </div>
            </div>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default CollapseComponent;
