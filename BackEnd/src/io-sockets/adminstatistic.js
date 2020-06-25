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
    socket.on("get-admin-statistic", (data) => {
      if (data === 0) {
        let totaldata = {
          totalregisted: user.totalUser(data),
          totalnowuser: Object.keys(usersocket).length,
          totalillegaluser: 0
        }
        // console.log(adduserlist);
        EmitSocket(usersocket, data, io, "receive-admin-statistic", totaldata);
      }
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AdminStatistic;