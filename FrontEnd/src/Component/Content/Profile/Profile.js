import React from "react"
import request from "request"
import moment from "moment"
import ChangeInfor from "../ChangeInfor/ChangeInfor"
import "./Profile.css"

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content_state: false,
            changeinfor: false,
            firstname: "",
            lastname: "",
            birth: "",
            gender: "",
            enjoy: ""
        }
    }


    receiveInforProfile = (callback) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/profile",
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
                checkLogout: "1"
            }),
        }

        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            // console.log(body)
            let receiveinfor = JSON.parse(body)
            callback(receiveinfor.firstname, receiveinfor.lastname, receiveinfor.birth, receiveinfor.gender, receiveinfor.enjoy)
        })
    }

    UNSAFE_componentWillMount = () => {
        this.receiveInforProfile(this.callbackinforprofile);
    }

    callbackinforprofile = (_firstname, _lastname, _birth, _gender, _enjoy) => {
        this.setState({
            firstname: _firstname,
            lastname: _lastname,
            birth: moment(_birth).format("DD-MM-YYYY"),
            gender: _gender,
            enjoy: _enjoy
        })
    }

    updateUserImageContentState = () => {
        this.setState({
            content_state: true
        })
    }

    updateUserInforContentState = () => {
        this.setState({
            content_state: false
        })
    }

    renderUserContent = () => {
        if (this.state.content_state === false) {
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

    userAvartar = () => {
        return (
            <div className="user-profile-avartar">
                <img src={require("../../Image-Icon/default-avatar.png")} />
            </div>
        )
    }

    userFullName = () => {
        return (
            <div className="user-profile-fullname">
                <p>{this.state.lastname} {this.state.firstname}</p>
            </div>
        )
    }

    userImage = () => {
        return (
            <div className="user-profile-image">
                {/* <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
                <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div> */}
            </div>
        )
    }

    changeInfor = () => {
        // if (this.state.changeinfor) {
        return (
            <div>
                <ChangeInfor />
            </div>
        )
    }



    userProfileInfor = () => {
        return (
            <div>
                <div className="user-profile-infor">
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Họ và tên: {this.state.lastname} {this.state.firstname}</p>
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Ngày sinh: {this.state.birth}</p>
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Giới tính: {this.state.gender}</p>
                    <p> <img src={require("../../Image-Icon/Checkbox Full.png")} /> Sở thích: {this.state.enjoy}</p>
                </div>
                <div className="user-profile-change-infor" style={{ margin: "100px 0 0 0" }}>
                    <input style={{ fontWeight: "bold" }} type="button" value="Thay đổi thông tin" onClick={() => this.changeInfor()} />
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
                </div>

                <div className="user-profile-avartar-content">
                    <div>{this.userProfileDashBoard()}</div>
                </div>
                {/* <ChangeInfor /> */}
            </div>
        )
    }
}