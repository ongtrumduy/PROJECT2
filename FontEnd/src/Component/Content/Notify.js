import React from "react";
import "./Notify.css"

export default class Friend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    addFriendNotify = () => {
        return (
            <div>
                <div className="notify-add-friend">
                    <div className="notify-user-name">Phạm Duy</div>
                    <div>&nbsp;đã gửi lời kết bạn cho bạn</div>
                </div>
                <div className="notify-infor-bonus">
                    <div className="notify-infor-icon"><img src={require("../Image-Icon/User.png")} /></div>
                    <div className="notify-infor-time">4 giờ</div>
                </div>
            </div>

        )
    }

    likeFriendNotify = () =>{
        return (
            <div>
                <div className="notify-like-friend">
                    <div className="notify-user-name">Phạm Duy</div>
                    <div>&nbsp;đã thích bạn</div>
                </div>
                <div className="notify-infor-bonus">
                    <div className="notify-infor-icon"><img src={require("../Image-Icon/Star On.png")} /></div>
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
                    <div className="notify-infor-icon"><img src={require("../Image-Icon/Comment.png")} /></div>
                    <div className="notify-infor-time">4 giờ</div>
                </div>
            </div>
        )
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
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
                                            <img src={require("../Image-Icon/anh2.jpeg")} />
                                        </div>
                                        <div className="notify-infor-content">
                                            <div>{this.addFriendNotify()}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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