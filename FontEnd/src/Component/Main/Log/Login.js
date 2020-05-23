import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            usernumber: "",
            password: ""
        })
    }

    positionLogin = (position) => {
        if (position === "admin") {
            return (<div>{this.props.update_adminDB()}</div>)
        } else if (position === "user") {
            return (<div>{this.props.update_userDB()}</div>)
        }
    }

    handleUsernumberChange = (event) => {
        this.setState({
            usernumber: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    loginForm = () => {
        return (
            <div>
                <div className="login" >
                    <p>Số điện thoại (*)</p>
                    <input type="text" onChange={this.handleUsernumberChange} value={this.state.usernumber} />
                    <p>Mật khẩu (*)</p>
                    <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
                    <div className="login-button">
                        <input type="button" value="Đăng nhập" onClick={() => this.positionLogin("user")} />
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