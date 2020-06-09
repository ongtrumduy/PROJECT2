import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, default: "Phạm Duy" },
  firstname: { type: String, default: "Duy" },
  lastname: { type: String, default: "Phạm" },
  phonenumber: { type: String, default: null },
  password: { type: String, default: null },
  birth: { type: Date, default: null },
  gender: { type: String, default: "male" },
  avatar: { type: String, default: "avartar-default.jpg" }
});

UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  }
}

module.exports = mongoose.model("user", UserSchema);


// let User = mongoose.model("user", UserSchema);

// let CreateUser = (username, firstname, lastname, phonenumber, password, birth, gender, avatar) => {
//   User.findOne({ "username": username }, async (err, userlist) => {
//     if (err) console.log(err);
//     if (userlist != null) 
//   })
// }