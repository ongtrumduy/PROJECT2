import React from "react"
import UserFriendList from "./UserFriendList"
import AddUserList from "./AddUserList"
import WaitUserList from "./WaitUserList"
import "./FriendList.css"

export default class Friend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content_state: "1",
        }
    }

    updateContentState = state => {
        this.setState({ content_state: state })
    }


    userFriendDashBoard = () => {
        return (
            <div className="user-friend-list-dashboard">
                <div className="user-friend-list-menu">
                    <div><button onClick={() => { this.updateContentState("1") }}>Danh sách Bạn bè </button></div>
                    <div><button onClick={() => { this.updateContentState("2") }}>Lời mời đã gửi <span>(0)</span></button></div>
                    <div><button onClick={() => { this.updateContentState("3") }}>Lời mời gửi tới <span>(0)</span></button></div>
                </div>
                <div className="user-friend-list-content">
                    {this.renderFriendListContent()}
                </div>
            </div>
        )
    }

    renderFriendListContent = () => {
        if (this.state.content_state === "1") {
            return (
                <div>
                    <UserFriendList userid={this.props.userid} socket={this.props.socket} />
                </div>
            )
        } else if (this.state.content_state === "2") {
            return (
                <div>
                    <WaitUserList userid={this.props.userid} socket={this.props.socket} />
                </div>
            )
        } else {
            return (
                <div>
                    <AddUserList userid={this.props.userid} socket={this.props.socket} />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="user-friend-list">
                {this.userFriendDashBoard()}
            </div>
        )
    }
}