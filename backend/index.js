import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js';
import cookieParser from "cookie-parser";
import userRouter from './rout/userRout.js';
import cors from "cors";
import { app, server, io } from './Socket/socket.js'; // Make sure io is exported for socket-level CORS

dotenv.config();

// ✅ Allow CORS for frontend 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Server is Working.");
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    dbConnect();
    console.log(`⚡ Server is working at http://localhost:${PORT}`);
});



/*
1. CORS (Cross-Origin Resource Sharing):
CORS allows servers to control and permit requests from different domains, improving web security and flexibility.

2. Routes:
Routes define specific endpoints in an application, mapping HTTP requests (GET, POST, etc.) to handler functions.

3. Middleware:
Middleware functions intercept requests, process data, handle authentication, logging, errors, before reaching route handlers.
*/
