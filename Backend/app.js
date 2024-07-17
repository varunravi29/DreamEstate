require('dotenv').config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const port = 8000;
const ConnectionBegin = async () => {
  try {
    await app.listen(port, () => console.log("Server Is Listening...."));
  } catch (error) {
    console.log(error);
  }
};
ConnectionBegin();
