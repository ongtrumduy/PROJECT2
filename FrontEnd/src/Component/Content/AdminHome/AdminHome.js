import React from "react"
import "./AdminHome.css"

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="admin-home">
        <p>Chào mừng bạn đến với trang giao diện Admin</p>
        <p>Tại đây bạn có thể xem:</p>
        <li>Tài khoản người dùng</li>
        <li>Thống kê truy cập</li>
        <li>Báo cáo người dùng</li>
      </div>
    )
  }

}