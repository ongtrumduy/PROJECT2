import React from "react"
import "./Message.css"

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    chatMessageBody = () => {
        return (
            <div>
                <div>
                    <p>Chat</p>
                </div>
            </div>
        )
    }

    chatMessageUsers = () => {
        return (
            <div>
                <p>lgsklkglskkdgs</p>
            </div>
        )
    }

    render() {
        return (
            <div className="chat-message">
                <div className="chat-users">
                    {this.chatMessageUsers()}
                </div>
                <div className="chat-body">
                    {this.chatMessageBody()}
                </div>
            </div>
        )
    }

}