import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js';
import cookieParser from "cookie-parser";
import userRouter from './rout/userRout.js';
import cors from "cors";
import { app, server, io } from './Socket/socket.js'; // Make sure io is exported for socket-level CORS
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Allow CORS (change later if needed for Render domain)
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes (API)
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

// ✅ Serve Frontend (React build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// ✅ Test Route
app.get("/api", (req, res) => {
    res.send("Server is Working.");
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    dbConnect();
    console.log(`⚡ Server is working at http://localhost:${PORT}`);
});
