import React from "react"
import ioclient from "socket.io-client"
import "./Notify.css"

export default class Friend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            time: "",
            type: ""
        }
    }

    addFriendNotify = () => {
        return (
            <div>
                <div className="notify-add-friend">
                    <div className="notify-user-name">{this.state.lastname} {this.state.firstname}</div>
                    <div>&nbsp;đã gửi lời kết bạn cho bạn</div>
                </div>
                <div className="notify-infor-bonus">
                    <div className="notify-infor-icon"><img alt="user" src={require("../../Image-Icon/User.png")} /></div>
                    <div className="notify-infor-time">4 giờ</div>
                </div>
            </div>

        )
    }


    sentMessageNotify = () => {
        return (
            <div>
                <div className="notify-sent-message">
                    <div className="notify-user-name">Phạm Duy</div>
                    <div>&nbsp;đã gửi tin nhắn cho bạn</div>
                </div>
                <div className="notify-infor-bonus">
                    <div className="notify-infor-icon"><img alt="user" src={require("../../Image-Icon/Comment.png")} /></div>
                    <div className="notify-infor-time">4 giờ</div>
                </div>
            </div>
        )
    }

    componentWillMount = () => {
        this.socket = ioclient("http://localhost:8081")
        this.socket.on("add-friend-notify", (data) => {
            alert(data)
            this.setState({
                firstname: data.firstname,
                lastname: data.lastname,
                time: data.time
            })
        })
    }



    Notify = () => {
        return (
            <div>
                <div className="notify-list-table">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img alt="user" src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.addFriendNotify()}</div>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.addFriendNotify()}</div>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.sentMessageNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.addFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.likeFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.sentMessageNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.addFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.sentMessageNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.likeFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.addFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.likeFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.sentMessageNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="notify-infor">
                                        <div className="notify-user-avatar">
                                            <img src={require("../../Image-Icon/default-avatar.png")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.addFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
            </div >
        )
    }

    render() {
        return (
            <div className="notify">
                <div className="notify-title">
                    <h3>THÔNG BÁO</h3>
                </div>
                <div className="notify-body">
                    {this.Notify()}
                </div>
            </div>
        )
    }
}