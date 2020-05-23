import React from "react";
import "./Home.css";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    unknowFriendProfile = () => {
        return (
            <div>
                <div className="unknow-friend-infor-title">
                    <p>THÔNG TIN CÁ NHÂN</p>
                </div>
                <div className="unknow-friend-infor-render">
                    <p> <img src={require("../Image-Icon/Checkbox Full.png")} /> Họ và tên: Phạm Duy</p>
                    <p> <img src={require("../Image-Icon/Checkbox Full.png")} /> Ngày sinh: 31/03/1999</p>
                    <p> <img src={require("../Image-Icon/Checkbox Full.png")} /> Giới tính: Nam</p>
                    <p> <img src={require("../Image-Icon/Checkbox Full.png")} /> Sở thích: Chơi game, đọc sách,...</p>
                </div>
            </div>
        )
    }

    unknowFriendAvatar = () => {
        return (
            <div>
                <img src={require("../Image-Icon/anh2.jpeg")} />
            </div>
        )
    }

    unknowFriendControl = () => {
        return (
            <div>
                <button><img src={require("../Image-Icon/Arrow Left.png")} /></button>
                <button><img src={require("../Image-Icon/Glyph Add.png")} /></button>
                <button><img src={require("../Image-Icon/Comment Add.png")} /></button>
                <button><img src={require("../Image-Icon/Star Off.png")} /></button>
                <button><img src={require("../Image-Icon/Arrow Right.png")} /></button>
            </div>
        )
    }
    render() {
        return (
            <div className="unknow-friend">
                <div className="unknow-friend-profile">
                    {this.unknowFriendProfile()}
                </div>
                <div className="unknow-friend-control">
                    <div className="unknow-friend-avatar">
                        {this.unknowFriendAvatar()}
                    </div>
                    <div className="unknow-friend-button">
                        {this.unknowFriendControl()}
                    </div>
                </div>
            </div>
        )
    }

}