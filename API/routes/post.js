const express = require('express');
const router = express.Router();

const postCtrl = require('..controller/controllers/post');

router.post('/post', postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', userCtrl.getOnePost);
router.put('/:id', postCtrl.editPost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id', postCtrl.likePost);

module.exports = router;