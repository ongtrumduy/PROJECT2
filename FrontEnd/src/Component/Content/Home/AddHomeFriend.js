import React from "react"
import request from "request"

export default class AddFriend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nowtime: "",
      checkrequest: 0,
      userid: "",
      friendid: ""
    }
  }

  sendFriendDataRequest = (_status, _userid, _friendid) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/addhomefriend",
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
      // console.log(body)
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      friendid: nextProps.friendid,
      checkrequest: nextProps.checkrequest,
      userid: nextProps.userid
    })
  }

  // componentWillMount = () => {
  //   alert("Ko ok")
  //   this.setState({
  //     checkrequest: this.props.checkrequest,
  //     userid: this.props.userid,
  //     friendid: this.props.friendid
  //   })
  // }

  // shouldComponentUpdate = (nextProps) => {
  //   if (this.state.friendid === nextProps.friendid) {
  //     alert(this.state.friendid)
  //     alert(nextProps.friendid)
  //     alert("Không thay đổi")
  //     return false
  //   } else {
  //     alert(this.state.friendid)
  //     alert(nextProps.friendid)
  //     alert("Có thay đổi")
  //     return true
  //   }
  // }

  // componentWillUpdate = () => {
  //   alert("OK")

  //   this.setState({
  //     checkrequest: this.props.checkrequest,
  //     userid: this.props.userid,
  //     friendid: this.props.friendid
  //   })
  // }

  statusFriendRequest = () => {
    if (this.state.checkrequest === 0) {
      return (
        <div>
          <button onClick={() => this.sendFriendRequest()} ><img alt="add friend" src={require("../../Image-Icon/Glyph Add.png")} /></button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => this.sendDeleteRequest()} ><img alt="stop friend" src={require("../../Image-Icon/Stop.png")} /></button>
        </div>
      )
    }
  }

  sendFriendRequest = () => {
    let confirmAdd = window.confirm(`Xác nhận gửi lời mời kết bạn cho ${this.props.firstname}???`)
    if (confirmAdd) {
      alert(`Đã gửi lời mời kết bạn cho ${this.props.firstname}`)
      this.setState({
        checkrequest: 1
      })

      this.sendFriendDataRequest(1, this.props.userid, this.props.friendid)
      let data = {
        userid: this.props.userid,
        friendid: this.props.friendid
      }

      this.props.socket.emit("sent-add-friend", data)

    } else {
      alert("Đã hủy")
    }
  }

  sendDeleteRequest = () => {
    let deleteAdd = window.confirm(`Xác nhận hủy kết bạn với ${this.props.firstname}???`)
    if (deleteAdd) {
      alert(`Đã hủy kết bạn với ${this.props.firstname}`)
      this.setState({
        checkrequest: 0
      })

      this.sendFriendDataRequest(0, this.props.userid, this.props.friendid)

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
