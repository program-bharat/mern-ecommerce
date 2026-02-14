const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        // Checking if user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        // Hashing Passwrod
        const hashedPasswrod = await bcrypt.hash(password, 10);
        // Creating new user
        const newUser = new User({
            name, email, password: hashedPasswrod, role,
        });
        // Saving User to DB
        await newUser.save();
        res.status(201).json({
            message: "User Registered Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // User Exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }
        // Comparing Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }
        // Generating JWT Token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        // Sending Response
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};