import { GetSocketId, EmitSocket, AppearUseridSocket, AppearAdminSeeUseridSocket, RemoveSocket, RemoveDisconnectSocket } from "./beginsockets";
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

      // let friendidlist = friend.getFriendIdList(nowuserid);
      EmitSocket(usersocket, 0, io, "receive-update-user-online", "update");
      useronlinelist = Object.keys(usersocket);

      // console.log(usersocket);
    })

    socket.on("disconnect-logout", (data) => {
      logoutuserid = data.userid;
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
      useronlinelist = Object.keys(usersocket);

      EmitSocket(usersocket, 0, io, "receive-update-user-online", "update");
    })

    socket.on("disconnect", (data) => {
      RemoveDisconnectSocket(usersocket, data, useronlinelist, socket.id);

      useronlinelist = Object.keys(usersocket);

      EmitSocket(usersocket, 0, io, "receive-update-user-online", "update");
    })
    //====================================================================================================
    //====================================================================================================


    //====================================================================================================
    //====================================================================================================
    socket.on("send-admin-friend-online", data => {
      // console.log(data);
      // console.log(useronlinelist);
      useronlinelist = Object.keys(usersocket);

      if (data === 0) {
        let adminuseronlinelist = AppearAdminSeeUseridSocket(useronlinelist, data);
        // console.log(adminuseronlinelist);
        EmitSocket(usersocket, 0, io, "receive-current-user-online", adminuseronlinelist);
      }
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;