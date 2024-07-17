const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getPost,
  getPosts,
  deletePost,
  updatePost,
  addPost
} = require("../controllers/post.controller");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);

module.exports = router;
