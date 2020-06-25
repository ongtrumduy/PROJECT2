import React from "react"
import request from "request"
import moment from "moment"
import "./UnknowUserProfile.css"


export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content_state: false,
      changeinfor: false,
      checkrequest: "",
      friendid: "",
      firstname: "",
      lastname: "",
      birth: "",
      gender: "",
      enjoy: ""
    }
  }


  receiveInforProfile = (callback, _userid, _friendid) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/unknowprofile",
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
        userid: _userid,
        friendid: _friendid
      }),
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      // console.log(body)
      let receiveinfor = JSON.parse(body)
      // console.log(receiveinfor.checkrequest)
      callback(receiveinfor.checkrequest, receiveinfor.user.id, receiveinfor.user.firstname, receiveinfor.user.lastname, receiveinfor.user.birth, receiveinfor.user.gender, receiveinfor.user.enjoy)
    })
  }


  componentWillMount = () => {
    // this.state.friendid = this.props.friendid
    this.receiveInforProfile(this.callbackinforprofile, this.props.userid, this.props.friendid)
    // alert(`Chưa Thay doi ${this.state.friendid}`)
  }

  // componentWillUnmount = () => {
  //   alert(`Thay doi ${this.state.friendid}`)
  //   // alert(`nextProps Thay doi ${nextProps.friendid}`)
  //   // this.setState({
  //   // })
  // }

  componentWillReceiveProps = (nextProps) => {
    // alert(nextProps.friendid)
    this.setState({
      friendid: nextProps.friendid
    })
    // alert(this.state.friendid)
    this.receiveInforProfile(this.callbackinforprofile, this.props.userid, nextProps.friendid)
  }

  // shouldComponentUpdate = nextProps => {
  //   // alert(`Nên Thay doi ${this.state.friendid}`)
  //   // alert(`Nên nextProps Thay doi ${nextProps.friendid}`)
  //   if (this.state.friendid !== nextProps.friendid) {
  //     return true
  //   } else {
  //     return false
  //   }


  // }

  // UNSAFE_componentWillUpdate = () => {
  //   // alert(`Đã Thay doi ${this.state.friendid}`)
  //   // alert(`Đã nextProps Thay doi ${nextProps.friendid}`)
  //   this.receiveInforProfile(this.callbackinforprofile)
  // }

  // componentDidUpdate = () => {
  //   alert(`Đã Thay doi ${this.state.friendid}`)
  //   this.setState({
  //     friendid: this.props.friendid
  //   })
  // }

  // componentDidMount = () => {
  //   this.setState({
  //     friendid: this.props.friendid
  //   })
  // }

  callbackinforprofile = (_checkrequest, _id, _firstname, _lastname, _birth, _gender, _enjoy) => {
    this.setState({
      checkrequest: _checkrequest,
      friendid: _id,
      firstname: _firstname,
      lastname: _lastname,
      birth: moment(_birth).format("DD-MM-YYYY"),
      gender: _gender,
      enjoy: _enjoy
    })
  }

  updateUserImageContentState = () => {
    this.setState({
      content_state: true
    })
  }

  updateUserInforContentState = () => {
    this.setState({
      content_state: false
    })
  }

  renderUserContent = () => {
    if (this.state.content_state === false) {
      return (
        <div>
          {this.userProfileInfor()}
        </div>
      )
    } else {
      return (
        <div>
          {this.userImage()}
        </div>
      )
    }
  }



  userAvartar = () => {
    return (
      <div className="user-profile-avartar">
        <img alt="avartar" src={require("../../Image-Icon/default-avatar.png")} />
      </div>
    )
  }

  userFullName = () => {
    return (
      <div className="user-profile-fullname">
        <p>{this.state.lastname} {this.state.firstname}</p>
      </div>
    )
  }

  userImage = () => {
    return (
      <div className="user-profile-image">
        {/* <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
        <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
        <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
        <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
        <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
        <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
        <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div>
        <div> <button><img src={require("../../Image-Icon/Glyph Add.png")} /></button></div> */}
      </div>
    )
  }



  userProfileInfor = () => {
    return (
      <div>
        <div className="user-profile-infor">
          <p> <img alt="check" src={require("../../Image-Icon/Checkbox Full.png")} /> Họ và tên: {this.state.lastname} {this.state.firstname}</p>
          <p> <img alt="check" src={require("../../Image-Icon/Checkbox Full.png")} /> Ngày sinh: {this.state.birth}</p>
          <p> <img alt="check" src={require("../../Image-Icon/Checkbox Full.png")} /> Giới tính: {this.state.gender}</p>
          <p> <img alt="check" src={require("../../Image-Icon/Checkbox Full.png")} /> Sở thích: {this.state.enjoy}</p>
        </div>
      </div>
    )
  }

  userProfileDashBoard = () => {
    return (
      <div className="user-profile-dashboard">
        <div className="user-profile-menu">
          <div><button onClick={() => { this.updateUserInforContentState() }}>Thông tin</button></div>
          <div><button onClick={() => { this.updateUserImageContentState() }}>Ảnh</button></div>
        </div>
        <div className="user-profile-content">
          {this.renderUserContent()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="user-profile">
        <div className="user-profile-avartar-infor">
          <div>{this.userAvartar()}</div>
          <div>{this.userFullName()}</div>
        </div>

        <div className="user-profile-avartar-content">
          <div>{this.userProfileDashBoard()}</div>
        </div>
      </div>
    )
  }

}