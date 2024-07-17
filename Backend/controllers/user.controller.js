const asyncHandler = require("express-async-handler");
const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
});

// const getUser = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get user",
//     });
//   }
// });

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    if (tokenUserId !== id) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    const user = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;
  console.log(tokenUserId);
  let updatedPassword = null;
  try {
    /*
     * Synopsis > Why this below if-else is important? check it out */
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    if (tokenUserId !== id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = user;
    res.status(200).json(rest);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
});

const profilePosts = asyncHandler(async (req, res) => {
  const tokenUserId = req.params.userId;
  // console.log(tokenUserId);
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    console.log(userPosts);
    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get user posts",
    });
  }
});

module.exports = { getUsers, deleteUser, updateUser, profilePosts };
