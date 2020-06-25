import { GetSocketId, EmitSocket, AppearUseridSocket, RemoveSocket, RemoveDisconnectSocket } from "./beginsockets";
import { user, friend, message, room, notify } from "../models/allmodels";


let AddUserList = io => {

  //======================================Begin=======================================================
  //====================================================================================================
  let usersocket = {};
  let useronlinelist = [];
  let nowuserid = 0;
  let logoutuserid = 0;
  io.on("connection", (socket) => {
    socket.on("sent-user-id", (data) => {
      nowuserid = data;
      usersocket = GetSocketId(usersocket, nowuserid, socket.id);

      let friendidlist = friend.getFriendIdList(nowuserid);

      friendidlist.forEach(itemid => {
        EmitSocket(usersocket, itemid.friendid, io, "receive-update-friend-online", "update");
      })
      // console.log(usersocket);
      // console.log(Object.keys(usersocket));
      useronlinelist = Object.keys(usersocket);
      // console.log(useronlinelist);
    })

    socket.on("disconnect-logout", (data) => {
      logoutuserid = data.userid;
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
      let friendidlist = friend.getFriendIdList(nowuserid);

      friendidlist.forEach(itemid => {
        EmitSocket(usersocket, itemid.friendid, io, "receive-update-friend-online", "update");
      })
    })

    socket.on("disconnect", (data) => {
      RemoveDisconnectSocket(usersocket, data, useronlinelist, socket.id);
    })
    //====================================================================================================
    //====================================================================================================


    //====================================================================================================
    //====================================================================================================
    socket.on("send-friend-online", data => {
      // console.log(data);
      // console.log(usersocket);
      let friendonlinelist = AppearUseridSocket(usersocket, data);
      // let friendonlinelist = AppearUseridSocket(usersocket, data);
      // console.log(friendonlinelist)
      EmitSocket(usersocket, data, io, "receive-current-friend-online", friendonlinelist);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;