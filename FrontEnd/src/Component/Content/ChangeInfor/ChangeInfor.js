import React from "react"
import "./ChangeInfor.css"

export default class ChangePass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            birth: "",
            sex: "",
            hobby: ""
        }
    }

    submitChangeInfor = () => {
        alert("hello ae");
    }

    changePass = () => {
        return (
            <div className="change-information">
                <form onSubmit={this.submitChangeInfor}>
                    <div className="change-infor" >
                        <p>Họ và tên (*)</p>
                        <div className="change-infor-content">
                            <div className="change-firstname">
                                <input type="text" onChange={this.handleFirstnameChange} value={this.state.firstname} placeholder="Họ" />
                            </div>
                            <div className="change-lastname">
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
                    </div>
                    <input type="submit" value="Xác nhận" />
                </form>
            </div>
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