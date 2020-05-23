import React from "react"
import "./Profile.css"

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content_state: false
        }
    }

    updateUserImageContentState = () => {
        this.setState({
            content_state: false
        })
    }

    updateUserInforContentState = () => {
        this.setState({
            content_state: true
        })
    }

    renderUserContent = () => {
        if (this.state.content_state) {
            return (
                <div>
                    {this.userProfileInfor()}
                </div>
            )
        } else {
            return (
                <div>
                    {this.userImage()}
                </div>
            )
        }
    }

    userProfileIcon = () => {
        return (
            <div className="user-profile-icon">
                <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button>
                <button><img src={require("../../Image-Icon/Comment Add.png")} /></button>
                <button><img src={require("../../Image-Icon/Star Off.png")} /></button>
            </div>
        )
    }

    userAvartar = () => {
        return (
            <div className="user-profile-avartar">
                <img src={require("../../Image-Icon/anh2.jpeg")} />
            </div>
        )
    }

    userFullName = () => {
        return (
            <div className="user-profile-fullname">
                <p>Phạm Duy</p>
            </div>
        )
    }

    userImage = () => {
        return (
            <div className="user-profile-image">
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
            </div>
        )
    }

    userProfileInfor = () => {
        return (
            <div>
                <div className="user-profile-infor">
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Họ và tên: Phạm Duy</p>
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Ngày sinh: 31/03/1999</p>
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Giới tính: Nam</p>
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Sở thích: Chơi game, đọc sách,...</p>
                </div>
                <div className="user-profile-change-infor">
                    <button>Thay đổi thông tin</button>
                </div>
            </div>
        )
    }

    userProfileDashBoard = () => {
        return (
            <div className="user-profile-dashboard">
                <div className="user-profile-menu">
                    <div><button onClick={() => { this.updateUserInforContentState() }}>Thông tin</button></div>
                    <div><button onClick={() => { this.updateUserImageContentState() }}>Ảnh</button></div>
                </div>
                <div className="user-profile-content">
                    {this.renderUserContent()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="user-profile">
                <div className="user-profile-avartar-infor">
                    <div>{this.userAvartar()}</div>
                    <div>{this.userFullName()}</div>
                    <div>{this.userProfileIcon()}</div>
                </div>
                <div className="user-profile-avartar-content">
                    <div>{this.userProfileDashBoard()}</div>
                </div>
            </div>
        )
    }
}