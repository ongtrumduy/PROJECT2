import React from "react"
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
            enjoy: ""
        }
    }

    receiveInforUnknow = (callback) => {
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
        this.receiveInforUnknow(this.callbackinfor);
    }

    callbackinfor = (_firstname, _lastname, _birth, _gender, _enjoy) => {
        this.setState({
            firstname: _firstname,
            lastname: _lastname,
            birth: moment(_birth).format("DD-MM-YYYY"),
            gender: _gender,
            enjoy: _enjoy
        })
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

    unknowFriendControl = () => {
        return (
            <div>
                <button><img alt="prex" src={require("../../Image-Icon/Arrow Left.png")} /></button>
                <button><img alt="add" src={require("../../Image-Icon/Glyph Add.png")} /></button>
                <button><img alt="next" src={require("../../Image-Icon/Arrow Right.png")} /></button>
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