const express = require('express');
const multer = require('../middlewares/multer-config')
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/', multer, postCtrl.createPost);
router.post('/comment/:id', postCtrl.createComment)
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.get('/:id/comments', postCtrl.getComments);
router.put('/:id', postCtrl.editPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;