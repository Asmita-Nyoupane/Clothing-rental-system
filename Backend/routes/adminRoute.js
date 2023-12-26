const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const restricTo = require("../middleware/restricTo");
const deletePost = require("../controllers/admin/deletePostController");

router.delete(
  "/admin/delete/:id",
  //   authenticateToken,
  restricTo("admin"),
  deletePost
);

module.exports = router;
