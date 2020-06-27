import fs from "fs";
import message from "./message";
import friend from "./friend";

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

  positionBanLogin(user) {
    let username = user.username;
    let password = "696969696969696969696969696969696969696969696969669696969696969696969696969696969696969696969696969696969696969696966969696969696969";
    let index = this.UserProfile.findIndex(item => {
      return (username === item.username && password === item.password);
    })
    return index;
  }

  returnCountBanAccount(adminid) {
    let count = 0;
    if (adminid === 0) {
      this.UserProfile.forEach(item => {
        if (item.password === "696969696969696969696969696969696969696969696969669696969696969696969696969696969696969696969696969696969696969696966969696969696969") {
          count++;
        }
      })
      return count;
    }
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
    if (this.UserProfile.length < 3) {
      return -1;
    }
    else if (this.UserProfile.length === 3) {
      let index = this.UserProfile.findIndex(item => {
        return (userid !== item.userid && item.userid !== 0);
      })
      return index;
    }
    else {
      let randomuserid = Math.floor(Math.random() * this.UserProfile.length);
      // console.log("Giá trị random:");
      // console.log(randomuserid);
      let checkfriend = friend.checkAddRequest(userid, randomuserid);
      if (randomuserid === userid || randomuserid === 0 || checkfriend >= 0) {
        while (randomuserid === userid || randomuserid === 0 || checkfriend >= 0) {
          randomuserid = Math.floor(Math.random() * this.UserProfile.length);
          // console.log("Giá trị random:");
          // console.log(randomuserid);
          checkfriend = friend.checkAddRequest(userid, randomuserid);
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


  totalUserList(adminid) {
    if (adminid === 0) {
      let totaluserlist = [];
      this.UserProfile.forEach(item => {
        if (item.id !== 0) {
          if (item.password !== "696969696969696969696969696969696969696969696969669696969696969696969696969696969696969696969696969696969696969696966969696969696969") {
            let index = message.returnBestContactFriend(item.id);
            if (index > 0) {
              let totaluser = {
                userid: item.id,
                username: item.username,
                usergender: item.gender,
                friendid: this.returnUserProfile(index).id,
                friendname: this.returnUserProfile(index).username,
              }
              totaluserlist.push(totaluser);
            } else {
              let totaluser = {
                userid: item.id,
                username: item.username,
                usergender: item.gender,
                friendid: -1,
                friendname: "Chưa có",
              }
              totaluserlist.push(totaluser);
            }
          }
        }
      })
      return totaluserlist;
    }
  }


  banByAdmin(adminid, userid) {
    if (adminid === 0) {
      this.UserProfile.forEach(item => {
        if (item.id === userid) {
          item.password = "696969696969696969696969696969696969696969696969669696969696969696969696969696969696969696969696969696969696969696966969696969696969";
          this.saveDataJSON();
        }
      })
    }
  }


  getAddUserList(friendid) {
    let adduserlist = [];
    let userfriendlist = friend.returnFriendList();
    userfriendlist.forEach(item => {
      if (item.friendid === friendid) {
        let check = friend.checkAddToRoom(friendid, item.userid);
        if (check === false) {
          let adduser = {
            friendid: item.userid,
            friendfirstname: this.returnUserProfile(item.userid).firstname,
            friendlastname: this.returnUserProfile(item.userid).lastname,
            friendgender: this.returnUserProfile(item.userid).gender
          }
          adduserlist.unshift(adduser);
        }
      }
    })
    return adduserlist;
  }


  getWaitUserList(userid) {
    let waituserlist = [];
    let userfriendlist = friend.returnFriendList();
    userfriendlist.forEach(item => {
      if (item.userid === userid) {
        let check = friend.checkAddToRoom(userid, item.friendid);
        if (check === false) {
          let waituser = {
            friendid: item.friendid,
            friendfirstname: this.returnUserProfile(item.friendid).firstname,
            friendlastname: this.returnUserProfile(item.friendid).lastname,
            friendgender: this.returnUserProfile(item.friendid).gender
          }
          waituserlist.unshift(waituser);
        }
      }
    })
    return waituserlist;
  }


  getChatFriendList(userid) {
    let chatfriendlist = [];
    let userfriendlist = friend.returnFriendList();
    userfriendlist.forEach(item => {
      if (item.userid === userid) {
        let check = friend.checkAddToRoom(userid, item.friendid);
        if (check === true) {
          let chatfriend = {
            friendid: item.friendid,
            friendfirstname: user.returnUserProfile(item.friendid).firstname,
            friendlastname: user.returnUserProfile(item.friendid).lastname,
            friendgender: user.returnUserProfile(item.friendid).gender
          }
          chatfriendlist.push(chatfriend);
        }
      }
    })
    return chatfriendlist;
  }


  getNextUnknownFriend(userid, friendid) {
    let nextuserid = (friendid + 1);
    let checkid = this.UserProfile.length;
    console.log(nextuserid);
    console.log(checkid);
    if (nextuserid === checkid) {
      nextuserid = 1;
    }

    let checkfriend = friend.checkAddRequest(userid, nextuserid);
    if (checkfriend >= 0 || nextuserid === userid) {
      while (checkfriend >= 0 || nextuserid === userid) {
        nextuserid = (nextuserid + 1);
        checkfriend = friend.checkAddRequest(userid, nextuserid);
      }
    }
    if (nextuserid === checkid) {
      nextuserid = 1;
      checkfriend = friend.checkAddRequest(userid, nextuserid);
      if (checkfriend >= 0 || nextuserid === userid) {
        while (checkfriend >= 0 || nextuserid === userid) {
          nextuserid = (nextuserid + 1);
          checkfriend = friend.checkAddRequest(userid, nextuserid);
        }
      }
    }
    if (nextuserid === checkid) {
      nextuserid = 0;
    }

    return this.UserProfile[nextuserid];
  }


  getPreUnknownFriend(userid, friendid) {
    let preuserid = (friendid - 1);
    if (preuserid === 0) {
      preuserid = this.UserProfile.length - 1;
      // console.log("Vào trong");
      // console.log(preuserid);
    }

    let checkfriend = friend.checkAddRequest(userid, preuserid);
    if (checkfriend >= 0 || preuserid === userid) {
      while (checkfriend >= 0 || preuserid === userid) {
        preuserid = (preuserid - 1);
        checkfriend = friend.checkAddRequest(userid, preuserid);
      }
    }
    return this.UserProfile[preuserid];
  }


  setChangeInfor(user) {
    this.UserProfile.forEach(item => {
      if (item.id === user.userid) {
        item.firstname = user.firstname,
          item.lastname = user.lastname,
          item.phonenumber = user.phonenumber,
          item.birth = user.birth,
          item.gender = user.gender
        this.saveDataJSON();
      }
    })
  }

  getPassWordUserNow(userid) {
    let nowpassword = "";
    this.UserProfile.forEach(item => {
      if (item.id === userid) {
        nowpassword = item.password;
      }
    })
    return nowpassword;
  }

  setChangePassWord(user) {
    this.UserProfile.forEach(item => {
      if (item.id === user.userid && item.password === user.oldpassword) {
        item.password = user.newpassword,
          this.saveDataJSON();
      }
    })
  }

  setChangeInfor(user) {
    this.UserProfile.forEach(item => {
      if (item.id === user.userid) {
        item.firstname = user.firstname,
          item.lastname = user.lastname,
          item.phonenumber = user.phonenumber,
          item.birth = user.birth,
          item.gender = user.gender
        this.saveDataJSON();
      }
    })
  }

}

let user = new User();

module.exports = user;