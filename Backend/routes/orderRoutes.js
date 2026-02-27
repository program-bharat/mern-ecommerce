const express = require("express");
const router = express.Router();
// controller
const {
    placeOrder,
    getSellerOrders,
    getBuyerOrders,
    updateOrderStatus
} = require("../controller/orderController");
// middleware
const {
    protect,
    sellerOnly,
    buyerOnly
} = require("../middleware/authMiddleware");

// Buyer Only
router.post("/", protect, buyerOnly, placeOrder);
router.get("/buyer", protect, buyerOnly, getBuyerOrders);

// Seller Only
router.get("/seller", protect, sellerOnly, getSellerOrders);
router.put("/:id/status", protect, sellerOnly, updateOrderStatus);

module.exports = router;