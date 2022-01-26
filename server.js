const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
//const chatRoutes = require("./routes/chat.routes");
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
// api docs
app.get('/api', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});
//jwt-verification-token
app.get('*', checkUser);


// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
//app.use("/api/auth", authRoutes)
// app.use("/api/notify", notifyRoutes);
//app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// erreur.handle
app.use(notFound);
app.use(errorHandler);
// server

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT} `);
});
