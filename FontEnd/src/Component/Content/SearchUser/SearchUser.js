import React from "react"
import request from "request"
import "./SearchUser.css"

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unknowuser: ""
    }
  }

  receiveSearchUnknowProfile = (callback, callbackerror, _unknowuser) => {
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: _unknowuser
      }),
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      // console.log(body)
      if (body === "0") callbackerror()
      if (body === "1") callback()
    })
  }

  successInforSearch = () => {
    alert("Đã tìm thấy thông tin tài khoản !!!!!")
    return (
      <div>
        {this.props.searchuser()}
      </div>
    )
  }


  noInforSearch = () => {
    alert("Không thể tìm thấy thông tin tài khoản !!!!!")
  }


  handleUnknowUser = (event) => {
    this.setState({
      unknowuser: event.target.value
    })
  }

  pressEnterSeacrh = (event) => {
    if (event.key === "Enter") {
      return (
        <div>
          {this.receiveSearchUnknowProfile(this.successInforSearch, this.noInforSearch, this.state.unknowuser)}
        </div>
      )
    }
  }

  // searchUnknowUser = () => {
  //   this.receiveSearchUnknowProfile()
  // }

  render() {
    return (
      <div className="search-user" >
        <div className="search-user-text">
          <input type="text" placeholder="Tìm kiếm bạn bè..." onChange={this.handleUnknowUser} value={this.state.unknowuser} onKeyPress={this.pressEnterSeacrh} />
        </div>
        <div className="search-user-button">
          <button onClick={() => this.receiveSearchUnknowProfile(this.successInforSearch, this.noInforSearch, this.state.unknowuser)}>
            <img alt="search" title="Tìm kiếm" src={require("../../Image-Icon/Search.png")} />
          </button>
        </div>
      </div >
    )
  }
}