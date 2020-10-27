const express = require('express');
const multer = require('../middlewares/multer-config')
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/', multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
//router.get('/user/:id', postCtrl.getPostsUser)
router.put('/:id', postCtrl.editPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;