import React from "react"
import request from "request"
import "./Notify.css"

export default class Friend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifylist: [],
            firstname: "",
            lastname: "",
            time: "",
            type: ""
        }
    }

    receiveUserNotify = (callback, _userid) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/notify",
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
            callback(receiveinfor)
        })
    }



    componentWillMount = () => {
        this.receiveUserNotify(this.receiveNotifyList, this.props.userid)
    }

    receiveNotifyList = (_notifylist) => {
        this.setState({
            notifylist: _notifylist
        })
    }

    renderNotifyList = () => {
        return (
            <div>
                <div className="notify-list-table">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            {this.state.notifylist.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="notify-infor">
                                            <div className="notify-infor-content">
                                                {this.Notify(item.senderlastname, item.senderfirstname, item.date, item.type)}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


    Notify = (_lastname, _firstname, _date, _type) => {

        if (_type === "addfriend") {
            return (
                <div>
                    {this.addFriendNotify(_lastname, _firstname, _date)}
                </div>
            )
        } else if (_type === "agreeaddfriend") {
            return (
                <div>
                    {this.agreeAddFriendNotify(_lastname, _firstname, _date)}
                </div>
            )
        } else if (_type === "becamefriend") {
            return (
                <div>
                    {this.becameFriendNotify(_lastname, _firstname, _date)}
                </div>
            )
        } else {
            return (
                <div>
                    {this.sentMessageNotify(_lastname, _firstname, _date)}
                </div>
            )
        }
    }

    addFriendNotify = (_lastname, _firstname, _date) => {
        return (
            <div className="notify-infor">
                <div className="notify-user-avatar">
                    <img alt="user" src={require("../../Image-Icon/default-avatar.png")} />
                </div>
                <div className="notify-infor-content">
                    <div className="notify-sent-message">
                        <div className="notify-user-name">{_lastname} {_firstname}</div>
                        <div>&nbsp;đã gửi lời mời kết bạn cho bạn.</div>
                    </div>
                    <div className="notify-infor-bonus">
                        <div className="notify-infor-icon"><img alt="user" src={require("../../Image-Icon/Users.png")} /></div>
                        <div className="notify-infor-time">{_date}</div>
                    </div>
                </div>
            </div>
        )
    }


    becameFriendNotify = (_lastname, _firstname, _date) => {
        return (
            <div className="notify-infor">
                <div className="notify-user-avatar">
                    <img alt="user" src={require("../../Image-Icon/default-avatar.png")} />
                </div>
                <div className="notify-infor-content">
                    <div className="notify-sent-message">
                        <div className="notify-user-name">{_lastname} {_firstname}</div>
                        <div>&nbsp;đã trở thành bạn bè với bạn.</div>
                    </div>
                    <div className="notify-infor-bonus">
                        <div className="notify-infor-icon"><img alt="user" src={require("../../Image-Icon/Star On.png")} /></div>
                        <div className="notify-infor-time">{_date}</div>
                    </div>
                </div>
            </div>
        )
    }



    agreeAddFriendNotify = (_lastname, _firstname, _date) => {
        return (
            <div className="notify-infor">
                <div className="notify-user-avatar">
                    <img alt="user" src={require("../../Image-Icon/default-avatar.png")} />
                </div>
                <div className="notify-infor-content">
                    <div className="notify-sent-message">
                        <div className="notify-user-name">{_lastname} {_firstname}</div>
                        <div>&nbsp;đã đồng ý lời mời kết bạn của bạn.</div>
                    </div>
                    <div className="notify-infor-bonus">
                        <div className="notify-infor-icon"><img alt="user" src={require("../../Image-Icon/Star Off.png")} /></div>
                        <div className="notify-infor-time">{_date}</div>
                    </div>
                </div>
            </div>
        )
    }


    sentMessageNotify = (_lastname, _firstname, _date) => {
        return (
            <div className="notify-infor">
                <div className="notify-user-avatar">
                    <img alt="user" src={require("../../Image-Icon/default-avatar.png")} />
                </div>
                <div className="notify-infor-content">
                    <div className="notify-sent-message">
                        <div className="notify-user-name">{_lastname} {_firstname}</div>
                        <div>&nbsp;đã gửi tin nhắn cho bạn.</div>
                    </div>
                    <div className="notify-infor-bonus">
                        <div className="notify-infor-icon"><img alt="user" src={require("../../Image-Icon/Comment.png")} /></div>
                        <div className="notify-infor-time">{_date}</div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div className="notify">
                <div className="notify-title">
                    <h3>THÔNG BÁO</h3>
                </div>
                <div className="notify-body">
                    {this.renderNotifyList()}
                </div>
            </div>
        )
    }
}