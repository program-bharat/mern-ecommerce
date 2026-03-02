const Contact = require("../models/Contact");
exports.createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        await Contact.create({ name, email, message });
        res.json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.error("Contact error:", error);
        res.status(500).json({ message: "Server error" });
    }
};