const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifies user Token
exports.protect = async (req, res, next) => {
    try {
        let token;
        // expects header: Authorization: bearer <token>
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        // Verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid or expired" });
    }
}

// Allows only Seller
exports.sellerOnly = (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Seller access only" });
    }
    next();
}