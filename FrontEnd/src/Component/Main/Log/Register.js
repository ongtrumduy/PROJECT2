import React from "react"
import request from 'request'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            username: "",
            firstname: "",
            lastname: "",
            phonenumber: "",
            password: "",
            birth: "",
            gender: ""
        })
    }

    sentRegisterData = (checkempty, checksame, callback, _username, _firstname, _lastname, _phonenumber, _password, _birth, _gender) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/register",
            headers: {
                "cache-control": "no-cache",
                Connection: "keep-alive",
                Host: "localhost:8081",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                check: "1",
                username: _username,
                firstname: _firstname,
                lastname: _lastname,
                phonenumber: _phonenumber,
                password: _password,
                birth: _birth,
                gender: _gender
            })
        }

        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            // console.log(body)
            if (body === "0") checkempty()
            else if (body === "1") checksame()
            else if (body === "2") callback()
        })
    }


    onRegisterNewUser = () => {
        this.sentRegisterData(this.checkEmpty, this.checkSame, this.successRegister, this.state.username, this.state.firstname, this.state.lastname, this.state.phonenumber, this.state.password, this.state.birth, this.state.gender)
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
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

    handlePhonenumberChange = (event) => {
        this.setState({
            phonenumber: event.target.value
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

    handleGenderChange = (event) => {
        this.setState({
            gender: event.target.value
        })
    }


    checkEmpty = () => {
        alert("Bạn không được để trống các ô!!!");
    }

    checkSame = () => {
        alert("Tên đăng nhập đã tồn tại. Vui lòng chọn một tên đăng nhập khác!!!!");
    }

    successRegister = () => {
        alert("Bạn đã đăng kí thành công!!!");
        return (
            <div>
                {this.props.update_login()}
                {this.props.socket.emit("update-user-count", "update")}
            </div>
        )
    }

    registerForm = () => {
        return (
            <div>
                <div className="register" >
                    <p>Tên đăng nhập (*)</p>
                    <input type="text" onChange={this.handleUsernameChange} value={this.state.username} />
                    <p>Họ và tên (*)</p>
                    <div className="register-fullname">
                        <div className="register-firstname">
                            <input type="text" onChange={this.handleLastnameChange} value={this.state.lastname} placeholder="Họ" />
                        </div>
                        <div className="register-lastname">
                            <input type="text" onChange={this.handleFirstnameChange} value={this.state.firstname} placeholder="Tên" />
                        </div>
                    </div>
                    <p>Số điện thoại (*)</p>
                    <input type="text" onChange={this.handlePhonenumberChange} value={this.state.usernumber} />
                    <p>Mật khẩu (*)</p>
                    <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
                    <p>Ngày sinh (*)</p>
                    <input type="date" onChange={this.handleBirthChange} value={this.state.birth} />
                    <p>Giới tính (*)</p>
                    <div className="sex-option-choose">
                        <select gender={this.state.gender} onChange={this.handleGenderChange}>
                            <option value="">Chọn</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    <div className="register-button">
                        <input type="button" value="Đăng kí" onClick={() => this.onRegisterNewUser()} />
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