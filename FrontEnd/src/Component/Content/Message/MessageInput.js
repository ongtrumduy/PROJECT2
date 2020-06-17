import React from 'react'

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      text: ""
    })
  }

  pressEnterChange = (event) => {
    if (event.key === "Enter") {
      this.sendTextMessage()
    }
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  sendTextMessage = () => {
    let datatext = {
      userid: this.props.userid,
      text: this.state.text
    }
    let dataconversation = {
      friendid: this.props.friendid,
      data: datatext
    }
    if (this.state.text !== "") {
      this.props.socket.emit("send-message-text", dataconversation)
    }

    this.setState({
      text: ""
    })
  }

  render() {
    return (
      <div className="input-text">
        <div className="input-text-type">
          <input type="text" onChange={this.handleTextChange} value={this.state.text} onKeyPress={this.pressEnterChange} />
        </div>
        <div className="input-text-send">
          <input type="button" value="Gửi" onClick={() => { this.sendTextMessage() }} />
        </div>
      </div>
    )
  }
}

