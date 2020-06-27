import React from "react"
// import request from "request"
import "./AddUserList.css"

export default class addUserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      gender: "",
      adduserlist: []
    }
  }

  // receiveAddUserList = (callback, _userid) => {
  //   var options = {
  //     method: "POST",
  //     url: "http://localhost:8081/adduserlist",
  //     headers: {
  //       "cache-control": "no-cache",
  //       Connection: "keep-alive",
  //       "Content-Length": "0",
  //       "Accept-Encoding": "gzip, deflate",
  //       Host: "localhost:8081",
  //       "Cache-Control": "no-cache",
  //       Accept: "*/*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userid: _userid
  //     }),
  //   }

  //   request(options, (error, response, body) => {
  //     if (error) throw new Error(error)
  //     console.log(body)
  //     let receiveinfor = JSON.parse(body)
  //     callback(receiveinfor)
  //   })
  // }

  componentWillMount = () => {
    // this.receiveAddUserList(this.addUserList, this.props.userid)
    this.props.socket.emit("add-user-list", this.props.userid)
    this.props.socket.on("receive-add-user-list", (data) => {
      // let receiveinfor = JSON.parse(data)
      console.log(data);
      this.addUserList(data)
    })
  }

  // shouldComponentUpdate = (nextState) => {
  //   if (this.state.adduserlist !== nextState.adduserlist) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // componentDidUpdate = () => {
  //   this.props.socket.on("receive-add-user-list", (data) => {
  //     let receiveinfor = JSON.parse(data)
  //     console.log(data);
  //     this.addUserList(data)
  //   })
  // }

  addUserList = (_adduserlist) => {
    this.setState({
      adduserlist: _adduserlist
    })
  }

  getAddUserFriend = (_lastname, _firstname) => {
    return (
      <div className="add-friend-infor" >
        <div className="add-friend-user-avatar">
          <img alt="avatar" src={require("../../Image-Icon/default-avatar.png")} />
        </div>
        <div className="add-friend-infor-content">
          <p>{_lastname} {_firstname}</p>
        </div>
      </div>
    )
  }

  addUserAgreeList = (_userid, _friendid) => {
    let userfriend = {
      userid: _userid,
      friendid: _friendid
    }
    this.props.socket.emit("add-user-agree-list", userfriend)
    this.props.socket.emit("get-index-friend-list", _userid)
    this.props.socket.emit("get-index-friend-list", _friendid)


    let index = this.state.adduserlist.findIndex(item => {
      return (_friendid === item.friendid)
    })
    this.state.adduserlist.splice(index, 1)
    this.setState({
      adduserlist: this.state.adduserlist
    })
  }

  addUserDenyList = (_userid, _friendid) => {
    let userfriend = {
      userid: _userid,
      friendid: _friendid
    }
    this.props.socket.emit("add-user-deny-list", userfriend)
    this.props.socket.emit("get-index-friend-list", _userid)
    this.props.socket.emit("get-index-friend-list", _friendid)


    let index = this.state.adduserlist.findIndex(item => {
      return (_userid === item.friendid)
    })
    this.state.adduserlist.splice(index, 1)
    this.setState({
      adduserlist: this.state.adduserlist
    })
  }


  render() {
    return (
      <div>
        <div className="add-friend-list-body">
          <div className="add-friend-list">
            <div className="add-friend-list-table">
              <table>
                <thead>
                </thead>
                <tbody>
                  {this.state.adduserlist.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {this.getAddUserFriend(item.friendlastname, item.friendfirstname)}
                      </td>
                      <td>
                        {item.friendgender}
                      </td>
                      <td>
                        <div className="add-friend-select">
                          <button onClick={() => this.addUserAgreeList(this.props.userid, item.friendid)}><img alt="agree" src={require("../../Image-Icon/Glyph Check.png")} /></button>
                          <button onClick={() => this.addUserDenyList(item.friendid, this.props.userid)}><img alt="deny" src={require("../../Image-Icon/Glyph Remove.png")} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            </div>
          </div >
        </div>
      </div >
    )
  }
}