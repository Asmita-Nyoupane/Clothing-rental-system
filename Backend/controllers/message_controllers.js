const { response } = require("express");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(400).json({ msg: "Invalid data passed to request" });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name image email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId),
      {
        latestMessage: message,
      };
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const allMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name image email ")
      .populate("chat");
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { sendMessage, allMessage };
