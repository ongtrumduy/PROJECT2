import fs from "fs";
import room from "../APIs/room";

class Message {
  constructor() {
    let messagelist = fs.readFileSync("../BackEnd/src/databases/userMessage.json");
    if (messagelist) {
      this.UserMessage = JSON.parse(messagelist);
    } else {
      this.UserMessage = [];
    }
  }

  saveDataJSON() {
    fs.writeFileSync("../BackEnd/src/databases/userMessage.json", JSON.stringify(this.UserMessage), (err) => {
      if (err) throw err;
      console.log("Complete!!!");
    });
  }


  createNewRoom(user1id, user2id) {
    let messageform = {
      roomid: room.returnRoom(user1id, user2id).roomid,
      roomname: room.returnRoom(user1id, user2id).roomname,
      user1id: user1id,
      user2id: user2id,
      content: []
    }
    this.UserMessage.push(messageform);
    this.saveDataJSON();
  }


  addMessageToRoom(user1id, user2id, data) {
    let index = room.returnRoom(user1id, user2id).roomid;
    this.UserMessage[index].content.push(data);
    this.saveDataJSON();
  }


  returnMessageContent(user1id, user2id) {
    let index = room.returnRoom(user1id, user2id).roomid;
    return this.UserMessage[index];
  }

}

let message = new Message();

module.exports = message;