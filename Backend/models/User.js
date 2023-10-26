const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    reuired: true,
  },
  email: {
    type: String,
    unique: true,
    reuired: true,
  },
  phone: {
    type: String,
    unique: true,
    reuired: true,
  },
  password: {
    type: String,
    reuired: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});
module.exports =  mongoose.model("user", UserSchema);