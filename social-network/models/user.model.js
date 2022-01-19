const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [isEmail],
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: { type: String, default: "user" },
    gender: { type: String, default: "male" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: {
        type: String,
        default: "",
        maxlength: 1000,
    },
    website: { type: String, default: "" },
    followers:  {
        type: Array,
        default: [],
      },
    following:  {
        type: Array,
        default: [],
      },
    saved: [{ type: mongoose.Types.ObjectId, ref: "user" }],
}, {
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);