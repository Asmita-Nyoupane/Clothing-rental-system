const Post = require("../models/Post");

// create a new post

const createPost = async (req, res) => {
  console.log("hello", req);
  try {
    // console.log("backend", req.body);
    const post = await Post.create(req.body);
    return res.status(200).json({ msg: "Post saved successfully", data: post });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Get all available post

const getAllPosts = async (req, res) => {
  let category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ category: category });
    } else {
      posts = await Post.find({});
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

// Get the post of specific id

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// update the post

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(200).json({ msg: "Post updated Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// delete the post

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost };
