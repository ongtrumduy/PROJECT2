import fs from "fs";


class Room {
  constructor() {
    let roomlist = fs.readFileSync("../BackEnd/src/databases/userRoom.json");
    if (roomlist) {
      this.UserRoom = JSON.parse(roomlist);
    } else {
      this.UserRoom = [];
    }
  }

  saveDataJSON() {
    fs.writeFileSync("../BackEnd/src/databases/userRoom.json", JSON.stringify(this.UserRoom), (err) => {
      if (err) throw err;
      console.log("Complete!!!");
    });
  }

  createNewRoom(user1id, user2id) {
    let room = {
      roomid: this.UserRoom.length,
      user1id: user1id,
      user2id: user2id,
      roomname: user1id + "-" + user2id
    }
    this.UserRoom.push(room);
    this.saveDataJSON();
  }

  returnRoom(user1id, user2id) {
    let index1 = this.UserRoom.findIndex(item => {
      return (user1id === item.user1id && user2id === item.user2id)
    })
    let index2 = this.UserRoom.findIndex(item => {
      return (user2id === item.user1id && user1id === item.user2id)
    })
    if (index1 >= 0) {
      return this.UserRoom[index1];
    } else {
      return this.UserRoom[index2];
    }
  }

  checkRoomExist(user1id, user2id) {
    let index1 = this.UserRoom.findIndex(item => {
      return (user1id === item.user1id && user2id === item.user2id)
    })
    let index2 = this.UserRoom.findIndex(item => {
      return (user2id === item.user1id && user1id === item.user2id)
    })
    if (index1 >= 0 || index2 >= 0) {
      return false;
    } else {
      return true;
    }
  }

  returnRoomFriendList(userid) {
    let roomfriendlist = [];
    this.UserRoom.forEach(item => {
      if (item.user1id === userid) {
        let friendid = {
          friendid: item.user2id
        }
        roomfriendlist.push(friendid);
      } else if (item.user2id === userid) {
        let friendid = {
          friendid: item.user1id
        }
        roomfriendlist.push(friendid);
      }
    })
    return roomfriendlist;
  }


}

let room = new Room();

module.exports = room;