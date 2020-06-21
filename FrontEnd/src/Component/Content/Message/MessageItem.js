import React from "react"
import "./Message.css"

export default class MessageItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className={
        (this.props.userid === this.props.userchatid) ? "message-right-user" : "message-left-friend"
      } >
        {/* <div className="message-chat-avatar">
          <img alt="user" src={require("../../Image-Icon/default-avatar.png")} />
        </div> */}
        <div className="conversation-data-text">
          <p>&nbsp;&nbsp;{this.props.text}&nbsp;&nbsp;</p>
        </div>
      </div>
    )
  }
}











// import React from 'react';

// export default class messageItem extends React.Component {
//   render() {
//     return (
//       <li className={this.props.user ? "message right appeared" : "message left appeared"}>
//         <div className="avatar"></div>
//         <div className="text_wrapper">
//           <div className="text"><b>{this.props.message.userName}</b><br></br>{this.props.message.message}</div>
//         </div>
//       </li>
//     )
//   }
// }