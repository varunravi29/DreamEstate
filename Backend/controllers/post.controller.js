const asyncHandler = require("express-async-handler");
const prisma = require("../lib/prisma");

const getPosts = asyncHandler(async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
      },
    });
    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "Failed To Get-Posts",
      success: false,
    });
  }
});
const getPost = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    setTimeout(() => {
      return res.status(200).json({ posts });
    }, 3000);
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "Failed To Get-Post",
      success: false,
    });
  }
  0;
});
const addPost = asyncHandler(async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json({ newPost });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "Failed To add-Posts",
      success: false,
    });
  }
});
const deletePost = asyncHandler(async (req, res) => {
  const tokenUserId = req.userId;
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenUserId) {
      return res
        .status(403)
        .json({ message: "User Not Authenticated", success: false });
    }
    await prisma.post.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Post Deleted Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "Failed To Delete-Posts",
      success: false,
    });
  }
});
const updatePost = asyncHandler(async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  //   console.log(tokenUserId);
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    // console.log(post.userId);
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found!",
        success: false,
      });
    }
    if (post.userId !== tokenUserId) {
      return res
        .status(403)
        .json({ message: "User Not Authenticated", success: false });
    }
    await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        price: body.price,
        img: body.img,
        address: body.address,
        city: body.city,
        bedroom: body.bedroom,
        bathroom: body.bathroom,
        latitude: body.latitude,
        longitude: body.longitude,
        type: body.type,
        property: body.property,
      },
    });
    return res.status(200).json({
      message: "Post Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "Failed To Update-Posts",
      success: false,
    });
  }
});

module.exports = { getPost, getPosts, deletePost, updatePost, addPost };
