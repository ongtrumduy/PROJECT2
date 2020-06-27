import React from 'react'
import request from "request"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatfriendlist: [],
    }
  }

  receiveChatFriendList = (callback, _userid) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/chatfriendlist",
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
        userid: _userid
      }),
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      console.log(body)
      let receiveinfor = JSON.parse(body)
      callback(receiveinfor)
    })
  }

  componentWillMount = () => {
    this.receiveChatFriendList(this.chatFriendList, this.props.userid)
  }

  chatFriendList = (_chatfriendlist) => {
    this.setState({
      chatfriendlist: _chatfriendlist
    })
  }

  chatMessageUsersList = () => {
    return (
      <div>
        <div className="chat-messenger-list-title"
          style={{ borderStyle: "groove", background: "lightblue" }}>
          <p>Danh sách</p>
        </div>
        <div className="chat-messenger-list-body">
          <div className="messenger">
            <div className="messenger-list-table">
              <table>
                <thead>
                </thead>
                <tbody>
                  {this.state.chatfriendlist.map((item, index) => (
                    <tr key={index} onClick={() => this.renderChatContent(item.friendfirstname, item.friendlastname, item.friendid)}>
                      <td>
                        {this.contentChatFriend(item.friendlastname, item.friendfirstname)}
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            </div>
          </div >
        </div>
      </div>
    )
  }


  contentChatFriend = (_lastname, _firstname) => {
    return (
      <div >
        <div className="messenger-infor" >
          <div className="messenger-user-avatar">
            <img alt="avatar" src={require("../../Image-Icon/default-avatar.png")} />
          </div>
          <div className="messenger-infor-content">
            <p>{_lastname} {_firstname}</p>
          </div>
        </div>
      </div>
    )
  }

  renderChatContent = (_firstname, _lastname, _friendid, _check) => {
    this.props.friendfirstname(_firstname)
    this.props.friendlastname(_lastname)
    this.props.friendid(_friendid)
    this.props.checkfriend("1")
    // this.props.updatescroll("true")
  }

  render() {
    return (
      <div>
        {this.chatMessageUsersList()}
      </div>
    )
  }
}
