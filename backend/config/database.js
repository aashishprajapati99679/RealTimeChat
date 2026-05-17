const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // Force IPv4 resolution to prevent ENOTFOUND errors with MongoDB Atlas
            family: 4
        });
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Error connecting to database", error);
    }
}

module.exports = connectDB;