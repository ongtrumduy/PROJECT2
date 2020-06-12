import React from "react"
import request from "request"
import ioclient from "socket.io-client"

import Home from "../../Content/Home/Home"
import Friend from "../../Content/FriendList/FriendList"
import Message from "../../Content/Message/Message"
import Notify from "../../Content/Notify/Notify"
import ChangePass from "../../Content/ChangePass/ChangePass"
import Profile from "../../Content/Profile/Profile"
import FriendOnline from "../../Content/FriendOnline/FriendOnline"
import UnknowProfile from "../../Content/UnknowProfile/UnknowProfile"
import SearchUser from "../../Content/SearchUser/SearchUser"

import "./UserDashBoard.css"


export default class UserDashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content_state: 0,
      userid: "",
      friendid: "",
      firstname: "",
      searchuser: ""
    }
  }

  receiveFisrtName = (callback, _userid) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/userdashboard",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Content-Length": "0",
        "Accept-Encoding": "gzip, deflate",
        Host: "localhost:8081",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        check: "1",
        userid: _userid
      }),
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      console.log(body)
      let receiveinfor = JSON.parse(body)
      callback(receiveinfor.id, receiveinfor.firstname)
    })
  }

  componentWillMount = () => {
    console.log(this.props.userid)
    this.receiveFisrtName(this.callbackname, this.props.userid)
  }


  callbackname = (_userid, _firstname) => {
    this.setState({
      userid: _userid,
      firstname: _firstname,
    })
    this.socket = ioclient("http://localhost:8081")
    this.socket.emit("sent-user-id", _userid)
  }


  updateContentState = state => {
    this.setState({ content_state: state })
  }

  renderContent = () => {
    switch (this.state.content_state) {
      case 1: return (<Profile userid={this.state.userid} />)
      case 2: return (<Friend userid={this.state.userid} />)
      case 3: return (<Message userid={this.state.userid} />)
      case 4: return (<Notify userid={this.state.userid} />)
      case 5: return (<ChangePass userid={this.state.userid} />)
      case 6: return (<UnknowProfile userid={this.state.userid} friendid={this.state.friendid} />)
      default: return (<Home userid={this.state.userid} />)
    }
  }

  searchSuccessUser = (_friendid) => {
    if (this.state.userid === _friendid) {
      this.setState({
        content_state: 1,
      })
    } else {
      this.setState({
        content_state: 6,
        friendid: _friendid
      })
    }
  }

  logoutUser = () => {
    this.socket.emit("disconnect-logout", this.state.firstname + " đã đăng xuất")
    this.props.update_login()
  }

  userDashBoard = () => {
    return (
      <div>
        <div className="user-container">

          <div className="user-content">

            <div className="user-menu">

              <div className="user-menu-logo">
                <div className="user-menu-logo-heart-1">
                  <img alt="love" src={require("../../Image-Icon/Love.png")} />
                </div>
                <div className="user-menu-logo-heart-2">
                  <img alt="love" src={require("../../Image-Icon/Love.png")} />
                </div>
              </div>

              <div className="user-menu-search">
                <SearchUser searchuser={this.searchSuccessUser} userid={this.state.userid} />
              </div>

              <div className="user-menu-firstname">
                <button onClick={() => { this.updateContentState(1) }}>{this.state.firstname}</button>
              </div>

              <div className="user-menu-home">
                <button onClick={() => { this.updateContentState(0) }}>TRANG CHỦ</button>
              </div>

              <div className="user-menu-friend">
                <button onClick={() => { this.updateContentState(2) }}>
                  <img alt="users" title="Bạn bè" src={require("../../Image-Icon/Users.png")} />
                </button>
              </div>

              <div className="user-menu-message">
                <button onClick={() => { this.updateContentState(3) }}>
                  <img alt="message" title="Tin nhắn" src={require("../../Image-Icon/IM.png")} />
                </button>
              </div>

              <div className="user-menu-notify">
                <button onClick={() => { this.updateContentState(4) }}>
                  <img alt="notify" title="Thông báo" src={require("../../Image-Icon/Globe Active.png")} />
                </button>
              </div>

              <div className="user-menu-changepassword">
                <button onClick={() => { this.updateContentState(5) }}>
                  <img alt="changepassword" title="Thay Mật khẩu" src={require("../../Image-Icon/Lock Closed.png")} />
                </button>
              </div>

              <div className="user-menu-logout" >
                <button onClick={() => this.logoutUser()} >
                  <img alt="love" title="Đăng xuất" src={require("../../Image-Icon/Cog.png")} />
                </button>
              </div>

            </div>

          </div>

          <div className="user-body">

            <div className="user-body-render">
              {this.renderContent()}
            </div>

            <div className="user-body-online">

              <div className="user-body-online-title">
                <div className="user-body-online-title-icon">
                </div>
                <div className="user-body-online-title-online">
                  <p>Online</p>
                </div>
              </div>

              <div className="user-body-online-render">
                <FriendOnline />
              </div>

            </div>
          </div>

          <div className="user-footer">
            <p>App kết nối trò chuyện và hẹn hò Sinh viên ver 1.0</p>
            <p>Design by Project 2 - <a href="https://www.facebook.com/thoiloanhhung">Phạm Duy</a> - Đại học Bách khoa Hà Nội</p>
            <p>Hanoi University of Science and Technology - No. 1, Dai Co Viet Str., Hanoi, Vietnam</p>
          </div>

        </div>
      </div >
    )
  }

  render() {
    return (
      <div>
        {this.userDashBoard()}
      </div>
    )
  }
}
