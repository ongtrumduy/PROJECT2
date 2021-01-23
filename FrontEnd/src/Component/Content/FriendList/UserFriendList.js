import React from "react";
import "./WaitUserList.css";
import defaultavatar from "../../Image-Icon/default-avatar.png";
import destroy from "../../Image-Icon/Stop.png";

export default class WaitUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userfriendlist: []
    };
  }

  componentWillMount = () => {
    this.props.socket.emit("user-friend-list", this.props.userid);
    this.props.socket.on("receive-user-friend-list", data => {
      // console.log(data);
      this.userFriendList(data);
    });
  };

  userFriendList = _userfriendlist => {
    this.setState({
      userfriendlist: _userfriendlist
    });
  };

  getUserFriendList = (_lastname, _firstname) => {
    return (
      <div className="wait-friend-infor">
        <div className="wait-friend-user-avatar">
          <img alt="avatar" src={defaultavatar} />
        </div>
        <div className="wait-friend-infor-content">
          <p>
            {_lastname} {_firstname}
          </p>
        </div>
      </div>
    );
  };

  destroyFriendFromList = (_userid, _friendid) => {
    let userfriend = {
      userid: _userid,
      friendid: _friendid
    };
    this.props.socket.emit("destroy-user-friend-list", userfriend);
    this.props.socket.emit("get-index-friend-list", _userid);
    this.props.socket.emit("get-index-friend-list", _friendid);

    let index = this.state.userfriendlist.findIndex(item => {
      return _friendid === item.friendid;
    });
    this.state.userfriendlist.splice(index, 1);
    this.setState({
      userfriendlist: this.state.userfriendlist
    });
  };

  render() {
    return (
      <div>
        <div className="wait-friend-list-body">
          <div className="wait-friend-list">
            <div className="wait-friend-list-table">
              <table>
                <thead></thead>
                <tbody>
                  {this.state.userfriendlist.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {this.getUserFriendList(
                          item.friendlastname,
                          item.friendfirstname
                        )}
                      </td>
                      <td>{item.friendgender}</td>
                      <td>
                        <div className="wait-friend-select">
                          <button
                            onClick={() =>
                              this.destroyFriendFromList(
                                this.props.userid,
                                item.friendid
                              )
                            }
                          >
                            <img alt="destroy" src={destroy} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
