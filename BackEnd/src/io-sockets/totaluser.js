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
    socket.on("get-total-user-list", (data) => {
      // console.log(data);
      if (data === 0) {
        let totaluserdata = user.totalUserList(data);
        EmitSocket(usersocket, data, io, "receive-total-user-list", totaluserdata);
      }
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("destroy-user-from-list", (data) => {
      // console.log(data);
      if (data.adminid === 0) {
        user.banByAdmin(data.adminid, data.userid);
        EmitSocket(usersocket, 0, io, "receive-destroy-total-user-list", "update");
        EmitSocket(usersocket, data.userid, io, "ban-account-of-you", "banned");
      }
    })
    //====================================================================================================
    //====================================================================================================

  })
}

module.exports = AdminStatistic;