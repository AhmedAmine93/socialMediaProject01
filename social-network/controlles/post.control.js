const Users = require("../models/user.model");
const Postes = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;


const postCtrol = {
    readPost : async (req, res)=>{
        Postes.find((err, docs) => {
            if (!err) res.send(docs);
            else console.log("Error to have data : " + err);
          }).sort({ createdAt: -1 });
    },
    createPost: async(req, res)=>{
      
        try {
            const { message, video , posterId } = req.body
            if (!ObjectID.isValid(req.body.posterId))
            return res.status(400).send("ID unknown : " + req.body.posterId);
        
            
            if (video.length === 0)
            return res.status(400).json({msg : "please add an URL video"});

            if(message.length === 0)
            return res.status(400).json({msg: "Please add your photo."});
   

            const newPostes = new Postes({
                posterId: req.body.posterId,
                message: req.body.message,
                video: req.body.video,
                likers: [],
                comments: [],
            })
            await newPostes.save()

            res.json({
                msg: 'Created Post!',
                newPost: {
                    ...newPostes._doc,    
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: (req, res)=>{
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
        const updatedRecord = {
            message: req.body.message,
            video: req.body.video,
          };
        
          Postes.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true },
            (err, docs) => {
              if (!err) res.send(docs);
              else console.log("Update error : " + err);
            }
          );
        },
    deletePost: (req, res)=>{
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
        Postes.findByIdAndDelete(req.params.id, 
        (err, docs) => {
            if (!err){ res.send(docs);
            console.log("message supprimé")}
            else console.log("Delete error : " + err);
          });
        
    },
    likePost: async(req, res)=>{
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
        try {
            const post = await Postes.find({ likers: req.params.id})
            if(post.length > 0) return res.status(400).json({msg: "You liked this post."})
            
            await Postes.findByIdAndUpdate(
              req.params.id,
              {
                $push: { likers: req.body.id },
              },
              { new: true },
              (err, docs) => {
                if (err) return res.status(400).send(err);
              }
            );
            await Users.findByIdAndUpdate(
              req.body.id,
              {
                $addToSet: { likes: req.params.id },
              },
              { new: true },
              (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
              }
            );
          } catch (err) {
            return res.status(500).json({msg : err.message});
          }
        
    },
    unlikePost: async(req, res)=>{

    },
    commentPost: async(req, res)=>{

    },
    editCommentPost: async(req, res)=>{

    },
    deleteCommentPost: async(req, res)=>{

    },

}
module.exports = postCtrol;