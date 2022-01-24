const router = require('express').Router();
const postCtrol = require('../controlles/post.control');
const multer = require("multer");
const upload = multer();
 // crud postes
router.get('/post', postCtrol.readPost);
router.post('/post', postCtrol.createPost);
router.put('/:id', postCtrol.updatePost);
router.delete('/:id', postCtrol.deletePost);
router.patch('/like/:id', postCtrol.likePost);
router.patch('/unlike/:id', postCtrol.unlikePost);

// crud comments
router.patch('/comment-post/:id', postCtrol.commentPost);
router.patch('/edit-comment-post/:id', postCtrol.editCommentPost);
router.patch('/delete-comment-post/:id', postCtrol.deleteCommentPost);

 module.exports=  router;