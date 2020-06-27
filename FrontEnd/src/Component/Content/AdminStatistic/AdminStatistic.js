import React from "react"
import "./AdminStatistic.css"

export default class Friend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalnowuser: "",
      totalregisted: "",
      totalillegaluser: ""
    }
  }

  componentWillMount = () => {
    this.props.socket.emit("get-admin-statistic", this.props.userid)
    this.props.socket.on("receive-admin-statistic", data => {
      this.setState({
        totalnowuser: data.totalnowuser,
        totalregisted: data.totalregisted,
        totalillegaluser: data.totalillegaluser
      })
    })
    this.props.socket.on("receive-update-user-online", data => {
      if (data === "update") {
        this.props.socket.emit("get-admin-statistic", this.props.userid)
        this.props.socket.on("receive-admin-statistic", data => {
          this.setState({
            totalnowuser: data.totalnowuser,
            totalregisted: data.totalregisted,
            totalillegaluser: data.totalillegaluser
          })
        })
      }
    })

  }


  renderStatisticList = () => {
    return (
      <div>
        <p>Tổng số tài khoản đã đăng kí: <span>{this.state.totalregisted}</span></p>
        <p>Tổng số người đang truy cập: <span>{this.state.totalnowuser}</span></p>
        <p>Tổng số tài khoản không hợp lệ đã xóa: <span>{this.state.totalillegaluser}</span></p>
      </div>
    )
  }




  render() {
    return (
      <div className="statistic" >
        <div className="statistic-title">
          <h3>THỐNG KÊ TRUY CẬP</h3>
        </div>
        <div className="statistic-body">
          {this.renderStatisticList()}
        </div>
      </div>
    )
  }
}