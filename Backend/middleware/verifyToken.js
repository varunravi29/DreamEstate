const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.Token;
  // console.log("Token in verify.js ", token);
  if (!token) {
    return res.status(401).json({
      message: "Not Authenticated {token}",
      success: false,
    });
  }

  jwt.verify(token, "72jhb32hg4i26427y98eadsakjdfwsb3iurywi47r6w@1%hwj", async (err, payload) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Not Authenticated", success: false });
    /*
     * Another Important statement below {ALERT}
     */
    req.userId = payload.userId;
    next();
  });

  //   return res.status(200).json({ message: "User Is Authenticated" });
});

module.exports = verifyToken;
