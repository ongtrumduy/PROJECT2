import React from "react";
import request from "request";
import search from "../../Image-Icon/Search.png";
import "./SearchAdmin.css";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unknowuser: "",
      friendid: ""
    };
  }

  receiveSearchUnknowProfile = (
    callback,
    callbackerror,
    _unknowuser,
    _userid
  ) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/searchuser",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Content-Length": "0",
        "Accept-Encoding": "gzip, deflate",
        Host: "localhost:8081",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: _unknowuser,
        userid: _userid
      })
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      // console.log(body)
      if (body === "0") callbackerror();
      else {
        let receiveinfor = JSON.parse(body);
        callback(receiveinfor.friendid);
      }
    });
  };

  successInforSearch = _friendid => {
    alert("Đã tìm thấy thông tin tài khoản !!!!!");
    this.setState({
      friendid: _friendid
    });
    this.props.searchadmin(_friendid);
  };

  noInforSearch = () => {
    alert("Không thể tìm thấy thông tin tài khoản !!!!!");
  };

  handleUnknowUser = event => {
    this.setState({
      unknowuser: event.target.value
    });
  };

  pressEnterSeacrh = event => {
    if (event.key === "Enter") {
      this.receiveSearchUnknowProfile(
        this.successInforSearch,
        this.noInforSearch,
        this.state.unknowuser
      );
      this.setState({
        unknowuser: ""
      });
    }
  };

  // searchUnknowUser = () => {
  //   this.receiveSearchUnknowProfile()
  // }

  render() {
    return (
      <div className="search-user">
        <div className="search-user-text">
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè..."
            onChange={this.handleUnknowUser}
            value={this.state.unknowuser}
            onKeyPress={this.pressEnterSeacrh}
          />
        </div>
        <div className="search-user-button">
          <button
            onClick={() => {
              this.receiveSearchUnknowProfile(
                this.successInforSearch,
                this.noInforSearch,
                this.state.unknowuser
              );
              this.setState({ unknowuser: "" });
            }}
          >
            <img alt="search" title="Tìm kiếm" src={search} />
          </button>
        </div>
      </div>
    );
  }
}
