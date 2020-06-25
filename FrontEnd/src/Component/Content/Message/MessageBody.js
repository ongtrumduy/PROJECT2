import React from "react"
import request from "request"
import "./Message.css"
import Input from "./MessageInput"
import Item from "./MessageItem"

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendid: "",
      datacurrentlist: []
    }
  }



  receiveDataMessage = (callback, _userid, _friendid) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/message",
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
        userid: _userid,
        friendid: _friendid
      }),
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      // console.log(body)
      let receiveinfor = JSON.parse(body)
      callback(receiveinfor)
    })
  }

  componentWillMount = () => {
    this.receiveDataMessage(this.receiveDataList, this.props.userid, this.props.friendid)

    this.props.socket.on("receive-message-text", data => {

      let datareceive = data

      this.setState({
        datacurrentlist: datareceive
      })
    })
  }


  componentWillReceiveProps = (nextProps) => {
    if (this.state.friendid !== nextProps.friendid) {
      this.receiveDataMessage(this.receiveDataList, this.props.userid, nextProps.friendid)

      this.props.socket.on("receive-message-text", data => {

        let datareceive = data

        this.setState({
          datacurrentlist: datareceive
        })
      })
    }
  }

  receiveDataList = (_data) => {
    this.setState({
      datacurrentlist: _data
    })
  }


  componentDidUpdate = () => {
    let firstmessage = document.getElementById("first-message")
    if (firstmessage) {
      firstmessage.scrollTo(0, firstmessage.scrollHeight)
    }
  }

  chatMessageBody = () => {
    return (
      <div>
        <div className="chat-message-body-username">
          <p>{this.props.friendlastname} {this.props.friendfirstname}</p>
        </div>
        <div className="chat-message-body-bodychat" id="first-message">
          {this.state.datacurrentlist.map((item, index) => (
            <Item userchatid={item.userid} userid={this.props.userid} text={item.text} date={item.date} />
          )
          )}
        </div>
        <div className="chat-message-body-send">
          <Input socket={this.props.socket} userid={this.props.userid} friendid={this.props.friendid} />
        </div>
      </div>
    )
  }



  render() {
    return (
      <div>
        {this.chatMessageBody()}
      </div>
    )
  }
}

