import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

// ✅ Correct CORS config
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// ✅ Maintain a map of userId ➜ socketId
const userSocketmap = {};

export const getReciverSocketId = (receverId) => {
    return userSocketmap[receverId];
};

// ✅ Socket.IO connection handler
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId !== "undefined") {
        userSocketmap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketmap));

    socket.on('disconnect', () => {
        delete userSocketmap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketmap));
    });
});

export { app, io, server };
