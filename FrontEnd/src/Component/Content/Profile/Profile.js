import React from "react";
import request from "request";
import moment from "moment";
import defaultavatar from "../../Image-Icon/default-avatar.png";
import list from "../../Image-Icon/Checkbox Full.png";

// import UpdateImage from "./UpdateImage"

import "./Profile.css";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content_state: false,
      firstname: "",
      lastname: "",
      birth: "",
      gender: "",
      enjoy: ""
    };
  }

  receiveInforProfile = (callback, _userid) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/profile",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Content-Length": "0",
        "Accept-Encoding": "gzip, deflate",
        Host: "localhost:8081",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: _userid
      })
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      // console.log(body)
      let receiveinfor = JSON.parse(body);
      callback(
        receiveinfor.firstname,
        receiveinfor.lastname,
        receiveinfor.birth,
        receiveinfor.gender,
        receiveinfor.enjoy
      );
    });
  };

  UNSAFE_componentWillMount = () => {
    this.receiveInforProfile(this.callbackinforprofile, this.props.userid);
    this.props.socket.on("receive-update-infor-success", data => {
      this.callbackinforprofile(
        data.firstname,
        data.lastname,
        data.birth,
        data.gender,
        data.enjoy
      );
    });
  };

  callbackinforprofile = (_firstname, _lastname, _birth, _gender, _enjoy) => {
    this.setState({
      firstname: _firstname,
      lastname: _lastname,
      birth: moment(_birth).format("DD-MM-YYYY"),
      gender: _gender,
      enjoy: _enjoy
    });
  };

  updateUserImageContentState = () => {
    this.setState({
      content_state: true
    });
  };

  updateUserInforContentState = () => {
    this.setState({
      content_state: false
    });
  };

  renderUserContent = () => {
    if (this.state.content_state === false) {
      return <div>{this.userProfileInfor()}</div>;
    } else {
      return <div>{this.userImage()}</div>;
    }
  };

  userAvartar = () => {
    return (
      <div className="user-profile-avartar">
        <img alt="avatar" src={defaultavatar} />
      </div>
    );
  };

  userFullName = () => {
    return (
      <div className="user-profile-fullname">
        <p>
          {this.state.lastname} {this.state.firstname}
        </p>
      </div>
    );
  };

  userImage = () => {
    return (
      <div className="user-profile-image">
        {/* <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div> */}
      </div>
    );
  };

  statusChangeInfor = () => {
    this.props.status(true);
    let data = this.props.userid;
    this.props.socket.emit("id-change-infor", data);
  };

  userProfileInfor = () => {
    return (
      <div>
        <div className="user-profile-infor">
          <p>
            {" "}
            <img alt="check" src={list} /> Họ và tên: {this.state.lastname}{" "}
            {this.state.firstname}
          </p>
          <p>
            {" "}
            <img alt="check" src={list} /> Ngày sinh: {this.state.birth}
          </p>
          <p>
            {" "}
            <img alt="check" src={list} /> Giới tính: {this.state.gender}
          </p>
          <p>
            {" "}
            <img alt="check" src={list} /> Sở thích: {this.state.enjoy}
          </p>
        </div>
        <div
          className="user-profile-change-infor"
          style={{ margin: "100px 0 0 0" }}
        >
          <input
            style={{ fontWeight: "bold" }}
            type="button"
            value="Thay đổi thông tin"
            onClick={() => this.statusChangeInfor()}
          />
        </div>
      </div>
    );
  };

  userProfileDashBoard = () => {
    return (
      <div className="user-profile-dashboard">
        <div className="user-profile-menu">
          <div>
            <button
              onClick={() => {
                this.updateUserInforContentState();
              }}
            >
              Thông tin
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                this.updateUserImageContentState();
              }}
            >
              Ảnh
            </button>
          </div>
        </div>
        <div className="user-profile-content">{this.renderUserContent()}</div>
      </div>
    );
  };

  render() {
    return (
      <div className="user-profile">
        <div className="user-profile-avartar-infor">
          <div>{this.userAvartar()}</div>
          <div>{this.userFullName()}</div>
          {/* <div>
                        <UpdateImage />
                    </div> */}
        </div>

        <div className="user-profile-avartar-content">
          <div>{this.userProfileDashBoard()}</div>
        </div>
      </div>
    );
  }
}
