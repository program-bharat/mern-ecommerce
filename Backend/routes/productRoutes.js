const express = require('express');
const router = express.Router();
const {
    addProducts,
    getSellerProducts,
    deleteProduct,
    getProductsByCategory,
    getProductById,
    getWishlistProducts,
    getSellerStats,
} = require("../controller/productController")

// middlewares
const { protect, sellerOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Seller Add product
router.post("/add",
    protect,
    sellerOnly,
    upload.single("image"),
    addProducts
);

// Seller delete product from ViewProduct Page
router.delete(
    "/:id",
    protect,
    sellerOnly,
    deleteProduct
);

// Seller gets their products for ViewProduct Page
router.get("/my-products",
    protect,
    sellerOnly,
    getSellerProducts,
);

// Seller data for dashboard stats
router.get(
    "/seller/stats",
    protect,
    sellerOnly,
    getSellerStats
);

// Category Page
router.get("/category/:category", getProductsByCategory);

// Wishlist Page
router.get("/wishlist", getWishlistProducts);

// Product Page
router.get("/:id", getProductById);

module.exports = router;
