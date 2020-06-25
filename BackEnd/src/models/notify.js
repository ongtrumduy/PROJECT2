import fs from "fs";
import user from "./user";

class Notify {
  constructor() {
    let notifylist = fs.readFileSync("../BackEnd/src/databases/userNotify.json");
    if (notifylist) {
      this.UserNotify = JSON.parse(notifylist);
    } else {
      this.UserNotify = [];
    }
  }

  saveDataJSON() {
    fs.writeFileSync("../BackEnd/src/databases/userNotify.json", JSON.stringify(this.UserNotify), (err) => {
      if (err) throw err;
      console.log("Complete!!!");
    });
  }

  createNewNotify(userid) {
    let newnotify = {
      userid: userid,
      notifycontent: []
    }
    this.UserNotify.push(newnotify);
    this.saveDataJSON();
  }

  checkNotifyContent(userid) {
    let index = this.UserNotify.findIndex(item => {
      return (userid === item.userid);
    })
    return index;
  }

  addNewNotify(userid, senderid, senderfirstname, senderlastname, type) {
    let index = this.UserNotify.findIndex(item => {
      return (userid === item.userid);
    })
    let addnotifycontent = {
      senderid: senderid,
      senderfirstname: senderfirstname,
      senderlastname: senderlastname,
      type: type
    }
    this.UserNotify[index].notifycontent.unshift(addnotifycontent);
    this.saveDataJSON();
  }

  returnUserNotify(userid) {
    let index = this.UserNotify.findIndex(item => {
      return (userid === item.userid);
    })
    return this.UserNotify[index];
  }

  deleteNotify(userid, senderid, type) {
    let index = this.UserNotify.findIndex(item => {
      return (userid === item.userid);
    })
    let indexnotify = this.UserNotify[index].notifycontent.findIndex(item => {
      return (senderid === item.senderid && type === item.type);
    })
    this.UserNotify[index].notifycontent.splice(indexnotify, 1);
    this.saveDataJSON();
  }

  createBecameFriendNotify(userid, friendid) {
    let senderfirstname = user.returnUserProfile(userid).firstname;
    let senderlastname = user.returnUserProfile(userid).lastname;
    let userfirstname = user.returnUserProfile(friendid).firstname;
    let userlastname = user.returnUserProfile(friendid).lastname;
    this.addNewNotify(friendid, userid, senderfirstname, senderlastname, "agreeaddfriend");
    this.addNewNotify(friendid, userid, senderfirstname, senderlastname, "becamefriend");
    this.addNewNotify(userid, friendid, userfirstname, userlastname, "becamefriend");
  }

}

let notify = new Notify();

module.exports = notify;