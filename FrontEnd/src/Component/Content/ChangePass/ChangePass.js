import React from "react"
import request from "request"
import "./ChangePass.css"

export default class ChangePass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oldpassword: "",
            newpassword: "",
            repeatpassword: ""
        }
    }


    setChangeInfor = (checkempty, checkwrong, checksame, callback, _userid, _oldpassword, _newpassword, _repeatpassword) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/changepassword",
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
                check: "1",
                userid: _userid,
                oldpassword: _oldpassword,
                newpassword: _newpassword,
                repeatpassword: _repeatpassword
            })
        }

        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            console.log(body)
            if (body === "0") checkempty()
            else if (body === "1") checkwrong()
            else if (body === "2") checksame()
            else callback()
        })
    }


    checkEmpty = () => {
        alert("Bạn không được để trống các ô!!!");
    }

    checkWrong = () => {
        alert("Mật khẩu hiện tại của bạn không chính xác!!!!");
    }


    checkSame = () => {
        alert("Mật khẩu mới và mật khẩu xác nhận không trùng nhau!!!!");
    }

    checkSuccess = () => {
        alert("Đã thay đổi mật khẩu thành công!!!!");
        this.props.update_login()
    }

    changePassSuccess = () => {
        this.setChangeInfor(this.checkEmpty, this.checkWrong, this.checkSame, this.checkSuccess, this.props.userid, this.state.oldpassword, this.state.newpassword, this.state.repeatpassword)
    }

    handleOldPassChange = (event) => {
        this.setState({
            oldpassword: event.target.value
        })
    }

    handleNewPassChange = (event) => {
        this.setState({
            newpassword: event.target.value
        })
    }

    handleRepeatPassChange = (event) => {
        this.setState({
            repeatpassword: event.target.value
        })
    }

    changePass = () => {
        return (
            <div className="change-password">
                <div className="change-password-body">
                    <div className="change-password-body-content">
                        <p>Mật khẩu hiện tại (*)</p>
                        <input type="password" onChange={this.handleOldPassChange} value={this.state.oldpassword} />
                        <p>Mật khẩu mới (*)</p>
                        <input type="password" onChange={this.handleNewPassChange} value={this.state.newpassword} />
                        <p>Xác nhận mật khẩu mới (*)</p>
                        <input type="password" onChange={this.handleRepeatPassChange} value={this.state.repeatpassword} />
                    </div>
                    <div className="submit-button">
                        <input type="button" value="Xác nhận" onClick={() => this.changePassSuccess()} />
                    </div>
                </div>
            </div >
        )
    }

    render() {
        return (
            <div>
                {this.changePass()}
            </div>
        )
    }
}