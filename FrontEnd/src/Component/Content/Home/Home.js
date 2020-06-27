import React from "react"
import AddFriend from "./AddHomeFriend"
import request from "request"
import moment from "moment"
import "./Home.css"

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            birth: "",
            gender: "",
            enjoy: "",
            statusunknowuser: ""
        }
    }

    receiveInforUnknow = (callbackerror, callback, _userid) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/home",
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
            // console.log(body)
            if (body === "0") {
                callbackerror()
            } else {
                let receiveinfor = JSON.parse(body)
                callback(receiveinfor.checkrequest, receiveinfor.user.id, receiveinfor.user.firstname, receiveinfor.user.lastname, receiveinfor.user.birth, receiveinfor.user.gender, receiveinfor.user.enjoy)
            }
        })
    }

    UNSAFE_componentWillMount = () => {
        // alert(this.props.userid)
        this.receiveInforUnknow(this.callbackerror, this.callbackinforprofile, this.props.userid);
    }

    componentWillReceiveProps = (nextProps) => {
        // alert(nextProps.userid)
        this.receiveInforUnknow(this.callbackerror, this.callbackinforprofile, nextProps.userid)
    }

    callbackerror = () => {
        this.setState({
            statusunknowuser: 0
        })
    }


    callbackinforprofile = (_checkrequest, _id, _firstname, _lastname, _birth, _gender, _enjoy) => {
        this.setState({
            statusunknowuser: 1,
            checkrequest: _checkrequest,
            friendid: _id,
            firstname: _firstname,
            lastname: _lastname,
            birth: moment(_birth).format("DD-MM-YYYY"),
            gender: _gender,
            enjoy: _enjoy
        })
    }

    userProfileIcon = () => {
        return (
            <div className="user-profile-icon">
                <AddFriend
                    firstname={this.state.firstname}
                    userid={this.props.userid}
                    friendid={this.state.friendid}
                    checkrequest={this.state.checkrequest}
                    socket={this.props.socket}
                />
            </div >
        )
    }

    unknowFriendProfile = () => {
        return (
            <div>
                <div className="unknow-friend-infor-title">
                    <p>THÔNG TIN NGƯỜI LẠ</p>
                </div>
                <div className="unknow-friend-infor-render">
                    <p> <img alt="option" src={require("../../Image-Icon/Checkbox Full.png")} /> Họ và tên: {this.state.lastname} {this.state.firstname}</p>
                    <p> <img alt="option" src={require("../../Image-Icon/Checkbox Full.png")} /> Ngày sinh: {this.state.birth}</p>
                    <p> <img alt="option" src={require("../../Image-Icon/Checkbox Full.png")} /> Giới tính: {this.state.gender}</p>
                    <p> <img alt="option" src={require("../../Image-Icon/Checkbox Full.png")} /> Sở thích: {this.state.enjoy}</p>
                </div>
            </div>
        )
    }

    unknowFriendAvatar = () => {
        return (
            <div>
                <img alt="default-avatar" src={require("../../Image-Icon/default-avatar.png")} />
            </div>
        )
    }

    PreUnknowUser = () => {
        let data = {
            userid: this.props.userid,
            friendid: this.state.friendid
        }
        this.props.socket.emit("button-pre-unknow-user", data)
        this.props.socket.on("receive-button-pre-unknow-user", data => {
            console.log(data)
            this.callbackinforprofile(data.checkrequest, data.user.id, data.user.firstname, data.user.lastname, data.user.birth, data.user.gender, data.user.enjoy)
        })

    }

    NextUnknowUser = () => {
        let data = {
            userid: this.props.userid,
            friendid: this.state.friendid
        }
        this.props.socket.emit("button-next-unknow-user", data)
        this.props.socket.on("receive-button-next-unknow-user", data => {
            console.log(data)
            this.callbackinforprofile(data.checkrequest, data.user.id, data.user.firstname, data.user.lastname, data.user.birth, data.user.gender, data.user.enjoy)
        })

    }


    unknowFriendControl = () => {
        return (
            <div className="unknow-friend-button-icon ">
                <div>
                    <button onClick={() => this.PreUnknowUser()}><img alt="pre" src={require("../../Image-Icon/Arrow Left.png")} /></button>
                </div>
                <div>{this.userProfileIcon()}</div>
                <div>
                    <button onClick={() => this.NextUnknowUser()}> <img alt="next" src={require("../../Image-Icon/Arrow Right.png")} /></button>
                </div>
            </div>
        )
    }

    renderUnknowUser = () => {
        if (this.state.statusunknowuser === 0) {
            return (
                <div>
                    HIỆN TẠI TRONG ỨNG DỤNG CHỈ CÓ BẠN VÀ ADMIN :))))
                </div>
            )
        } else {
            return (
                <div className="unknow-friend">
                    <div className="unknow-friend-profile">
                        {this.unknowFriendProfile()}
                    </div>
                    <div className="unknow-friend-control">
                        <div className="unknow-friend-avatar">
                            {this.unknowFriendAvatar()}
                        </div>
                        <div className="unknow-friend-fullname">
                            {this.state.lastname} {this.state.firstname}
                        </div>
                        <div className="unknow-friend-button">
                            {this.unknowFriendControl()}
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderUnknowUser()}
            </div>
        )
    }
}

