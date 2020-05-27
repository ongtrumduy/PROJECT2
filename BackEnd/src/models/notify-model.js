import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let NotifySchema = new Schema({
  sender: {
    id: String,
    username: String,
    avartar: String
  },
  receiver: {
    id: String,
    username: String,
    avartar: String
  },
  type: String,
  content: String,
  isRead: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("notify", NotifySchema);