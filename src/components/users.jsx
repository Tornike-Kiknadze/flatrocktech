import React, { Component } from "react";
import { getUsers } from "../data/users";
import Checkbox from "./checkbox";
import { NavLink } from "react-router-dom";
import { SvgCog, SvgBin } from "../assets/svg";
import Pagination from "./pagination";
import paginate from "../functions/paginate";
import DeleteModal from "./deleteModal";
import down from "../assets/down.png";

class User extends Component {
  state = {
    modalOpen: false,
    user: "",
    sortFieldName: "",
  };
  componentDidMount() {
    this.props.setProfileActive("hide");
  }
  handleModal = (user) => {
    this.setState({ user });
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  handleModalOpen = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  setSortField = (value) => {
    this.setState({ sortFieldName: value });
  };
  sortByField = (data) => {
    if (this.state.sortFieldName) {
      return data.sort((a, b) => {
        var textA =
          typeof a[this.state.sortFieldName] === "string"
            ? a[this.state.sortFieldName].toUpperCase()
            : a[this.state.sortFieldName];
        var textB =
          b[this.state.sortFieldName] === "string"
            ? b[this.state.sortFieldName].toUpperCase()
            : b[this.state.sortFieldName];
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }

    return data;
  };

  render() {
    let users = paginate(
      this.props.users,
      this.props.currentPage,
      this.props.pageSize
    ); //create paginated component with lodash
    let filteredList = users;
    if (this.props.searchQuery.length >= 1) {
      filteredList = this.props.users.filter(
        (user) =>
          user.name
            .toLowerCase()
            .indexOf(this.props.searchQuery.toLowerCase()) !== -1
      ); // create filtered list based on search query to map it in <tbody>
    }

    return (
      <React.Fragment>
        <DeleteModal
          currentUser={this.state.user}
          toggle={this.handleModalOpen}
          isOpen={this.state.modalOpen}
          deleteUser={this.props.deleteUser}
        />
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.setSortField("name")}>
                <p>
                  {" "}
                  <img src={down} alt="" />
                  USER
                </p>{" "}
              </th>
              <th onClick={() => this.setSortField("admin")}>
                <p>
                  {" "}
                  <img src={down} alt="" />
                  ROLE
                </p>{" "}
              </th>
              <th onClick={() => this.setSortField("status")}>
                <p>
                  {" "}
                  <img src={down} alt="" />
                  STATUS
                </p>{" "}
              </th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {this.sortByField(filteredList).map((user) => (
              <tr className={`${!user.status && "blurry"}  `}>
                <td onClick={() => this.props.selectUser(user)}>
                  {user.status ? (
                    <div>
                      <NavLink to="/contact">
                        {user.name} {user.lastName}
                      </NavLink>
                      <p className="user-email">{user.email}</p>
                    </div>
                  ) : (
                    <p>
                      {user.name} {user.lastName}{" "}
                      <p className="user-email">{user.email}</p>
                    </p>
                  )}
                </td>
                <td> {user.admin ? <p>Admin</p> : <p>User</p>}</td>
                <td>
                  <Checkbox
                    checkHandle={() => this.props.handleCheckbox(user)}
                    status={user.status}
                    {...user}
                  />
                </td>
                <td className="actions-buttons">
                  <div className="actions-buttons__div cog">{SvgCog()}</div>
                  <div
                    className="actions-buttons__div"
                    onClick={() =>
                      this.handleModal(/* props.deleteUser */ user)
                    }
                  >
                    {SvgBin()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          items={this.props.users.length}
          pageSize={this.props.pageSize}
          changePage={this.props.handlePageChange}
          currentPage={this.props.currentPage}
          handlePageSize={this.props.handlePageSize}
        />
      </React.Fragment>
    );
  }
}

export default User;
