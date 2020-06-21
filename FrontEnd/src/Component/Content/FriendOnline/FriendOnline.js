import React from "react"
import "./FriendOnline.css"

export default class FriendOnline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendonlinelist: []
        }
    }


    componentWillMount = () => {
        // this.props.socket.emit("send-friend-online", this.props.userid)
        // this.props.socket.on("receive-friend-online", data => {
        let datareceive = this.props.friendonlinelist
        this.setState({
            friendonlinelist: datareceive
        })
    }

    componentWillReceiveProps = (nextProps) => {
        // componentDidUpdate = () => {
        if (this.props.friendonlinelist !== nextProps.friendonlinelist) {
            // this.props.socket.emit("send-friend-online", this.props.userid)
            // this.props.socket.on("receive-friend-online", data => {
            let datareceive = this.props.friendonlinelist
            // console.log(datareceive)
            this.setState({
                friendonlinelist: datareceive
            })
        }
    }


    friendOnline = () => {
        return (
            <div>
                <div className="friend-online">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            {this.state.friendonlinelist.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.friendlastname} {item.friendfirstname}</td>
                                    <td><img alt="online" src={require("../../Image-Icon/Light Bulb On.png")} /></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.friendOnline()}
            </div>
        )
    }
}