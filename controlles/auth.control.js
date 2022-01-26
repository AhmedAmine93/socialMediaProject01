const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};
module.exports.inscription = async(req, res) => {
    try {
        const { fullname, username, email, password, gender } = req.body;
        let newUserName = username.toLowerCase().replace(/ /g, "");

        const user_name = await Users.findOne({ username: newUserName });
        if (user_name)
            return res.status(400).json({ msg: "This user name already exists." });

        const user_email = await Users.findOne({ email });
        if (user_email)
            return res.status(400).json({ msg: "This email already exists." });

        if (password.length < 6)
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters." });

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new Users({
            fullname,
            username: newUserName,
            email,
            password: passwordHash,
           
        });

       

        await newUser.save();

        res.json({
            msg: "Register Success!",
            user: {
                ...newUser._doc,
                password: "",
            },
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
module.exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email }).populate(
            "followers following",
            "avatar username fullname followers following"
        );

        if (!user)
            return res.status(400).json({ msg: "This email does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Password is incorrect." });

        const token = createAccessToken({ id: user._id });
        res.cookie("jwt", token, {
            httpOnly: true,maxAge: 30 * 24 * 60 * 60 * 1000, 
        });

        res.json({
            msg: "Login Success!",
            token,
            user: {
                ...user._doc,
                password: "",
            },
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
module.exports.logout = async(req, res) => {
    try {
        res.cookie("jwt", '',{ maxAge: 1});
        res.redirect('/api/user/');
       // return res.json({ msg: "Logged out!" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
