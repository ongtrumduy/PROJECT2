import React from "react"
import "./FriendOnline.css"

export default class FriendOnline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

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
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
                            <tr>
                                <td>Phạm Duy</td>
                                <td><img src={require("../Image-Icon/Light Bulb On.png")} /></td>
                            </tr>
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