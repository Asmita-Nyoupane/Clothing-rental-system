const Chat = require("../models/Chat");
const User = require("../models/User");

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ msg: "UserId not found" });
  }
  var isChat = await Chat.find({
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      {
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name image email",
  });

  if (isChat.length > 0) {
    return res.status(200).json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      users: [req.user._id, userId],
    };

    try {
      const crearedChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: crearedChat._id }).populate(
        "users",
        "-password"
      );
      return res.status(200).json(FullChat);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedResults = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name image email",
    });

    return res.status(200).json(populatedResults);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { accessChat, fetchChats };
