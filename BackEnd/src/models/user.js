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

  creatUserAdmin() {
    let Admin = {
      "check": "1",
      "username": "admin",
      "firstname": "admin",
      "lastname": "admin",
      "phonenumber": "0964980517",
      "password": "admin",
      "birth": "1999-03-31",
      "gender": "Nam",
      "id": 0,
      "avatar": null
    };
    let index = this.UserProfile.findIndex(item => {
      return (item.username === "admin");
    })
    if (index < 0) {
      this.UserProfile.push(Admin);
    }
    this.saveDataJSON()
  }

  checkRegisterUsername(username) {
    let index = this.UserProfile.findIndex(item => {
      return (username === item.username);
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
    // console.log("độ dài ");
    // console.log(this.UserProfile.length);
    if (this.UserProfile.length < 2) {
      return -1;
    }
    else if (this.UserProfile.length === 2) {
      let index = this.UserProfile.findIndex(item => {
        return (userid !== item.userid && item.userid !== 0);
      })
      return index;
    }
    else {
      let randomuserid = Math.floor(Math.random() * this.UserProfile.length);
      // console.log("Giá trị random:");
      // console.log(randomuserid);
      if (randomuserid === userid || randomuserid === 0) {
        while (randomuserid === userid || randomuserid === 0) {
          randomuserid = Math.floor(Math.random() * this.UserProfile.length);
          // console.log("Giá trị random:");
          // console.log(randomuserid);
        }
      }
      return randomuserid;
    }
  }

  searchUserProfile(user) {
    let username = user.username;
    let index = this.UserProfile.findIndex(item => {
      return (username === item.username);
    })
    return index;
  }

  totalUser(adminid) {
    if (adminid === 0) {
      return this.UserProfile.length;
    }
  }

  // totalUserList(adminid){
  //   if(adminid === 0){
  //     let totaluser= 
  //   }
  // }

}

let user = new User();

module.exports = user;