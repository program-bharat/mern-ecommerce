const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require("../controller/authController");
// middleware
const { protect } = require("../middleware/authMiddleware");

// auth
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// profile
userRouter.get("/profile", protect, getProfile);
userRouter.put("/profile", protect, updateProfile);

module.exports = userRouter;