import React from "react"
import request from "request"
import "./ChangeInfor.css"

export default class ChangePass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            phonenumber: "",
            birth: "",
            gender: "",
            hobby: "",
            status: false
        }
    }

    setChangeInfor = (checkempty, checksame, callback, _userid, _firstname, _lastname, _phonenumber, _birth, _gender) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/changeinfor",
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
                firstname: _firstname,
                lastname: _lastname,
                phonenumber: _phonenumber,
                birth: _birth,
                gender: _gender
            })
        }

        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            // console.log(body)
            let receiveinfor = JSON.parse(body)
            callback(receiveinfor)
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            status: nextProps.status
        })
    }

    cancelChangeInfor = () => {
        this.setState({
            status: false
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

    changePass = () => {
        return (
            <div className="change-infor-backgroundColor"
                style={this.state.status ? { display: "flex" } : { display: "none" }}>

                <div className="change-information"
                    style={this.state.status ? { display: "flex" } : { display: "none" }}>

                    <form onSubmit={this.submitChangeInfor}>
                        <img onClick={() => this.cancelChangeInfor()} alt="cancel" src={require("../../Image-Icon/Button White Remove.png")} />
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
                            <p>Ngày sinh (*)</p>
                            <input type="date" onChange={this.handleBirthChange} value={this.state.birth} />
                            <p>Giới tính (*)</p>
                            <div className="sex-option-choose">
                                <select sex={this.state.gender} onChange={this.handleGenderChange}>
                                    <option value="">Chọn</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <input type="submit" value="Xác nhận" style={{ fontWeight: "bold", cursor: "pointer" }} />
                    </form>
                </div>
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