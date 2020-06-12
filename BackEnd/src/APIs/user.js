import fs from "fs";

let immediateUserId = "";

class User {
  constructor() {
    let profile = fs.readFileSync("../BackEnd/src/databases/userProfile.json");
    if (profile) {
      this.UserProfile = JSON.parse(profile);
    } else {
      this.UserProfile = [];
      // this.UserProfile = [];
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
    user.id = count;
    user.avatar = null;
    this.UserProfile.push(user);
    this.saveDataJSON();
  }

  checkAdmin() {
    let index = this.UserProfile.findIndex(item => {
      return (item.username === "admin");
    })
    return index;
  }

  positionLogin(user) {
    let username = user.username;
    let password = user.password;
    let index = this.UserProfile.findIndex(item => {
      return (username === item.username && password === item.password);
    })
    if (index >= 0) {
      immediateUserId = index;
    }
    return index;
  }

  returnUserProfile(userid) {
    return this.UserProfile[userid];
  }

  returnImediateUserInfor() {
    return this.UserProfile[immediateUserId];
  }

  nowInforUnknow(userid) {
    let randomuser = this.UserProfile[Math.floor(Math.random() * this.UserProfile.length)];

    if (randomuser.id === userid || randomuser.id === 0) {
      while (randomuser.id === userid || randomuser.id === 0) {
        randomuser = this.UserProfile[Math.floor(Math.random() * this.UserProfile.length)];
      }
    }
    return randomuser;
  }

  searchUserProfile(user) {
    let username = user.username;
    let index = this.UserProfile.findIndex(item => {
      return (username === item.username);
    })
    return index;
  }

}

let user = new User();

module.exports = user;