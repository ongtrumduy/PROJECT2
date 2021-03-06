import React from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPass from "./ForgotPass";
import "./Login.css";
import "./Register.css";

export default class LogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check_sign: "login"
        }
    }

    updateLogPage = () => {
        switch (this.state.check_sign) {
            case "register": return (
                <Register
                    update_login={this.updateLogin}
                    socket={this.props.socket}
                // update_userDB={this.updateUserDashBoard}
                />)
            case "forgot": return (
                <ForgotPass
                    update_login={this.updateLogin}
                />)
            default: return (
                <Login
                    update_login={this.updateLogin}
                    update_adminDB={this.updateAdminDashBoard}
                    update_userDB={this.updateUserDashBoard}
                    update_register={this.updateRegister}
                    update_forgotpass={this.updateForgotPass}
                // set_userID={this.setUserId}
                />)
        }
    }

    // setUserId = (_userid) => {
    //     this.props.set_userID(_userid)
    //     console.log(_userid)
    // }

    updateLogin = () => {
        this.setState({
            check_sign: "login"
        })
    }

    updateRegister = () => {
        this.setState({
            check_sign: "register"
        })
    }

    updateForgotPass = () => {
        this.setState({
            check_sign: "forgot"
        })
    }

    updateAdminDashBoard = () => {
        return (
            <div>{this.props.update_adminDB()}</div>
        )
    }

    updateUserDashBoard = () => {
        return (
            <div>{this.props.update_userDB()}</div>
        )
    }

    render() {
        return (
            <div>
                {/* <h2>APP GIAO LƯU KẾT BẠN VÀ TRÒ CHUYỆN</h2> */}
                {this.updateLogPage()}
            </div>
        )
    }
}