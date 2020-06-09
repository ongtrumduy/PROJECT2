import React from "react"
import request from "request"
import moment from "moment"

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nowtime: "",
      friendrequest: false,
    }
  }

  sendFriendDataRequest = (_status, _userid, _friendid) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/addfriend",
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
        status: _status,
        userid: _userid,
        friendid: _friendid
      }),
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      console.log(body)
    })
  }

  // UN
  //   this.checkRequestFriend()
  // }

  // checkRequestFriend = () => {
  //   console.log(this.props.checkrequest)
  //   if (this.props.checkrequest === 1) {
  //     this.setState({
  //       friendrequest: true
  //     })
  //   } else {
  //     this.setState({
  //       friendrequest: false
  //     })
  //   }
  // }

  statusFriendRequest = () => {
    if (this.props.checkrequest === 0) {
      return (
        <div>
          <button onClick={() => this.sendFriendRequest()} ><img src={require("../../Image-Icon/Glyph Add.png")} /></button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => this.sendDeleteRequest()} ><img src={require("../../Image-Icon/Stop.png")} /></button>
        </div>
      )
    }
  }

  sendFriendRequest = () => {
    let confirmAdd = window.confirm(`Xác nhận gửi lời mời kết bạn cho ${this.props.firstname}???`)
    if (confirmAdd) {
      alert(`Đã gửi lời mời kết bạn cho ${this.props.firstname}`)
      this.setState({
        friendrequest: true
      })
      return (
        <div>
          {this.sendFriendDataRequest(1, this.props.userid, this.props.friendid)}
        </div>
      )
    } else {
      alert("Đã hủy")
    }
  }

  sendDeleteRequest = () => {
    let deleteAdd = window.confirm(`Xác nhận hủy lời mời kết bạn cho ${this.props.firstname}???`)
    if (deleteAdd) {
      alert(`Đã hủy lời mời kết bạn đến ${this.props.firstname}`)
      this.setState({
        friendrequest: false
      })
      return (
        <div>
          {this.sendFriendDataRequest(0, this.props.userid, this.props.friendid)}
        </div>
      )
    } else {
      alert("Đã hủy")
    }
  }


  render() {
    return (
      <div>
        {this.statusFriendRequest()}
      </div>
    )
  }
}