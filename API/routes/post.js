const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/', postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
//router.get('/user/:id', postCtrl.getPostsUser)
router.put('/:id', postCtrl.editPost);
router.delete('/:id', postCtrl.deletePost);
router.post('/like/:id', postCtrl.likePost);

module.exports = router;