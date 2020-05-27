import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  sex: { type: String, default: "male" },
  phone: { type: String, default: null },
  password: { type: String, default: null },
  birthday: { type: Date, default: null },
  avatar: { type: String, default: "avartar-default.jpg" }
});

module.exports = mongoose.model("user", UserSchema);