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

  // positionLogin(user) {
  //   let username = user.username;
  //   let password = user.password;
  //   let index = this.UserProfile.findIndex(item => {
  //     return (username === item.username && password === item.password);
  //   })
  //   if (index >= 0) {
  //     nowIndex = index;
  //   }
  //   return index;
  // }

  // nowInforUnknow() {
  //   let randomuser = this.UserProfile[Math.floor(Math.random() * this.UserProfile.length)];
  //   return randomuser;
  // }

  // nowInforProfile() {
  //   return this.UserProfile[nowIndex];
  // }

  // searchUserProfile(user) {
  //   let username = user.username;
  //   let index = this.UserProfile.findIndex(item => {
  //     return (username === item.username);
  //   })
  //   if (index >= 0) {
  //     nowSearchIndex = index;
  //   }
  //   return index;
  // }

  // nowSearchProfile() {
  //   return this.UserProfile[nowSearchIndex];
  // }

}

let friend = new Friend();

module.exports = friend;