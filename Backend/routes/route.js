const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/user");
const { uploadImage, getImage } = require("../controllers/image_controller");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post_controller");
const {
  newComment,
  getComments,
  deleteComment,
} = require("../controllers/comment_controller");

const upload = require("../middleware/upload");
const {
  authenticateToken,
  createNewToken,
} = require("../middleware/authenticateToken");

router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/token", createNewToken);

router.post("/create", authenticateToken, createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

router.post("/comment/new", authenticateToken, newComment);
router.get("/comments/:id", authenticateToken, getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

module.exports = router;
