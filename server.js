const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middelwares/mid");
const body_parser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middelwares/erreur");
const app = express();
mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookieParser());
//jwt-verification-token
app.get("*", checkUser);
// app.get("/jwtid", requireAuth, (req, res) => {
//     res.status(200).send(res.locals.user._id);
// });
// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
// app.use("/api/notify", notifyRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// erreur.handle
app.use(notFound);
app.use(errorHandler);
// server

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT} `);
});
// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:3000",
//         // credentials: true,
//     },
// });

// io.on("connection", (socket) => {
//     console.log("Connected to socket.io");
//     socket.on("setup", (userData) => {
//         socket.join(userData._id);
//         socket.emit("connected");
//     });

//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log("User Joined Room: " + room);
//     });
//     socket.on("typing", (room) => socket.in(room).emit("typing"));
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;

//         if (!chat.users) return console.log("chat.users not defined");

//         chat.users.forEach((user) => {
//             if (user._id == newMessageRecieved.sender._id) return;

//             socket.in(user._id).emit("message recieved", newMessageRecieved);
//         });
//     });

//     socket.off("setup", () => {
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id);
//     });
// });