const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register Controller
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        // Checking if user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        // Hashing Passwrod
        const hashedPasswrod = await bcrypt.hash(password, 10);
        // Creating new user
        const newUser = new User({
            name, email, password: hashedPasswrod,
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