const express = require('express');
const router = express.Router();
const {
        addProducts,
        getSellerProducts,
        deleteProduct,
        getProductsByCategory,
        getProductById,
        getWishlistProducts
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

// Seller gets their products
router.get("/my-products",
    protect,
    sellerOnly,
    getSellerProducts,
);

// Category Page
router.get("/category/:category", getProductsByCategory);

// Wishlist Page
router.get("/wishlist", getWishlistProducts);

// Product Page
router.get("/:id", getProductById);

module.exports = router;
