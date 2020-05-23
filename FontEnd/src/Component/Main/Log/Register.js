import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            firstname: "",
            lastname: "",
            usernumber: "",
            password: "",
            birth: "",
            sex: ""
        })
    }

    handleFirstnameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    handleLastnameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
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

    handleBirthChange = (event) => {
        this.setState({
            birth: event.target.value
        })
    }

    handleSexChange = (event) => {
        this.setState({
            sex: event.target.value
        })
    }

    registerForm = () => {
        return (
            <div>
                <div className="register" >
                    <p>Họ và tên (*)</p>
                    <div className="register-fullname">
                        <div className="register-firstname">
                            <input type="text" onChange={this.handleFirstnameChange} value={this.state.firstname} placeholder="Họ" />
                        </div>
                        <div className="register-lastname">
                            <input type="text" onChange={this.handleLastnameChange} value={this.state.lastname} placeholder="Tên" />
                        </div>
                    </div>
                    <p>Số điện thoại (*)</p>
                    <input type="text" onChange={this.handleUsernumberChange} value={this.state.usernumber} />
                    <p>Mật khẩu (*)</p>
                    <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
                    <p>Ngày sinh (*)</p>
                    <input type="date" onChange={this.handleBirthChange} value={this.state.birth} />
                    <p>Giới tính (*)</p>
                    <div className="sex-option-choose">
                        <select sex={this.state.sex} onChange={this.handleSexChange}>
                            <option value="">Chọn</option>
                            <option value="male">Nam</option>
                            <option value="famale">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div className="register-button">
                        <input type="button" value="Đăng kí" onClick={() => this.props.update_userDB()} />
                    </div>
                    <div className="login-return-button">
                        <input type="button" value="Trở lại Trang đăng nhập" onClick={() => this.props.update_login()} />
                    </div>
                </div>
            </div >
        )
    }


    render() {
        return (
            <div>
                {this.registerForm()}
            </div>
        )
    }
}