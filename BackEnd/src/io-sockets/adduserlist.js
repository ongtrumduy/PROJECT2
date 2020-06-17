import { GetSocketId, EmitSocket, RemoveSocket } from "./beginsockets";
import { user, friend, message, room, notify } from "../APIs/allAPIs";


let AddUserList = io => {

  //======================================Begin=======================================================
  //====================================================================================================
  let usersocket = {};
  let nowuserid = 0;
  let logoutuserid = 0;
  io.on("connection", (socket) => {
    socket.on("sent-user-id", (data) => {
      nowuserid = data;
      usersocket = GetSocketId(usersocket, nowuserid, socket.id);
    })

    socket.on("disconnect-logout", (data) => {
      logoutuserid = data.userid;
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
    })

    socket.on("disconnect", (data) => {
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
    })
    //====================================================================================================
    //====================================================================================================


    //====================================================================================================
    //====================================================================================================
    socket.on("add-user-list", (data) => {
      console.log(data)
      let adduserlist = friend.getAddUserList(data);
      // console.log(adduserlist);
      EmitSocket(usersocket, data, io, "receive-add-user-list", adduserlist);
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("add-user-agree-list", (data) => {
      console.log(data)
      friend.createNewFriend(data);
      let check = friend.checkAddToRoom(data.userid, data.friendid);
      if (check === true) {
        room.createNewRoom(data.userid, data.friendid);
        notify.createBecameFriendNotify(data.userid, data.friendid);
        message.createNewRoom(data.userid, data.friendid);
      }

      let useragree = {
        firstname: user.returnUserProfile(data.userid).firstname,
        lastname: user.returnUserProfile(data.userid).lastname
      }

      EmitSocket(usersocket, data.friendid, io, "agree-friend-notify", useragree);
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("add-user-deny-list", (data) => {
      // console.log(data)
      friend.cancelAddRequest(data.userid, data.friendid);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;