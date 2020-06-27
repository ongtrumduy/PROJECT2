import { GetSocketId, EmitSocket, RemoveSocket, RemoveDisconnectSocket } from "../io-sockets/beginsockets";
import { user, friend, message, room, notify } from "../models/allmodels";


let AdminStatistic = io => {

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
    socket.on("get-index-friend-list", (data) => {
      // console.log(data);
      let updatedata = {
        friendcount: user.getChatFriendList(data).length,
        waitcount: user.getWaitUserList(data).length,
        addcount: user.getAddUserList(data).length
      }
      EmitSocket(usersocket, data, io, "update-index-friend-list", updatedata);

    })
    //====================================================================================================
    //====================================================================================================

  })
}

module.exports = AdminStatistic;