export let GetSocketId = (usersocket, userid, socketid) => {
  // console.log("Id của cái userdashboard");
  // console.log(socket.id);
  // socket.join("TEST");
  // console.log(socket.adapter.rooms);
  // console.log(data);
  if (usersocket[userid]) {
    usersocket[userid].push(socketid);
  } else {
    usersocket[userid] = [socketid];
  }
  return usersocket;
}

export let EmitSocket = (usersocket, userid, io, event, data) => {
  if (usersocket[userid]) {
    usersocket[userid].forEach(socketId => {
      //   console.log(socketId);
      //   console.log(typeof (socketId));
      // socket.to("TEST").emit("add-friend-notify", adduserid);
      return io.sockets.in(socketId).emit(event, data);
    });
  }
}


export let RemoveSocket = (usersocket, userid, socketid) => {
  if (usersocket[userid]) {
    usersocket[userid] = usersocket[userid].filter(socketId => {
      return socketId !== socketid;
    })
  }
  if (!usersocket[userid]) {
    delete usersocket[userid];
  }
  return usersocket;
}