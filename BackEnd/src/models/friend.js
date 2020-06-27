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
      return (item.userid === userid && item.friendid === unknowuserid);
    })
    return index;
  }

  cancelAddRequest(userid, unknowuserid) {
    let index1 = this.checkAddRequest(userid, unknowuserid);
    let index2 = this.checkAddRequest(unknowuserid, userid);
    this.UserFriend.splice(index1, 1);
    this.UserFriend.splice(index2, 1);
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

  returnFriendList(){
    return this.UserFriend;
  }

  getFriendIdList(userid) {
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