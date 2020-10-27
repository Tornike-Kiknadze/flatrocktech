import React, { Component } from "react";
import "./App.css";
import { getUsers } from "./data/users";
import Users from "./components/users";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Profile from "./components/profile";
import ModalContent from "./components/modal";
import { SvgCog } from "./assets/svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

class App extends Component {
  state = {
    users: getUsers(),
    selectUser: null,
    search: "",
    pageSize: 4,
    currentPage: 1,
    modalOpen: false,
    profileActive: null,
    showToast: false,
  };

  handleCheckbox = (user) => {
    console.log(user);
    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index] = { ...users[index] };
    users[index].status = !users[index].status;
    this.setState({
      users,
    });
    this.setState({ selectUser: users[index] });
  };
  openModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  setProfileActive = (value) => {
    this.setState({
      profileActive: value,
    });
  };

  setNewUser = (user) => {
    this.setState({ users: [...this.state.users, user] });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  deleteUser = (user) => {
    const users = this.state.users.filter((item) => item.id !== user.id);
    this.setState({ users });
  };

  handlePageSize = (event) => {
    this.setState({ pageSize: event.target.value });
  };
  editUser = (editedUser) => {
    const users = [...this.state.users];
    const user = users.find((item) => item.id === editedUser.id);
    const index = users.indexOf(user);
    users[index] = { ...users[index] };
    users[index].name = editedUser.name;
    users[index].lastName = editedUser.lastName;
    users[index].admin = editedUser.admin;
    this.setState({
      users,
    });
  };
  searchQuery = (event) => {
    this.setState({ search: event.target.value.substr(0, 20) });
  };

  selectUser = (user) => {
    this.setState({ selectUser: user });
  };

  notify = () => {
    toast.success("User has been edited...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  render() {
    return (
      <div className="App">
        {" "}
        <ToastContainer />
        <ModalContent
          setNewUser={this.setNewUser}
          toggle={this.openModal}
          isOpen={this.state.modalOpen}
        />
        <Router>
          <div className="search-nav">
            {this.state.profileActive === "hide" ? (
              <span className="search-nav__add" onClick={this.openModal}>
                +
              </span>
            ) : (
              <span className="search-nav__settings">{SvgCog()}</span>
            )}

            {this.state.profileActive === "show" ? (
              <h2>User Setup</h2>
            ) : (
              <h2>
                {" "}
                <Link to="/">Project Access</Link>{" "}
              </h2>
            )}
            {this.state.profileActive === "show" ? null : (
              <input
                type="text"
                placeholder="type to filter the table"
                value={this.state.search}
                onChange={this.searchQuery}
              />
            )}
          </div>
          <div className="container-wrapper">
            <main className="container  ">
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <Users
                      selectUser={this.selectUser}
                      setProfileActive={this.setProfileActive}
                      users={this.state.users}
                      pageSize={this.state.pageSize}
                      handleCheckbox={this.handleCheckbox}
                      handlePageChange={this.handlePageChange}
                      handlePageSize={this.handlePageSize}
                      searchQuery={this.state.search}
                      currentPage={this.state.currentPage}
                      deleteUser={this.deleteUser}
                    />
                  )}
                />
                <Route
                  exact
                  path="/:something"
                  render={(props) => (
                    <Profile
                      notify={this.notify}
                      editUser={this.editUser}
                      selectedUser={this.state.selectUser}
                      {...props}
                      checkHandle={this.handleCheckbox}
                      profileActive={this.setProfileActive}
                    />
                  )}
                />
              </Switch>
            </main>
          </div>{" "}
        </Router>
      </div>
    );
  }
}

export default App;
