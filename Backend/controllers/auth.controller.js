const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");
/*
 * USER REGISTRATION
 * { POST REQUEST }
 * http://localhost:8000/api/auth/register
 */
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User Created Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed To Create A User",
    });
  }
});

/*
 * USER LOGIN
 * { POST REQUEST }
 * http://localhost:8000/api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    /* Check User Exists or Not? */
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Exists",
      });
    }

    /* Password Matching check */
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    /* Generate a token and send it as a cookie */

    /* Token Data */
    const tokenData = {
      userId: user.id, // this is important
      isAdmin: true,
    };

    /* Creating a Token Using The Json-Web-Token */
    const token = await jwt.sign(
      tokenData,
      "72jhb32hg4i26427y98eadsakjdfwsb3iurywi47r6w@1%hwj",
      {
        expiresIn: "7d",
      }
    );
    /*
     * This is Important
     */
    const { password: userPassword, ...userInfo } = user;

    const options = {
      httpOnly: true, // This makes the cookie inaccessible to client-side JavaScript
      maxAge: 1000 * 60 * 15, // The cookie will expire in 15 minutes
      sameSite: "Lax", // Helps prevent CSRF attacks
    };

    return res.status(200).cookie("Token", token, options).json({
      message: "Login success",
      success: true,
      userInfo: userInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Unsuccessful",
    });
  }
});

/*
 * USER LOGOUT
 * { POST REQUEST }
 * http://localhost:8000/api/auth/logout
 */
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("Token");
  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
});

module.exports = { register, login, logout };
