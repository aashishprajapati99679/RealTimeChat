const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
// const app = express(); // We now import app from socket.js
const { app, server } = require("./socket/socket");
const port = process.env.PORT;
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const messageRoutes = require("./routes/messageroutes");
const cors = require("cors");



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptions));
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);



server.listen(port, () => {
    connectDB();
    console.log(`Server is running on localhost:${port}`);
});