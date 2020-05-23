const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

var corsOptions = {
    body: "*",
    origin: "*",
    optionsSuccessStatus: 200
};

app.use(bodyParser.json());



var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log(
      "Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s",
      host,
      port
    );
  });
  