import React from "react";
import "./AdminSeeUserOnline.css";
import online from "../../Image-Icon/Light Bulb On.png";

export default class FriendOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useronlinelist: []
    };
  }

  componentWillMount = () => {
    this.props.socket.emit("send-admin-friend-online", this.props.userid);

    this.props.socket.on("receive-current-user-online", data => {
      let datareceive = data;
      this.setState({
        useronlinelist: datareceive
      });
    });
    this.props.socket.on("receive-update-user-online", data => {
      // alert("không dính")
      if (data === "update") {
        this.props.socket.emit("send-admin-friend-online", this.props.userid);

        this.props.socket.on("receive-current-user-online", data => {
          let datareceive = data;
          this.setState({
            useronlinelist: datareceive
          });
        });
      }
    });
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.userid === nextProps.userid) {
      this.props.socket.emit("send-admin-friend-online", this.props.userid);

      this.props.socket.on("receive-current-user-online", data => {
        let datareceive = data;
        this.setState({
          useronlinelist: datareceive
        });
      });

      this.props.socket.on("receive-update-user-online", data => {
        // alert("không dính")

        if (data === "update") {
          this.props.socket.emit("send-admin-friend-online", this.props.userid);

          this.props.socket.on("receive-current-user-online", data => {
            let datareceive = data;
            this.setState({
              useronlinelist: datareceive
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
            {this.state.useronlinelist.map((item, index) => (
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
