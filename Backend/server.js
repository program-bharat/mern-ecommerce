const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

// Local Module
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// authRoutes
app.use("/api/auth", authRoutes);
// product routes
app.use("/api/products", productRoutes);
// orderRoutes
app.use("/api/orders", orderRoutes);
// serve uploaded images
app.use("/uploads", express.static("uploads"));
// Contact us routes
app.use("/api/contact", contactRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})