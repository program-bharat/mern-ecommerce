const Product = require("../models/Products");

// Seller Add Products
exports.addProducts = async (req, res, next) => {
    try {
        const { name, description, price, category, stock } = req.body;
        // Ensure image uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: `/uploads/${req.file.filename}`,
            seller: req.user._id,
        })
        await product.save();
        res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// Get Seller Products
exports.getSellerProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
};
// Delete Seller Products
// exports.deleteProduct = async (req, res, next) => {
//     try {

//     } catch (error) {

//     }
// };