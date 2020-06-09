import fs from "fs";

let nowIndex = "";
let nowSearchIndex = "";


class User {
  constructor() {
    let profile = fs.readFileSync("../BackEnd/src/databases/userProfile.json");
    if (profile) {
      this.UserProfile = JSON.parse(profile);
    } else {
      this.UserProfile = [];
    }
  }

  saveDataJSON() {
    fs.writeFileSync("../BackEnd/src/databases/userProfile.json", JSON.stringify(this.UserProfile), (err) => {
      if (err) throw err;
      console.log("Complete!!!");
    });
  }

  createNewUser(user) {
    let count = this.UserProfile.length;
    count = count + 1;
    user.id = count;
    user.avatar = null;
    this.UserProfile.push(user);
    this.saveDataJSON();
  }

  positionLogin(user) {
    let username = user.username;
    let password = user.password;
    let index = this.UserProfile.findIndex(item => {
      return (username === item.username && password === item.password);
    })
    if (index >= 0) {
      nowIndex = index;
    }
    return index;
  }

  positionUserProfileId() {
    return nowIndex + 1;
  }

  nowInforUnknow() {
    let randomuser = this.UserProfile[Math.floor(Math.random() * this.UserProfile.length)];
    return randomuser;
  }

  nowInforProfile() {
    return this.UserProfile[nowIndex];
  }

  searchUserProfile(user) {
    let username = user.username;
    let index = this.UserProfile.findIndex(item => {
      return (username === item.username);
    })
    if (index >= 0) {
      nowSearchIndex = index;
    }
    return index;
  }

  searchUserProfileId() {
    return nowSearchIndex + 1;
  }

  nowSearchProfile() {
    return this.UserProfile[nowSearchIndex];
  }

}

let user = new User();

module.exports = user;