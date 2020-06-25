import { GetSocketId, EmitSocket, RemoveSocket, RemoveDisconnectSocket } from "../io-sockets/beginsockets";
import { user, friend, message, room, notify } from "../models/allmodels";


let UserFriendList = io => {

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
      useronlinelist = Object.keys(usersocket);
    })

    socket.on("disconnect-logout", (data) => {
      logoutuserid = data.userid;
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
    })

    socket.on("disconnect", (data) => {
      RemoveDisconnectSocket(usersocket, data, useronlinelist, socket.id);
    })
    //====================================================================================================
    //====================================================================================================


    //====================================================================================================
    //====================================================================================================
    socket.on("user-friend-list", (data) => {
      let userfriendlist = friend.getChatFriendList(data);
      EmitSocket(usersocket, data, io, "receive-user-friend-list", userfriendlist);
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("destroy-user-friend-list", (data) => {
      friend.cancelAddRequest(data.userid, data.friendid);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = UserFriendList;