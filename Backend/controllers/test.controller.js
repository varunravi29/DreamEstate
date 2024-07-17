const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const shouldBeLoggedIn = asyncHandler(async (req, res) => {
  console.log(req.userId);
  return res.status(200).json({ message: "User Is Authenticated" });
});
const shouldBeAdmin = asyncHandler(async (req, res) => {
  const token = req.cookies.Token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not Authenticated {token}", success: false });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token Is Not Valid", success: false });
    }
    if (!payload.isAdmin) {
      return res
        .status(403)
        .json({ message: "Not Authorized", success: false });
    }
  });

  return res.status(200).json({ message: "You Are Authenticated" });
});

module.exports = { shouldBeLoggedIn, shouldBeAdmin };
