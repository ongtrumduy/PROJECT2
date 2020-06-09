var express = require("express");

let PortRoutes = function (app) {
  let server = app.listen(8081, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(
      "Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s",
      host,
      port
    );
  });
}

module.exports = PortRoutes;
