import React from "react"
import request from "request"
import moment from "moment"
import ChangeInfor from "../ChangeInfor/ChangeInfor"
import "./UnknowProfile.css"

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }

  render() {
    return (
      <div className="user-profile">
        <div className="user-profile-avartar-infor">
          <div>{this.userAvartar()}</div>
          <div>{this.userFullName()}</div>
          <div>{this.userProfileIcon()}</div>
        </div>

        <div className="user-profile-avartar-content">
          <div>{this.userProfileDashBoard()}</div>
        </div>
      </div>
    )
  }
}