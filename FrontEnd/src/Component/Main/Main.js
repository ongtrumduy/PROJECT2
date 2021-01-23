import React from "react";
import ioclient from "socket.io-client";

import AdminDashBoard from "./DashBoard/AdminDashBoard";
import UserDashBoard from "./DashBoard/UserDashBoard";
import LogPage from "./Log/LogPage";
import ChangeInfor from "../Content/ChangeInfor/ChangeInfor";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update_login: "Log",
      userid: "",
      changeinfor: ""
    };
  }

  updateMain = () => {
    switch (this.state.update_login) {
      case "Admin":
        return (
          <AdminDashBoard update_login={this.updateLog} socket={this.socket} />
        );
      case "User":
        return (
          <UserDashBoard
            update_login={this.updateLog}
            userid={this.state.userid}
            status={this.statusChangeInfor}
            socket={this.socket}
          />
        );
      default:
        return (
          <LogPage
            update_userDB={this.updateUser}
            update_adminDB={this.updateAdmin}
            socket={this.socket}
            // set_userID={this.setUserId}
          />
        );
    }
  };

  // callbackname = (_userid, _firstname) => {
  //     this.setState({
  //         userid: _userid,
  //         firstname: _firstname,
  //     })
  // }

  componentWillMount = () => {
    this.socket = ioclient("http://localhost:8081", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
  };

  statusChangeInfor = _status => {
    this.setState({
      changeinfor: _status
    });
  };

  updateLog = () => {
    this.setState({
      update_login: "Log"
    });
  };

  updateAdmin = () => {
    this.setState({
      update_login: "Admin"
    });
  };

  updateUser = () => {
    this.setState({
      update_login: "User"
    });
  };

  render() {
    return (
      // <div style={{display: "inline"}, {float: "left"}}>
      <div>
        {this.updateMain()}
        <ChangeInfor status={this.state.changeinfor} socket={this.socket} />
      </div>
    );
  }
}
