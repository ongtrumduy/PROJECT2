import React from "react"
import request from "request"

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            username: "",
            password: ""
        })
    }

    sentLoginData = (callback, callbackError, _username, _password) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/login",
            headers: {
                "cache-control": "no-cache",
                Connection: "keep-alive",
                Host: "localhost:8081",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: _username,
                password: _password
            })
        }

        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            // console.log(body)
            if (body === "0") callbackError()
            else callback(body);
        })
    }

    checkWrongPassword = () => {
        alert("Tài khoản hoặc mật khẩu của bạn không đúng!!!");
    }

    positionLogin = (position) => {
        if (position === "admin") {
            return (<div>{this.props.update_adminDB()}</div>)
        } else if (position === "user") {
            return (<div>{this.props.update_userDB()}</div>)
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    pressEnterUsername = (event) => {
        if (event.key === "Enter") {
            return (
                <div>
                    {this.sentLoginData(this.positionLogin, this.checkWrongPassword, this.state.username, this.state.password)}
                </div>
                )
        }
    }

    pressEnterPassword = (event) => {
        if (event.key === "Enter") {
            return (
                <div>
                    {this.sentLoginData(this.positionLogin, this.checkWrongPassword, this.state.username, this.state.password)}
                </div>
                )
        }
    }

    loginForm = () => {
        return (
            <div>
                <div className="login" >
                    <p>Tên đăng nhập (*)</p>
                    <input type="text" onChange={this.handleUsernameChange} value={this.state.username} onKeyPress={this.pressEnterUsername} />
                    <p>Mật khẩu (*)</p>
                    <input type="password" onChange={this.handlePasswordChange} value={this.state.password} onKeyPress={this.pressEnterPassword} />
                    <div className="login-button">
                        <input type="button" value="Đăng nhập" onClick={() => this.sentLoginData(this.positionLogin, this.checkWrongPassword, this.state.username, this.state.password)} />
                    </div>
                    <div className="forest-button">
                        <div className="forgotpass-button">
                            <input type="button" value="Quên mật khẩu?" onClick={() => this.props.update_forgotpass()} />
                        </div>
                        <div className="register-button">
                            <input type="button" value="Đăng kí" onClick={() => this.props.update_register()} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.loginForm()}
            </div>
        )
    }
}