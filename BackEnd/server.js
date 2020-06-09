import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import registerRoutes from "../BackEnd/src/routes/register";
import loginRoutes from "../BackEnd/src/routes/login";
import firstnameRoutes from "../BackEnd/src/routes/userdashboard";
import homeRoutes from "../BackEnd/src/routes/home";
import profileRoutes from "../BackEnd/src/routes/profile";
import searchRoutes from "./src/routes/searchuser";
import unknowRoutes from "./src/routes/unknowuser";
import addfriendRoutes from "./src/routes/addfriend";
import portRoutes from "../BackEnd/src/routes/port";



let app = express();


app.use(cors());

var corsOptions = {
  body: "*",
  origin: "*",
  optionsSuccessStatus: 200
};


app.use(bodyParser.json());

var Student = [];
var profile = fs.readFileSync("../BackEnd/src/databases/userProfile.json");
if (profile) {
  Student = JSON.parse(profile);
}

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

// -------------------------Port------------------------------------------
portRoutes(app);
//-------------------------------------------------------------------------
