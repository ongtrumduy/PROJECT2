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
      // alert(`Lô ae được cmnr nè ${this.state.text}`)
      this.sendTextMessage()
    }
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  sendTextMessage = () => {
    alert(`Ngon gửi được rồi ${this.state.text}`)
  }

  render() {
    return (
      <div className="input-text">
        <div className="input-text-type">
          <input type="text" onChange={this.handleTextChange} onKeyPress={this.pressEnterChange} />
        </div>
        <div className="input-text-send">
          <input type="button" value="Gửi" onClick={() => { this.sendTextMessage() }} />
        </div>
      </div>
    )
  }
}

// import React from 'react';

// export default class App extends React.Component {

//   checkEnter(e) {
//     console.log(e)
//     if (e.keyCode === 13) {
//       this.props.sendMessage(this.refs.messageInput);
//     }
//   }
//   render() {
//     return (
//       <div className="">
//         <div className="bottom_wrapper">
//           <div className="message_input_wrapper">
//             <input ref="messageInput" type="text" className="message_input" placeholder="Type your message here" onKeyUp={this.checkEnter.bind(this)} />
//           </div>
//           <div className="send_message" onClick={() => this.props.sendMessage(this.refs.messageInput)} ref="inputMessage" >
//             <div className='icon'></div>
//             <div className='text'>Send</div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

