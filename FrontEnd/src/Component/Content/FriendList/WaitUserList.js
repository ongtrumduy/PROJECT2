import React from "react";
import "./WaitUserList.css";
import defaultavatar from "../../Image-Icon/default-avatar.png";
import destroy from "../../Image-Icon/Stop.png";

export default class WaitUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waituserlist: []
    };
  }

  componentWillMount = () => {
    this.props.socket.emit("wait-friend-list", this.props.userid);
    this.props.socket.on("receive-wait-friend-list", data => {
      // console.log(data)
      this.waitFriendList(data);
    });
  };

  waitFriendList = _waituserlist => {
    this.setState({
      waituserlist: _waituserlist
    });
  };

  getWaitUserList = (_lastname, _firstname) => {
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

  destroyWaitFriendList = (_userid, _friendid) => {
    let userfriend = {
      userid: _userid,
      friendid: _friendid
    };
    this.props.socket.emit("destroy-wait-friend-list", userfriend);
    this.props.socket.emit("get-index-friend-list", _userid);
    this.props.socket.emit("get-index-friend-list", _friendid);

    let index = this.state.waituserlist.findIndex(item => {
      return _friendid === item.friendid;
    });
    this.state.waituserlist.splice(index, 1);
    this.setState({
      waituserlist: this.state.waituserlist
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
                  {this.state.waituserlist.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {this.getWaitUserList(
                          item.friendlastname,
                          item.friendfirstname
                        )}
                      </td>
                      <td>{item.friendgender}</td>
                      <td>
                        <div className="wait-friend-select">
                          <button
                            onClick={() => {
                              this.destroyWaitFriendList(
                                this.props.userid,
                                item.friendid
                              );
                            }}
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
