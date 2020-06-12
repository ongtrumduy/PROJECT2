import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import socketio from "socket.io";

import registerRoutes from "../BackEnd/src/routes/register";
import loginRoutes from "../BackEnd/src/routes/login";
import firstnameRoutes from "../BackEnd/src/routes/userdashboard";
import homeRoutes from "../BackEnd/src/routes/home";
import profileRoutes from "../BackEnd/src/routes/profile";
import searchRoutes from "../BackEnd/src/routes/searchuser";
import unknowRoutes from "../BackEnd/src/routes/unknowuser";
import addfriendRoutes from "../BackEnd/src/routes/addfriend";
import portRoutes from "../BackEnd/src/routes/port";

import addfriendSocket from "../BackEnd/src/io-sockets/addfriend";



let app = express();
let server = http.Server(app);
let port = 8081;
let io = socketio(server);

app.use(cors());

let corsOptions = {
  body: "*",
  origin: "*",
  optionsSuccessStatus: 200
};


app.use(bodyParser.json());

//========================Routes=========================================

// -----------------------Register---------------------------------------
registerRoutes(app, corsOptions);
//-----------------------------------------------------------------------

// -----------------------Login---------------------------------------
loginRoutes(app, corsOptions);
//-----------------------------------------------------------------------

// -----------------------UserDashBoard---------------------------------------
firstnameRoutes(app, corsOptions);
//-----------------------------------------------------------------------

// --------------------------Home---------------------------------------
homeRoutes(app, corsOptions);
//-----------------------------------------------------------------------

// --------------------------Profile---------------------------------------
profileRoutes(app, corsOptions);
//-----------------------------------------------------------------------

// --------------------------SearchUser---------------------------------------
searchRoutes(app, corsOptions);
//-----------------------------------------------------------------------

// --------------------------UnknowhUser---------------------------------------
unknowRoutes(app, corsOptions);
//-----------------------------------------------------------------------

// --------------------------AddFriend---------------------------------------
addfriendRoutes(app, corsOptions);
//-----------------------------------------------------------------------
//=========================================================================

//============================Socket======================================
// --------------------------AddFriend---------------------------------------
addfriendSocket(io);
//--------------------------------------------------------------------------

// -------------------------Port------------------------------------------
portRoutes(server, port);
//-------------------------------------------------------------------------
