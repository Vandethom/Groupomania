const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/account/:id', userCtrl.updateUser)
router.get('/account/:id', userCtrl.getUser);
router.delete('/account/:id', userCtrl.deleteUser)

module.exports = router;