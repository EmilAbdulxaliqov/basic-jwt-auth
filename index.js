const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const profileRouter = require("./routes/profile");
const verifyToken = require("./middleware/verifyToken");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Succesfull connection");
  })
  .catch((err) => console.log(err.message));

app.use("/auth", authRouter);
app.use("/posts", verifyToken, postsRouter);
app.use("/profile", verifyToken, profileRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
