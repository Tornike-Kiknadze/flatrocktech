import React, { Component } from "react";
import Checkbox from "./checkbox";
import user from "../assets/user.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollapseComponent from "./collapse";

class Profile extends Component {
  state = {
    selectedUser: this.props.selectedUser,
    selectValue: this.props.selectedUser.admin ? "Admin" : "User",
    name: this.props.selectedUser.name,
    lastName: this.props.selectedUser.lastName,
  };
  componentDidMount() {
    this.props.profileActive("show");
  }

  handleSelect = (e) => {
    this.setState({ selectValue: e.target.value });
  };
  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleLastName = (e) => {
    this.setState({ lastName: e.target.value });
  };
  handleSubmit = () => {
    let newUser = {
      ...this.state.selectedUser,
      name: this.state.name,
      admin: this.state.selectValue === "Admin" ? true : false,
      lastName: this.state.lastName,
    };
    this.props.editUser(newUser);
    this.props.notify();
  };
  render() {
    let { status } = this.props.selectedUser;

    return (
      <div className={`${status ? "profile" : "profile blurry"}`}>
        <div className="user-profile">
          <div>
            <img src={user} alt="" />
            <h2>{this.props.selectedUser.name}</h2>
            <h2>{this.props.selectedUser.lastName}</h2>
            <p>{this.props.selectedUser.email}</p>
            {status && (
              <span className="userprofile-span"> Resend the invite</span>
            )}
          </div>
        </div>
        <div className="user-details">
          {" "}
          <h2>Details</h2>
          <div className="user-details__checkbox">
            <Checkbox
              status={status}
              checkHandle={() =>
                this.props.checkHandle(this.props.selectedUser)
              }
            />{" "}
            <div class="active-user">
              <p>
                {" "}
                this user is <span>{`${status ? "active" : "inactive"}`}</span>
              </p>
            </div>
          </div>
          <div className="user-details__inputs">
            <input
              onChange={this.handleName}
              type="text"
              placeholder="First Name"
              value={this.state.name}
            ></input>
            <input
              onChange={this.handleLastName}
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
            ></input>
            <select
              onChange={this.handleSelect}
              value={
                this.state
                  .selectValue /* this.props.selectedUser.admin ? "Admin" : "User" */
              }
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <span className="userprofile-span save" onClick={this.handleSubmit}>
              <span> Save Changes </span>
            </span>
          </div>
        </div>
        <div className="user-permissions">
          <div>
            <h2>Permissions</h2>
          </div>
          <CollapseComponent admin={true} />
          <CollapseComponent />
          <CollapseComponent />
          <CollapseComponent />
        </div>
        <p>{this.props.selectedUser.role}</p>
      </div>
    );
  }
}

export default Profile;
