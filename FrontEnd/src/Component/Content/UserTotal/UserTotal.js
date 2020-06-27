import React from "react"
import "./UserTotal.css"

export default class UserTotal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totaluserlist: [],
    }
  }


  componentWillMount = () => {
    this.props.socket.emit("get-total-user-list", this.props.userid)
    this.props.socket.on("receive-total-user-list", (data) => {
      // console.log("Gi");
      // console.log(data);
      this.userFriendList(data)
    })

    this.props.socket.on("receive-destroy-total-user-list", data => {
      if (data === "update") {
        this.props.socket.emit("get-total-user-list", this.props.userid)
        this.props.socket.on("receive-total-user-list", (data) => {
          // console.log("go");
          // console.log(data);
          this.userFriendList(data)
        })
      }
    })
  }

  userFriendList = (_totaluserlist) => {
    this.setState({
      totaluserlist: _totaluserlist
    })
  }

  getUserList = (_username) => {
    return (
      <div className="user-total-infor" >
        <div className="user-total-avatar">
          <img alt="avatar" src={require("../../Image-Icon/default-avatar.png")} />
        </div>
        <div className="user-total-infor-content">
          <p>{_username}</p>
        </div>
      </div>
    )
  }

  destroyUserFromList = (_adminid, _userid) => {
    let confirm = window.confirm("Xác nhận khóa tài khoản của người dùng này???")
    if (confirm) {
      let adminuser = {
        adminid: _adminid,
        userid: _userid
      }
      this.props.socket.emit("destroy-user-from-list", adminuser)

      let index = this.state.totaluserlist.findIndex(item => {
        return (_userid === item.userid)
      })
      this.state.totaluserlist.splice(index, 1)
      this.setState({
        totaluserlist: this.state.totaluserlist
      })
      alert("Đã khóa tài khoản người dùng này!!!")
    } else {
      alert("Đã hủy")
    }

  }

  renderUserTotalList = () => {
    return (
      <div>
        <div className="user-total-list-table">
          <table>
            <thead>
            </thead>
            <tbody>
              {this.state.totaluserlist.map((item, index) => (
                <tr key={index}>
                  <td>
                    {this.getUserList(item.username)}
                  </td>
                  <td>
                    {this.getUserList(item.friendname)}
                  </td>
                  <td>
                    <div className="user-total-friend-select">
                      <button onClick={() => this.destroyUserFromList(this.props.userid, item.userid)}><img alt="destroy" src={require("../../Image-Icon/Stop 2.png")} /></button>
                    </div>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  headTotalUserList = () => {
    return (
      <div className="user-total-header">
        <div>Tài khoản</div>
        <div>Trò chuyện nhiều nhất</div>
        <div>Khóa</div>
      </div>
    )
  }




  render() {
    return (
      <div className="user-total">
        <div className="user-total-title">
          <h3>TỐNG SỐ TÀI KHOẢN</h3>
        </div>
        <div>
          {this.headTotalUserList()}
        </div>
        <div className="user-total-body">
          {this.renderUserTotalList()}
        </div>
      </div>
    )
  }
}