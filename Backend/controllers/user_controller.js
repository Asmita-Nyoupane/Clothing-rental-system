const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const Token = require("../models/Token");

const signupUser = async (req, res) => {
  const { name, email, phone, password, image } = req.body;
  try {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      image: image,
      role,
    };
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    console.error("Error while signing up user: ", error);
    return res.status(500).json({ msg: "Error while signup the user " });
  }
};

const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "Email doesn't match" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "1day" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        phone: user.phone,
        image: user.image,
        role: user.role,
        _id: user._id,
      });
    } else {
      return res.status(400).json({ msg: "Password doesn't match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error while login the user" });
  }
};

//  /allUsers?search=asmita
const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" },
          },
          {
            email: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {};
  try {
    const users = await User.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: "Users aren't found" });
  }
};

const getAllUser = async (req, res) => {
  // console.log("getall user in baackend", req.params.id);
  try {
    const users = await User.find({
      _id: { $ne: req.params.id },
      role: { $nin: ["admin", "user"] }, // exclude users with roles "admin" and "user"
    }).select(["name", "image", "_id"]);
    // console.log("users from backend", users);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: "Users aren't found" });
  }
};

module.exports = { signupUser, loginUser, allUsers, getAllUser };
