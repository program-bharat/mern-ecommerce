const express = require('express');
const router = express.Router();
const { addProducts, getSellerProducts, deleteProduct } = require("../controller/productController")
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


module.exports = router;
