import registerRoutes from "./register"
import loginRoutes from "./login";
import firstnameRoutes from "./userdashboard";
import homeRoutes from "./home";
import profileRoutes from "./profile";
import searchRoutes from "./searchuser";
import unknowRoutes from "./unknowuser";
import addfriendRoutes from "./addfriend";
import notifyRoutes from "./notify";
import adduserRoutes from "./adduser";
import chatfriendRoutes from "./chatfriend";
import messageRoutes from "./message";
import updateimageRoutes from "./updateimage";
import waitfriendRoutes from "./waitfriendlist";
import addhomefriendRoutes from "./addhomefriend";
import indexfriendRoutes from "./indexfriendlist";
import changeinforRoutes from "./changeinfor";
import changepassRoutes from "./changepass";


let AllRoutes = (app, corsOptions) => {
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

  // --------------------------AddHomeFriend---------------------------------------
  addhomefriendRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------Notify---------------------------------------
  notifyRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------AddUserList---------------------------------------
  // adduserRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------ChatFriendList---------------------------------------
  chatfriendRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------Message---------------------------------------
  messageRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------UpdateImage---------------------------------------
  updateimageRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------WaitFriendList---------------------------------------
  // waitfriendRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------IndexFriendList---------------------------------------
  indexfriendRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------ChangeInfor---------------------------------------
  changeinforRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------ChangePass---------------------------------------
  changepassRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  //=========================================================================
}

module.exports = AllRoutes;