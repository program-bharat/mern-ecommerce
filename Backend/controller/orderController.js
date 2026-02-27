const Order = require("../models/Order");
const Product = require("../models/Products");

// Buyer -> Place order
exports.placeOrder = async (req, res) => {
    try {
        const buyerId = req.user._id;
        const { items } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        let totalAmount = 0;
        let sellerId = null;
        const formattedProducts = [];
        for (let item of items) {
            const product = await Product.findById(item.productId);
            if (!product) continue;
            sellerId = product.createdBy || product.seller;
            totalAmount += product.price * item.quantity;
            formattedProducts.push({
                product: product._id,
                quantity: item.quantity,
                size: item.size,
                price: product.price,
            });
        }
        if (!sellerId) {
            return res.status(400).json({ message: "Invalid products" });
        }
        const order = await Order.create({
            buyer: buyerId,
            seller: sellerId,
            products: formattedProducts,
            totalAmount,
        });
        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order,
        });
    } catch (error) {
        console.error("Place order error: ", error)
        res.status(500).json({ message: "Server Error" });
    }
}
exports.getSellerOrders = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const orders = await Order.find({ seller: sellerId })
            .populate("buyer", "name email")
            .populate("products.product", "name image price")
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Seller orders error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getBuyerOrders = async (req, res) => {
    try {
        const buyerId = req.user._id;

        const orders = await Order.find({ buyer: buyerId })
            .populate("products.product", "name image price")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Buyer orders error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json({
            success: true,
            message: "Order status updated",
            order,
        });
    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({ message: "Server error" });
    }
};