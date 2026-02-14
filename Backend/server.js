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

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})