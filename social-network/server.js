const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const {checkUser, requireAuth} = require('./middelwares/mid');
const body_parser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
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
app.get('*',checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
  });
// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


// server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT} `);
});