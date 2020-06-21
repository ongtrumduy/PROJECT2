import fs from "fs";
import user from "./user";


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

  checkAddToRoom(user1id, user2id) {
    let index1 = this.UserFriend.findIndex(item => {
      return (item.userid === user1id && item.friendid === user2id);
    })
    let index2 = this.UserFriend.findIndex(item => {
      return (item.friendid === user1id && item.userid === user2id);
    })
    if (index1 >= 0 && index2 >= 0) {
      return true;
    } else {
      return false;
    }
  }

  getAddUserList(friendid) {
    let adduserlist = [];
    this.UserFriend.forEach(item => {
      if (item.friendid === friendid) {
        let check = this.checkAddToRoom(friendid, item.userid);
        if (check === false) {
          let adduser = {
            friendid: item.userid,
            friendfirstname: user.returnUserProfile(item.userid).firstname,
            friendlastname: user.returnUserProfile(item.userid).lastname,
            friendgender: user.returnUserProfile(item.userid).gender
          }
          adduserlist.unshift(adduser);
        }
      }
    })
    return adduserlist;
  }

  getWaitUserList(userid) {
    let waituserlist = [];
    this.UserFriend.forEach(item => {
      if (item.userid === userid) {
        let check = this.checkAddToRoom(userid, item.friendid);
        if (check === false) {
          let waituser = {
            friendid: item.friendid,
            friendfirstname: user.returnUserProfile(item.friendid).firstname,
            friendlastname: user.returnUserProfile(item.friendid).lastname,
            friendgender: user.returnUserProfile(item.friendid).gender
          }
          waituserlist.unshift(waituser);
        }
      }
    })
    return waituserlist;
  }

  getChatFriendList(userid) {
    let chatfriendlist = [];
    this.UserFriend.forEach(item => {
      if (item.userid === userid) {
        let check = this.checkAddToRoom(userid, item.friendid);
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

  getFriendIdList(userid){
    let getfriendIdList = [];
    this.UserFriend.forEach(item => {
      if (item.userid === userid) {
        let check = this.checkAddToRoom(userid, item.friendid);
        if (check === true) {
          let chatfriend = {
            friendid: item.friendid,
          }
          getfriendIdList.push(chatfriend);
        }
      }
    })
    return getfriendIdList;
  }

}

let friend = new Friend();

module.exports = friend;