const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
// Local Module
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// serve uploaded images
app.use("/uploads", express.static("uploads"));
// product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})