
let PortRoutes = function (server, port) {
  server.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(`Ung dung Node.js dang lang nghe tai dia chi: http://${host}:${port}`);
  });
}

module.exports = PortRoutes;
