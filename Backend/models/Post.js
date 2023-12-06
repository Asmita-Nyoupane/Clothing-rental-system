const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    rentPrice: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
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
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("post", postSchema);
