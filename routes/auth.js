const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Yup = require("yup");
const User = require("../models/User");
const router = express.Router();

const registerSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(255),
  email: Yup.string().email().required().min(6).max(255),
  password: Yup.string().required().min(6).max(255),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

router.post("/register", (req, res) => {
  registerSchema
    .validate(req.body)
    .then(() => {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = new User({ ...req.body, password: hash });
      user
        .save()
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
          res.header("Authorization", token).json({ accessToken: token });
        })
        .catch((err) => res.send(err.message));
    })
    .catch((err) => res.send(err.message));
});

router.post("/login", (req, res) => {
  loginSchema
    .validate(req.body)
    .then(() => {
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            return res.send("Invalid email or password");
          }
          const isValid = bcrypt.compareSync(req.body.password, user.password);
          if (!isValid) {
            return res.send("Invalid email or password");
          }
          const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
          res.header("Authorization", token).json({ accessToken: token });
          // res.header('Authorization', token).json({accessToken: token})
        })
        .catch(() => res.send("Invalid email or password"));
    })
    .catch((err) => res.send(err.message));
});

module.exports = router;
