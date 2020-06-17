import React from "react"
import AdminDashBoard from "./DashBoard/AdminDashBoard"
import UserDashBoard from "./DashBoard/UserDashBoard"
import LogPage from "./Log/LogPage"
// import ChangeInfor from "../Content/ChangeInfor/ChangeInfor"

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_login: "Log",
            userid: ""
        }
    }

    updateMain = () => {
        switch (this.state.update_login) {
            case "Admin": return (
                <AdminDashBoard
                    update_login={this.updateLog}
                />)
            case "User": return (
                <UserDashBoard
                    update_login={this.updateLog}
                    userid={this.state.userid}
                />)
            default: return (
                <LogPage
                    update_userDB={this.updateUser}
                    update_adminDB={this.updateAdmin}
                    // set_userID={this.setUserId}
                />)
        }
    }

    // callbackname = (_userid, _firstname) => {
    //     this.setState({
    //         userid: _userid,
    //         firstname: _firstname,
    //     })
    // }

    updateLog = () => {
        this.setState({
            update_login: "Log"
        })
    }

    updateAdmin = () => {
        this.setState({
            update_login: "Admin"
        })
    }

    updateUser = () => {
        this.setState({
            update_login: "User"
        })
    }

    render() {
        return (
            // <div style={{display: "inline"}, {float: "left"}}>
            <div>
                {this.updateMain()}
                {/* <ChangeInfor /> */}
            </div>
        )
    }
}