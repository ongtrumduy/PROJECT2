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



  chatMessageBody = () => {
    // alert(this.state.datacurrentlist)
    // console.log(this.state.datacurrentlist)

    return (
      <div>
        <div className="chat-message-body-username">
          <p>{this.props.friendlastname} {this.props.friendfirstname}</p>
        </div>
        <div className="chat-message-body-bodychat">
          {this.state.datacurrentlist.map((item, index) => (
            <Item userchatid={item.userid} userid={this.props.userid} text={item.text} />
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

// import React from 'react';
// import $ from 'jquery';
// import Messages from './MessageList';
// import Input from './Input';
// import _map from 'lodash/map';
// import io from 'socket.io-client';

// // import './App.css';

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         //Khởi tạo state,
//         this.state = {
//             messages: [
//                 { id: 1, userId: 0, message: 'Hello' }
//             ],
//             user: null,
//         }
//         this.socket = null;
//     }
//     //Connetct với server nodejs, thông qua socket.io
//     componentWillMount() {
//         this.socket = io('localhost:6969');
//         this.socket.on('id', res => this.setState({ user: res })) // lắng nghe event có tên 'id'
//         this.socket.on('newMessage', (response) => { this.newMessage(response) }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
//     }
//     //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
//     newMessage(m) {
//         const messages = this.state.messages;
//         let ids = _map(messages, 'id');
//         let max = Math.max(...ids);
//         messages.push({
//             id: max + 1,
//             userId: m.id,
//             message: m.data
//         });

//         let objMessage = $('.messages');
//         if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
//             this.setState({ messages });
//             objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

//         } else {
//             this.setState({ messages });
//             if (m.id === this.state.user) {
//                 objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
//             }
//         }
//     }
//     //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
//     sendnewMessage(m) {
//         if (m.value) {
//             this.socket.emit("newMessage", m.value); //gửi event về server
//             m.value = "";
//         }
//     }

//     render() {
//         return (
//             <div className="app__content">
//                 <h1>chat box</h1>
//                 <div className="chat_window">
//                     <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing} />
//                     <Input sendMessage={this.sendnewMessage.bind(this)} />
//                 </div>
//             </div>
//         )
//     }
// }
