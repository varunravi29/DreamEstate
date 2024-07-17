const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getUsers,
  // getUser,
  deleteUser,
  updateUser,
  profilePosts,
} = require("../controllers/user.controller");

router.get("/", verifyToken, getUsers);
// router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/profilePosts", verifyToken, profilePosts);

module.exports = router;
