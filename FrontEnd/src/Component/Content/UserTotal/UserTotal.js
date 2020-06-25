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
      console.log(data);
      this.userFriendList(data)
    })
  }

  userFriendList = (_totaluserlist) => {
    this.setState({
      totaluserlist: _totaluserlist
    })
  }

  getUserList = (_username) => {
    return (
      <div className="total-user-infor" >
        <div className="total-user-user-avatar">
          <img alt="avatar" src={require("../../Image-Icon/default-avatar.png")} />
        </div>
        <div className="total-user-infor-content">
          <p>{_username}</p>
        </div>
      </div>
    )
  }

  destroyUserFromList = (_userid, _friendid) => {
    let userfriend = {
      userid: _userid,
      friendid: _friendid
    }
    this.props.socket.emit("destroy-user-from-list", userfriend)

    let index = this.state.totaluserlist.findIndex(item => {
      return (_friendid === item.friendid)
    })
    this.state.totaluserlist.splice(index, 1)
    this.setState({
      totaluserlist: this.state.totaluserlist
    })
  }

  renderUserTotalList = () => {
    return (
      <div>
        <div className="user-total-list-table">
          <table>
            <thead>
            </thead>
            <tbody>
              {this.state.usertotallist.map((item, index) => (
                <tr key={index}>
                  <td>
                    {this.getUserList(item.username)}
                  </td>
                  <td>
                    {item.friendgender}
                  </td>
                  <td>
                    {this.getUserList(item.friendusername)}
                  </td>
                  <td>
                    <div className="user-total-friend-select">
                      <button onClick={() => this.destroyUserFromList(this.props.userid, item.friendid)}><img alt="destroy" src={require("../../Image-Icon/Stop.png")} /></button>
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




  render() {
    return (
      <div className="user-total">
        <div className="user-total-title">
          <h3>TÀI KHOẢN</h3>
        </div>
        <div className="user-total-body">
          {this.renderUserTotalList()}
        </div>
      </div>
    )
  }
}