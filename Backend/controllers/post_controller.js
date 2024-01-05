const Post = require("../models/Post");

// create a new post

const createPost = async (req, res) => {
  try {
    console.log("backend", req.body);
    console.log(" coordinates in backend🫥🫥🫥", req.body.coordinates);
    const [latitude, longitude] = req.body.coordinates || {}; // Extract coordinates
    const post = new Post({
      category: req.body.category,
      rentPrice: req.body.rentPrice,
      gender: req.body.gender,
      type: req.body.type,
      description: req.body.description,
      size: req.body.size,
      image: req.body.image,
      name: req.body.name,
      phone: req.body.phone,
      userId: req.body.userId,
      profilePic: req.body.profilePic,
      location: {
        type: "Point",
        coordinates: [parseFloat(latitude), parseFloat(longitude)],
      },
    });
    console.log("🤌🤌", post);
    const postData = await post.save();
    // const post = await Post.create(req.body);
    return res
      .status(200)
      .json({ msg: "Post saved successfully", data: postData });
  } catch (error) {
    console.error("Error in createPost:", error);
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
    await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
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

// get all the items nearer to the user's current location
const getNearByPosts = async (req, res) => {
  try {
    const { latitude, longitude, category, maxRentPrice, size, gender } =
      req.query;
    console.log("current user location inn backend", latitude, longitude);

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ msg: "Latitude and longitude are required" });
    }
    // Define the conditions for your filters
    const conditions = {};
    if (category) conditions.category = category;
    if (maxRentPrice)
      conditions["rentPrice"] = { $lte: parseFloat(maxRentPrice) };
    if (size) conditions.size = size;
    if (gender) conditions.gender = gender;

    const radius = 8; // radius
    const maxDistance = radius * 1000; // Convert radius to meters

    const nearbyPosts = await Post.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
          },
          distanceField: "distance",
          maxDistance: maxDistance,
          spherical: true,
        },
      },
      {
        $match: conditions, // Apply the filters
      },
    ]);
    console.log("Nearer clothes my place", nearbyPosts);

    return res.status(200).json(nearbyPosts);
  } catch (error) {
    console.error("Error in getNearByPosts:", error);
    return res.status(500).json({ msg: error.message });
  }
};
const searchItem = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const result = await Post.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { type: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller  for filter the post based on gender, price and size
const filterPost = async (req, res) => {
  try {
    const { maxRentPrice, size, gender, category } = req.query;
    const filter = {};
    if (maxRentPrice) {
      filter.rentPrice = { $lte: parseInt(maxRentPrice) };
    }

    if (size) {
      filter.size = size;
    }
    if (gender) {
      filter.gender = gender;
    }
    if (category) {
      filter.category = category;
    }
    // Check if the filter object is not empty
    const hasFilter = Object.keys(filter).length > 0;

    const result = hasFilter ? await Post.find(filter) : await Post.find();

    // const result = await Post.find(filter);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getNearByPosts,
  searchItem,
  filterPost,
};
