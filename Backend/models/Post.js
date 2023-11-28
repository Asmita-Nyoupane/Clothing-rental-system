const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  rentPrice: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  type:{
    type: String,
    require: true,
  },
  description:{
    type: String
  },
  size: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("post", postSchema);

