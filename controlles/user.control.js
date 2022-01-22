const Users = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

const userCtrol = {
    getAllUsers: async(req, res) => {
        const users = await Users.find().select("-password");
        res.status(200).json(users);
    },

    getUser: async(req, res) => {
        try {
            const user = await Users.findById(req.params.id)
                .select("-password")
                .populate("followers following", "-password");
            if (!user) return res.status(400).json({ msg: "User does not exist." });

            res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateUser: async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    
      try {
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              story: req.body.story,
              avatar: req.body.avatar,
              fullname: req.body.fullname,
              mobile : req.body.mobile,
              address: req.body.address,
              website : req.body.website,
              gender: req.body.gender,
              
            },
          },
         // { new: true, upsert: true, setDefaultsOnInsert: true },
          res.json({msg: "Update Success!"})
        );
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    },
    
    deleteUser : async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          await Users.deleteOne({ _id: req.params.id }).exec();
          res.status(200).json({ message: "Successfully deleted. " });
        } catch (err) {
          return res.status(500).json({ message: err });
        }
      },
      
    follow:async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    
        if (req.body.userId !== req.params.id) {
          try {
            const user = await Users.findById(req.params.id);
            const otherUser = await Users.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
              await user.updateOne({ $push: { followers: req.body.userId } });
              await otherUser.updateOne({ $push: { following: req.params.id } });
              res.status(200).json("user has been followed");
            } else {
              res.status(403).json("you allready follow this user");
            }
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(403).json("you cant follow yourself");
        }
      },
    
    unfollow: async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
        if (req.body.userId !== req.params.id) {
          try {
            const user = await Users.findById(req.params.id);
            const otherUser = await Users.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
              await user.updateOne({ $pull: { followers: req.body.userId } });
              await otherUser.updateOne({ $pull: { following: req.params.id } });
              res.status(200).json("user has been followed");
            } else {
              res.status(403).json("you allready follow this user");
            }
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(403).json("you cant follow yourself");
        }
      },
      
    suggestionsUser: async(req, res) => {
        try {
            const newArr = [...req.user.following, req.user._id];

            const num = req.query.num || 10;

            const users = await Users.aggregate([
                { $match: { _id: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
                {
                    $lookup: {
                        from: "users",
                        localField: "followers",
                        foreignField: "_id",
                        as: "followers",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "following",
                        foreignField: "_id",
                        as: "following",
                    },
                },
            ]).project("-password");

            return res.json({
                users,
                result: users.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = userCtrol;