import fs from "fs";

let nowIndex = "";
let nowSearchIndex = "";


class Friend {
  constructor() {
    let friendlist = fs.readFileSync("../BackEnd/src/databases/userFriend.json");
    if (friendlist) {
      this.UserFriend = JSON.parse(friendlist);
    } else {
      this.UserFriend = [];
    }
  }

  saveDataJSON() {
    fs.writeFileSync("../BackEnd/src/databases/userFriend.json", JSON.stringify(this.UserFriend), (err) => {
      if (err) throw err;
      console.log("Complete!!!");
    });
  }

  createNewFriend(data) {
    let friendcontact = {
      userid: data.userid,
      friendid: data.friendid
    }
    this.UserFriend.push(friendcontact);
    this.saveDataJSON();
  }

  checkAddRequest(userid, unknowuserid) {
    let index = this.UserFriend.findIndex(item => {
      return (userid === item.userid && unknowuserid === item.friendid);
    })
    return index;
  }

  cancelAddRequest(userid, unknowuserid) {
    let index = this.checkAddRequest(userid, unknowuserid);
    this.UserFriend.splice(index, 1);
    this.saveDataJSON();
  }

}

let friend = new Friend();

module.exports = friend;