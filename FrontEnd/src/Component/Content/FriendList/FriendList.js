import React from "react"
import request from "request"

import UserFriendList from "./UserFriendList"
import AddUserList from "./AddUserList"
import WaitUserList from "./WaitUserList"
import "./FriendList.css"

export default class Friend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content_state: "1",
            listcolor: "1",
            friendcount: "0",
            waitcount: "0",
            addcount: "0",
        }
    }


    receiveFriendListIndex = (callback, _userid) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/friendlist",
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
            }),
        }

        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            // console.log(body)
            let receiveinfor = JSON.parse(body)
            callback(receiveinfor.friendcount, receiveinfor.waitcount, receiveinfor.addcount)
        })
    }

    updateContentState = state => {
        this.setState({ content_state: state })
        this.setState({
            listcolor: state
        })
    }

    getIndexFriendList = (_friendcount, _waitcount, _addcount) => {
        this.setState({
            friendcount: _friendcount,
            waitcount: _waitcount,
            addcount: _addcount,
        })
    }

    componentWillMount = () => {
        this.receiveFriendListIndex(this.getIndexFriendList, this.props.userid)

        this.props.socket.emit("get-index-friend-list", this.props.userid)

        this.props.socket.on("update-index-friend-list", data => {
            console.log(data)
            this.getIndexFriendList(data.friendcount, data.waitcount, data.addcount)
        })
    }


    userFriendDashBoard = () => {
        return (
            <div className="user-friend-list-dashboard">
                <div className="user-friend-list-menu">
                    <div >
                        <button
                            style={this.state.listcolor === "1" ? { backgroundColor: "lightblue" } : { backgroundColor: "white" }}
                            onClick={() => {
                                this.updateContentState("1")
                                this.props.socket.emit("get-index-friend-list", this.props.userid)
                            }}>Danh sách Bạn bè
                            <span>({this.state.friendcount})</span>
                        </button>
                    </div>
                    <div >
                        <button
                            style={this.state.listcolor === "2" ? { backgroundColor: "#f29696" } : { backgroundColor: "white" }}
                            onClick={() => {
                                this.updateContentState("2")
                                this.props.socket.emit("get-index-friend-list", this.props.userid)
                            }}>Lời mời đã gửi
                            <span>({this.state.waitcount})</span>
                        </button>
                    </div>
                    <div >
                        <button
                            style={this.state.listcolor === "3" ? { backgroundColor: "lightgreen" } : { backgroundColor: "white" }}
                            onClick={() => {
                                this.updateContentState("3")
                                this.props.socket.emit("get-index-friend-list", this.props.userid)
                            }}>Lời mời gửi tới
                            <span>({this.state.addcount})</span>
                        </button>
                    </div>
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