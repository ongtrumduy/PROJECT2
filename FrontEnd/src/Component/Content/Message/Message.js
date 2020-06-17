import React from "react"
import "./Message.css"
import MessagesList from './MessageList'
import MessageBody from './MessageBody'

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendfirstname: "",
            friendlastname: "",
            friendid: "",
            checkfriend: ""
        }
    }


    renderChatFriendContent = () => {
        return (
            <div className="chat-message">
                <div className="chat-users">
                    <MessagesList
                        socket={this.props.socket}
                        userid={this.props.userid}
                        friendfirstname={this.getFriendFirstName}
                        friendlastname={this.getFriendLastName}
                        friendid={this.getFriendId}
                        checkfriend={this.getCheckFriend}
                    />
                </div>
                <div className="chat-body">
                    {this.renderChatBody()}
                </div>
            </div>
        )
    }

    renderChatBody = () => {
        if (this.state.checkfriend === "1") {
            return (
                <MessageBody
                    socket={this.props.socket}
                    userid={this.props.userid}
                    friendfirstname={this.state.friendfirstname}
                    friendlastname={this.state.friendlastname}
                    friendid={this.state.friendid}
                />
            )
        } else {
            return (
                <div>
                    <p style={{ fontStyle: "italic", color: "darkgreen" }}>Vui lòng ấn vào từng cá nhân trong danh sách để xem các cuộc trò chuyện !!!!</p>
                </div>
            )
        }
    }

    getFriendFirstName = (_firstname) => {
        this.setState({
            friendfirstname: _firstname
        })
    }

    getFriendLastName = (_lastname) => {
        this.setState({
            friendlastname: _lastname
        })
    }

    getFriendId = (_friendid) => {
        this.setState({
            friendid: _friendid
        })
    }

    getCheckFriend = (_checkfriend) => {
        this.setState({
            checkfriend: _checkfriend
        })
    }


    render() {
        return (
            <div>
                {this.renderChatFriendContent()}
            </div>
        )
    }
}

