import React from "react";
import "./ChangePass.css";

export default class ChangePass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oldpassword: "",
            newpassword: "",
            repeatpassword: ""
        }
    }

    changeSubmit = () => {
        alert("Hello ae");
    }

    changePass = () => {
        return (
            <div className="change-password">
                <form onSubmit={this.changeSubmit}>
                    <div className="change-password-body">
                        <div className="change-password-body-content">
                            <p>Mật khẩu hiện tại (*)</p>
                            <input type="password" value={this.state.oldpassword} />
                            <p>Mật khẩu mới (*)</p>
                            <input type="password" value={this.state.newpassword} />
                            <p>Xác nhận mật khẩu mới (*)</p>
                            <input type="password" value={this.state.repeatpassword} />
                        </div>
                        <div className="submit-button">
                            <input type="submit" value="Xác nhận" />
                        </div>
                    </div>
                </form>
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