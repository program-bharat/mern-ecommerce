const Product = require("../models/Products");
const Order = require("../models/Order");

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
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        // check product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // seller can delete only own product
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Category wise Filter
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({
            category: new RegExp(`^${category}$`, "i"),
        }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Get all products (PUBLIC)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Get all products error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get single product (for ProductPage)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Wishlist page
exports.getWishlistProducts = async (req, res) => {
    try {
        const { ids } = req.query;
        if (!ids) return res.json([]);
        const idArray = ids.split(",");
        const products = await Product.find({
            _id: { $in: idArray },
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Get Seller Dashboard Stats
exports.getSellerStats = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const totalProducts = await Product.countDocuments({
            seller: sellerId,
        });
        const totalOrders = await Order.countDocuments({
            seller: sellerId,
        });
        const pendingOrders = await Order.countDocuments({
            seller: sellerId,
            status: { $regex: /^pending$/i }, // case insensitive
        });
        const revenueAgg = await Order.aggregate([
            {
                $match: {
                    seller: sellerId,
                    status: { $nin: ["Cancelled", "cancelled"] }, // exclude cancelled
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" },
                },
            },
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
        res.status(200).json({
            totalProducts,
            totalOrders,
            pendingOrders,
            totalRevenue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};