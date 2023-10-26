const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.URL;
async function connectToMongo() {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch((err) => console.log(err));
}
module.exports = connectToMongo;