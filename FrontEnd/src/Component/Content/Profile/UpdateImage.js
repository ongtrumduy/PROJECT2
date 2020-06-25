import React from "react"
import request from "request"

export default class UpdateImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imagefile: null
    }
  }

  sentUpdateImageUser = (_data) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/updateimage",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Content-Length": "0",
        "Accept-Encoding": "gzip, deflate",
        Host: "localhost:8081",
        "Cache-Control": "no-cache",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
      },
      body: JSON.stringify({
        data: _data
      })
    }

    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      console.log(body)
    })
  }


  handleFileChange = (event) => {
    this.setState({
      imagefile: event.target.files[0]
    })
  }

  updateImageUser = () => {
    let data = new FormData()
    // data.append("name", "Duy")
    data.append("file", this.state.imagefile)
    alert(data)
    console.log(data)
    this.sentUpdateImageUser(data)
  }

  render() {
    return (
      <div>
        <form encType="multipart/form-data">
          <formgroup>
            <label htmlFor="file">Thay ảnh đại diện</label>
            <input style={{ display: "none" }} type="file" name="file" id="file" onChange={this.handleFileChange} />
          </formgroup>
          <input type="button" value="Gửi" onClick={() => this.updateImageUser()} />
        </form>
      </div>
    )
  }

}