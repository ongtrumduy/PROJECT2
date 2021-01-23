import React from "react";
import "./FriendOnline.css";
import online from "../../Image-Icon/Light Bulb On.png";

export default class FriendOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendonlinelist: []
    };
  }

  componentWillMount = () => {
    this.props.socket.emit("send-friend-online", this.props.userid);
    this.props.socket.on("receive-current-friend-online", data => {
      let datareceive = data;
      this.setState({
        friendonlinelist: datareceive
      });
    });
    this.props.socket.on("receive-update-friend-online", data => {
      if (data === "update") {
        this.props.socket.emit("send-friend-online", this.props.userid);

        this.props.socket.on("receive-current-friend-online", data => {
          let datareceive = data;
          this.setState({
            friendonlinelist: datareceive
          });
        });
      }
    });
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.userid === nextProps.userid) {
      this.props.socket.emit("send-friend-online", this.props.userid);

      this.props.socket.on("receive-current-friend-online", data => {
        let datareceive = data;
        this.setState({
          friendonlinelist: datareceive
        });
      });

      this.props.socket.on("receive-update-friend-online", data => {
        if (data === "update") {
          this.props.socket.emit("send-friend-online", this.props.userid);

          this.props.socket.on("receive-current-friend-online", data => {
            let datareceive = data;
            this.setState({
              friendonlinelist: datareceive
            });
          });
        }
      });
    }
  };

  friendOnline = () => {
    return (
      <div className="friend-online">
        <table>
          <thead></thead>
          <tbody>
            {this.state.friendonlinelist.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.friendlastname} {item.friendfirstname}
                </td>
                <td>
                  <img alt="online" src={online} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div>{this.friendOnline()}</div>;
  }
}
