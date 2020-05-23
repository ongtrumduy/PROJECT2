import React from "react";
import AdminDashBoard from "./DashBoard/AdminDashBoard";
import UserDashBoard from "./DashBoard/UserDashBoard";
import LogPage from "./Log/LogPage";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_login: "Log"
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
                />)
            default: return (
                <LogPage
                    update_userDB={this.updateUser}
                    update_adminDB={this.updateAdmin}
                />)
        }
    }

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
            <div>
                {this.updateMain()}
            </div>
        )
    }
}