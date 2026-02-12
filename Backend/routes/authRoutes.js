const express = require("express");
const userRouter = express.Router();
const { registerUser } = require("../controller/authController");

userRouter.post("/register", registerUser);

module.exports = userRouter;